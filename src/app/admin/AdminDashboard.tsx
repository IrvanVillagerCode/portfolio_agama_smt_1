"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiBriefcase,
  FiCalendar,
  FiUser,
  FiMail,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiExternalLink,
  FiX,
} from "react-icons/fi";
import type { Materi, Karya, Kegiatan, Profil } from "@/lib/queries";
import type { PesanMasuk } from "@/lib/crud-actions";
import {
  createMateri,
  updateMateri,
  deleteMateri,
  createKarya,
  deleteKarya,
  createKegiatan,
  deleteKegiatan,
  updateProfil,
  deletePesan,
} from "@/lib/crud-actions";

type AdminDashboardProps = {
  initialMateri: Materi[];
  initialKarya: Karya[];
  initialKegiatan: Kegiatan[];
  initialProfil: Profil;
  initialPesan: PesanMasuk[];
};

export default function AdminDashboard({
  initialMateri,
  initialKarya,
  initialKegiatan,
  initialProfil,
  initialPesan,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<"materi" | "karya" | "kegiatan" | "profil" | "pesan">("materi");
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form states
  const [editingMateri, setEditingMateri] = useState<Materi | null>(null);
  const [showAddMateri, setShowAddMateri] = useState(false);
  const [showAddKarya, setShowAddKarya] = useState(false);
  const [showAddKegiatan, setShowAddKegiatan] = useState(false);

  function showToast(text: string, type: "success" | "error" = "success") {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  }

  // Handle Create Materi
  async function handleCreateMateri(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createMateri(formData);
      if (res.success) {
        showToast(res.message);
        form.reset();
        setShowAddMateri(false);
      } else {
        showToast(res.message, "error");
      }
    });
  }

  // Handle Update Materi
  async function handleUpdateMateri(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingMateri || !editingMateri.id) return;
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateMateri(editingMateri.id!, formData);
      if (res.success) {
        showToast(res.message);
        setEditingMateri(null);
      } else {
        showToast(res.message, "error");
      }
    });
  }

  // Handle Delete Materi
  function handleDeleteMateri(id: number | undefined, slug: string, judul: string) {
    if (!id) return;
    if (!confirm(`Hapus materi "${judul}"?`)) return;

    startTransition(async () => {
      const res = await deleteMateri(id, slug);
      if (res.success) showToast(res.message);
      else showToast(res.message, "error");
    });
  }

  // Handle Create Karya
  async function handleCreateKarya(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createKarya(formData);
      if (res.success) {
        showToast(res.message);
        form.reset();
        setShowAddKarya(false);
      } else {
        showToast(res.message, "error");
      }
    });
  }

  // Handle Delete Karya
  function handleDeleteKarya(id: number, judul: string) {
    if (!confirm(`Hapus karya "${judul}"?`)) return;

    startTransition(async () => {
      const res = await deleteKarya(id);
      if (res.success) showToast(res.message);
      else showToast(res.message, "error");
    });
  }

  // Handle Create Kegiatan
  async function handleCreateKegiatan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await createKegiatan(formData);
      if (res.success) {
        showToast(res.message);
        form.reset();
        setShowAddKegiatan(false);
      } else {
        showToast(res.message, "error");
      }
    });
  }

  // Handle Delete Kegiatan
  function handleDeleteKegiatan(id: number, judul: string) {
    if (!confirm(`Hapus kegiatan "${judul}"?`)) return;

    startTransition(async () => {
      const res = await deleteKegiatan(id);
      if (res.success) showToast(res.message);
      else showToast(res.message, "error");
    });
  }

  // Handle Update Profil
  async function handleUpdateProfil(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateProfil(formData);
      if (res.success) showToast(res.message);
      else showToast(res.message, "error");
    });
  }

  // Handle Delete Pesan
  function handleDeletePesan(id: number) {
    if (!confirm("Hapus pesan ini?")) return;

    startTransition(async () => {
      const res = await deletePesan(id);
      if (res.success) showToast(res.message);
      else showToast(res.message, "error");
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 border-b border-mist pb-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <span className="liquid-glass-pill inline-block rounded-md px-2.5 py-1 text-xs font-semibold text-moss">
            Panel Pengelola (CRUD)
          </span>
          <h1 className="mt-1 font-serif text-3xl font-bold text-ink sm:text-4xl">
            Kelola Portofolio Agama
          </h1>
          <p className="text-sm text-ink/70">
            Tambah, perbarui, dan hapus data materi, karya, kegiatan, serta pesan masuk.
          </p>
        </div>
      </motion.div>

      {/* Toast Alert with Motion */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`mt-4 flex items-center justify-between rounded-xl p-4 text-sm font-medium shadow-sm ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" ? (
                <FiCheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <FiAlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
              )}
              <span>{toast.text}</span>
            </div>
            <button onClick={() => setToast(null)} className="text-ink/60 hover:text-ink">
              <FiX className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Navigation */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-white/60 pb-3">
        {[
          { id: "materi", label: `Materi (${initialMateri.length})`, icon: FiBook },
          { id: "karya", label: `Karya (${initialKarya.length})`, icon: FiBriefcase },
          { id: "kegiatan", label: `Kegiatan (${initialKegiatan.length})`, icon: FiCalendar },
          { id: "profil", label: "Profil & Motivasi", icon: FiUser },
          { id: "pesan", label: `Pesan (${initialPesan.length})`, icon: FiMail },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = tab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setTab(item.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "liquid-glass-btn text-paper shadow-md"
                  : "liquid-glass text-ink/80 hover:bg-white hover:text-moss"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: MATERI */}
      {/* ==================================================================== */}
      {tab === "materi" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">Daftar Materi Perkuliahan</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddMateri(!showAddMateri)}
              className="flex items-center gap-1.5 rounded-xl bg-moss px-4 py-2 text-sm font-medium text-paper shadow-sm transition-all hover:bg-moss-hover"
            >
              <FiPlus className="h-4 w-4" />
              <span>{showAddMateri ? "Batal" : "Tambah Materi"}</span>
            </motion.button>
          </div>

          {/* Form Tambah Materi with Motion */}
          <AnimatePresence>
            {showAddMateri && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateMateri}
                className="overflow-hidden rounded-2xl border border-moss/30 bg-white p-6 shadow-md space-y-4"
              >
                <h3 className="font-serif text-lg font-bold text-moss">Form Tambah Materi Baru</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">Judul Materi *</label>
                    <input
                      name="judul"
                      required
                      placeholder="Contoh: Hakikat Ibadah dalam Islam"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">Pertemuan Ke- *</label>
                    <input
                      name="pertemuan"
                      type="number"
                      min="1"
                      max="16"
                      defaultValue="4"
                      required
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Topik (Kategori) *</label>
                    <select
                      name="topik"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    >
                      <option value="Akidah">Akidah</option>
                      <option value="Akhlak">Akhlak</option>
                      <option value="Toleransi">Toleransi</option>
                      <option value="Ibadah">Ibadah</option>
                      <option value="Muamalah">Muamalah</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">Slug URL *</label>
                    <input
                      name="slug"
                      required
                      placeholder="contoh: hakikat-ibadah-dalam-islam"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Ringkasan Materi *</label>
                  <textarea
                    name="ringkasan"
                    rows={2}
                    required
                    placeholder="Ringkasan singkat materi untuk ditampilkan pada kartu..."
                    className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">
                    Isi Pembahasan Lengkap (Pisahkan antar paragraf dengan dua kali Enter / baris kosong)
                  </label>
                  <textarea
                    name="isi"
                    rows={5}
                    placeholder="Tuliskan materi komprehensif, kutipan Al-Qur'an, Hadist, serta implementasinya..."
                    className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMateri(false)}
                    className="rounded-lg border border-mist px-4 py-2 text-sm font-medium hover:bg-mist/30"
                  >
                    Batal
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-moss px-5 py-2 text-sm font-medium text-paper hover:bg-moss-hover disabled:opacity-50"
                  >
                    {isPending ? "Menyimpan..." : "Simpan Materi"}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Modal Edit Materi */}
          <AnimatePresence>
            {editingMateri && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
              >
                <motion.form
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onSubmit={handleUpdateMateri}
                  className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-mist pb-3">
                    <h3 className="font-serif text-xl font-bold text-ink">Edit Materi Perkuliahan</h3>
                    <button
                      type="button"
                      onClick={() => setEditingMateri(null)}
                      className="text-ink/60 hover:text-ink"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Judul Materi</label>
                    <input
                      name="judul"
                      defaultValue={editingMateri.judul}
                      required
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink">Pertemuan</label>
                      <input
                        name="pertemuan"
                        type="number"
                        defaultValue={editingMateri.pertemuan}
                        required
                        className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">Topik</label>
                      <input
                        name="topik"
                        defaultValue={editingMateri.topik}
                        required
                        className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">Slug</label>
                      <input
                        name="slug"
                        defaultValue={editingMateri.slug}
                        required
                        className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Ringkasan</label>
                    <textarea
                      name="ringkasan"
                      rows={2}
                      defaultValue={editingMateri.ringkasan}
                      required
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Isi Paragraf Pembahasan (Pisahkan dengan baris kosong)
                    </label>
                    <textarea
                      name="isi"
                      rows={6}
                      defaultValue={editingMateri.isi.join("\n\n")}
                      required
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-mist">
                    <button
                      type="button"
                      onClick={() => setEditingMateri(null)}
                      className="rounded-lg border border-mist px-4 py-2 text-sm font-medium hover:bg-mist/30"
                    >
                      Batal
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      disabled={isPending}
                      className="rounded-lg bg-moss px-5 py-2 text-sm font-medium text-paper hover:bg-moss-hover disabled:opacity-50"
                    >
                      {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                    </motion.button>
                  </div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* List Materi */}
          <div className="divide-y divide-mist rounded-2xl border border-mist bg-white shadow-sm overflow-hidden">
            {initialMateri.map((m) => (
              <motion.div
                key={m.slug}
                whileHover={{ backgroundColor: "rgba(244, 247, 245, 0.6)" }}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                      Pertemuan {m.pertemuan}
                    </span>
                    <span className="rounded bg-moss-light px-2 py-0.5 text-xs font-semibold text-moss">
                      {m.topik}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-lg font-bold text-ink">{m.judul}</h3>
                  <p className="line-clamp-2 text-xs text-ink/70">{m.ringkasan}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingMateri(m)}
                    className="flex items-center gap-1.5 rounded-lg border border-mist px-3 py-1.5 text-xs font-medium text-ink hover:border-moss hover:text-moss transition-colors"
                  >
                    <FiEdit3 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMateri(m.id, m.slug, m.judul)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: KARYA */}
      {/* ==================================================================== */}
      {tab === "karya" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">Daftar Karya & Tugas</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddKarya(!showAddKarya)}
              className="flex items-center gap-1.5 rounded-xl bg-moss px-4 py-2 text-sm font-medium text-paper shadow-sm transition-all hover:bg-moss-hover"
            >
              <FiPlus className="h-4 w-4" />
              <span>{showAddKarya ? "Batal" : "Tambah Karya"}</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {showAddKarya && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateKarya}
                className="overflow-hidden rounded-2xl border border-moss/30 bg-white p-6 shadow-md space-y-4"
              >
                <h3 className="font-serif text-lg font-bold text-moss">Tambah Karya / Tugas Baru</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Judul Karya *</label>
                    <input
                      name="judul"
                      required
                      placeholder="Contoh: Makalah Studi Kasus Toleransi"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">Jenis Karya *</label>
                    <select
                      name="jenis"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    >
                      <option value="makalah">Makalah</option>
                      <option value="slide">Slide Presentasi</option>
                      <option value="video">Video</option>
                      <option value="podcast">Podcast</option>
                      <option value="diskusi">Hasil Diskusi</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Tautan / URL Karya (Opsional)</label>
                    <input
                      name="url"
                      placeholder="https://..."
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">Tanggal Penyelesaian</label>
                    <input
                      name="tanggal"
                      type="date"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Deskripsi Karya</label>
                  <textarea
                    name="deskripsi"
                    rows={2}
                    placeholder="Keterangan singkat mengenai tujuan dan isi karya..."
                    className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddKarya(false)}
                    className="rounded-lg border border-mist px-4 py-2 text-sm font-medium hover:bg-mist/30"
                  >
                    Batal
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-moss px-5 py-2 text-sm font-medium text-paper hover:bg-moss-hover disabled:opacity-50"
                  >
                    {isPending ? "Menyimpan..." : "Simpan Karya"}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid gap-4 sm:grid-cols-2">
            {initialKarya.map((k) => (
              <motion.div
                key={k.id}
                whileHover={{ y: -3 }}
                className="flex flex-col justify-between rounded-2xl border border-mist bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-gold/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold">
                      {k.jenis}
                    </span>
                    <button
                      onClick={() => handleDeleteKarya(k.id, k.judul)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      title="Hapus Karya"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-bold text-ink">{k.judul}</h3>
                  {k.deskripsi && <p className="mt-1.5 text-xs leading-relaxed text-ink/75">{k.deskripsi}</p>}
                </div>

                {k.url && (
                  <a
                    href={k.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-moss hover:underline"
                  >
                    <span>Buka Tautan</span>
                    <FiExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: KEGIATAN */}
      {/* ==================================================================== */}
      {tab === "kegiatan" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">Dokumentasi Kegiatan</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddKegiatan(!showAddKegiatan)}
              className="flex items-center gap-1.5 rounded-xl bg-moss px-4 py-2 text-sm font-medium text-paper shadow-sm transition-all hover:bg-moss-hover"
            >
              <FiPlus className="h-4 w-4" />
              <span>{showAddKegiatan ? "Batal" : "Tambah Kegiatan"}</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {showAddKegiatan && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateKegiatan}
                className="overflow-hidden rounded-2xl border border-moss/30 bg-white p-6 shadow-md space-y-4"
              >
                <h3 className="font-serif text-lg font-bold text-moss">Tambah Kegiatan Keagamaan</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Nama Kegiatan *</label>
                    <input
                      name="judul"
                      required
                      placeholder="Contoh: Kajian Bulanan Mahasiswa"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">Tanggal Pelaksanaan *</label>
                    <input
                      name="tanggal"
                      type="date"
                      required
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Lokasi Kegiatan</label>
                  <input
                    name="lokasi"
                    placeholder="Contoh: Masjid Kampus UPB Bekasi"
                    className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Laporan Ringkas</label>
                  <textarea
                    name="laporan"
                    rows={3}
                    placeholder="Ceritakan jalannya kegiatan, materi kajian, atau aksi bakti sosial..."
                    className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Path / URL Foto (Opsional)</label>
                    <input
                      name="foto_path"
                      placeholder="/images/kegiatan-1.jpg atau URL Supabase"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">Keterangan Foto</label>
                    <input
                      name="foto_ket"
                      placeholder="Contoh: Foto bersama dosen dan mahasiswa"
                      className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddKegiatan(false)}
                    className="rounded-lg border border-mist px-4 py-2 text-sm font-medium hover:bg-mist/30"
                  >
                    Batal
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-moss px-5 py-2 text-sm font-medium text-paper hover:bg-moss-hover disabled:opacity-50"
                  >
                    {isPending ? "Menyimpan..." : "Simpan Kegiatan"}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {initialKegiatan.map((k) => (
              <motion.div
                key={k.id}
                whileHover={{ y: -2 }}
                className="flex flex-col gap-3 rounded-2xl border border-mist bg-white p-5 shadow-sm transition-shadow sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-gold">
                    {k.tanggal} {k.lokasi ? `· ${k.lokasi}` : ""}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-ink">{k.judul}</h3>
                  {k.laporan && <p className="mt-1 text-xs text-ink/75 line-clamp-2">{k.laporan}</p>}
                </div>
                <button
                  onClick={() => handleDeleteKegiatan(k.id, k.judul)}
                  className="flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 shrink-0"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  <span>Hapus</span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: PROFIL */}
      {/* ==================================================================== */}
      {tab === "profil" && (
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleUpdateProfil}
          className="mt-6 rounded-3xl border border-mist bg-white p-6 sm:p-8 shadow-sm space-y-5"
        >
          <div className="border-b border-mist pb-4">
            <h2 className="font-serif text-2xl font-bold text-ink">Perbarui Data Profil Mahasiswa</h2>
            <p className="text-sm text-ink/70">
              Informasi ini tampil di seluruh website termasuk kartu identitas di halaman Beranda.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">Nama Lengkap *</label>
              <input
                name="nama"
                defaultValue={initialProfil.nama}
                required
                className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">NIM *</label>
              <input
                name="nim"
                defaultValue={initialProfil.nim}
                required
                className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-ink">Kelas *</label>
              <input
                name="kelas"
                defaultValue={initialProfil.kelas}
                required
                className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">Program Studi *</label>
              <input
                name="prodi"
                defaultValue={initialProfil.prodi}
                required
                className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">Perguruan Tinggi *</label>
              <input
                name="universitas"
                defaultValue={initialProfil.universitas}
                required
                className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">Dosen Pengampu</label>
            <input
              name="dosen"
              defaultValue={initialProfil.dosen ?? ""}
              placeholder="Nama dosen pengampu mata kuliah..."
              className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">Kata Pengantar</label>
            <textarea
              name="kata_pengantar"
              rows={3}
              defaultValue={initialProfil.kata_pengantar ?? ""}
              className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">Motivasi Belajar</label>
            <textarea
              name="motivasi"
              rows={3}
              defaultValue={initialProfil.motivasi ?? ""}
              className="mt-1 w-full rounded-lg border border-mist px-3.5 py-2 text-sm focus:border-moss focus:outline-none"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-moss px-6 py-2.5 text-sm font-medium text-paper shadow-sm transition-all hover:bg-moss-hover disabled:opacity-50"
          >
            <FiSave className="h-4 w-4" />
            <span>{isPending ? "Menyimpan..." : "Simpan Pembaruan Profil"}</span>
          </motion.button>
        </motion.form>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: PESAN MASUK */}
      {/* ==================================================================== */}
      {tab === "pesan" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">Pesan Dari Form Kontak</h2>
          </div>

          {initialPesan.length === 0 ? (
            <div className="rounded-2xl border border-mist bg-white p-8 text-center text-sm text-ink/65">
              Belum ada pesan yang masuk dari pengunjung.
            </div>
          ) : (
            initialPesan.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-mist bg-white p-5 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-ink">{p.nama}</span>
                    <span className="ml-2 text-xs text-ink/60">&lt;{p.email}&gt;</span>
                  </div>
                  <button
                    onClick={() => handleDeletePesan(p.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                    title="Hapus pesan"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-ink/50">
                  {new Date(p.dibuat).toLocaleString("id-ID")}
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink/80 bg-paper/60 p-3.5 rounded-xl border border-mist/50">
                  {p.isi}
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
