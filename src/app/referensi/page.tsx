import { getReferensi } from "@/lib/queries";
import { FiExternalLink } from "react-icons/fi";

export const metadata = { title: "Referensi | Portofolio Pendidikan Agama" };
export const revalidate = 60;

export default async function ReferensiPage() {
  const referensi = await getReferensi();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 animate-fadeIn">
      <h1 className="font-serif text-4xl font-bold text-ink">Daftar Referensi</h1>
      <p className="mt-3 text-ink/75">
        Daftar pustaka, rujukan kitab suci, hadits, buku ajar, dan sumber daring yang digunakan dalam perkuliahan.
      </p>

      {referensi.length === 0 && (
        <p className="mt-8 text-ink/70">Belum ada referensi yang ditambahkan.</p>
      )}

      <div className="liquid-glass mt-8 rounded-3xl p-6 sm:p-8 shadow-sm">
        <ol className="list-decimal space-y-5 pl-5 text-base sm:text-lg leading-relaxed text-ink/85">
          {referensi.map((r) => (
            <li key={r.id} className="pl-1">
              {r.penulis && <span className="font-semibold text-ink">{r.penulis}</span>}
              {r.tahun && <span className="text-ink/70"> ({r.tahun}). </span>}
              <span className="italic text-ink">{r.judul}.</span>
              {r.url && (
                <>
                  {" "}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-moss hover:underline"
                  >
                    <span>[Buka Rujukan]</span>
                    <FiExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
