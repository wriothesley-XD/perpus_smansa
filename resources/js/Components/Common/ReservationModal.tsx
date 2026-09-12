import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, ShieldCheck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Book } from '../../types/library';

interface ReservationModalProps {
    book: Book;
    isOpen: boolean;
    onClose: () => void;
}

export function ReservationModal({ book, isOpen, onClose }: ReservationModalProps) {
    const page = usePage();
    const authUser = page.props.auth?.user;
    const flash = page.props.flash as { success?: string; reservation_code?: string };
    const isAvailable = (book.available_copies_count ?? 0) > 0;

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        book_id: book.id,
        name: authUser?.name || '',
        nis: authUser?.identifier_number || '',
        class_name: authUser?.class_name || '',
        phone_number: authUser?.phone_number || '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            if (authUser) {
                setData({
                    book_id: book.id,
                    name: authUser.name || '',
                    nis: authUser.identifier_number || '',
                    class_name: authUser.class_name || '',
                    phone_number: authUser.phone_number || '',
                });
            }
        }
    }, [isOpen, authUser, book.id]);

    useEffect(() => {
        if (wasSuccessful || flash?.success) {
            setIsSubmitted(true);
        }
    }, [wasSuccessful, flash]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reservations', {
            preserveScroll: true,
            onSuccess: () => {
                setIsSubmitted(true);
            },
        });
    };

    const handleClose = () => {
        reset();
        setIsSubmitted(false);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm transition-all sm:items-center sm:p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-full max-w-lg rounded-t-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all sm:rounded-3xl sm:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                            <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.16em] text-[#123B5D]">
                                {isAvailable ? 'Reservasi Koleksi' : 'Daftar Tunggu'}
                        </span>
                        <h2 className="mt-1 font-display text-xl font-bold text-[#0F172A]">
                            {book.title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-[#0F172A] transition-colors"
                        aria-label="Tutup form"
                    >
                        <X size={18} />
                    </button>
                </div>

                {isSubmitted ? (
                    <div className="py-8 text-center">
                            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <CheckCircle2 size={32} />
                        </div>
                            <h3 className="mt-5 font-display text-2xl font-bold text-[#0F172A]">
                                {isAvailable ? 'Reservasi Berhasil Diajukan!' : 'Kamu masuk daftar tunggu!'}
                        </h3>
                        <p className="mx-auto mt-2.5 max-w-sm text-sm leading-relaxed text-[#64748B]">
                            {flash?.success ||
                                'Permintaan reservasi Anda telah tercatat. Silakan tunjukkan kartu identitas/NIS ke pustakawan saat pengambilan buku.'}
                        </p>
                        <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-xs text-emerald-800 text-left">
                            {flash?.reservation_code && <><strong className="block uppercase tracking-wider text-[10px]">Kode pengambilan / antrean</strong><span className="mt-2 block font-mono text-xl font-bold tracking-[0.18em]">{flash.reservation_code}</span></>}
                            <strong className="mt-3 block">{isAvailable ? 'Masa berlaku reservasi:' : 'Status:'}</strong> {isAvailable ? '2 hari kerja sejak pengajuan. Buku akan otomatis kembali tersedia untuk umum bila tidak diambil.' : 'Kami akan mengingatkan saat eksemplar tersedia.'}
                        </div>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="mt-6 w-full rounded-xl bg-[#123B5D] py-3 text-sm font-bold text-white shadow-md hover:bg-[#0C2D47] transition-all"
                        >
                            Selesai
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {((errors as Record<string, string>).reservation) && (
                            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                                {((errors as Record<string, string>).reservation)}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama sesuai kartu identitas"
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#123B5D] focus:bg-white focus:ring-2 focus:ring-[#123B5D]/15"
                            />
                            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    NIS / NIP
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.nis}
                                    onChange={(e) => setData('nis', e.target.value)}
                                    placeholder="Contoh: 23101"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#123B5D] focus:bg-white focus:ring-2 focus:ring-[#123B5D]/15"
                                />
                                {errors.nis && <p className="mt-1 text-xs text-rose-600">{errors.nis}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Kelas / Unit
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.class_name}
                                    onChange={(e) => setData('class_name', e.target.value)}
                                    placeholder="Contoh: XI MIPA 1"
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#123B5D] focus:bg-white focus:ring-2 focus:ring-[#123B5D]/15"
                                />
                                {errors.class_name && (
                                    <p className="mt-1 text-xs text-rose-600">{errors.class_name}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Nomor WhatsApp / HP (Opsional)
                            </label>
                            <input
                                type="tel"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                placeholder="Untuk notifikasi konfirmasi status buku"
                                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#123B5D] focus:bg-white focus:ring-2 focus:ring-[#123B5D]/15"
                            />
                            {errors.phone_number && (
                                <p className="mt-1 text-xs text-rose-600">{errors.phone_number}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500">
                            <ShieldCheck size={14} className="text-[#123B5D] shrink-0" />
                            <span>Data disimpan secara aman sesuai ketentuan sirkulasi SMAN 1 Bukittinggi.</span>
                        </div>

                        <div className="mt-5 flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 rounded-xl bg-[#123B5D] py-3 text-sm font-bold text-white shadow-md hover:bg-[#0C2D47] transition-all disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : isAvailable ? 'Konfirmasi Reservasi' : 'Daftar & Ingatkan Saya'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
