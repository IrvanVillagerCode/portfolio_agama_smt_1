import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

export const metadata: Metadata = {
  title: "Portofolio Pendidikan Agama | Irvan Agus Saputra",
  description:
    "Kumpulan materi, tugas, kegiatan, dan refleksi mata kuliah Pendidikan Agama - Irvan Agus Saputra, Universitas Pelita Bangsa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${figtree.variable} ${newsreader.variable}`}>
      <body className="relative flex min-h-screen flex-col bg-paper text-ink antialiased selection:bg-moss/20 selection:text-moss">
        {/* Dynamic Liquid Animated Background on every page route change */}
        <AnimatedBackground />

        {/* Floating Liquid Glass Navbar */}
        <Navbar />

        {/* Page Content with Smooth Transition */}
        <main className="relative z-10 flex flex-1 flex-col">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* Liquid Glass Footer */}
        <Footer />
      </body>
    </html>
  );
}
