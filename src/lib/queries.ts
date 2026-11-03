import { supabase, isSupabaseConfigured } from "./supabase";

export type Profil = {
  nama: string;
  nim: string;
  kelas: string;
  prodi: string;
  universitas: string;
  dosen: string | null;
  kata_pengantar: string | null;
  motivasi: string | null;
};

export type Materi = {
  id?: number;
  slug: string;
  judul: string;
  pertemuan: number;
  topik: string;
  ringkasan: string;
  isi: string[];
};

type MateriRow = Omit<Materi, "topik"> & { topik: { nama: string } | null };

export type Karya = {
  id: number;
  judul: string;
  jenis: "makalah" | "slide" | "video" | "podcast" | "diskusi";
  deskripsi: string | null;
  url: string | null;
  tanggal: string | null;
};

export type FotoKegiatan = {
  path: string;
  alt: string;
  keterangan: string | null;
};

export type Kegiatan = {
  id: number;
  judul: string;
  tanggal: string;
  lokasi: string | null;
  laporan: string | null;
  foto: FotoKegiatan[];
};

export type FotoGaleri = FotoKegiatan & {
  kegiatan: { tanggal: string; lokasi: string | null } | null;
};

export type Refleksi = {
  id: number;
  judul: string;
  isi: string;
  urutan: number;
};

export type Referensi = {
  id: number;
  judul: string;
  penulis: string | null;
  tahun: number | null;
  url: string | null;
};

// Fallback Data (Data bawaan siap pakai)
const fallbackProfil: Profil = {
  nama: "Irvan Agus Saputra",
  nim: "312410263",
  kelas: "I246A",
  prodi: "Teknik Informatika",
  universitas: "Universitas Pelita Bangsa",
  dosen: "Dosen Pengampu Pendidikan Agama",
  kata_pengantar:
    "Portofolio ini disusun sebagai bentuk dokumentasi pembelajaran, karya, refleksi nilai, dan kegiatan selama menempuh mata kuliah Pendidikan Agama. Semoga karya ini menjadi refleksi nyata penerapan nilai spiritual dan integritas dalam dunia akademik maupun kemasyarakatan.",
  motivasi:
    "Mempelajari pendidikan agama bukan sekadar memenuhi tuntutan kurikulum, melainkan fondasi moral dan etika dalam mengembangkan teknologi yang bermanfaat bagi kemaslahatan umat manusia.",
};

const fallbackMateri: Materi[] = [
  {
    id: 1,
    slug: "berbakti-kepada-orang-tua",
    judul: "Berbakti kepada Orang Tua: Kunci Keberkahan Dunia dan Akhirat",
    pertemuan: 1,
    topik: "Akhlak",
    ringkasan:
      "Kewajiban utama dalam memuliakan, menghormati, dan merawat orang tua sebagai jalan meraih ridha Allah SWT.",
    isi: [
      'Berbakti kepada orang tua (birrul walidain) merupakan salah satu kewajiban utama dalam Islam yang memiliki kedudukan sangat mulia. Allah SWT menyandingkan perintah tauhid dengan perintah berbuat baik kepada kedua orang tua: "Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah kamu berbuat baik kepada ibu bapakmu..." (QS. Al-Isra: 23).',
      'Rasulullah SAW menegaskan pentingnya ridha orang tua dalam sabdanya: "Ridha Allah tergantung pada ridha orang tua, dan murka Allah tergantung pada murka orang tua." (HR. Tirmidzi). Ini membuktikan bahwa keberhasilan dan keberkahan hidup seorang anak berakar dari doa tulus orang tuanya.',
      "Penerapan nyata birrul walidain dalam kehidupan mahasiswa mencakup bertutur kata yang santun, mendoakan keselamatan mereka setiap selesai salat, menjaga nama baik keluarga di lingkungan kampus, serta berikhtiar sungguh-sungguh dalam menuntut ilmu agar membanggakan mereka.",
    ],
  },
  {
    id: 2,
    slug: "akhlak-terhadap-guru",
    judul: "Akhlaq Terhadap Guru: Adab Menuntut Ilmu dan Keberkahan Pengetahuan",
    pertemuan: 2,
    topik: "Akhlak",
    ringkasan:
      "Pentingnya memuliakan guru dan dosen sebagai pembimbing ilmu dan pembentuk karakter generasi berakhlak mulia.",
    isi: [
      'Guru adalah figur pembimbing yang mengalirkan ilmu dan menuntun jalan kebaikan. Dalam Islam, kedudukan orang berilmu dan pendidik sangat ditinggikan: "Allah akan meninggikan orang-orang yang beriman di antara kamu dan orang-orang yang diberi ilmu beberapa derajat." (QS. Al-Mujadilah: 11).',
      'Rasulullah SAW bersabda: "Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga." (HR. Muslim). Para ulama salaf mengajarkan bahwa adab mendahului ilmu; keberkahan ilmu seorang penuntut ilmu sangat bergantung pada ketundukan dan rasa hormatnya kepada guru.',
      "Di lingkungan perguruan tinggi modern, adab terhadap dosen dan pengajar diwujudkan melalui disiplin waktu, menyimak penjelasan dengan penuh perhatian, berkomunikasi secara santun via pesan singkat maupun tatap muka, serta mengamalkan ilmu yang telah diajarkan.",
    ],
  },
  {
    id: 3,
    slug: "toleransi-dalam-beragama",
    judul: "Toleransi dalam Beragama: Menjaga Harmoni dalam Kebhinekaan",
    pertemuan: 3,
    topik: "Toleransi",
    ringkasan:
      "Prinsip tasamuh dalam Islam untuk hidup rukun, saling menghormati antarumat beragama tanpa mengorbankan akidah.",
    isi: [
      'Toleransi (tasamuh) adalah pilar esensial dalam menjaga keutuhan masyarakat dan bangsa yang majemuk. Al-Qur\'an telah menetapkan batasan yang jelas dan adil: "Untukmu agamamu, dan untukkulah agamaku." (QS. Al-Kafirun: 6).',
      'Rasulullah SAW bersabda: "Barang siapa menyakiti orang dzimmi (non-Muslim yang hidup rukun dalam perlindungan), maka sungguh ia telah menyakitiku." (HR. Abu Dawud). Prinsip ini membuktikan bahwa Islam senantiasa menjunjung tinggi perlindungan hak asasi dan kedamaian sosial.',
      "Sebagai mahasiswa Teknik Informatika dan bagian dari generasi muda Indonesia, penerapan toleransi diwujudkan melalui kolaborasi positif dalam kegiatan akademik, menghargai perbedaan keyakinan rekan kerja, dan menolak segala bentuk provokasi atau ujaran kebencian.",
    ],
  },
];

const fallbackKarya: Karya[] = [
  {
    id: 1,
    judul: "Makalah Toleransi Beragama dalam Bingkai Kebhinekaan",
    jenis: "makalah",
    deskripsi: "Tugas makalah UTS yang mengkaji perspektif hukum Islam dan implementasi sila pertama Pancasila.",
    url: null,
    tanggal: "2026-10-15",
  },
  {
    id: 2,
    judul: "Presentasi Slide: Etika dan Tanggung Jawab Digital Mahasiswa",
    jenis: "slide",
    deskripsi: "Slide presentasi kelompok mengenai adab bermedia sosial dan mitigasi berita bohong (hoaks).",
    url: null,
    tanggal: "2026-10-20",
  },
  {
    id: 3,
    judul: "Video Resume: Berbakti kepada Orang Tua di Era Modern",
    jenis: "video",
    deskripsi: "Resume video edukatif mengenai hikmah dan keutamaan birrul walidain.",
    url: "https://youtu.be/LfPIwg0weKM?si=D36xDOSIsvPGPVVU",
    tanggal: "2026-10-28",
  },
];

const fallbackKegiatan: Kegiatan[] = [
  {
    id: 1,
    judul: "Kajian Rutin & Diskusi Keagamaan Kampus",
    tanggal: "2026-10-10",
    lokasi: "Aula Utama Kampus Universitas Pelita Bangsa",
    laporan:
      "Mengikuti kajian tematik mengenai penguatan etika digital dan pembentukan karakter moral mahasiswa di era kecerdasan buatan.",
    foto: [
      {
        path: "/images/kegiatan-1.jpg",
        alt: "Foto dokumentasi kegiatan kajian di kampus",
        keterangan: "Dokumentasi kehadiran dan partisipasi aktif dalam kajian kampus",
      },
    ],
  },
  {
    id: 2,
    judul: "Bakti Sosial & Santunan Masyarakat",
    tanggal: "2026-10-24",
    lokasi: "Cikarang, Bekasi",
    laporan:
      "Berpartisipasi aktif dalam penyaluran paket sembako dan bantuan pendidikan kepada anak yatim dan dhuafa di wilayah sekitar kampus.",
    foto: [
      {
        path: "/images/kegiatan-2.jpg",
        alt: "Foto dokumentasi kegiatan bakti sosial kemasyarakatan",
        keterangan: "Penyaluran bantuan sosial kepada masyarakat yang membutuhkan",
      },
    ],
  },
];

const fallbackFoto: FotoGaleri[] = [
  {
    path: "/images/kegiatan-1.jpg",
    alt: "Foto dokumentasi kegiatan kajian di kampus",
    keterangan: "Kajian bersama di Aula Kampus",
    kegiatan: {
      tanggal: "2026-10-10",
      lokasi: "Aula Utama Kampus UPB",
    },
  },
  {
    path: "/images/kegiatan-2.jpg",
    alt: "Foto dokumentasi kegiatan bakti sosial kemasyarakatan",
    keterangan: "Bakti sosial bersama masyarakat sekitar",
    kegiatan: {
      tanggal: "2026-10-24",
      lokasi: "Cikarang, Bekasi",
    },
  },
];

const fallbackRefleksi: Refleksi[] = [
  {
    id: 1,
    judul: "Yang Saya Pelajari",
    isi: "Pendidikan Agama bukan sekadar hafalan teoritis, tetapi petunjuk komprehensif yang mengatur hubungan manusia dengan Sang Pencipta (hablun minallah) dan hubungan harmonis dengan sesama makhluk (hablun minannas). Agama menanamkan kompas moral yang kokoh saat menghadapi dinamika perkembangan teknologi.",
    urutan: 1,
  },
  {
    id: 2,
    judul: "Nilai yang Saya Terapkan",
    isi: "Nilai kejujuran (siddiq), amanah dalam menyelesaikan tugas akademik, kedisiplinan beribadah, serta adab menghormati orang tua dan dosen sebagai pembimbing ilmu.",
    urutan: 2,
  },
  {
    id: 3,
    judul: "Tantangan dan Solusi",
    isi: "Tantangan terbesar adalah konsistensi (istiqomah) di tengah godaan distraksi digital dan kesibukan perkuliahan. Solusinya adalah senantiasa memperbarui niat, membuat manajemen waktu yang disiplin, dan membina lingkungan pertemanan yang positif.",
    urutan: 3,
  },
  {
    id: 4,
    judul: "Rencana Pengamalan ke Depan",
    isi: "Bertekad memanfaatkan keahlian di bidang Informatika untuk mengembangkan solusi teknologi yang berakhlak, etis, dan memberikan kontribusi nyata bagi masyarakat.",
    urutan: 4,
  },
];

const fallbackReferensi: Referensi[] = [
  {
    id: 1,
    judul: "Al-Qur'an Al-Karim dan Terjemahannya",
    penulis: "Kementerian Agama Republik Indonesia",
    tahun: 2019,
    url: "https://quran.kemenag.go.id",
  },
  {
    id: 2,
    judul: "Riyadhus Shalihin: Kumpulan Hadits Pilihan",
    penulis: "Imam An-Nawawi",
    tahun: 2018,
    url: null,
  },
  {
    id: 3,
    judul: "Pendidikan Agama Islam di Perguruan Tinggi",
    penulis: "Direktorat Jenderal Pembelajaran dan Kemahasiswaan Kemenristekdikti",
    tahun: 2016,
    url: null,
  },
  {
    id: 4,
    judul: "Toleransi Beragama dan Harmoni Kebangsaan",
    penulis: "Pusat Penelitian Bimas Agama dan Layanan Keagamaan",
    tahun: 2021,
    url: null,
  },
];

function ratakan(row: MateriRow): Materi {
  return { ...row, topik: row.topik?.nama ?? "Lainnya" };
}

export async function getProfil(): Promise<Profil> {
  if (!isSupabaseConfigured) return fallbackProfil;
  try {
    const { data, error } = await supabase.from("profil").select("*").single<Profil>();
    if (error || !data) return fallbackProfil;
    return data;
  } catch {
    return fallbackProfil;
  }
}

export async function getDaftarMateri(): Promise<Materi[]> {
  if (!isSupabaseConfigured) return fallbackMateri;
  try {
    const { data, error } = await supabase
      .from("materi")
      .select("id, slug, judul, pertemuan, ringkasan, isi, topik(nama)")
      .order("pertemuan")
      .returns<MateriRow[]>();
    if (error || !data || data.length === 0) return fallbackMateri;
    return data.map(ratakan);
  } catch {
    return fallbackMateri;
  }
}

export async function getMateri(slug: string): Promise<Materi | null> {
  if (!isSupabaseConfigured) {
    return fallbackMateri.find((m) => m.slug === slug) ?? null;
  }
  try {
    const { data, error } = await supabase
      .from("materi")
      .select("id, slug, judul, pertemuan, ringkasan, isi, topik(nama)")
      .eq("slug", slug)
      .maybeSingle<MateriRow>();
    if (error || !data) {
      return fallbackMateri.find((m) => m.slug === slug) ?? null;
    }
    return ratakan(data);
  } catch {
    return fallbackMateri.find((m) => m.slug === slug) ?? null;
  }
}

export async function getKarya(): Promise<Karya[]> {
  if (!isSupabaseConfigured) return fallbackKarya;
  try {
    const { data, error } = await supabase
      .from("karya")
      .select("*")
      .order("tanggal", { ascending: false })
      .returns<Karya[]>();
    if (error || !data || data.length === 0) return fallbackKarya;
    return data;
  } catch {
    return fallbackKarya;
  }
}

export async function getKegiatan(): Promise<Kegiatan[]> {
  if (!isSupabaseConfigured) return fallbackKegiatan;
  try {
    const { data, error } = await supabase
      .from("kegiatan")
      .select("id, judul, tanggal, lokasi, laporan, foto(path, alt, keterangan)")
      .order("tanggal", { ascending: false })
      .returns<Kegiatan[]>();
    if (error || !data || data.length === 0) return fallbackKegiatan;
    return data;
  } catch {
    return fallbackKegiatan;
  }
}

export async function getFoto(): Promise<FotoGaleri[]> {
  if (!isSupabaseConfigured) return fallbackFoto;
  try {
    const { data, error } = await supabase
      .from("foto")
      .select("path, alt, keterangan, kegiatan(tanggal, lokasi)")
      .order("id")
      .returns<FotoGaleri[]>();
    if (error || !data || data.length === 0) return fallbackFoto;
    return data;
  } catch {
    return fallbackFoto;
  }
}

export async function getRefleksi(): Promise<Refleksi[]> {
  if (!isSupabaseConfigured) return fallbackRefleksi;
  try {
    const { data, error } = await supabase
      .from("refleksi")
      .select("*")
      .order("urutan")
      .returns<Refleksi[]>();
    if (error || !data || data.length === 0) return fallbackRefleksi;
    return data;
  } catch {
    return fallbackRefleksi;
  }
}

export async function getReferensi(): Promise<Referensi[]> {
  if (!isSupabaseConfigured) return fallbackReferensi;
  try {
    const { data, error } = await supabase
      .from("referensi")
      .select("*")
      .order("judul")
      .returns<Referensi[]>();
    if (error || !data || data.length === 0) return fallbackReferensi;
    return data;
  } catch {
    return fallbackReferensi;
  }
}

