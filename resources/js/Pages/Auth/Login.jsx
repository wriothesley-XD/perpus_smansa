import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPass, setShowPass] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Masuk — Perpustakaan SMAN 1 Bukittinggi" />

            <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                    Selamat datang kembali
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Masuk untuk mengakses riwayat peminjaman dan reservasi bukumu.
                </p>
            </div>

            {status && (
                <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1.5">
                        Alamat Email
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Mail size={16} />
                        </span>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#0B4EA2] focus:ring-2 focus:ring-[#0B4EA2]/20"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="password" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200">
                            Kata Sandi
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-xs font-semibold text-[#0B4EA2] dark:text-blue-400 hover:underline">
                                Lupa kata sandi?
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Lock size={16} />
                        </span>
                        <input
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-11 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#0B4EA2] focus:ring-2 focus:ring-[#0B4EA2]/20"
                        />
                        <button type="button" onClick={() => setShowPass(v => !v)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600">
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Remember */}
                <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="size-4 rounded border-slate-300 text-[#0B4EA2] focus:ring-[#0B4EA2]"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Ingat saya di perangkat ini</span>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#0B4EA2] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#083c7d] disabled:opacity-60"
                >
                    {processing ? 'Memproses...' : 'Masuk ke Akun'}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Belum punya akun?{' '}
                <Link href={route('register')} className="font-semibold text-[#0B4EA2] dark:text-blue-400 hover:underline">
                    Daftar sekarang
                </Link>
            </p>
        </GuestLayout>
    );
}
