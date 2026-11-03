# Product Requirements Document (PRD)

| | |
|---|---|
| **Judul** | Portofolio Pendidikan Agama Islam |
| **Pemilik** | Irvan Agus Saputra (NIM: 312410263, Kelas: I246A, Teknik Informatika UPB) |
| **Versi** | 1.1 |
| **Status** | Approved / Implemented |
| **Tech Stack** | React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL) |

---

## 1. Latar Belakang dan Masalah
- Tugas dan dokumentasi perkuliahan Pendidikan Agama sebelumnya tersebar dalam file lokal dan halaman web statis.
- Dosen pengampu memerlukan media terpusat yang rapi, informatif, dan mudah diakses untuk mengevaluasi capaian belajar, tugas karya, dan refleksi.
- Menjadi sarana implementasi nyata teknologi modern: Next.js App Router, database PostgreSQL via Supabase, dan desain web responsif standar industri.

---

## 2. Ruang Lingkup

### Termasuk dalam Ruang Lingkup
- Database Supabase (PostgreSQL) untuk menyimpan data profil, topik, materi, karya, kegiatan, foto galeri, refleksi, referensi, dan pesan kontak.
- Pengelolaan konten melalui Supabase Dashboard Table Editor.
- Website frontend berbasis Next.js App Router dengan caching dan revalidasi 60 detik (`revalidate = 60`).
- Keamanan berbasis Row Level Security (RLS) PostgreSQL.

### Bukan Tujuan (Out of Scope)
- Panel admin mandiri (admin dashboard dikelola langsung via Supabase Table Editor).
- Sistem autentikasi / login pengunjung (seluruh konten bersifat publik untuk edukasi).
- Komentar pengunjung atau fitur media sosial.

---

## 3. Kebutuhan Fungsional

| ID | Kebutuhan | Status |
|---|---|---|
| F1 | Beranda dengan identitas, pengantar, dan daftar materi terbaru | Selesai |
| F2 | Profil lengkap mahasiswa dan dosen pengampu | Selesai |
| F3 | Daftar rangkuman materi perkuliahan dalam format kartu | Selesai |
| F4 | Detail materi per pertemuan dengan slug dinamis (`/materi/[slug]`) | Selesai |
| F5 | Halaman karya dan tugas (makalah, slide, video, diskusi) | Selesai |
| F6 | Halaman kegiatan keagamaan dengan laporan dan foto dokumentasi | Selesai |
| F7 | Galeri foto kegiatan dengan grid responsif | Selesai |
| F8 | Halaman refleksi pribadi dan implementasi nilai | Selesai |
| F9 | Halaman referensi daftar pustaka dan rujukan kitab suci | Selesai |
| F10 | Halaman kontak dengan form terhubung ke database Supabase | Selesai |
| F11 | Navigasi responsif (desktop menu & mobile toggle) | Selesai |
| F12 | Halaman 404 custom bila slug/rute tidak ditemukan | Selesai |
| F13 | Filter topik materi secara interaktif | Selesai |

---

## 4. Kebutuhan Non-Fungsional & Keamanan

1. **Responsivitas:** Tampilan optimal mulai dari layar mobile (360px) hingga desktop tanpa horizontal scrollbar.
2. **Keamanan Data (Database & API):**
   - RLS (Row Level Security) aktif di seluruh 9 tabel.
   - Hanya hak `SELECT` yang diberikan untuk data publik.
   - Hak `INSERT` hanya untuk tabel `pesan` dengan pembatasan panjang karakter (pencegahan spam).
   - Anon key publik hanya digunakan di client; `service_role` key tidak pernah diekspos ke repository atau client.
   - File `.env.local` diabaikan secara ketat oleh `.gitignore`.
3. **Performa & SEO:** SSG (Static Site Generation) dan ISR (Incremental Static Regeneration) dengan fallback aman.

