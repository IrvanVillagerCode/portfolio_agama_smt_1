import { getDaftarMateri, getKarya, getKegiatan, getProfil } from "@/lib/queries";
import { getPesanList } from "@/lib/crud-actions";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Kelola Portofolio (CRUD) | Irvan Agus Saputra",
};

export const revalidate = 0; // Dinamis agar selalu menampilkan data terkini

export default async function AdminPage() {
  const [materi, karya, kegiatan, profil, pesan] = await Promise.all([
    getDaftarMateri(),
    getKarya(),
    getKegiatan(),
    getProfil(),
    getPesanList(),
  ]);

  return (
    <AdminDashboard
      initialMateri={materi}
      initialKarya={karya}
      initialKegiatan={kegiatan}
      initialProfil={profil}
      initialPesan={pesan}
    />
  );
}

