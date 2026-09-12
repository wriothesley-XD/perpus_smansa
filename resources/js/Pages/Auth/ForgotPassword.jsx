import { Head, useForm } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi — Perpustakaan SMAN 1 Bukittinggi" />

            <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                    Lupa kata sandi?
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Masukkan email yang terdaftar. Kami akan mengirimkan tautan untuk mengatur ulang kata sandimu.
                </p>
            </div>

            {status && (
                <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-5">
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
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/20"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="flex w-full items-center justify-center rounded-xl bg-[#123B5D] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0C2D47] disabled:opacity-60"
                >
                    {processing ? 'Mengirim...' : 'Kirim Tautan Reset'}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Ingat kata sandinya?{' '}
                <Link href={route('login')} className="font-semibold text-[#123B5D] dark:text-blue-400 hover:underline">
                    Masuk sekarang
                </Link>
            </p>
        </GuestLayout>
    );
}
