import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/Landing Page/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const JetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Veil",
    default: "Veil - Proteksi Privasi Foto Cerdas Secara Lokal",
  },
  description: "Aplikasi proteksi privasi foto untuk menyensor wajah, plat nomor, dan area sensitif lainnya 100% secara lokal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${JetBrainsMono.variable} ${interSans.variable} h-full subpixel-antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
