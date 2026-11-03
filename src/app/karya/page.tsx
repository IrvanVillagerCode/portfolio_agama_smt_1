import { formatTanggal } from "@/lib/format";
import { getKarya } from "@/lib/queries";
import { FiExternalLink } from "react-icons/fi";

export const metadata = { title: "Karya | Portofolio Pendidikan Agama" };
export const revalidate = 60;

const namaJenis = {
  makalah: "Makalah",
  slide: "Slide presentasi",
  video: "Video",
  podcast: "Podcast",
  diskusi: "Hasil diskusi",
} as const;

export default async function KaryaPage() {
  const karya = await getKarya();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 animate-fadeIn">
      <h1 className="font-serif text-4xl font-bold text-ink">Karya dan Tugas</h1>
      <p className="mt-3 max-w-xl text-ink/75">
        Kumpulan tugas mandiri, kelompok, makalah, slide presentasi, dan materi audio-visual.
      </p>

      {karya.length === 0 && (
        <p className="mt-8 text-ink/70">Belum ada karya yang ditambahkan.</p>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {karya.map((k) => (
          <article
            key={k.id}
            className="liquid-glass-card flex flex-col justify-between rounded-3xl p-6"
          >
            <div>
              <span className="liquid-glass-pill inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold text-gold">
                {namaJenis[k.jenis] ?? k.jenis}
                {k.tanggal ? ` · ${formatTanggal(k.tanggal)}` : ""}
              </span>
              <h2 className="mt-3 font-serif text-xl font-bold text-ink">{k.judul}</h2>
              {k.deskripsi && (
                <p className="mt-2.5 text-sm leading-relaxed text-ink/75">{k.deskripsi}</p>
              )}
            </div>
            {k.url && (
              <div className="mt-6 pt-4 border-t border-white/60">
                <a
                  href={k.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-moss hover:underline"
                >
                  <span>Buka tautan karya</span>
                  <FiExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
