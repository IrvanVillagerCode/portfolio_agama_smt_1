# Portofolio Pendidikan Agama Islam

Website portofolio mata kuliah Pendidikan Agama Islam berbasis **Next.js 15 (App Router)**, **React 19**, **Supabase (PostgreSQL)**, **Tailwind CSS**, **Framer Motion**, dan **React Icons** dengan estetika modern **Liquid Glass (Glassmorphism)**.

- **Pemilik:** Irvan Agus Saputra
- **NIM:** 312410263
- **Kelas:** I246A
- **Program Studi:** Teknik Informatika
- **Perguruan Tinggi:** Universitas Pelita Bangsa (UPB Bekasi)

---

## 🌟 Fitur Utama Website

| Halaman | Rute | Fitur & Deskripsi |
|---|---|---|
| **Beranda** | `/` | Hero section, Liquid Glass Profile Card, navigasi cepat, dan materi terbaru |
| **Profil** | `/profil` | Biodata lengkap, foto profil, kartu identitas UPB, kata pengantar, dan motivasi |
| **Materi** | `/materi` | Rangkuman perkuliahan dengan filter topik interaktif (Akidah, Akhlak, Toleransi) |
| **Detail Materi** | `/materi/[slug]` | Pembahasan materi lengkap per pertemuan beserta dalil Al-Qur'an dan Hadits |
| **Karya & Tugas** | `/karya` | Makalah UTS, slide presentasi kelompok, dan tautan video edukatif |
| **Kegiatan** | `/kegiatan` | Dokumentasi kegiatan keagamaan, kajian kampus, dan aksi bakti sosial |
| **Galeri** | `/galeri` | Kumpulan dokumentasi foto kegiatan dengan kartu kaca translusen |
| **Refleksi** | `/refleksi` | Perenungan spiritual, pengamalan nilai akhlak, dan rencana ke depan |
| **Referensi** | `/referensi` | Daftar pustaka kitab suci, hadits, jurnal ilmiah, dan literatur digital |
| **Kontak** | `/kontak` | Formulir pesan langsung terhubung ke database Supabase |
| **Kelola (CRUD)** | `/admin` | Panel pengelola mandiri untuk Menambah, Mengedit, dan Menghapus data |

---

## 💎 Desain & Teknologi

1. **Liquid Glass Aesthetic:**
   - Permukaan kaca transparan dengan efek `backdrop-blur`, refleksi cahaya specular ganda, dan border bias kristal.
   - Ornamen cairan cahaya berwarna di latar belakang (*ambient fluid gradient orbs*) yang menyinari permukaan kaca dari belakang.
2. **Framer Motion & Animated Background:**
   - Latar belakang cairan cahaya bergerak (*glide & morph*) secara otomatis setiap kali berpindah halaman.
   - Transisi halaman halus (`PageTransition`) dengan `<AnimatePresence>`.
   - Efek fisika pegas (*spring transition*) pada kartu profil dan tombol filter materi.
3. **React Icons:**
   - Ikon modern dan konsisten dari `react-icons/fi` dan `react-icons/hi2`.
4. **Keamanan Tanpa Kompromi (Security First):**
   - **Row Level Security (RLS)** aktif di seluruh 9 tabel Supabase.
   - File `.env.local` dan seluruh variabel lingkungan diabaikan secara ketat oleh `.gitignore`.
   - Kunci admin rahasia (`service_role`) **tidak pernah** dimasukkan ke dalam kode.

---

## 🚀 Panduan Cara Menggunakan & Menjalankan Proyek

### 1. Menjalankan di Komputer Lokal (Development)

1. Buka terminal di folder proyek ini (`Portofolio-Agama`).
2. Pasang dependensi (jika belum):
   ```bash
   npm install
   ```
3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
   *(Jika port 3000 sedang terpakai, gunakan port 3001: `npm run dev -- -p 3001`)*
4. Buka browser di:
   👉 **`http://localhost:3000`** (atau `http://localhost:3001`)

---

### 2. Cara Menggunakan Panel Pengelola (CRUD)

Anda dapat mengelola seluruh isi website tanpa perlu membuka kodingan:
1. Klik tombol **"⚙️ Kelola"** di navigasi kanan atas atau kunjungi rute **`/admin`**.
2. **Kelola Materi:**
   - Klik **Tambah Materi** untuk mengisi materi baru (Judul, Pertemuan, Topik, Slug, Ringkasan, Paragraf Isi).
   - Klik **Edit** pada materi mana pun untuk memperbarui isinya.
   - Klik **Hapus** untuk menghapus materi.
3. **Kelola Karya & Tugas:**
   - Tambahkan makalah, slide, atau video tugas Anda beserta tautan URL-nya.
4. **Kelola Kegiatan:**
   - Masukkan kegiatan baru, tanggal, lokasi, laporan singkat, dan path foto.
5. **Perbarui Profil:**
   - Ubah Nama, NIM, Kelas, Dosen Pengampu, Kata Pengantar, atau Motivasi Belajar secara instan.
6. **Lihat Pesan Masuk:**
   - Baca pesan yang dikirimkan oleh dosen atau pengunjung melalui form `/kontak`.

---

### 3. Menghubungkan ke Database Supabase (Online)

Proyek ini sudah dilengkapi data cadangan (*fallback* bawaan) sehingga dapat langsung berjalan offline. Jika Anda ingin menghubungkannya ke Supabase:

1. Buka [Supabase](https://supabase.com) dan buat proyek baru (*Region: Singapore*).
2. Buka menu **SQL Editor** &rarr; klik **New query**.
3. Buka file [`supabase/schema.sql`](supabase/schema.sql) di repositori ini, salin seluruh isinya, lalu klik **Run**.
4. Buka **Project Settings** &rarr; **API** di Supabase, lalu salin:
   - **Project URL**
   - **anon / public key**
5. Buat file `.env.local` di folder utama (lihat contoh di `.env.example`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```
6. Jalankan ulang server `npm run dev`. Website kini tersambung ke database online Supabase!

---

### 4. Cara Deploy ke Vercel (Online Publik)

1. Pastikan kode sudah ter-push ke GitHub:
   ```bash
   git add .
   git commit -m "Update portofolio ke Next.js Liquid Glass"
   git push origin main
   ```
2. Buka [Vercel](https://vercel.com) dan login dengan akun GitHub Anda.
3. Klik **Add New...** &rarr; **Project** &rarr; pilih repository **Portofolio-Agama**.
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Klik **Deploy**. Website Anda akan online dalam 1–2 menit dengan URL publik gratis Vercel.

---

## 🔒 Catatan Keamanan
- File `.env.local` yang berisi kunci rahasia telah masuk daftar `.gitignore` dan **TIDAK PERNAH** terunggah ke GitHub.
- Repositori publik hanya memuat file `.env.example` sebagai panduan konfigurasi.
