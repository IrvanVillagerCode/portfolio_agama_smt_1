"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Pemetaan variasi posisi & warna cairan berdasarkan rute halaman
const routeVariants: Record<
  string,
  {
    orb1: { x: number; y: number; scale: number; color: string };
    orb2: { x: number; y: number; scale: number; color: string };
    orb3: { x: number; y: number; scale: number; color: string };
  }
> = {
  "/": {
    orb1: { x: 0, y: 0, scale: 1, color: "from-emerald-300/40 via-moss/25 to-transparent" },
    orb2: { x: 0, y: 0, scale: 1, color: "from-amber-200/40 via-gold/20 to-transparent" },
    orb3: { x: 0, y: 0, scale: 1, color: "from-teal-200/35 via-moss/15 to-transparent" },
  },
  "/profil": {
    orb1: { x: 60, y: 40, scale: 1.15, color: "from-emerald-400/35 via-moss/30 to-transparent" },
    orb2: { x: -50, y: 70, scale: 0.95, color: "from-amber-300/45 via-gold/25 to-transparent" },
    orb3: { x: 30, y: -40, scale: 1.1, color: "from-teal-300/30 via-emerald-200/20 to-transparent" },
  },
  "/materi": {
    orb1: { x: -60, y: 80, scale: 1.2, color: "from-teal-300/40 via-moss/30 to-transparent" },
    orb2: { x: 70, y: -40, scale: 1.1, color: "from-amber-200/35 via-gold/15 to-transparent" },
    orb3: { x: -40, y: 50, scale: 0.9, color: "from-emerald-300/30 via-moss/20 to-transparent" },
  },
  "/karya": {
    orb1: { x: 80, y: -50, scale: 0.9, color: "from-amber-300/45 via-gold/30 to-transparent" },
    orb2: { x: -80, y: 60, scale: 1.2, color: "from-emerald-300/35 via-moss/20 to-transparent" },
    orb3: { x: 50, y: 80, scale: 1.05, color: "from-yellow-200/35 via-amber-100/25 to-transparent" },
  },
  "/kegiatan": {
    orb1: { x: -70, y: 40, scale: 1.1, color: "from-emerald-400/40 via-moss/25 to-transparent" },
    orb2: { x: 60, y: 90, scale: 1.15, color: "from-teal-200/40 via-moss/20 to-transparent" },
    orb3: { x: -30, y: -60, scale: 0.95, color: "from-amber-200/30 via-gold/15 to-transparent" },
  },
  "/galeri": {
    orb1: { x: 50, y: 90, scale: 1.25, color: "from-teal-300/45 via-emerald-400/30 to-transparent" },
    orb2: { x: -90, y: -40, scale: 1.1, color: "from-emerald-200/40 via-moss/20 to-transparent" },
    orb3: { x: 40, y: 40, scale: 1.1, color: "from-amber-300/35 via-gold/20 to-transparent" },
  },
  "/refleksi": {
    orb1: { x: 40, y: -70, scale: 1.1, color: "from-emerald-300/35 via-moss/20 to-transparent" },
    orb2: { x: -40, y: 50, scale: 1.05, color: "from-teal-200/35 via-emerald-100/25 to-transparent" },
    orb3: { x: 60, y: 30, scale: 1.15, color: "from-amber-200/35 via-gold/20 to-transparent" },
  },
  "/referensi": {
    orb1: { x: -50, y: -30, scale: 1.05, color: "from-teal-300/35 via-moss/20 to-transparent" },
    orb2: { x: 50, y: 60, scale: 1.1, color: "from-emerald-300/35 via-moss/25 to-transparent" },
    orb3: { x: -20, y: 80, scale: 0.95, color: "from-amber-200/30 via-gold/15 to-transparent" },
  },
  "/kontak": {
    orb1: { x: 70, y: 50, scale: 1.15, color: "from-emerald-300/40 via-moss/30 to-transparent" },
    orb2: { x: -60, y: -50, scale: 1.05, color: "from-amber-300/40 via-gold/20 to-transparent" },
    orb3: { x: 30, y: 60, scale: 1.2, color: "from-teal-200/35 via-moss/20 to-transparent" },
  },
  "/admin": {
    orb1: { x: -80, y: 30, scale: 1.2, color: "from-moss/40 via-[#133e31]/30 to-transparent" },
    orb2: { x: 80, y: -40, scale: 1.15, color: "from-gold/35 via-amber-200/20 to-transparent" },
    orb3: { x: 0, y: 70, scale: 1.1, color: "from-emerald-300/35 via-moss/25 to-transparent" },
  },
};

export default function AnimatedBackground() {
  const pathname = usePathname();

  // Dapatkan konfigurasi orbs untuk rute saat ini (atau default jika dynamic [slug])
  const activeKey = Object.keys(routeVariants).find((k) =>
    k === "/" ? pathname === "/" : pathname.startsWith(k)
  ) || "/";
  const config = routeVariants[activeKey] || routeVariants["/"];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gelombang Transisi Halus Saat Rute Berubah */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0.4, scale: 0.92 }}
          animate={{ opacity: 0, scale: 1.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full bg-radial from-emerald-200/25 via-gold/10 to-transparent blur-3xl"
        />
      </AnimatePresence>

      {/* Orb 1: Cairan Emerald-Moss (Kiri Atas) */}
      <motion.div
        animate={{
          x: config.orb1.x,
          y: config.orb1.y,
          scale: config.orb1.scale,
        }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -left-24 -top-24 h-[550px] w-[550px]"
      >
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`h-full w-full rounded-full bg-gradient-to-br ${config.orb1.color} blur-3xl`}
        />
      </motion.div>

      {/* Orb 2: Cairan Amber-Gold (Kanan Atas) */}
      <motion.div
        animate={{
          x: config.orb2.x,
          y: config.orb2.y,
          scale: config.orb2.scale,
        }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -right-28 -top-20 h-[580px] w-[580px]"
      >
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`h-full w-full rounded-full bg-gradient-to-bl ${config.orb2.color} blur-3xl`}
        />
      </motion.div>

      {/* Orb 3: Cairan Teal-Sage (Tengah - Bawah) */}
      <motion.div
        animate={{
          x: config.orb3.x,
          y: config.orb3.y,
          scale: config.orb3.scale,
        }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 h-[650px] w-[650px]"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 12, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`h-full w-full rounded-full bg-gradient-to-tr ${config.orb3.color} blur-3xl`}
        />
      </motion.div>

      {/* Orb 4: Cairan Bawah Permanen untuk Konsistensi Footer */}
      <div className="absolute -bottom-36 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-t from-emerald-100/40 via-moss/10 to-transparent blur-3xl" />
    </div>
  );
}

