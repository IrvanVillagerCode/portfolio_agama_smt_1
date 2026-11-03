import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-agam-smt-1.vercel.app";

export const viewport: Viewport = {
  themeColor: "#1f5a47",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Portofolio Pendidikan Agama Islam | Irvan Agus Saputra",
    template: "%s | Irvan Agus Saputra - UPB",
  },
  description:
    "Website portofolio resmi mata kuliah Pendidikan Agama Islam semester 1 oleh Irvan Agus Saputra (NIM: 312410263, Kelas: I246A), mahasiswa Teknik Informatika Universitas Pelita Bangsa. Memuat rangkuman materi, makalah, kegiatan, dan refleksi.",
  keywords: [
    "Irvan Agus Saputra",
    "312410263",
    "I246A",
    "Universitas Pelita Bangsa",
    "UPB Bekasi",
    "Teknik Informatika",
    "Pendidikan Agama Islam",
    "Portofolio Pendidikan Agama",
    "Materi Agama Islam Kuliah",
    "Berbakti kepada Orang Tua",
    "Akhlak Terhadap Guru",
    "Toleransi dalam Beragama",
    "Makalah Agama Islam",
  ],
  authors: [{ name: "Irvan Agus Saputra", url: "https://github.com/IrvanVillagerCode" }],
  creator: "Irvan Agus Saputra",
  publisher: "Universitas Pelita Bangsa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "google26f0653b3ddcb87f",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: "Portofolio Pendidikan Agama Islam | Irvan Agus Saputra",
    description:
      "Dokumentasi pembelajaran, rangkuman materi, tugas karya, dan refleksi nilai Pendidikan Agama Islam - Irvan Agus Saputra (Universitas Pelita Bangsa).",
    siteName: "Portofolio Agama - Irvan Agus Saputra",
    images: [
      {
        url: "/images/pas-foto.jpg",
        width: 600,
        height: 600,
        alt: "Irvan Agus Saputra - Mahasiswa Teknik Informatika UPB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portofolio Pendidikan Agama Islam | Irvan Agus Saputra",
    description:
      "Dokumentasi pembelajaran, rangkuman materi, tugas karya, dan refleksi nilai Pendidikan Agama Islam - Irvan Agus Saputra, Universitas Pelita Bangsa.",
    images: ["/images/pas-foto.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema.org Structured Data (JSON-LD) untuk Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Irvan Agus Saputra",
        identifier: "312410263",
        jobTitle: "Mahasiswa Teknik Informatika",
        worksFor: {
          "@type": "CollegeOrUniversity",
          name: "Universitas Pelita Bangsa",
          url: "https://pelitabangsa.ac.id",
        },
        image: `${siteUrl}/images/pas-foto.jpg`,
        sameAs: ["https://github.com/IrvanVillagerCode"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Portofolio Pendidikan Agama Islam - Irvan Agus Saputra",
        description:
          "Dokumentasi materi perkuliahan, karya tugas, dan kegiatan Pendidikan Agama Islam Universitas Pelita Bangsa.",
        inLanguage: "id-ID",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "Course",
        name: "Pendidikan Agama Islam",
        description:
          "Mata kuliah pengembangan kepribadian dan penguatan integritas spiritual mahasiswa di perguruan tinggi.",
        provider: {
          "@type": "CollegeOrUniversity",
          name: "Universitas Pelita Bangsa",
        },
      },
    ],
  };

  return (
    <html lang="id" className={`${figtree.variable} ${newsreader.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
