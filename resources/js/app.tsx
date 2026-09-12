import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const configuredAppName = import.meta.env.VITE_APP_NAME;
const appName = !configuredAppName || configuredAppName === 'Laravel' ? 'Perpustakaan SMAN 1 Bukittinggi' : configuredAppName;

createInertiaApp({
    title: (title) => (title ? `${title}  ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.${name.startsWith('Auth/') || name.startsWith('Profile/') ? 'jsx' : 'tsx'}`,
            {
                ...import.meta.glob('./Pages/**/*.tsx'),
                ...import.meta.glob('./Pages/**/*.jsx'),
            },
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#123B5D',
    },
});
