"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TocSidebar() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // 1. Dapatkan semua elemen heading h2 dan h3 di dalam main
    const headingElements = Array.from(document.querySelectorAll("main h2, main h3"));
    
    const items: TocItem[] = headingElements.map((el) => {
      // Pastikan elemen memiliki ID
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || "";
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      };
    });
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items);

    // 2. Fungsi untuk mendeteksi scroll dan highlight menu yang aktif
    const handleScroll = () => {
      // Deteksi apakah user sudah mentok scroll sampai bawah (toleransi 20px)
      const isBottom = 
        window.innerHeight + Math.round(window.scrollY) >= 
        document.documentElement.scrollHeight - 20;

      if (isBottom && headingElements.length > 0) {
        // Jika sudah mentok bawah, paksa aktifkan elemen terakhir
        setActiveId(headingElements[headingElements.length - 1].id);
        return;
      }

      let currentActiveId = "";
      
      for (const el of headingElements) {
        const rect = el.getBoundingClientRect();
        // 120px dari atas adalah batas deteksi
        if (rect.top <= 120) {
          currentActiveId = el.id;
        }
      }
      
      if (currentActiveId) {
        setActiveId(currentActiveId);
      } else if (headingElements.length > 0) {
        // Default ke item pertama jika di paling atas
        setActiveId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Jalankan sekali saat pertama load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Refresh setiap kali pindah halaman

  if (headings.length === 0) return null;

  return (
    <>
      {/* ── Mobile "On this page" Dropdown ── */}
      <div className="relative lg:hidden">
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700/50 bg-zinc-900/50 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors backdrop-blur-sm shadow-md"
        >
          On this page
          <svg className={`w-4 h-4 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {mobileOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50">
            <div className="flex flex-col max-h-[60vh] overflow-y-auto py-2">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                return (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2 pr-4 text-[13.5px] block truncate transition-colors ${
                      isActive 
                        ? "text-purple-400 font-medium bg-purple-500/10" 
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                    } ${heading.level === 3 ? "pl-8" : "pl-4"}`}
                  >
                    {heading.text}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Desktop TOC Sidebar ── */}
      <aside className="w-56 shrink-0 hidden lg:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h4 className="mb-4 text-sm font-medium text-zinc-300">On this page</h4>
        <div className="border-l border-zinc-800 flex flex-col relative">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`py-2 pr-2 transition-all text-sm border-l-2 -ml-[1px] block truncate ${
                  isActive 
                    ? "border-purple-400 text-purple-400 font-medium" 
                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-500"
                } ${heading.level === 3 ? "pl-8" : "pl-4"}`}
                title={heading.text}
              >
                {heading.text}
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
}
