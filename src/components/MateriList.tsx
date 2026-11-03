"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import type { Materi } from "@/lib/queries";
import { FiFilter } from "react-icons/fi";

export default function MateriList({ materi }: { materi: Materi[] }) {
  const daftarTopik = ["Semua", ...Array.from(new Set(materi.map((m) => m.topik)))];
  const [aktif, setAktif] = useState("Semua");

  const tampil = aktif === "Semua" ? materi : materi.filter((m) => m.topik === aktif);

  return (
    <>
      {/* Filter Tabs with Motion */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/60">
          <FiFilter className="h-3.5 w-3.5 text-moss" /> Filter:
        </span>
        {daftarTopik.map((t) => (
          <motion.button
            key={t}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAktif(t)}
            aria-pressed={aktif === t}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              aktif === t
                ? "border-moss bg-moss text-paper shadow-sm"
                : "border-mist bg-white text-ink/80 hover:border-moss/70 hover:bg-mist/30"
            }`}
          >
            {t}
          </motion.button>
        ))}
      </div>

      {/* Grid Materi with Framer Motion AnimatePresence */}
      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {tampil.map((m) => (
            <motion.div
              key={m.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                href={`/materi/${m.slug}`}
                label={`Pertemuan ${m.pertemuan} · ${m.topik}`}
                judul={m.judul}
                deskripsi={m.ringkasan}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {tampil.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-ink/70"
        >
          Belum ada materi untuk topik ini.
        </motion.p>
      )}
    </>
  );
}
