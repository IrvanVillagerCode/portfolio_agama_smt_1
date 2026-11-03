import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-serif text-6xl font-bold text-moss">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 text-ink/70 leading-relaxed">
        Maaf, materi atau halaman yang Anda cari tidak tersedia atau tautan telah dipindahkan.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded bg-moss px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-moss/90"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/materi"
          className="rounded border border-moss px-5 py-2.5 text-sm font-medium text-moss transition-colors hover:bg-mist"
        >
          Daftar Materi
        </Link>
      </div>
    </div>
  );
}

