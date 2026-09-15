import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        identifier_number: '',
        class_name: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });
    const [showPass, setShowPass] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun — Perpustakaan SMAN 1 Bukittinggi" />

            <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                    Buat akun anggota
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Daftar untuk mengakses katalog digital, peminjaman e-book, dan reservasi buku fisik.
                </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1">
                        Nama Lengkap
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <User size={16} />
                        </span>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Nama lengkap siswa / guru"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#2699fb] focus:ring-2 focus:ring-[#2699fb]/20"
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1" />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1">
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
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="nama@email.com"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#2699fb] focus:ring-2 focus:ring-[#2699fb]/20"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Bagian Khusus Warga SMANSA: NIS/NISN & WhatsApp */}
                <div className="rounded-2xl border border-blue-100 bg-[#f0f7ff]/60 p-4 dark:border-blue-900/40 dark:bg-slate-800/80">
                    <p className="text-xs font-bold text-[#2699fb] uppercase tracking-wider mb-2.5">
                        Khusus Siswa SMAN 1 Bukittinggi (Opsional)
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {/* NIS / NISN */}
                        <div>
                            <label htmlFor="identifier_number" className="block text-xs font-semibold text-[#152238] dark:text-slate-200 mb-1">
                                NIS / NISN
                            </label>
                            <input
                                id="identifier_number"
                                type="text"
                                name="identifier_number"
                                value={data.identifier_number}
                                onChange={(e) => setData('identifier_number', e.target.value)}
                                placeholder="Contoh: 20240101"
                                className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-xs text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#2699fb]"
                            />
                            <p className="mt-1 text-[10px] text-slate-500">Bisa digunakan untuk login tanpa email</p>
                            <InputError message={errors.identifier_number} className="mt-1" />
                        </div>

                        {/* Kelas */}
                        <div>
                            <label htmlFor="class_name" className="block text-xs font-semibold text-[#152238] dark:text-slate-200 mb-1">
                                Kelas
                            </label>
                            <input
                                id="class_name"
                                type="text"
                                name="class_name"
                                value={data.class_name}
                                onChange={(e) => setData('class_name', e.target.value)}
                                placeholder="Contoh: X-E1 / XI-F2"
                                className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-xs text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#2699fb]"
                            />
                            <p className="mt-1 text-[10px] text-slate-500">Kelas aktif tahun ajaran berjalan</p>
                            <InputError message={errors.class_name} className="mt-1" />
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="mt-3">
                        <label htmlFor="phone_number" className="block text-xs font-semibold text-[#152238] dark:text-slate-200 mb-1">
                            Nomor WhatsApp Aktif
                        </label>
                        <input
                            id="phone_number"
                            type="tel"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            placeholder="Contoh: 081234567890"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-xs text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#2699fb]"
                        />
                        <p className="mt-1 text-[10px] text-slate-500">
                            Untuk pengingat masa pengembalian buku dan info koleksi baru
                        </p>
                        <InputError message={errors.phone_number} className="mt-1" />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1.5">
                        Kata Sandi
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Lock size={16} />
                        </span>
                        <input
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Minimal 8 karakter"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-11 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#152238] focus:ring-2 focus:ring-[#152238]/20"
                        />
                        <button type="button" onClick={() => setShowPass(v => !v)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600">
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-semibold text-[#0F172A] dark:text-slate-200 mb-1.5">
                        Konfirmasi Kata Sandi
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Lock size={16} />
                        </span>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            placeholder="Ketik ulang kata sandi"
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-10 pr-4 text-sm text-[#0F172A] dark:text-slate-100 placeholder-slate-400 outline-none transition focus:border-[#152238] focus:ring-2 focus:ring-[#152238]/20"
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#152238] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0f172a] disabled:opacity-60"
                >
                    {processing ? 'Mendaftarkan...' : 'Buat Akun'}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Sudah punya akun?{' '}
                <Link href={route('login')} className="font-semibold text-[#152238] dark:text-blue-400 hover:underline">
                    Masuk di sini
                </Link>
            </p>
        </GuestLayout>
    );
}
