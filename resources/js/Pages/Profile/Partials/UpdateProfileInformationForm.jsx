import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
            identifier_number: user.identifier_number || '',
            phone_number: user.phone_number || '',
            class_name: user.class_name || '',
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">
                    Informasi Profil & Data Diri
                </h2>

                <p className="mt-1 text-xs text-gray-600 dark:text-slate-400">
                    Perbarui nama, email, nomor identitas sekolah (NIS/NIP), dan nomor WhatsApp aktif untuk notifikasi peminjaman buku.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="email" value="Alamat Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone_number" value="Nomor WhatsApp (Aktif)" />

                        <TextInput
                            id="phone_number"
                            type="text"
                            className="mt-1 block w-full"
                            placeholder="Contoh: 081234567890"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.phone_number} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="identifier_number" value="Nomor Induk Siswa (NIS/NISN) / NIP" />

                        <TextInput
                            id="identifier_number"
                            type="text"
                            className="mt-1 block w-full font-mono"
                            placeholder="Contoh: 23101 atau NISN"
                            value={data.identifier_number}
                            onChange={(e) => setData('identifier_number', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.identifier_number} />
                    </div>

                    <div>
                        <InputLabel htmlFor="class_name" value="Kelas / Unit Kerja" />

                        <TextInput
                            id="class_name"
                            type="text"
                            className="mt-1 block w-full"
                            placeholder="Contoh: XI MIPA 1 atau Dewan Guru"
                            value={data.class_name}
                            onChange={(e) => setData('class_name', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.class_name} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-slate-300">
                            Email Anda belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 dark:text-slate-400 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton disabled={processing} className="bg-[#152238] hover:bg-[#0f172a] dark:bg-[#2699fb] dark:hover:bg-[#1a83e0]">
                        Simpan Perubahan
                    </PrimaryButton>

                    {recentlySuccessful && (
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            Data berhasil disimpan.
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
