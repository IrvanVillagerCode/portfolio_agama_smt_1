import MateriList from "@/components/MateriList";
import { getDaftarMateri } from "@/lib/queries";

export const metadata = { title: "Materi | Portofolio Pendidikan Agama" };
export const revalidate = 60;

export default async function MateriPage() {
  const materi = await getDaftarMateri();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <h1 className="font-serif text-4xl font-semibold">Materi perkuliahan</h1>
      <p className="mt-3 max-w-xl text-ink/75">
        Rangkuman setiap pertemuan beserta dalil pendukungnya.
      </p>
      <MateriList materi={materi} />
    </div>
  );
}

