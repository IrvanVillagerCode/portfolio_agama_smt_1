"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

type CardProps = {
  href: string;
  label: string;
  judul: string;
  deskripsi: string;
};

export default function Card({ href, label, judul, deskripsi }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={href}
        className="liquid-glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6"
      >
        {/* Specular Liquid Top Sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/50 to-transparent opacity-60" />

        <div className="relative z-10">
          <span className="liquid-glass-pill inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold text-gold">
            {label}
          </span>
          <h2 className="mt-3 font-serif text-xl font-bold text-ink transition-colors group-hover:text-moss">
            {judul}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">{deskripsi}</p>
        </div>

        <div className="relative z-10 mt-5 flex items-center gap-1.5 text-xs font-semibold text-moss">
          <span>Pelajari materi</span>
          <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
        </div>
      </Link>
    </motion.div>
  );
}
