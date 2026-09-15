/**
 * WhatsApp Helper for Perpustakaan Sunaryaman Musthofa SMAN 1 Bukittinggi
 */

export function cleanPhoneNumber(phone?: string | null): string {
    if (!phone) return '';
    let cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('8')) {
        cleaned = '62' + cleaned;
    }
    return cleaned;
}

export function buildWhatsAppLink(phone: string, message: string): string {
    const formattedPhone = cleanPhoneNumber(phone);
    const encoded = encodeURIComponent(message.trim());
    return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encoded}`;
}

export function createDueDateReminderMessage(params: {
    studentName: string;
    className?: string | null;
    bookTitle: string;
    dueDate: string;
}): string {
    const studentInfo = params.className ? `${params.studentName} (${params.className})` : params.studentName;
    return `Halo *${studentInfo}*,

Salam literasi dari *Perpustakaan Sunaryaman Musthofa SMAN 1 Bukittinggi* 📚.

Kami ingin mengingatkan bahwa masa peminjaman buku:
📖 *"${params.bookTitle}"*
akan jatuh tempo pada *${params.dueDate}*.

Mohon untuk mengembalikan buku tepat waktu atau melakukan perpanjangan di meja sirkulasi perpustakaan. Terima kasih atas kerja samanya! ✨`;
}

export function createOverdueMessage(params: {
    studentName: string;
    className?: string | null;
    bookTitle: string;
    dueDate: string;
}): string {
    const studentInfo = params.className ? `${params.studentName} (${params.className})` : params.studentName;
    return `Halo *${studentInfo}*,

*Pemberitahuan Keterlambatan Buku* - Perpustakaan SMAN 1 Bukittinggi ⚠️.

Buku yang Anda pinjam:
📖 *"${params.bookTitle}"*
telah melewati batas tanggal pengembalian (*${params.dueDate}*).

Mohon segera mengembalikan buku tersebut ke meja sirkulasi perpustakaan agar dapat dimanfaatkan oleh warga sekolah lainnya. Terima kasih! 🙏`;
}

export function createNewBookBroadcastMessage(params: {
    bookTitle: string;
    category?: string | null;
    synopsis?: string | null;
    url?: string;
}): string {
    const siteUrl = params.url || 'https://perpus-smansa.sch.id/catalog';
    return `Halo Sobat Literasi SMANSA! 🌟

Koleksi buku baru telah hadir di *Perpustakaan Sunaryaman Musthofa SMAN 1 Bukittinggi*:

📚 *${params.bookTitle}*
🏷️ Kategori: ${params.category || 'Umum'}

Yuk jadi yang pertama membaca dan reservasi secara online:
🔗 ${siteUrl}

Selamat membaca dan salam literasi! 📖`;
}
