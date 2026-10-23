<?php

namespace App\Helpers;

use App\Models\Setting;
use App\Models\UserToken;
use Illuminate\Support\Facades\Log;
use Google\Client;
use Exception;

class FirebaseHelper
{
    /** Chunk size for parallel FCM sends (avoids timeout when sending to many devices). */
    const BULK_CHUNK_SIZE = 50;

    public static function send($platform, $registration_ids, $fcm_msg, $notification)
    {
        $fields = self::buildMessageFields($platform, $registration_ids, $fcm_msg, $notification);
        if ($fields === null) {
            return false;
        }
        return self::sendPushNotification($fields);
    }

    public static function sendBulk($tokenRows, $fcm_msg, $notification, $tokenModelClass = null)
    {
        $list = [];
        $seenTokens = [];
        foreach ($tokenRows as $row) {
            $token = trim($row->fcm_token ?? '');
            $platform = $row->platform ?? 'android';
            if (empty($token) || strtolower($token) === 'undefined' || strtolower($token) === 'null') {
                continue;
            }
            if (in_array($token, $seenTokens)) {
                continue;
            }
            $seenTokens[] = $token;
            $fields = self::buildMessageFields($platform, $token, $fcm_msg, $notification);
            if ($fields !== null) {
                $list[] = ['fields' => $fields, 'token' => $token, 'row' => $row];
            }
        }

        if (empty($list)) {
            return;
        }

        $chunks = array_chunk($list, self::BULK_CHUNK_SIZE);
        foreach ($chunks as $chunk) {
            self::sendChunkParallel($chunk, $tokenModelClass);
        }
    }

    /**
     * Build FCM v1 message fields for one token (used by send and sendBulk).
     */
    private static function buildMessageFields($platform, $registration_id, $fcm_msg, $notification = null)
    {
        if ($platform == "android") {
            return [
                "message" => [
                    "token" => $registration_id,
                    "data" => $fcm_msg
                ]
            ];
        }
        if ($platform == "web") {
            $webNotification = $notification ?: [
                "title" => $fcm_msg["title"] ?? '',
                "body" => $fcm_msg["body"] ?? '',
                "image" => $fcm_msg["image"] ?? '',
            ];
            
            return [
                "message" => [
                    "token" => $registration_id,
                    "data" => $fcm_msg,
                    "notification" => $webNotification
                ]
            ];
        }
        if ($platform == "ios") {
            return [
                "message" => [
                    "token" => $registration_id,
                    "data" => $fcm_msg,
                    "notification" => [
                        "title" => $fcm_msg["title"] ?? '',
                        "body" => $fcm_msg["body"] ?? '',
                    ],
                    "apns" => [
                        "payload" => [
                            "aps" => [
                                "sound" => self::isOrderAssignOrderSound($fcm_msg)
                                    ? "order_sound.aiff"
                                    : "default"
                            ]
                        ]
                    ]
                ]
            ];
        }
        Log::error("Invalid platform specified for Firebase push notification: " . $platform);
        return null;
    }

    /**
     * Uses sound_type when set (semantic type in "type" field), else legacy type field.
     */
    private static function isOrderAssignOrderSound(array $fcm_msg): bool
    {
        $t = isset($fcm_msg['sound_type']) && $fcm_msg['sound_type'] !== ''
            ? (string) $fcm_msg['sound_type']
            : (string) ($fcm_msg['type'] ?? '');
        return $t === 'new_order' || $t === 'assign_order';
    }

    /**
     * Send one chunk of FCM requests in parallel using curl_multi.
     */
    private static function sendChunkParallel(array $chunk, $tokenModelClass = null)
    {
        $projectID = optional(Setting::where('variable', 'projectId')->first())->value;
        if (!$projectID) {
            Log::error("Firebase project ID not found in settings.");
            return;
        }

        $access_token = self::getAccessToken();
        if (!$access_token) {
            return;
        }

        $url = 'https://fcm.googleapis.com/v1/projects/' . $projectID . '/messages:send';
        $handles = [];
        $tokenByHandle = [];

        foreach ($chunk as $item) {
            $data = json_encode($item['fields']);
            $headers = [
                'Authorization: Bearer ' . $access_token,
                'Content-Type: application/json',
            ];
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            $handles[] = $ch;
            $tokenByHandle[(int) $ch] = ['token' => $item['token'], 'row' => $item['row']];
        }

        $mh = curl_multi_init();
        foreach ($handles as $ch) {
            curl_multi_add_handle($mh, $ch);
        }

        $running = null;
        do {
            curl_multi_exec($mh, $running);
            curl_multi_select($mh, 0.1);
        } while ($running > 0);

        foreach ($handles as $ch) {
            $result = curl_multi_getcontent($ch);
            $info = $tokenByHandle[(int) $ch] ?? null;
            curl_multi_remove_handle($mh, $ch);
            unset($ch);

            if ($info && $result !== false) {
                $response = json_decode($result, true);
                if (isset($response['error'])) {
                    if (self::isDeadTokenError($response['error'])) {
                        if ($tokenModelClass && method_exists($tokenModelClass, 'where')) {
                            $tokenModelClass::where('fcm_token', $info['token'])->delete();
                        }
                        Log::warning("Deleted invalid FCM token: " . $info['token']);
                    } else {
                        Log::error('FCM send failed (token kept): ' . json_encode($response['error']));
                    }
                }
            }
        }
        curl_multi_close($mh);
    }

    public static function sendPushNotification($fields)
    {
        $data1 = json_encode($fields);

        $access_token = self::getAccessToken();
        $projectID = optional(Setting::where('variable', 'projectId')->first())->value;

        if (!$projectID) {
            Log::error("Firebase project ID not found in settings.");
            return false;
        }

        $url = 'https://fcm.googleapis.com/v1/projects/' . $projectID . '/messages:send';

        $headers = [
            'Authorization: Bearer ' . $access_token,
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data1);

        // Execute post
        $result = curl_exec($ch);
        
        if ($result === false) {
            Log::error('FCM request failed: ' . curl_error($ch));
            unset($ch);
            return false;
        }

        unset($ch);

          $response = json_decode($result, true);
          if (isset($response['error']) && isset($response['error']['code'])) {
            $errorCode = $response['error']['code'];
    
            if (self::isDeadTokenError($response['error'])) {
    
                // Delete the expired token from the database
                $token = $fields['message']['token'];
                // Customers' tokens live in user_tokens; seller, admin and delivery-boy tokens in
                // admin_tokens - clean both, or a dead admin-side token is retried on every order.
                UserToken::where('fcm_token', $token)->delete();
                \App\Models\AdminToken::where('fcm_token', $token)->delete();
    
                Log::warning("Deleted expired FCM token: " . $fields['message']['token']);
            } else {
                // 400/403/401 can also mean a bad payload or wrong Firebase project/credentials -
                // the token itself is fine, so keep it and log the real reason.
                Log::error('FCM send failed (token kept): ' . json_encode($response['error']));
            }
        }
        
        return $response;
    }

    /**
     * Only a token FCM itself reports as unregistered/invalid is safe to delete. A bare
     * 400/404 is not enough - a malformed payload or wrong project returns those too and
     * would wipe every valid token.
     */
    private static function isDeadTokenError(array $error): bool
    {
        foreach ($error['details'] ?? [] as $detail) {
            if (($detail['errorCode'] ?? null) === 'UNREGISTERED') {
                return true;
            }
        }
        if (($error['status'] ?? null) === 'NOT_FOUND') {
            return true;
        }
        return ($error['status'] ?? null) === 'INVALID_ARGUMENT'
            && stripos($error['message'] ?? '', 'registration token') !== false;
    }

    private static function getAccessToken()
    {
        $filePath = base_path('config/firebase.json');

        if (!file_exists($filePath)) {
            throw new Exception('Service account file not found');
        }

        $client = new Client();
        $client->setAuthConfig($filePath);
        $client->setScopes(['https://www.googleapis.com/auth/firebase.messaging']);

        $accessToken = $client->fetchAccessTokenWithAssertion();

        return $accessToken['access_token'] ?? null;
    }
}
