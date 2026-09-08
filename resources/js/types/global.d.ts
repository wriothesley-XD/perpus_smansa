import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    let route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                role: 'student' | 'teacher' | 'librarian' | 'admin';
                identifier_number?: string;
                class_name?: string;
                phone_number?: string;
            } | null;
        };
        flash?: {
            message?: string;
            error?: string;
            success?: string;
        };
        [key: string]: unknown;
    }
}
