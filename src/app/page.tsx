import Link from "next/link";
import { getDaftarMateri, getProfil } from "@/lib/queries";
import ProfileCard from "@/components/ProfileCard";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export const revalidate = 60;

export default async function Home() {
  const [profil, materi] = await Promise.all([getProfil(), getDaftarMateri()]);
  const terbaru = [...materi].reverse().slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero Section dengan Liquid Glass Profile Card */}
      <section className="py-12 md:py-20 animate-fadeIn">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold text-moss shadow-sm">
              <HiSparkles className="h-3.5 w-3.5 text-gold" />
              <span>Pendidikan Agama Islam · {profil.universitas}</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl drop-shadow-sm">
              Apa yang saya pelajari dan bagaimana saya mengamalkannya
            </h1>
            {profil.kata_pengantar && (
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/80">
                {profil.kata_pengantar}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/materi"
                className="liquid-glass-btn flex items-center gap-2 rounded-xl px-5 py-3 font-medium text-paper shadow-md"
              >
                <FiBookOpen className="h-4 w-4" />
                Lihat Materi Kuliah
              </Link>
              <Link
                href="/refleksi"
                className="liquid-glass rounded-xl px-5 py-3 font-medium text-moss transition-all hover:bg-white hover:shadow-md"
              >
                Baca Refleksi Diri
              </Link>
            </div>
          </div>

          {/* Profile Card Eksklusif */}
          <div className="lg:col-span-5">
            <ProfileCard profil={profil} />
          </div>
        </div>
      </section>

      {/* Ringkasan Navigasi Cepat dengan Liquid Glass Cards */}
      <section className="border-t border-white/50 py-10 animate-fadeIn">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Link
            href="/karya"
            className="liquid-glass-card group rounded-2xl p-5"
          >
            <span className="liquid-glass-pill inline-block rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold">
              Tugas
            </span>
            <h3 className="mt-2 font-serif text-lg font-bold text-ink group-hover:text-moss transition-colors">
              Karya & Tugas
            </h3>
            <p className="mt-1 text-xs text-ink/70 leading-relaxed">
              Makalah, slide presentasi, dan video pembelajaran keagamaan
            </p>
          </Link>
          <Link
            href="/kegiatan"
            className="liquid-glass-card group rounded-2xl p-5"
          >
            <span className="liquid-glass-pill inline-block rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold">
              Aksi
            </span>
            <h3 className="mt-2 font-serif text-lg font-bold text-ink group-hover:text-moss transition-colors">
              Kegiatan
            </h3>
            <p className="mt-1 text-xs text-ink/70 leading-relaxed">
              Kajian keagamaan dan bakti sosial kepedulian masyarakat
            </p>
          </Link>
          <Link
            href="/galeri"
            className="liquid-glass-card group rounded-2xl p-5"
          >
            <span className="liquid-glass-pill inline-block rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold">
              Visual
            </span>
            <h3 className="mt-2 font-serif text-lg font-bold text-ink group-hover:text-moss transition-colors">
              Galeri Foto
            </h3>
            <p className="mt-1 text-xs text-ink/70 leading-relaxed">
              Dokumentasi visual rangkaian kegiatan selama perkuliahan
            </p>
          </Link>
          <Link
            href="/referensi"
            className="liquid-glass-card group rounded-2xl p-5"
          >
            <span className="liquid-glass-pill inline-block rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold">
              Pustaka
            </span>
            <h3 className="mt-2 font-serif text-lg font-bold text-ink group-hover:text-moss transition-colors">
              Referensi
            </h3>
            <p className="mt-1 text-xs text-ink/70 leading-relaxed">
              Daftar kitab suci, kumpulan hadits, dan literatur rujukan
            </p>
          </Link>
        </div>
      </section>

      {/* Materi Terbaru */}
      <section className="border-t border-white/50 py-12 animate-fadeIn">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-ink">Materi Perkuliahan Terbaru</h2>
          <Link
            href="/materi"
            className="flex items-center gap-1.5 text-sm font-semibold text-moss hover:underline"
          >
            <span>Lihat semua materi</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {terbaru.length === 0 ? (
          <p className="mt-6 text-ink/70">Belum ada materi.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {terbaru.map((m) => (
              <Link
                key={m.slug}
                href={`/materi/${m.slug}`}
                className="liquid-glass-card group flex flex-col justify-between rounded-2xl p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="liquid-glass-pill rounded-md px-2 py-0.5 text-xs font-semibold text-gold">
                      Pertemuan {m.pertemuan}
                    </span>
                    <span className="liquid-glass-pill rounded-md px-2 py-0.5 text-xs font-semibold text-moss">
                      {m.topik}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-serif text-lg font-bold text-ink group-hover:text-moss transition-colors">
                    {m.judul}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink/70 line-clamp-3">
                    {m.ringkasan}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/60">
                  <span className="text-xs font-semibold text-moss group-hover:underline">
                    Baca materi lengkap &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
