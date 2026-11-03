"use server";

import { revalidatePath } from "next/cache";
import { supabase, isSupabaseConfigured } from "./supabase";

export type ActionResponse = {
  success: boolean;
  message: string;
};

// ==============================================================================
// CRUD: MATERI
// ==============================================================================

export async function createMateri(formData: FormData): Promise<ActionResponse> {
  const judul = String(formData.get("judul") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const pertemuan = Number(formData.get("pertemuan") ?? 1);
  const topikNama = String(formData.get("topik") ?? "Akhlak").trim();
  const ringkasan = String(formData.get("ringkasan") ?? "").trim();
  const isiRaw = String(formData.get("isi") ?? "").trim();

  if (!judul || !slug || !ringkasan) {
    return { success: false, message: "Judul, slug, dan ringkasan wajib diisi." };
  }

  // Pisahkan paragraf berdasarkan baris kosong
  const isi = isiRaw
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  if (isSupabaseConfigured) {
    try {
      // Pastikan topik ada atau ambil id topik
      let topikId: number | null = null;
      const { data: topikData } = await supabase
        .from("topik")
        .select("id")
        .eq("nama", topikNama)
        .maybeSingle();

      if (topikData) {
        topikId = topikData.id;
      } else {
        const { data: newTopik } = await supabase
          .from("topik")
          .insert({ nama: topikNama })
          .select("id")
          .single();
        if (newTopik) topikId = newTopik.id;
      }

      const { error } = await supabase.from("materi").insert({
        judul,
        slug,
        pertemuan,
        topik_id: topikId,
        ringkasan,
        isi: isi.length > 0 ? isi : [ringkasan],
      });

      if (error) {
        return { success: false, message: `Gagal menyimpan materi: ${error.message}` };
      }
    } catch (err: any) {
      return { success: false, message: err.message || "Gagal menyimpan materi ke database." };
    }
  }

  revalidatePath("/");
  revalidatePath("/materi");
  revalidatePath(`/materi/${slug}`);
  return { success: true, message: "Materi berhasil ditambahkan!" };
}

export async function updateMateri(id: number, formData: FormData): Promise<ActionResponse> {
  const judul = String(formData.get("judul") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const pertemuan = Number(formData.get("pertemuan") ?? 1);
  const topikNama = String(formData.get("topik") ?? "Akhlak").trim();
  const ringkasan = String(formData.get("ringkasan") ?? "").trim();
  const isiRaw = String(formData.get("isi") ?? "").trim();

  if (!judul || !slug || !ringkasan) {
    return { success: false, message: "Judul, slug, dan ringkasan wajib diisi." };
  }

  const isi = isiRaw
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  if (isSupabaseConfigured) {
    try {
      let topikId: number | null = null;
      const { data: topikData } = await supabase
        .from("topik")
        .select("id")
        .eq("nama", topikNama)
        .maybeSingle();

      if (topikData) {
        topikId = topikData.id;
      } else {
        const { data: newTopik } = await supabase
          .from("topik")
          .insert({ nama: topikNama })
          .select("id")
          .single();
        if (newTopik) topikId = newTopik.id;
      }

      const { error } = await supabase
        .from("materi")
        .update({
          judul,
          slug,
          pertemuan,
          topik_id: topikId,
          ringkasan,
          isi: isi.length > 0 ? isi : [ringkasan],
        })
        .eq("id", id);

      if (error) {
        return { success: false, message: `Gagal memperbarui materi: ${error.message}` };
      }
    } catch (err: any) {
      return { success: false, message: err.message || "Gagal memperbarui materi." };
    }
  }

  revalidatePath("/");
  revalidatePath("/materi");
  revalidatePath(`/materi/${slug}`);
  return { success: true, message: "Materi berhasil diperbarui!" };
}

export async function deleteMateri(id: number, slug: string): Promise<ActionResponse> {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from("materi").delete().eq("id", id);
      if (error) return { success: false, message: error.message };
    } catch (err: any) {
      return { success: false, message: err.message || "Gagal menghapus materi." };
    }
  }

  revalidatePath("/");
  revalidatePath("/materi");
  revalidatePath(`/materi/${slug}`);
  return { success: true, message: "Materi berhasil dihapus!" };
}

// ==============================================================================
// CRUD: KARYA
// ==============================================================================

export async function createKarya(formData: FormData): Promise<ActionResponse> {
  const judul = String(formData.get("judul") ?? "").trim();
  const jenis = String(formData.get("jenis") ?? "makalah") as any;
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim() || null;
  const tanggal = String(formData.get("tanggal") ?? "").trim() || null;

  if (!judul) return { success: false, message: "Judul karya wajib diisi." };

  if (isSupabaseConfigured) {
    const { error } = await supabase.from("karya").insert({
      judul,
      jenis,
      deskripsi,
      url,
      tanggal,
    });
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/karya");
  return { success: true, message: "Karya/tugas berhasil ditambahkan!" };
}

export async function deleteKarya(id: number): Promise<ActionResponse> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("karya").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/karya");
  return { success: true, message: "Karya berhasil dihapus!" };
}

// ==============================================================================
// CRUD: KEGIATAN
// ==============================================================================

export async function createKegiatan(formData: FormData): Promise<ActionResponse> {
  const judul = String(formData.get("judul") ?? "").trim();
  const tanggal = String(formData.get("tanggal") ?? "").trim();
  const lokasi = String(formData.get("lokasi") ?? "").trim() || null;
  const laporan = String(formData.get("laporan") ?? "").trim() || null;
  const fotoPath = String(formData.get("foto_path") ?? "").trim();
  const fotoKet = String(formData.get("foto_ket") ?? "").trim() || null;

  if (!judul || !tanggal) {
    return { success: false, message: "Judul kegiatan dan tanggal wajib diisi." };
  }

  if (isSupabaseConfigured) {
    const { data: newKegiatan, error } = await supabase
      .from("kegiatan")
      .insert({ judul, tanggal, lokasi, laporan })
      .select("id")
      .single();

    if (error) return { success: false, message: error.message };

    if (fotoPath && newKegiatan) {
      await supabase.from("foto").insert({
        kegiatan_id: newKegiatan.id,
        path: fotoPath,
        alt: judul,
        keterangan: fotoKet,
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/kegiatan");
  revalidatePath("/galeri");
  return { success: true, message: "Kegiatan berhasil ditambahkan!" };
}

export async function deleteKegiatan(id: number): Promise<ActionResponse> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("kegiatan").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/");
  revalidatePath("/kegiatan");
  revalidatePath("/galeri");
  return { success: true, message: "Kegiatan berhasil dihapus!" };
}

// ==============================================================================
// CRUD: PROFIL
// ==============================================================================

export async function updateProfil(formData: FormData): Promise<ActionResponse> {
  const nama = String(formData.get("nama") ?? "").trim();
  const nim = String(formData.get("nim") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const prodi = String(formData.get("prodi") ?? "").trim();
  const universitas = String(formData.get("universitas") ?? "").trim();
  const dosen = String(formData.get("dosen") ?? "").trim() || null;
  const kata_pengantar = String(formData.get("kata_pengantar") ?? "").trim() || null;
  const motivasi = String(formData.get("motivasi") ?? "").trim() || null;

  if (!nama || !nim || !kelas) {
    return { success: false, message: "Nama, NIM, dan Kelas wajib diisi." };
  }

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("profil")
      .upsert({
        id: 1,
        nama,
        nim,
        kelas,
        prodi,
        universitas,
        dosen,
        kata_pengantar,
        motivasi,
      });

    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/");
  revalidatePath("/profil");
  return { success: true, message: "Profil berhasil diperbarui!" };
}

// ==============================================================================
// PESAN MASUK
// ==============================================================================

export type PesanMasuk = {
  id: number;
  nama: string;
  email: string;
  isi: string;
  dibuat: string;
};

export async function getPesanList(): Promise<PesanMasuk[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from("pesan")
      .select("*")
      .order("dibuat", { ascending: false });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function deletePesan(id: number): Promise<ActionResponse> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("pesan").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
  }

  revalidatePath("/admin");
  return { success: true, message: "Pesan berhasil dihapus." };
}

