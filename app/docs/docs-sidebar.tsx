"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECTIONS = [
  {
    title: "Sistem",
    links: [
      { id: "pengantar", href: "/docs/pengantar", label: "Pengantar", subLinks: [] },
      { id: "penggunaan", href: "/docs/penggunaan", label: "Cara Penggunaan", subLinks: [
        { id: "backend", label: "Backend API" },
        { id: "frontend", label: "Frontend Web" }
      ] },
      { id: "arsitektur", href: "/docs/arsitektur", label: "Arsitektur Backend", subLinks: [] },
      { id: "arsitektur-frontend", href: "/docs/arsitektur-frontend", label: "Arsitektur Frontend", subLinks: [] },
    ]
  },
  {
    title: "Integrasi",
    links: [
      { id: "api", href: "/docs/api", label: "Referensi API", subLinks: [] },
      { id: "pipeline", href: "/docs/pipeline", label: "Pipeline Deteksi", subLinks: [
        { id: "dekode", label: "Dekode Gambar" },
        { id: "deteksi", label: "Inferensi YOLO" }
      ] },
      { id: "ai-training", href: "/docs/ai-training", label: "Model AI & Integrasi", subLinks: [
        { id: "bagaimana-ai-dilatih", label: "Bagaimana AI Dilatih" },
        { id: "panduan-ekspor", label: "Menambahkan Model Baru" }
      ] },
    ]
  },
  {
    title: "Lainnya",
    links: [
      { id: "catatan", href: "/docs/catatan", label: "Catatan Penting", subLinks: [
        { id: "format", label: "Format Gambar" },
        { id: "memori", label: "Manajemen Memori" },
        { id: "bottleneck", label: "Bottleneck Event Loop" },
        { id: "skalabilitas", label: "Skalabilitas CPU" }
      ] },
      { id: "penanganan-error", href: "/docs/penanganan-error", label: "Penanganan Error", subLinks: [
        { id: "http-400", label: "Validasi Input (400)" },
        { id: "http-422", label: "Skema Tidak Valid (422)" },
        { id: "http-500", label: "Internal Server (500)" },
        { id: "http-503", label: "Inisialisasi Mesin (503)" }
      ] },
    ]
  }
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex flex-col justify-center items-center w-[22px] h-[22px]">
      <span
        className={`absolute h-[2px] w-[16px] bg-current rounded-full transition-all duration-300 ease-out ${
          open ? "rotate-45" : "-translate-y-[5px]"
        }`}
      />
      <span
        className={`absolute h-[2px] w-[16px] bg-current rounded-full transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-[2px] w-[16px] bg-current rounded-full transition-all duration-300 ease-out ${
          open ? "-rotate-45" : "translate-y-[5px]"
        }`}
      />
    </div>
  );
}

function SidebarContent({
  pathname,
  activeSubId,
  scrollToId,
  onNavigate,
}: {
  pathname: string;
  activeSubId: string;
  scrollToId: (id: string) => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-10">
      {SECTIONS.map((section) => (
        <div key={section.title}>
          <h4 className="mb-4 text-sm font-semibold tracking-wide text-zinc-100 uppercase">
            {section.title}
          </h4>
          <nav className="flex flex-col space-y-1.5">
            {section.links.map(link => {
              const isActive = pathname === link.href;
              return (
                <div key={link.id} className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={`text-left text-[15px] py-2 transition-colors ${
                      isActive 
                        ? "text-purple-400 font-medium" 
                        : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                  
                  {isActive && link.subLinks.length > 0 && (
                    <div className="ml-4 pl-4 border-l border-zinc-800 my-2 flex flex-col space-y-2.5">
                      {link.subLinks.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            scrollToId(sub.id);
                            onNavigate?.();
                          }}
                          className={`text-left text-sm py-0.5 transition-colors ${
                            activeSubId === sub.id
                              ? "text-purple-400 font-medium"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [activeSubId, setActiveSubId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const activeLink = SECTIONS.flatMap(s => s.links).find(l => l.href === pathname);
      if (!activeLink || activeLink.subLinks.length === 0) return;

      const subElements = activeLink.subLinks
        .map(sub => document.getElementById(sub.id))
        .filter((el): el is HTMLElement => el !== null);

      let currentActiveId = "";
      let minTop = Infinity;

      for (const el of subElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 250 && (250 - rect.top) < minTop) {
          minTop = 250 - rect.top;
          currentActiveId = el.id;
        }
      }

      if (currentActiveId) {
        setActiveSubId(currentActiveId);
      } else if (subElements.length > 0 && window.scrollY === 0) {
        setActiveSubId(subElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      history.pushState(null, '', `#${id}`);
    }
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── Mobile hamburger toggle ── */}
      <button
        type="button"
        onClick={() => setMobileOpen(prev => !prev)}
        aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        aria-expanded={mobileOpen}
        className="
          fixed left-3 top-3 z-[60] md:hidden
          flex items-center justify-center
          w-10 h-10 rounded-lg
          bg-zinc-900/80 border border-zinc-700/50
          text-zinc-300 shadow-md shadow-black/20
          backdrop-blur-md
          transition-all duration-200
          hover:bg-zinc-800 hover:text-zinc-100
          active:scale-95
        "
      >
        <HamburgerIcon open={mobileOpen} />
      </button>

      {/* ── Mobile overlay backdrop ── */}
      <div
        className={`
          fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm
          md:hidden
          transition-opacity duration-300
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile slide-in sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 z-[58] h-full w-72
          bg-[#09090b]/95 backdrop-blur-xl
          border-r border-zinc-800/50
          overflow-y-auto overscroll-contain
          px-6 pt-20 pb-24
          md:hidden
          transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent
          pathname={pathname}
          activeSubId={activeSubId}
          scrollToId={scrollToId}
          onNavigate={closeMobile}
        />
      </aside>

      {/* ── Desktop sticky sidebar (unchanged) ── */}
      <aside className="w-full md:w-72 flex-col shrink-0 hidden md:flex sticky top-28 z-40 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-hide">
        <SidebarContent
          pathname={pathname}
          activeSubId={activeSubId}
          scrollToId={scrollToId}
        />
      </aside>
    </>
  );
}
