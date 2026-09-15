import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Shield, User, ArrowLeft, KeyRound, AlertTriangle } from 'lucide-react';
import React from 'react';
import { SiteShell } from '@/Components/Common/SiteShell';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isAdminOrLibrarian = user && ['admin', 'librarian', 'teacher'].includes(user.role);

    return (
        <SiteShell>
            <Head title="Pengaturan Profil — Perpustakaan SMAN 1 Bukittinggi" />

            {/* Header Profil */}
            <div className="border-b border-gray-200 bg-white py-8 dark:border-slate-800 dark:bg-[#0c121e]">
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <Link href="/" className="hover:text-[#2699fb]">Beranda</Link>
                                <span>/</span>
                                <span>Pengaturan Profil</span>
                            </div>
                            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-black text-[#152238] dark:text-white">
                                Pengaturan Profil & Keamanan
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Kelola identitas, nomor WhatsApp sirkulasi, dan kata sandi akun Anda.
                            </p>
                        </div>

                        {/* Navigation Shortcut Buttons */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
                            >
                                <BookOpen size={14} className="text-[#2699fb]" />
                                <span>Ruang Saya (Dashboard)</span>
                            </Link>

                            {isAdminOrLibrarian && (
                                <Link
                                    href="/admin-panel"
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#152238] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0f172a] dark:bg-[#2699fb] dark:hover:bg-[#1a83e0] transition"
                                >
                                    <Shield size={14} />
                                    <span>Admin Panel</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Forms */}
            <div className="bg-gray-50/60 py-10 dark:bg-[#090d16]">
                <div className="mx-auto max-w-5xl px-5 sm:px-8 space-y-6">
                    {/* Card 1: Data Diri */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>

                    {/* Card 2: Password */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </div>

                    {/* Card 3: Danger Zone (Delete) */}
                    <div className="rounded-2xl border border-rose-100 bg-rose-50/30 p-6 sm:p-8 shadow-xs dark:border-rose-950/50 dark:bg-rose-950/20">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
