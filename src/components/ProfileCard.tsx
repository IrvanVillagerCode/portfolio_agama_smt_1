"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiCheckBadge, HiAcademicCap, HiSparkles, HiMapPin } from "react-icons/hi2";
import { FiMail, FiArrowRight } from "react-icons/fi";
import type { Profil } from "@/lib/queries";

type ProfileCardProps = {
  profil: Profil;
  compact?: boolean;
};

export default function ProfileCard({ profil, compact = false }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="liquid-glass group relative overflow-hidden rounded-3xl p-1 shadow-[0_20px_50px_rgba(31,90,71,0.12)] transition-all duration-300"
    >
      {/* Specular Liquid Top Sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 via-white/10 to-transparent opacity-80" />

      {/* Background Banner Header with Frosted Liquid Gradient */}
      <div className="relative h-28 w-full overflow-hidden rounded-t-[22px] bg-gradient-to-r from-moss/90 via-[#184f3e]/90 to-[#0e3428]/95 px-5 py-3 text-paper sm:h-32 backdrop-blur-xl border-b border-white/20">
        {/* Animated Liquid Light Orb */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-gradient-to-br from-gold/40 via-amber-200/30 to-transparent blur-2xl"
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white/25 p-0.5 shadow-sm border border-white/40">
              <Image
                src="/images/logo-upb.png"
                alt="Logo Universitas Pelita Bangsa"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-paper/95 drop-shadow-sm sm:text-xs">
              {profil.universitas}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] backdrop-blur-md border border-white/30 shadow-sm sm:text-xs">
            <HiSparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="font-medium text-white">Portofolio Akademik</span>
          </div>
        </div>
      </div>

      {/* Profile Body with Liquid Glass Backdrop */}
      <div className="relative px-5 pb-6 pt-0 sm:px-6">
        {/* Avatar & Class Badge Row */}
        <div className="-mt-12 mb-3 flex items-end justify-between sm:-mt-14">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-white/95 bg-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.15)] backdrop-blur-md sm:h-28 sm:w-28"
            >
              <Image
                src="/images/pas-foto.jpg"
                alt={`Foto profil ${profil.nama}`}
                fill
                priority
                sizes="(min-width: 640px) 112px, 96px"
                className="object-cover"
              />
            </motion.div>

            {/* Glowing Active Status Indicator */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              title="Mahasiswa Aktif"
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-md"
            >
              <div className="h-2 w-2 rounded-full bg-white" />
            </motion.div>
          </div>

          <div className="pb-1">
            <span className="liquid-glass-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-moss shadow-sm border border-moss/20">
              <HiAcademicCap className="h-4 w-4" />
              Kelas {profil.kelas}
            </span>
          </div>
        </div>

        {/* Identity Details */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {profil.nama}
            </h2>
            <span title="Identitas Terverifikasi" className="inline-flex">
              <HiCheckBadge className="h-5 w-5 text-moss shrink-0 sm:h-6 sm:w-6" />
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-gold sm:text-sm">
            NIM: {profil.nim} · {profil.prodi}
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/70">
            <HiMapPin className="h-3.5 w-3.5 text-moss shrink-0" />
            <span>{profil.universitas} (Bekasi, Jawa Barat)</span>
          </p>
        </div>

        {/* Liquid Frosted Stats Pills - Perfectly Balanced, No Overflows */}
        {!compact && (
          <div className="mt-5 grid grid-cols-3 gap-2.5 border-y border-white/60 py-3 text-center">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="liquid-glass flex flex-col justify-center rounded-2xl px-2 py-2.5 shadow-sm"
            >
              <span className="font-serif text-lg font-bold text-moss sm:text-xl">14</span>
              <span className="text-[11px] font-medium text-ink/70">Pertemuan</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="liquid-glass flex flex-col justify-center rounded-2xl px-2 py-2.5 shadow-sm"
            >
              <span className="font-serif text-lg font-bold text-moss sm:text-xl">3+</span>
              <span className="text-[11px] font-medium text-ink/70">Karya Tugas</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="liquid-glass flex flex-col justify-center rounded-2xl px-2 py-2.5 shadow-sm"
            >
              <span className="font-serif text-lg font-bold text-moss sm:text-xl">2</span>
              <span className="text-[11px] font-medium text-ink/70">Kegiatan</span>
            </motion.div>
          </div>
        )}

        {/* Liquid Action Buttons */}
        <div className="mt-5 flex gap-2.5">
          <Link
            href="/profil"
            className="liquid-glass-btn flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-paper sm:text-sm active:scale-98"
          >
            <span>Biodata Lengkap</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/kontak"
            className="liquid-glass flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-ink shadow-sm transition-all hover:bg-white hover:text-moss sm:text-sm active:scale-98"
            title="Kirim pesan langsung ke mahasiswa"
          >
            <FiMail className="h-4 w-4 text-moss" />
            <span>Kontak</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
