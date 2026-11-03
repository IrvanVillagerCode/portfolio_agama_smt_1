import { getRefleksi } from "@/lib/queries";

export const metadata = { title: "Refleksi | Portofolio Pendidikan Agama" };
export const revalidate = 60;

export default async function RefleksiPage() {
  const refleksi = await getRefleksi();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 animate-fadeIn">
      <h1 className="font-serif text-4xl font-bold text-ink">Refleksi Pribadi</h1>
      <p className="mt-3 text-ink/75">
        Perenungan terhadap nilai-nilai keagamaan, tantangan moralitas, dan tekad pengamalan dalam kehidupan sehari-hari.
      </p>

      {refleksi.length === 0 && (
        <p className="mt-8 text-ink/70">Belum ada refleksi yang ditulis.</p>
      )}

      <div className="mt-10 space-y-8">
        {refleksi.map((r) => (
          <section
            key={r.id}
            className="liquid-glass-card rounded-3xl p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="liquid-glass-pill flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-moss">
                {r.urutan}
              </span>
              <h2 className="font-serif text-2xl font-bold text-ink">{r.judul}</h2>
            </div>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink/80 sm:text-lg">
              {r.isi}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
