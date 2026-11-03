import Image from "next/image";
import { formatTanggal } from "@/lib/format";
import { getKegiatan } from "@/lib/queries";

export const metadata = { title: "Kegiatan | Portofolio Pendidikan Agama" };
export const revalidate = 60;

export default async function KegiatanPage() {
  const kegiatan = await getKegiatan();

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 animate-fadeIn">
      <h1 className="font-serif text-4xl font-bold text-ink">Kegiatan Keagamaan</h1>
      <p className="mt-3 max-w-2xl text-ink/75">
        Dokumentasi partisipasi dalam kegiatan keagamaan, kajian, dan aksi kepedulian sosial kemasyarakatan.
      </p>

      {kegiatan.length === 0 && (
        <p className="mt-8 text-ink/70">Belum ada kegiatan yang ditambahkan.</p>
      )}

      <div className="mt-10 space-y-12">
        {kegiatan.map((k) => (
          <article
            key={k.id}
            className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-sm"
          >
            <span className="liquid-glass-pill inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold text-gold">
              {formatTanggal(k.tanggal)}
              {k.lokasi ? ` · ${k.lokasi}` : ""}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-ink">{k.judul}</h2>
            {k.laporan && (
              <p className="mt-4 text-base leading-relaxed text-ink/80">{k.laporan}</p>
            )}

            {k.foto && k.foto.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {k.foto.map((f, idx) => (
                  <div key={idx} className="group overflow-hidden rounded-2xl border border-white/80 shadow-sm">
                    <div className="relative aspect-[4/3] bg-mist">
                      <Image
                        src={f.path}
                        alt={f.alt || k.judul}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {f.keterangan && (
                      <p className="liquid-glass p-3 text-xs font-medium text-ink/75">{f.keterangan}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
