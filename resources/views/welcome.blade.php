@php
    use Illuminate\Support\Facades\Crypt;

    $logo = '';
    $dark_logo = '';
    $app_name = '';
    $support_email = '';
    $support_number = '';
    $google_place_api_key = '';
    $google_map_api_key = '';
    $googleMapApiKey = '';
    $map_provider = 'google';
    $currency = '';
    $decimal_point = 2;
    $purchase_code = '';
    $logo_full_path = '';
    $panel_login_background_img_full_path = '';
    $placeholder_image_full_path = '';
    $delivery_boy_bonus_settings = 0;
    $isDemoMode = 0;

    $website_url = '';
    $copyright_details = '';

    // Firebase keys
    $apiKey = '';
    $authDomain = '';
    $projectId = '';
    $storageBucket = '';
        $messagingSenderId = '';
        $appId = '';
        $measurementId = '';
        $firebaseVapidKey = '';

    if (isInstalled()) {
        $app_name = \App\Models\Setting::get_value('app_name');
        if ($app_name == '' || $app_name == null) {
            $app_name = 'eMarket';
        }
        $support_email = \App\Models\Setting::get_value('support_email');
        if ($support_email == '' || $support_email == null) {
            $support_email = '';
        }
        $support_number = \App\Models\Setting::get_value('support_number');
        if ($support_number == '' || $support_number == null) {
            $support_number = '';
        }

        $logo = \App\Models\Setting::get_value('logo') ?? '';
        if ($logo !== '') {
            $logo_full_path = url('/') . '/storage/' . $logo;
        } else {
            $logo_full_path = asset('images/favicon.png');
        }

        $dark_logo = \App\Models\Setting::get_value('dark_logo') ?? '';

        $panel_login_background_img = \App\Models\Setting::get_value('panel_login_background_img') ?? '';
        $panel_login_background_img_full_path = '';
        if ($panel_login_background_img !== '') {
            $panel_login_background_img_full_path = url('/') . '/storage/' . $panel_login_background_img;
        } else {
            $panel_login_background_img_full_path = asset('images/panel_login_background_img.jpg');
        }

        $placeholder_image = \App\Models\Setting::get_value('placeholder_image') ?? '';
        $placeholder_image_full_path = '';
        if ($placeholder_image !== '') {
            $placeholder_image_full_path = asset('storage/' . $placeholder_image);
        } else {
            $placeholder_image_full_path = asset('images/placeholder.png');
        }

        $google_place_api_key = \App\Models\Setting::get_value('google_place_api_key') ?? '';
        $google_map_api_key = \App\Models\Setting::get_value('google_map_api_key') ?? '';
        $apiKey = \App\Models\Setting::get_value('apiKey') ?? '';
        $googleMapApiKey = \App\Models\Setting::get_value('googleMapApiKey') ?? '';
        $map_provider = \App\Models\Setting::get_value('map_provider') ?: 'google';
        $currency = \App\Models\Setting::get_value('currency') ?? "$";
        $decimal_point = (int) (\App\Models\Setting::get_value('decimal_point') ?? 2);
        $purchase_code = \App\Models\Setting::get_value('purchase_code') ?? '';
        $purchase_code = Crypt::encryptString($purchase_code);

        $website_url = \App\Models\Setting::get_value('website_url') ?? '';
$copyrightRaw = \App\Models\Setting::get_value('copyright_details') ?? '';

$copyrightArr = json_decode($copyrightRaw, true);

$currentLang = app()->getLocale();

$copyright_details =
    is_array($copyrightArr)
        ? ($copyrightArr[$currentLang] ?? $copyrightArr['en'] ?? '')
        : $copyrightRaw;


        $delivery_boy_bonus_settings = \App\Models\Setting::get_value('delivery_boy_bonus_settings') ?? 0;

        // Firebase keys
        $authDomain = \App\Models\Setting::get_value('authDomain') ?? '';
        $projectId = \App\Models\Setting::get_value('projectId') ?? '';
        $storageBucket = \App\Models\Setting::get_value('storageBucket') ?? '';
        $messagingSenderId = \App\Models\Setting::get_value('messagingSenderId') ?? '';
        $appId = \App\Models\Setting::get_value('appId') ?? '';
        $measurementId = \App\Models\Setting::get_value('measurementId') ?? '';
        $firebaseVapidKey = \App\Models\Setting::get_value('firebase_vapid_key') ?? '';
        $isDemoMode = isDemoMode() ?? 0;
    }
@endphp

<!DOCTYPE html>
<html class="{{ app()->isLocale('ar') ? 'rtl' : '' }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    @php
    $appNameArr = json_decode($app_name ?? '', true);
    $currentLang = app()->getLocale();
    $appTitle =
        is_array($appNameArr)
            ? ($appNameArr[$currentLang] ?? $appNameArr['en'] ?? 'eMarket')
            : ($app_name ?: 'eMarket');
@endphp


    {{-- <title>{{ $app_name ?? 'eMarket' }}</title> --}}
    <title>{{ $appTitle }}</title>

    <link rel="shortcut icon" href="{{ $logo_full_path }}">
    <link rel="manifest" href="{{ asset('manifest.json') }}">
    <meta name="theme-color" content="#FF9900">
    <link rel="apple-touch-icon" href="{{ asset('images/pwa-192.png') }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.css') }}">
    @if (app()->isLocale('ar'))
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.rtl.css') }}">
    @else
    {{-- The server locale can lag behind the language picked in the header (the session write from
         /api/change_language can be overwritten by a request that was still in flight, and pages without the
         header only know the remembered choice). The body script below then still turns on .rtl from
         localStorage, so load the RTL Bootstrap build too - otherwise .text-start/.me-*/.float-* stay LTR. --}}
    <script>(function () { try { if (localStorage.getItem('is_rtl') === '1') document.write('<link rel="stylesheet" href="{{ asset('assets/css/bootstrap.rtl.css') }}">'); } catch (e) {} })();</script>
    @endif
    <link rel="stylesheet" href="{{ asset('assets/js/tinymce/content.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/js/tinymce/skin.min.css') }}">

    <link rel="stylesheet" href="{{ asset('assets/vendors/iconly/bold.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendors/perfect-scrollbar/perfect-scrollbar.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendors/bootstrap-icons/bootstrap-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}?v={{ filemtime(public_path('assets/css/style.css')) }}">
    <link rel="stylesheet" href="{{ asset('assets/css/boostrap_vue.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/pages/form-element-select.css') }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <!-- Auth -->
    <link rel="stylesheet" href="{{ asset('assets/css/pages/auth.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/pages/error.css') }}">
    <!-- Styles -->

    <link rel="stylesheet" href="{{ asset('assets/css/custom/common.css') }}?v={{ filemtime(public_path('assets/css/custom/common.css')) }}">
    <link rel="stylesheet" href="{{ asset('assets/dark-mode/app-dark.css') }}?v={{ filemtime(public_path('assets/dark-mode/app-dark.css')) }}">

    @if (isDemoMode())
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CZZ7MV8RBB"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'G-CZZ7MV8RBB');
        </script>
    @endif

</head>

<body>
    {{-- Sync body.rtl with html.rtl on first paint so sidebar/layout don't flicker (right→left→right) when switching to RTL --}}
    <script>(function () {
        // RTL comes from the server locale; pages without the header also use the choice the header remembered.
        var rtl = document.documentElement.classList.contains('rtl');
        try { if (!rtl && localStorage.getItem('is_rtl') === '1') { rtl = true; document.documentElement.classList.add('rtl'); } } catch (e) {}
        document.body.classList.toggle('rtl', rtl);
    })();</script>
    {{-- Apply the saved light/dark theme on first paint too, so pages without the header (login, error pages) follow it --}}
    <script>(function () { try { var t = sessionStorage.getItem('user-theme'); if (t !== 'theme-dark' && t !== 'theme-light') t = ((!/^\/install(\/|$)/.test(location.pathname) && window.matchMedia &&window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'theme-dark' : 'theme-light'); document.body.classList.remove('theme-light', 'theme-dark'); document.body.classList.add(t); } catch (e) {} })();</script>
    <div id="app">
        <router-view></router-view>
    </div>

    <!--You can comment this or remove these 3 lines so popup update will stop-->
    @if (auth()->user() && auth()->user()->role_id == 1)
        @include('vendor.laraupdater.notification')
    @endif

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/mazer.js') }}"></script>
    <script src="{{ asset('assets/js/extensions/form-element-select.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/tinymce.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/theme.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/model.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/icons.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/anchor/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/autolink/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/charmap/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/codesample/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/image/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/link/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/lists/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/media/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/searchreplace/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/table/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/visualblocks/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/wordcount/plugin.min.js') }}"></script>
    <script src="{{ asset('assets/js/tinymce/code/plugin.min.js') }}"></script>

    <script>
        window.baseUrl = '{{ url('/') }}';
        window.appName = "{{ $app_name }}";

        window.supportEmail = "{{ $support_email }}";
        window.supportNumber = "{{ $support_number }}";
        window.MapApiKey = "{{ $google_place_api_key }}";
        window.GoogleMapApiKey = "{{ $googleMapApiKey }}";
        window.mapProvider = "{{ $map_provider }}";
        window.appLogo = "{{ $logo }}";
        window.appDarkLogo = "{{ $dark_logo }}";
        window.placeholderImage = "{{ $placeholder_image_full_path }}";
        window.panelLoginBackgroundImg = "{{ $panel_login_background_img_full_path ?? '' }}";
        window.currency = "{{ $currency }}";
        window.decimalPoint = {{ $decimal_point }};
        window.isInstalled = "{{ isInstalled() }}";
        window.purchase_code = "{{ $purchase_code }}";

        window.websiteUrl = "{{ $website_url }}";
        // window.copyrightDetails = "{!! $copyright_details !!}";
     window.copyrightDetails =
        @json($copyright_details);

        window.deliveryBoyBonusSettings = "{{ $delivery_boy_bonus_settings }}";
        window.isDemo = "{{ $isDemoMode }}";
        window.currentVersion = "{{ currentVersion() }}";

        @auth
        /* Login*/
        window.UserPermissions = {!! json_encode(Auth::user()->allPermissions, true) !!};
        window.Role = "{!! Auth::user()->role->name !!}";
        @else
            /* Not Login*/
            window.UserPermissions = [];
            window.Role = '';
        @endauth
    </script>
    @php
        $lang = app()->getLocale();
        $langFilePath = resource_path('lang/' . $lang . '.json');
        if (!file_exists($langFilePath)) {
            // The active language's json can go missing (e.g. deleted from Manage Languages
            // while still someone's active session locale) - fall back to English rather than
            // hard-crashing the whole admin panel on file_get_contents().
            $lang = 'en';
            $langFilePath = resource_path('lang/en.json');
        }
        session(['app_locale' => $lang]);
        $file = file_get_contents($langFilePath);
    @endphp

    <script>
        window.appLocale = "{{ $lang }}";
        let lang = JSON.stringify(<?php echo $file; ?>);
        localStorage.setItem('language', lang);
    </script>

    <script src="{{ mix('js/app.js') }}"></script>

    @if (isInstalled())
    @endif
    <!--Web Push-->
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase.js"></script>

    <script>
        @if (
                $apiKey != '' &&
                $authDomain != '' &&
                $authDomain != '' &&
                $projectId != '' &&
                $storageBucket != '' &&
                $messagingSenderId != '' &&
                $appId != '' &&
                $measurementId != '')

            var firebaseConfig = {
                apiKey: "{{ $apiKey }}",
                authDomain: "{{ $authDomain }}",
                projectId: "{{ $projectId }}",
                storageBucket: "{{ $storageBucket }}",
                messagingSenderId: "{{ $messagingSenderId }}",
                appId: "{{ $appId }}",
                measurementId: "{{ $measurementId }}"
            };

            var firebaseCheck = firebase.initializeApp(firebaseConfig);

            // So login form can send fcm_token with login request; set when getToken() resolves.
            window.panelFcmToken = '';

            if ('Notification' in window) {

                if (firebase.messaging.isSupported()) {
                    const messaging = firebase.messaging();
                    startFCM();

                    function startFCM() {
                        messaging
                            .requestPermission()
                            .then(function() {
                                return messaging.getToken()
                            })
                            .then(function(response) {
                                $.ajaxSetup({
                                    headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                    }
                                });
                                $.ajax({
                                    url: '{{ route('fcmToken') }}',
                                    type: 'POST',
                                    data: {
                                        token: response
                                    },
                                    dataType: 'JSON',
                                    success: function(response) {

                                    },
                                    error: function(error) {

                                    },
                                });
                            }).catch(function(error) {

                            });
                    }

                    messaging.onMessage(function(payload) {
                        console.log(payload);
                        if (payload.data.type == 'new_order') {
                            var url = "{{ asset('assets/order_sound.wav') }}";
                            var audio = new Audio(url);
                            audio.play();
                            toastr.options = {
                                "onclick": function() {
                                    window.open(payload.data.click_action, '_blank');
                                },
                                "showDuration": "60000",
                                "hideDuration": "20000",
                                "timeOut": "60000",
                                "extendedTimeOut": "10000",
                                "closeButton": true,
                            };
                            toastr.info(payload.data.message, payload.data.title);
                        }

                        const notification = payload.data;
                        //prevent notification on other tabs
                        if (document.hidden) {
                            return false;
                        }

                        const title = notification.title;
                        const options = {
                            body: notification.body,
                            icon: notification.icon,
                        };

                        new Notification(title, options);
                    });
                }
            }
        @endif
    </script>

</body>

</html>
