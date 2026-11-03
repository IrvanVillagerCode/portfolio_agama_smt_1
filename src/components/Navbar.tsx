"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSettings } from "react-icons/fi";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/materi", label: "Materi" },
  { href: "/karya", label: "Karya" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/refleksi", label: "Refleksi" },
  { href: "/referensi", label: "Referensi" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-5">
        <nav className="liquid-glass relative flex items-center justify-between rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(31,90,71,0.08)]">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-serif text-xl font-bold text-moss transition-colors"
          >
            <motion.span
              whileHover={{ rotate: 10, scale: 1.08 }}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-moss via-[#174e3d] to-[#0f362a] text-xs font-bold text-paper shadow-[0_4px_12px_rgba(31,90,71,0.3)] border border-white/30"
            >
              IA
            </motion.span>
            <span className="tracking-tight">Irvan A. Saputra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-5 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-medium text-ink/75 transition-all hover:text-moss hover:opacity-100"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/admin"
                className="liquid-glass-pill flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-moss shadow-sm transition-all hover:bg-moss hover:text-paper hover:border-moss"
                title="Kelola data materi, karya, dan kegiatan"
              >
                <FiSettings className="h-3.5 w-3.5" />
                <span>Kelola (CRUD)</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin"
              className="liquid-glass-pill flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-moss"
            >
              <FiSettings className="h-3.5 w-3.5" />
              <span>Kelola</span>
            </Link>
            <button
              className="liquid-glass flex h-9 w-9 items-center justify-center rounded-xl text-ink transition-colors hover:text-moss"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown with Liquid Glass */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="liquid-glass mt-2 overflow-hidden rounded-2xl p-4 shadow-2xl lg:hidden"
            >
              <ul className="divide-y divide-white/40">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 text-sm font-medium text-ink/80 transition-colors hover:text-moss"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
