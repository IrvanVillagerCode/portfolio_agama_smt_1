# Product Requirements Document (PRD)

| Parameter | Spesifikasi |
|---|---|
| Judul Proyek | Portofolio Pendidikan Agama Islam |
| Mahasiswa | Irvan Agus Saputra |
| NIM / Kelas | 312410263 / I246A |
| Program Studi | Teknik Informatika |
| Perguruan Tinggi | Universitas Pelita Bangsa |
| Versi Dokumen | 1.2 |
| Status | Approved / Production Ready |
| Tech Stack | React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL) |

---

## 1. Latar Belakang dan Urgensi

Pengumpulan tugas akademik dan dokumentasi pembelajaran Pendidikan Agama Islam kerap tersebar di berbagai media terpisah, seperti berkas lokal, aplikasi pesan instan, dan penyimpanan berkas mandiri. Kondisi tersebut menyulitkan evaluasi terpadu oleh dosen pengampu. 

Proyek ini dibangun sebagai media terpusat berbasis web untuk mendokumentasikan pemahaman konseptual materi, tugas makalah, bukti kegiatan sosial, serta refleksi etika moral mahasiswa Teknik Informatika.

---

## 2. Batasan dan Ruang Lingkup

### Ruang Lingkup Masuk (In-Scope)
1. Integrasi basis data PostgreSQL (Supabase) untuk penyimpanan data dinamis: profil, topik, materi, karya, kegiatan, galeri foto, refleksi, referensi, dan pesan masuk.
2. Pengelolaan konten terpadu melalui panel administrasi web (`/admin`) dan konsol Supabase.
3. Arsitektur frontend berbasis Next.js App Router dengan caching berjangka waktu (revalidasi 60 detik).
4. Penegakan keamanan data melalui PostgreSQL Row Level Security (RLS).
5. Desain antarmuka responsif ramah peramban mobile (360px) hingga layar desktop.

### Di Luar Ruang Lingkup (Out-of-Scope)
1. Sistem autentikasi pengguna umum (seluruh materi bersifat terbuka untuk evaluasi akademik dan edukasi publik).
2. Sistem interaksi media sosial (komentar pengunjung, likes, dsb.).
3. Aplikasi mobile berbasis native (iOS/Android).

---

## 3. Matriks Kebutuhan Fungsional

| ID | Modul | Kebutuhan Fungsional |
|---|---|---|
| F01 | Beranda | Menampilkan ringkasan identitas, motivasi akademik, dan artikel materi terbaru. |
| F02 | Profil | Menampilkan biodata akademik, latar belakang, dan kata pengantar mahasiswa. |
| F03 | Materi | Daftar seluruh materi pertemuan dengan filter topik interaktif. |
| F04 | Detail Materi | Halaman pembahasan materi komprehensif berbasis slug URL dinamis (`/materi/[slug]`). |
| F05 | Karya & Tugas | Menampilkan makalah, slide presentasi, dan materi audio-visual tugas akademik. |
| F06 | Kegiatan | Dokumentasi terstruktur kegiatan keagamaan mencakup waktu, lokasi, dan laporan. |
| F07 | Galeri | Penyajian dokumentasi visual foto kegiatan perkuliahan dan sosial. |
| F08 | Refleksi | Dokumentasi perenungan nilai, kendala moralitas, dan rencana implementasi ke depan. |
| F09 | Referensi | Daftar pustaka kitab suci, hadits, jurnal, dan rujukan ilmiah pendukung. |
| F10 | Kontak | Formulir komunikasi pengiriman pesan yang langsung tersimpan di basis data. |
| F11 | Kelola (CRUD) | Antarmuka pembuatan, pengubahan, dan penghapusan rekaman data aplikasi. |
| F12 | Navigasi | Bilah navigasi adaptif untuk layar desktop dan menu dropdown untuk layar mobile. |
| F13 | Halaman 404 | Penanganan kesalahan tautan rute yang tidak ditemukan secara terstandar. |

---

## 4. Standar Non-Fungsional dan Keamanan

1. **Performa dan Keterbacaan:**
   - Waktu muat awal optimal dengan pemanfaatan Static Site Generation (SSG) dan Incremental Static Regeneration (ISR).
   - Tipografi terstruktur dengan perbandingan kontras warna sesuai standar aksesibilitas web (WCAG).
2. **Keamanan Kredensial:**
   - Kredensial basis data dan environment variables terisolasi secara ketat di `.env.local` dan diabaikan oleh Git.
   - Hak akses basis data dikontrol via Row Level Security (RLS) di level PostgreSQL.
   - Operasi penulisan publik dibatasi hanya pada penyampaian pesan dengan validasi panjang karakter input guna mencegah eksploitasi data.
