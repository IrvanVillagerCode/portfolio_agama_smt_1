"use server";

import { redirect } from "next/navigation";
import { supabase, isSupabaseConfigured } from "./supabase";

export async function kirimPesan(formData: FormData): Promise<void> {
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const isi = String(formData.get("isi") ?? "").trim();

  if (!nama || !email || !isi) {
    redirect("/kontak?status=kosong");
  }

  if (isSupabaseConfigured) {
    const { error } = await supabase.from("pesan").insert({ nama, email, isi });
    if (error) {
      console.error("Gagal mengirim pesan ke Supabase:", error);
      redirect("/kontak?status=gagal");
    }
  }

  redirect("/kontak?status=ok");
}

