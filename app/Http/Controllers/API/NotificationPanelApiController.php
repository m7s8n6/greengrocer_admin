<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\PanelNotification;
use Illuminate\Http\Request;
class NotificationPanelApiController extends Controller
{
    public function getNotifications(Request $request)
{
    $limit = $request->input('per_page');
    $page = $request->input('page', 1);
    $offset = ($page - 1) * $limit;

    // Newest first. The id is a UUID, so ordering by it is effectively random - use the time.
    $notifications = PanelNotification::orderBy('created_at', 'DESC')->orderBy('id', 'DESC');

    // Each user sees their own notifications, the same list the header bell shows. (Every order
    // creates one notification per admin / seller / delivery boy, so listing everyone's showed
    // the same order several times and let a seller read other sellers' notifications.)
    $notifications->where('notifiable_type', \App\Models\Admin::class)
                  ->where('notifiable_id', auth()->user()->id);

    // Search runs on the server so it covers every page, not just the 10 rows on screen.
    $search = trim((string) $request->input('search', ''));
    if ($search !== '') {
        $notifications->where('data', 'like', '%' . str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $search) . '%');
    }

    $total = $notifications->count();

    if ($limit) {
        $notifications = $notifications->limit($limit)->offset($offset);
    }

    $notifications = $notifications->get();

    return CommonHelper::responseWithData($notifications, $total);
}

}
