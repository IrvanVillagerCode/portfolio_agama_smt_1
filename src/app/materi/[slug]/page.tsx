import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDaftarMateri, getMateri } from "@/lib/queries";
import { FiArrowLeft } from "react-icons/fi";

export const revalidate = 60;

export async function generateStaticParams() {
  const semua = await getDaftarMateri();
  return semua.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const materi = await getMateri(slug);
  if (!materi) return { title: "Materi Tidak Ditemukan" };

  return {
    title: `${materi.judul} (Pertemuan ${materi.pertemuan})`,
    description: materi.ringkasan,
    keywords: [
      materi.judul,
      materi.topik,
      `Pertemuan ${materi.pertemuan}`,
      "Pendidikan Agama Islam",
      "Irvan Agus Saputra",
      "Universitas Pelita Bangsa",
    ],
    openGraph: {
      title: `${materi.judul} | Pendidikan Agama Islam UPB`,
      description: materi.ringkasan,
      type: "article",
    },
  };
}

export default async function DetailMateri({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const materi = await getMateri(slug);
  if (!materi) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 animate-fadeIn">
      <Link
        href="/materi"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-moss transition-colors hover:underline"
      >
        <FiArrowLeft className="h-4 w-4" />
        <span>Kembali ke daftar materi</span>
      </Link>

      <article className="liquid-glass mt-6 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="liquid-glass-pill rounded-md px-2.5 py-0.5 text-xs font-semibold text-gold">
            Pertemuan {materi.pertemuan}
          </span>
          <span className="liquid-glass-pill rounded-md px-2.5 py-0.5 text-xs font-semibold text-moss">
            {materi.topik}
          </span>
        </div>

        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {materi.judul}
        </h1>

        <div className="mt-8 space-y-6 text-base sm:text-lg leading-relaxed text-ink/85">
          {materi.isi.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-white/60 pt-6">
          <Link
            href="/materi"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-moss hover:underline"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Lihat materi perkuliahan lainnya</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
