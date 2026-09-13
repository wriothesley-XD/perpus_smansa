import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });
    const [showPass, setShowPass] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Atur Ulang Kata Sandi — Perpustakaan SMAN 1 Bukittinggi" />

            <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                    Buat kata sandi baru
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Pastikan kata sandi barumu cukup kuat dan mudah kamu ingat.
                </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1.5">Email</label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"><Mail size={16} /></span>
                        <input id="email" type="email" name="email" value={data.email} autoComplete="username" readOnly
                            onChange={(e) => setData('email', e.target.value)}
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-slate-500 outline-none" />
                    </div>
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1.5">Kata Sandi Baru</label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"><Lock size={16} /></span>
                        <input id="password" type={showPass ? 'text' : 'password'} name="password" value={data.password}
                            autoComplete="new-password" autoFocus onChange={(e) => setData('password', e.target.value)}
                            placeholder="Minimal 8 karakter"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-11 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/20" />
                        <button type="button" onClick={() => setShowPass(v => !v)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600">
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1.5">Konfirmasi Kata Sandi</label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"><Lock size={16} /></span>
                        <input id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation}
                            autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Ketik ulang kata sandi baru"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/20" />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <button type="submit" disabled={processing}
                    className="flex w-full items-center justify-center rounded-xl bg-[#123B5D] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0C2D47] disabled:opacity-60">
                    {processing ? 'Menyimpan...' : 'Simpan Kata Sandi Baru'}
                </button>
            </form>
        </GuestLayout>
    );
}
