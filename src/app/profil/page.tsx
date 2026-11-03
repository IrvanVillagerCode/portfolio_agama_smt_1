import { getProfil } from "@/lib/queries";
import ProfileCard from "@/components/ProfileCard";
import { HiAcademicCap, HiBookOpen } from "react-icons/hi2";
import { FiAward } from "react-icons/fi";

export const metadata = { title: "Profil | Portofolio Pendidikan Agama" };
export const revalidate = 60;

export default async function ProfilPage() {
  const p = await getProfil();

  const baris = [
    ["Nama Lengkap", p.nama],
    ["NIM", p.nim],
    ["Kelas", p.kelas],
    ["Program Studi", p.prodi],
    ["Fakultas / Kampus", p.universitas],
    ["Dosen Pengampu", p.dosen ?? "Dosen Pengampu Mata Kuliah"],
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 animate-fadeIn">
      {/* Profile Card Header */}
      <div className="mb-10">
        <ProfileCard profil={p} />
      </div>

      {/* Informasi Akademik Lengkap Liquid Glass */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 border-b border-white/60 pb-4">
          <HiAcademicCap className="h-6 w-6 text-moss" />
          <h2 className="font-serif text-2xl font-bold text-ink">Informasi Akademik</h2>
        </div>

        <dl className="mt-4 divide-y divide-white/60">
          {baris.map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 gap-4 py-3.5">
              <dt className="text-sm font-medium text-ink/70">{k}</dt>
              <dd className="col-span-2 text-sm font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Motivasi Belajar Liquid Glass */}
      {p.motivasi && (
        <section className="liquid-glass mt-6 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 border-b border-white/60 pb-3">
            <FiAward className="h-6 w-6 text-gold" />
            <h2 className="font-serif text-2xl font-bold text-ink">Motivasi Belajar Agama</h2>
          </div>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/80 italic">
            &ldquo;{p.motivasi}&rdquo;
          </p>
        </section>
      )}

      {/* Kata Pengantar Liquid Glass */}
      {p.kata_pengantar && (
        <section className="liquid-glass mt-6 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 border-b border-white/60 pb-3">
            <HiBookOpen className="h-6 w-6 text-moss" />
            <h2 className="font-serif text-2xl font-bold text-ink">Kata Pengantar</h2>
          </div>
          <p className="mt-4 text-base leading-relaxed text-ink/80">
            {p.kata_pengantar}
          </p>
        </section>
      )}
    </div>
  );
}
