-- ==============================================================================
-- DATABASE PORTOFOLIO PENDIDIKAN AGAMA (SUPABASE + NEXT.JS)
-- Mahasiswa: Irvan Agus Saputra
-- NIM: 312410263
-- Kelas: I246A
-- Program Studi: Teknik Informatika, Universitas Pelita Bangsa
-- ==============================================================================

-- 1. TABEL PROFIL (Hanya satu baris identitas pemilik)
create table if not exists profil (
  id int primary key default 1 check (id = 1),
  nama text not null,
  nim text not null,
  kelas text not null,
  prodi text not null,
  universitas text not null,
  dosen text,
  kata_pengantar text,
  motivasi text
);

-- 2. TABEL TOPIK (Kategori materi)
create table if not exists topik (
  id bigint generated always as identity primary key,
  nama text unique not null
);

-- 3. TABEL MATERI (Rangkuman per pertemuan)
create table if not exists materi (
  id bigint generated always as identity primary key,
  slug text unique not null,
  judul text not null,
  pertemuan int not null,
  topik_id bigint references topik(id) on delete set null,
  ringkasan text not null,
  isi text[] not null default '{}'  -- Tiap elemen = satu paragraf
);

-- 4. TABEL KARYA (Makalah, slide, video, podcast, hasil diskusi)
create table if not exists karya (
  id bigint generated always as identity primary key,
  judul text not null,
  jenis text not null check (jenis in ('makalah','slide','video','podcast','diskusi')),
  deskripsi text,
  url text,
  tanggal date
);

-- 5. TABEL KEGIATAN (Dokumentasi kegiatan keagamaan)
create table if not exists kegiatan (
  id bigint generated always as identity primary key,
  judul text not null,
  tanggal date not null,
  lokasi text,
  laporan text
);

-- 6. TABEL FOTO (Dokumentasi foto per kegiatan)
create table if not exists foto (
  id bigint generated always as identity primary key,
  kegiatan_id bigint references kegiatan(id) on delete cascade,
  path text not null,        -- Contoh: /images/kegiatan-1.jpg atau URL Supabase Storage
  alt text not null,
  keterangan text
);

-- 7. TABEL REFLEKSI (Perenungan spiritual & implementasi nilai)
create table if not exists refleksi (
  id bigint generated always as identity primary key,
  judul text not null,
  isi text not null,
  urutan int not null default 0
);

-- 8. TABEL REFERENSI (Daftar pustaka & sumber)
create table if not exists referensi (
  id bigint generated always as identity primary key,
  judul text not null,
  penulis text,
  tahun int,
  url text
);

-- 9. TABEL PESAN (Form kontak pengunjung)
create table if not exists pesan (
  id bigint generated always as identity primary key,
  nama text not null,
  email text not null,
  isi text not null,
  dibuat timestamptz not null default now()
);

-- INDEX PENCARIAN & PERFORMA
create index if not exists materi_pertemuan_idx on materi (pertemuan);
create index if not exists foto_kegiatan_idx on foto (kegiatan_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) - STANDAR KEAMANAN & FITUR CRUD
-- ==============================================================================

alter table profil     enable row level security;
alter table topik      enable row level security;
alter table materi     enable row level security;
alter table karya      enable row level security;
alter table kegiatan   enable row level security;
alter table foto       enable row level security;
alter table refleksi   enable row level security;
alter table referensi  enable row level security;
alter table pesan      enable row level security;

-- Kebijakan baca publik (SELECT) untuk konten portofolio
drop policy if exists "baca publik" on profil;
create policy "baca publik" on profil for select using (true);

drop policy if exists "baca publik" on topik;
create policy "baca publik" on topik for select using (true);

drop policy if exists "baca publik" on materi;
create policy "baca publik" on materi for select using (true);

drop policy if exists "baca publik" on karya;
create policy "baca publik" on karya for select using (true);

drop policy if exists "baca publik" on kegiatan;
create policy "baca publik" on kegiatan for select using (true);

drop policy if exists "baca publik" on foto;
create policy "baca publik" on foto for select using (true);

drop policy if exists "baca publik" on refleksi;
create policy "baca publik" on refleksi for select using (true);

drop policy if exists "baca publik" on referensi;
create policy "baca publik" on referensi for select using (true);

-- Pengunjung boleh mengirim pesan kontak (INSERT) dengan validasi panjang karakter
drop policy if exists "kirim pesan" on pesan;
create policy "kirim pesan" on pesan for insert
  with check (char_length(nama) between 1 and 100
          and char_length(email) between 3 and 150
          and char_length(isi) between 1 and 2000);

-- Kebijakan CRUD untuk pengelola website (Panel /admin)
drop policy if exists "kelola profil" on profil;
create policy "kelola profil" on profil for all using (true) with check (true);

drop policy if exists "kelola topik" on topik;
create policy "kelola topik" on topik for all using (true) with check (true);

drop policy if exists "kelola materi" on materi;
create policy "kelola materi" on materi for all using (true) with check (true);

drop policy if exists "kelola karya" on karya;
create policy "kelola karya" on karya for all using (true) with check (true);

drop policy if exists "kelola kegiatan" on kegiatan;
create policy "kelola kegiatan" on kegiatan for all using (true) with check (true);

drop policy if exists "kelola foto" on foto;
create policy "kelola foto" on foto for all using (true) with check (true);

drop policy if exists "kelola refleksi" on refleksi;
create policy "kelola refleksi" on refleksi for all using (true) with check (true);

drop policy if exists "kelola referensi" on referensi;
create policy "kelola referensi" on referensi for all using (true) with check (true);

drop policy if exists "kelola pesan" on pesan;
create policy "kelola pesan" on pesan for all using (true) with check (true);

-- ==============================================================================
-- DATA SEED (DATA AWAL LENGKAP & ASLI)
-- ==============================================================================

insert into profil (id, nama, nim, kelas, prodi, universitas, dosen, kata_pengantar, motivasi)
values (
  1,
  'Irvan Agus Saputra',
  '312410263',
  'I246A',
  'Teknik Informatika',
  'Universitas Pelita Bangsa',
  'Dosen Pengampu Pendidikan Agama',
  'Portofolio ini disusun sebagai bentuk dokumentasi pembelajaran, karya, refleksi nilai, dan kegiatan selama menempuh mata kuliah Pendidikan Agama. Semoga karya ini menjadi refleksi nyata penerapan nilai spiritual dan integritas dalam dunia akademik maupun kemasyarakatan.',
  'Mempelajari pendidikan agama bukan sekadar memenuhi tuntutan kurikulum, melainkan fondasi moral dan etika dalam mengembangkan teknologi yang bermanfaat bagi kemaslahatan umat manusia.'
)
on conflict (id) do update set
  nama = excluded.nama,
  nim = excluded.nim,
  kelas = excluded.kelas,
  prodi = excluded.prodi,
  universitas = excluded.universitas,
  dosen = excluded.dosen,
  kata_pengantar = excluded.kata_pengantar,
  motivasi = excluded.motivasi;

-- TOPIK
insert into topik (nama) values 
  ('Akidah'), 
  ('Akhlak'), 
  ('Toleransi')
on conflict (nama) do nothing;

-- MATERI PERKULIAHAN
insert into materi (slug, judul, pertemuan, topik_id, ringkasan, isi) values
(
  'berbakti-kepada-orang-tua',
  'Berbakti kepada Orang Tua: Kunci Keberkahan Dunia dan Akhirat',
  1,
  (select id from topik where nama = 'Akhlak'),
  'Kewajiban utama dalam memuliakan, menghormati, dan merawat orang tua sebagai jalan meraih ridha Allah SWT.',
  array[
    'Berbakti kepada orang tua (birrul walidain) merupakan salah satu kewajiban utama dalam Islam yang memiliki kedudukan sangat mulia. Allah SWT menyandingkan perintah tauhid dengan perintah berbuat baik kepada kedua orang tua: "Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah kamu berbuat baik kepada ibu bapakmu..." (QS. Al-Isra: 23).',
    'Rasulullah SAW menegaskan pentingnya ridha orang tua dalam sabdanya: "Ridha Allah tergantung pada ridha orang tua, dan murka Allah tergantung pada murka orang tua." (HR. Tirmidzi). Ini membuktikan bahwa keberhasilan dan keberkahan hidup seorang anak berakar dari doa tulus orang tuanya.',
    'Penerapan nyata birrul walidain dalam kehidupan mahasiswa mencakup bertutur kata yang santun, mendoakan keselamatan mereka setiap selesai salat, menjaga nama baik keluarga di lingkungan kampus, serta berikhtiar sungguh-sungguh dalam menuntut ilmu agar membanggakan mereka.'
  ]
),
(
  'akhlak-terhadap-guru',
  'Akhlaq Terhadap Guru: Adab Menuntut Ilmu dan Keberkahan Pengetahuan',
  2,
  (select id from topik where nama = 'Akhlak'),
  'Pentingnya memuliakan guru dan dosen sebagai pembimbing ilmu dan pembentuk karakter generasi berakhlak mulia.',
  array[
    'Guru adalah figur pembimbing yang mengalirkan ilmu dan menuntun jalan kebaikan. Dalam Islam, kedudukan orang berilmu dan pendidik sangat ditinggikan: "Allah akan meninggikan orang-orang yang beriman di antara kamu dan orang-orang yang diberi ilmu beberapa derajat." (QS. Al-Mujadilah: 11).',
    'Rasulullah SAW bersabda: "Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga." (HR. Muslim). Para ulama salaf mengajarkan bahwa adab mendahului ilmu; keberkahan ilmu seorang penuntut ilmu sangat bergantung pada ketundukan dan rasa hormatnya kepada guru.',
    'Di lingkungan perguruan tinggi modern, adab terhadap dosen dan pengajar diwujudkan melalui disiplin waktu, menyimak penjelasan dengan penuh perhatian, berkomunikasi secara santun via pesan singkat maupun tatap muka, serta mengamalkan ilmu yang telah diajarkan.'
  ]
),
(
  'toleransi-dalam-beragama',
  'Toleransi dalam Beragama: Menjaga Harmoni dalam Kebhinekaan',
  3,
  (select id from topik where nama = 'Toleransi'),
  'Prinsip tasamuh dalam Islam untuk hidup rukun, saling menghormati antarumat beragama tanpa mengorbankan akidah.',
  array[
    'Toleransi (tasamuh) adalah pilar esensial dalam menjaga keutuhan masyarakat dan bangsa yang majemuk. Al-Qur''an telah menetapkan batasan yang jelas dan adil: "Untukmu agamamu, dan untukkulah agamaku." (QS. Al-Kafirun: 6).',
    'Rasulullah SAW bersabda: "Barang siapa menyakiti orang dzimmi (non-Muslim yang hidup rukun dalam perlindungan), maka sungguh ia telah menyakitiku." (HR. Abu Dawud). Prinsip ini membuktikan bahwa Islam senantiasa menjunjung tinggi perlindungan hak asasi dan kedamaian sosial.',
    'Sebagai mahasiswa Teknik Informatika dan bagian dari generasi muda Indonesia, penerapan toleransi diwujudkan melalui kolaborasi positif dalam kegiatan akademik, menghargai perbedaan keyakinan rekan kerja, dan menolak segala bentuk provokasi atau ujaran kebencian.'
  ]
)
on conflict (slug) do nothing;

-- KEGIATAN
insert into kegiatan (judul, tanggal, lokasi, laporan) values
(
  'Kajian Rutin & Diskusi Keagamaan Kampus',
  '2026-10-10',
  'Aula Utama Kampus Universitas Pelita Bangsa',
  'Mengikuti kajian tematik mengenai penguatan etika digital dan pembentukan karakter moral mahasiswa di era kecerdasan buatan.'
),
(
  'Bakti Sosial & Santunan Masyarakat',
  '2026-10-24',
  'Cikarang, Bekasi',
  'Berpartisipasi aktif dalam penyaluran paket sembako dan bantuan pendidikan kepada anak yatim dan dhuafa di wilayah sekitar kampus.'
);

-- FOTO
insert into foto (kegiatan_id, path, alt, keterangan) values
(
  (select id from kegiatan where judul like 'Kajian Rutin%' limit 1),
  '/images/kegiatan-1.jpg',
  'Foto dokumentasi kegiatan kajian di kampus',
  'Dokumentasi kehadiran dan partisipasi aktif dalam kajian kampus'
),
(
  (select id from kegiatan where judul like 'Bakti Sosial%' limit 1),
  '/images/kegiatan-2.jpg',
  'Foto dokumentasi kegiatan bakti sosial kemasyarakatan',
  'Penyaluran bantuan sosial kepada masyarakat yang membutuhkan'
);

-- KARYA
insert into karya (judul, jenis, deskripsi, url, tanggal) values
(
  'Makalah Toleransi Beragama dalam Bingkai Kebhinekaan',
  'makalah',
  'Tugas makalah UTS yang mengkaji perspektif hukum Islam dan implementasi sila pertama Pancasila.',
  null,
  '2026-10-15'
),
(
  'Presentasi Slide: Etika dan Tanggung Jawab Digital Mahasiswa',
  'slide',
  'Slide presentasi kelompok mengenai adab bermedia sosial dan mitigasi berita bohong (hoaks).',
  null,
  '2026-10-20'
),
(
  'Video Resume: Berbakti kepada Orang Tua di Era Modern',
  'video',
  'Resume video edukatif mengenai hikmah dan keutamaan birrul walidain.',
  'https://youtu.be/LfPIwg0weKM?si=D36xDOSIsvPGPVVU',
  '2026-10-28'
);

-- REFLEKSI
insert into refleksi (judul, isi, urutan) values
(
  'Yang Saya Pelajari',
  'Pendidikan Agama bukan sekadar hafalan teoritis, tetapi petunjuk komprehensif yang mengatur hubungan manusia dengan Sang Pencipta (hablun minallah) dan hubungan harmonis dengan sesama makhluk (hablun minannas). Agama menanamkan kompas moral yang kokoh saat menghadapi dinamika perkembangan teknologi.',
  1
),
(
  'Nilai yang Saya Terapkan',
  'Nilai kejujuran (siddiq), amanah dalam menyelesaikan tugas akademik, kedisiplinan beribadah, serta adab menghormati orang tua dan dosen sebagai pembimbing ilmu.',
  2
),
(
  'Tantangan dan Solusi',
  'Tantangan terbesar adalah konsistensi (istiqomah) di tengah godaan distraksi digital dan kesibukan perkuliahan. Solusinya adalah senantiasa memperbarui niat, membuat manajemen waktu yang disiplin, dan membina lingkungan pertemanan yang positif.',
  3
),
(
  'Rencana Pengamalan ke Depan',
  'Bertekad memanfaatkan keahlian di bidang Informatika untuk mengembangkan solusi teknologi yang berakhlak, etis, dan memberikan kontribusi nyata bagi masyarakat.',
  4
);

-- REFERENSI
insert into referensi (judul, penulis, tahun, url) values
(
  'Al-Qur''an Al-Karim dan Terjemahannya',
  'Kementerian Agama Republik Indonesia',
  2019,
  'https://quran.kemenag.go.id'
),
(
  'Riyadhus Shalihin: Kumpulan Hadits Pilihan',
  'Imam An-Nawawi',
  2018,
  null
),
(
  'Pendidikan Agama Islam di Perguruan Tinggi',
  'Direktorat Jenderal Pembelajaran dan Kemahasiswaan Kemenristekdikti',
  2016,
  null
),
(
  'Toleransi Beragama dan Harmoni Kebangsaan',
  'Pusat Penelitian Bimas Agama dan Layanan Keagamaan',
  2021,
  null
);
