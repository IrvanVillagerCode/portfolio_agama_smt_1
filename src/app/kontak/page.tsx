import { kirimPesan } from "@/lib/actions";

export const metadata = { title: "Kontak | Portofolio Pendidikan Agama" };

const pesanStatus: Record<string, { teks: string; warna: string }> = {
  ok: {
    teks: "Pesan Anda telah berhasil terkirim. Terima kasih atas masukan dan tanggapannya!",
    warna: "bg-emerald-50/80 text-emerald-800 border-emerald-300",
  },
  kosong: {
    teks: "Semua kolom wajib diisi. Mohon lengkapi formulir sebelum mengirim.",
    warna: "bg-amber-50/80 text-amber-800 border-amber-300",
  },
  gagal: {
    teks: "Pesan gagal dikirim ke server. Silakan periksa koneksi dan coba lagi.",
    warna: "bg-rose-50/80 text-rose-800 border-rose-300",
  },
};

export default async function KontakPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const statusInfo = status ? pesanStatus[status] : undefined;

  return (
    <div className="mx-auto max-w-xl px-5 py-14 animate-fadeIn">
      <h1 className="font-serif text-4xl font-bold text-ink">Kontak & Saran</h1>
      <p className="mt-3 text-ink/75 leading-relaxed">
        Terima kasih kepada dosen pengampu, rekan mahasiswa, dan seluruh pihak yang memberikan arahan serta bimbingan selama perkuliahan Pendidikan Agama.
      </p>

      {statusInfo && (
        <div
          role="status"
          className={`mt-6 rounded-2xl border p-4 text-sm font-semibold backdrop-blur-md ${statusInfo.warna}`}
        >
          {statusInfo.teks}
        </div>
      )}

      <form action={kirimPesan} className="liquid-glass mt-8 space-y-5 rounded-3xl p-6 sm:p-8 shadow-md">
        <div>
          <label htmlFor="nama" className="block text-xs font-semibold uppercase tracking-wider text-ink/80">
            Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <input
            id="nama"
            name="nama"
            required
            maxLength={100}
            placeholder="Masukkan nama Anda"
            className="mt-1.5 w-full rounded-xl border border-white/80 bg-white/60 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all focus:border-moss focus:bg-white focus:outline-none focus:ring-2 focus:ring-moss/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-ink/80">
            Alamat Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={150}
            placeholder="contoh@kampus.ac.id"
            className="mt-1.5 w-full rounded-xl border border-white/80 bg-white/60 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all focus:border-moss focus:bg-white focus:outline-none focus:ring-2 focus:ring-moss/20"
          />
        </div>

        <div>
          <label htmlFor="isi" className="block text-xs font-semibold uppercase tracking-wider text-ink/80">
            Pesan / Masukan <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="isi"
            name="isi"
            required
            rows={5}
            maxLength={2000}
            placeholder="Tuliskan pesan, saran, atau kesan Anda di sini..."
            className="mt-1.5 w-full rounded-xl border border-white/80 bg-white/60 px-4 py-2.5 text-sm text-ink backdrop-blur-md transition-all focus:border-moss focus:bg-white focus:outline-none focus:ring-2 focus:ring-moss/20"
          />
        </div>

        <button
          type="submit"
          className="liquid-glass-btn w-full rounded-xl py-3 text-sm font-semibold text-paper"
        >
          Kirim Pesan
        </button>
      </form>
    </div>
  );
}
