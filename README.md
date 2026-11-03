# Portofolio Pendidikan Agama Islam - Semester 1

Dokumentasi digital dan repositori proyek tugas akhir mata kuliah Pendidikan Agama Islam. Proyek ini memuat rangkuman materi perkuliahan, karya tugas akademik, dokumentasi kegiatan sosial-keagamaan, serta refleksi nilai berbasis web modern.

**Identitas Mahasiswa:**
- Nama Lengkap: Irvan Agus Saputra
- NIM: 312410263
- Kelas: I246A
- Program Studi: Teknik Informatika
- Institusi: Universitas Pelita Bangsa (UPB Bekasi)

---

## 1. Gambaran Umum

Aplikasi web ini dibangun untuk memenuhi kualifikasi evaluasi pembelajaran Pendidikan Agama Islam pada jenjang perguruan tinggi. Website menyediakan akses publik terhadap pencapaian belajar mahasiswa, sekaligus menyediakan antarmuka terpusat bagi pengelolaan materi dan pelaporan kegiatan.

### Cakupan Halaman

| Halaman | Rute | Fungsi |
|---|---|---|
| Beranda | `/` | Informasi identitas mahasiswa, pengantar perkuliahan, dan ringkasan materi terkini |
| Profil | `/profil` | Biodata lengkap, latar belakang akademik, serta motivasi pembelajaran |
| Materi Perkuliahan | `/materi` | Rangkuman materi per pertemuan disertai penyaringan berdasarkan kategori |
| Detail Materi | `/materi/[slug]` | Pembahasan materi perkuliahan lengkap beserta dalil Al-Qur'an dan Hadits |
| Karya & Tugas | `/karya` | Dokumentasi makalah UTS/UAS, slide presentasi kelompok, dan tugas media |
| Kegiatan | `/kegiatan` | Laporan pelaksanaan kajian keagamaan kampus dan bakti sosial masyarakat |
| Galeri | `/galeri` | Dokumentasi visual kegiatan perkuliahan dan kemasyarakatan |
| Refleksi | `/refleksi` | Perenungan spiritual, pengamalan nilai integritas, dan evaluasi diri |
| Referensi | `/referensi` | Daftar pustaka kitab rujukan, buku teks, dan literatur pendukung |
| Kontak | `/kontak` | Formulir komunikasi dan penyampaian masukan |
| Panel Kelola | `/admin` | Antarmuka administrasi internal (CRUD) pengelolaan konten |

---

## 2. Arsitektur dan Spesifikasi Teknis

- **Kerangka Kerja (Framework):** Next.js 15 (App Router)
- **Library Antarmuka:** React 19
- **Bahasa Pemrograman:** TypeScript
- **Tata Letak & Gaya (Styling):** Tailwind CSS
- **Animasi Antarmuka:** Framer Motion
- **Sistem Ikon:** React Icons
- **Basis Data:** Supabase (PostgreSQL)
- **Komunikasi Data:** `@supabase/supabase-js` dan Server Actions Next.js

---

## 3. Struktur Direktori Proyek

```
portfolio_agam_smt_1/
├── public/
│   └── images/               # Aset gambar statis, foto identitas, dan logo instansi
├── src/
│   ├── app/                  # Rute aplikasi (App Router)
│   │   ├── admin/            # Panel administrasi CRUD
│   │   ├── galeri/           # Halaman dokumentasi foto
│   │   ├── karya/            # Halaman tugas dan makalah
│   │   ├── kegiatan/         # Halaman laporan kegiatan
│   │   ├── kontak/           # Halaman formulir pesan
│   │   ├── materi/           # Daftar materi dan rute dinamis [slug]
│   │   ├── profil/           # Halaman biodata mahasiswa
│   │   ├── referensi/        # Halaman rujukan pustaka
│   │   ├── refleksi/         # Halaman refleksi nilai
│   │   ├── globals.css       # Definisi gaya global dan variabel tema
│   │   ├── layout.tsx        # Shell tata letak induk dan ornamen latar belakang
│   │   └── page.tsx          # Halaman beranda utama
│   ├── components/           # Komponen modular antarmuka
│   │   ├── AnimatedBackground.tsx
│   │   ├── Card.tsx
│   │   ├── Footer.tsx
│   │   ├── MateriList.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageTransition.tsx
│   │   └── ProfileCard.tsx
│   └── lib/                  # Utilitas logika, query, dan integrasi data
│       ├── actions.ts
│       ├── crud-actions.ts
│       ├── format.ts
│       ├── queries.ts
│       └── supabase.ts
├── supabase/
│   └── schema.sql            # Skrip skema basis data, kebijakan RLS, dan data awal
├── .env.example              # Format variabel lingkungan aman
├── .gitignore                # Berkas proteksi pengabaian berkas rahasia
├── next.config.ts            # Konfigurasi Next.js
├── package.json              # Konfigurasi dependensi dan skrip proyek
├── tailwind.config.ts        # Konfigurasi desain Tailwind
└── tsconfig.json             # Konfigurasi kompilasi TypeScript
```

---

## 4. Panduan Menjalankan Proyek di Lingkungan Lokal

### Prasyarat Sistem
- Node.js versi 18.18 atau lebih baru
- npm (Node Package Manager)
- Git CLI

### Langkah Instalasi

1. Lakukan instalasi seluruh dependensi paket:
   ```bash
   npm install
   ```

2. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
   *Catatan: Bila port 3000 sedang dialokasikan untuk proses lain, gunakan port alternatif:*
   ```bash
   npm run dev -- -p 3001
   ```

3. Akses antarmuka aplikasi melalui peramban:
   `http://localhost:3000` (atau `http://localhost:3001`)

4. Untuk memvalidasi kompilasi produksi:
   ```bash
   npm run build
   npm run start
   ```

---

## 5. Penggunaan Panel Administrasi (CRUD)

Pengelolaan konten materi, tugas karya, dokumentasi kegiatan, dan profil dapat dilakukan secara langsung melalui panel `/admin`:

1. Akses menu **Kelola** pada bilah navigasi atau buka rute `/admin`.
2. **Pengelolaan Materi:**
   - Formulir penambahan materi memuat judul, pertemuan ke-, topik bahasan, slug tautan, ringkasan, dan paragraf pembahasan dalil.
   - Tersedia tombol edit untuk memperbarui teks yang sudah ada.
   - Tersedia tombol hapus untuk menghapus rekaman data materi.
3. **Pengelolaan Karya dan Kegiatan:**
   - Input judul tugas, kategori karya (makalah, slide, video), tautan eksternal, dan tanggal pengerjaan.
   - Input laporan kegiatan keagamaan beserta path dokumentasi foto.
4. **Pembaruan Profil Mahasiswa:**
   - Form pembaruan instan identitas, kelas, nama dosen pengampu, kata pengantar, dan motivasi akademik.
5. **Pemeriksaan Pesan Masuk:**
   - Menampilkan daftar pesan dan masukan yang dikirimkan oleh dosen atau pengunjung melalui form kontak.

---

## 6. Konfigurasi Basis Data (Supabase)

Proyek telah dirancang dengan mekanisme *fallback*, sehingga tetap dapat beroperasi penuh secara lokal tanpa basis data aktif. Untuk menyambungkan ke basis data daring:

1. Buat proyek baru pada konsol [Supabase](https://supabase.com).
2. Akses menu **SQL Editor**, buka berkas `supabase/schema.sql`, salin seluruh kueri, dan eksekusi kueri tersebut.
3. Ambil kredensial proyek melalui **Project Settings** > **API**:
   - Project URL
   - anon / public key
4. Buat berkas baru bernama `.env.local` pada direktori utama proyek (lihat acuan pada `.env.example`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```
5. Muat ulang server pengembangan untuk mengaktifkan koneksi basis data.

---

## 7. Prosedur Deployment ke Vercel

1. Pastikan perubahan kode telah terunggah ke repositori GitHub:
   ```bash
   git add .
   git commit -m "Pembaruan sistem portofolio semester 1"
   git push origin main
   ```
2. Buka dashboard Vercel dan pilih **Import Project**.
3. Hubungkan repositori GitHub yang bersangkutan.
4. Masukkan variabel lingkungan pada bagian **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Tekan tombol **Deploy**. Proses build akan berlangsung secara otomatis dalam 1–2 menit.

---

## 8. Kebijakan Keamanan dan Perlindungan Kredensial

- **Isolasi Berkas Kunci:** Berkas `.env.local` dan seluruh berkas konfigurasi lokal lainnya dikecualikan secara ketat melalui `.gitignore`. Berkas yang terdaftar dalam repositori GitHub publik hanya berkas contoh tanpa nilai kredensial (`.env.example`).
- **Row Level Security (RLS):** Seluruh tabel basis data PostgreSQL pada Supabase menerapkan RLS. Pengunjung umum hanya memiliki hak `SELECT` terhadap materi publik dan hak `INSERT` terbatas pada formulir kontak dengan pembatasan panjang karakter.
- **Tanpa Kunci Administrator di Sisi Klien:** Repositori tidak memuat maupun mengekspos `service_role` key pada bagian mana pun dari kode sumber.
