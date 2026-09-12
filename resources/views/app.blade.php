<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0B3866">
        <link rel="manifest" href="/manifest.json">

        <title inertia>{{ config('app.name') === 'Laravel' ? 'Perpustakaan SMAN 1 Bukittinggi' : config('app.name', 'Perpustakaan SMAN 1 Bukittinggi') }}</title>

        <!-- Typography: Inter, Lora (serif display), JetBrains Mono, Caveat -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;600;700&family=Lora:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="min-h-full bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#0B3866] selection:text-white">
        @inertia
    </body>
</html>
