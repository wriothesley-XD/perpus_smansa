<?php

namespace App\Console\Commands;

use App\Models\Loan;
use Illuminate\Console\Command;

class CheckOverdueLoans extends Command
{
    protected $signature = 'loans:check-overdue';
    protected $description = 'Periksa dan perbarui status peminjaman buku yang telah melewati jatuh tempo menjadi overdue.';

    public function handle(): int
    {
        $count = Loan::where('status', 'active')
            ->where('due_at', '<', now())
            ->update(['status' => 'overdue']);

        $this->info("Pemeriksaan selesai. Sebanyak {$count} peminjaman diperbarui menjadi 'overdue'.");

        return Command::SUCCESS;
    }
}
