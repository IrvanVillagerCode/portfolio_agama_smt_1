import Image from "next/image";
import { formatTanggal } from "@/lib/format";
import { getFoto } from "@/lib/queries";

export const metadata = {
  title: "Galeri Foto Dokumentasi Kegiatan",
  description:
    "Dokumentasi visual rangkaian kegiatan perkuliahan, kajian keagamaan, dan aktivitas sosial Pendidikan Agama Islam.",
};
export const revalidate = 60;

export default async function GaleriPage() {
  const foto = await getFoto();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 animate-fadeIn">
      <h1 className="font-serif text-4xl font-bold text-ink">Galeri Kegiatan</h1>
      <p className="mt-3 max-w-xl text-ink/75">
        Dokumentasi visual rangkaian kegiatan pembelajaran dan aktivitas keagamaan selama perkuliahan.
      </p>

      {foto.length === 0 && (
        <p className="mt-8 text-ink/70">Belum ada foto yang ditambahkan.</p>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foto.map((f, idx) => (
          <figure
            key={`${f.path}-${idx}`}
            className="liquid-glass-card group overflow-hidden rounded-3xl p-3 shadow-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist border border-white/60">
              <Image
                src={f.path}
                alt={f.alt || "Dokumentasi kegiatan"}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-3 px-2 pb-1">
              <p className="font-semibold text-sm text-ink">{f.keterangan || f.alt}</p>
              {f.kegiatan && (
                <p className="mt-1 text-xs text-ink/65">
                  {formatTanggal(f.kegiatan.tanggal)}
                  {f.kegiatan.lokasi ? ` · ${f.kegiatan.lokasi}` : ""}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
