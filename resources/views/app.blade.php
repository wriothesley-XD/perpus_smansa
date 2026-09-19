<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#0B3866">
        <link rel="manifest" href="/manifest.json">

        <title inertia>{{ config('app.name') === 'Laravel' ? 'Perpustakaan SMAN 1 Bukittinggi' : config('app.name', 'Perpustakaan SMAN 1 Bukittinggi') }}</title>

        <!-- Typography: Inter, Plus Jakarta Sans, JetBrains Mono -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="min-h-full bg-white text-[#152238] font-sans antialiased selection:bg-[#2699fb] selection:text-white">
        @inertia
    </body>
</html>
