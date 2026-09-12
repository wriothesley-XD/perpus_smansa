import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-slate-900">
            {/* Left panel - decorative */}
            <div className="hidden flex-col justify-between bg-[#0B4EA2] p-12 lg:flex lg:w-5/12 xl:w-4/12">
                <Link href="/" className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-white/15 text-white">
                        <BookOpen size={20} />
                    </span>
                    <div className="leading-tight">
                        <span className="block font-display text-base font-bold text-white">Perpustakaan</span>
                        <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
                            SMAN 1 Bukittinggi
                        </span>
                    </div>
                </Link>

                <div>
                    <div className="mb-8 size-12 rounded-2xl bg-white/10 grid place-items-center text-2xl">
                        📚
                    </div>
                    <blockquote className="font-display text-2xl font-bold leading-snug text-white">
                        "Satu buku yang kamu baca hari ini bisa mengubah cara pandangmu esok."
                    </blockquote>
                    <p className="mt-4 text-sm text-white/60">— Perpustakaan SMAN 1 Bukittinggi</p>
                </div>

                <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="h-1 flex-1 rounded-full" style={{ backgroundColor: i === 1 ? '#FACC15' : 'rgba(255,255,255,0.2)' }} />
                    ))}
                </div>
            </div>

            {/* Right panel - form */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
                <div className="mx-auto w-full max-w-md">
                    {/* Mobile logo */}
                    <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
                        <span className="grid size-9 place-items-center rounded-xl bg-[#0B4EA2] text-white">
                            <BookOpen size={18} />
                        </span>
                        <span className="font-display text-base font-bold text-[#0F172A] dark:text-white">
                            Perpustakaan SMAN 1 Bukittinggi
                        </span>
                    </Link>
                    {children}
                </div>
            </div>
        </div>
    );
}
