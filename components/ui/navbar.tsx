"use client"

import { useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex flex-col justify-center items-center w-[24px] h-[24px]">
      <span
        className={`absolute h-[2px] w-[20px] bg-current rounded-full transition-all duration-300 ease-out ${
          open ? "rotate-45" : "-translate-y-[6px]"
        }`}
      />
      <span
        className={`absolute h-[2px] w-[20px] bg-current rounded-full transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-[2px] w-[20px] bg-current rounded-full transition-all duration-300 ease-out ${
          open ? "-rotate-45" : "translate-y-[6px]"
        }`}
      />
    </div>
  );
}

export default function Navbar(){
    const pathname = usePathname();
    const isDocs = pathname?.startsWith("/docs");
    const isBlur = pathname?.startsWith("/blur");
    
    const [darkSection, setDarkSection] = useState(true);
    const [darkSection1, serDarkSection1] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navmenu = [
        {
            id : "1",
            title : "Home",
            href : "/"
        },
        {
            id : "2",
            title : "Preview",
            href : "/#preview"
        },
        {
            id : "3",
            title : "About",
            href : "/#about"
        },
        {
            id : "4",
            title : "Docs",
            href : "/docs"
        }
    ]
    return(
        <nav className="flex">
            {/* logo */}
            <div className={`fixed left-6 md:left-10 top-3 z-[60] flex items-center gap-1.5 md:gap-2 ${!(isDocs || isBlur) ? 'mix-blend-difference text-white' : 'text-white'}`}>
                <Link href="/">
                    <h1 className="font-bold text-2xl">Veil</h1>
                </Link>
                {isDocs && (
                    <div className="flex items-center gap-1">
                        <span className="text-zinc-500 font-light text-xl -mt-0.5 mx-0.5">/</span>
                        <Link href="/docs" className="font-medium text-lg hover:text-zinc-300 transition-colors mr-0.5">Docs</Link>
                        <button 
                            onClick={() => window.dispatchEvent(new Event('openDocsSidebar'))}
                            className="md:hidden p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors"
                            aria-label="Buka menu dokumentasi"
                        >
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                )}
                {isBlur && (
                    <div className="flex items-center gap-1">
                        <span className="text-zinc-500 font-light text-xl -mt-0.5 mx-0.5">/</span>
                        <Link href="/blur" className="font-medium text-lg hover:text-zinc-300 transition-colors">Blur</Link>
                    </div>
                )}
            </div>

            <div className="hidden md:flex fixed left-1/2 top-3 -translate-x-1/2 z-50 gap-2 lg:gap-4 mix-blend-difference">
                {navmenu.map((menu) => (
                    <Link key={menu.id} href={menu.href}>
                        <Button 
                        className={`
                        ${darkSection1
                            ? "bg-white text-black hover:bg-zinc-300"
                            : "bg-black text-white"}
                        rounded-lg font-mono text-sm
                        `}>
                            {menu.title}
                        </Button>
                    </Link>
                ))}
            </div>

            <div className="hidden md:block fixed right-6 top-3 z-50 mix-blend-difference">
                <Link href="/blur">
                    <Button className={`
                        ${darkSection
                            ? "bg-white text-black hover:bg-zinc-300"
                            : "bg-black text-white"}
                        rounded-lg font-mono text-sm
                        `}
                    >Unggah & Sensor Foto</Button>
                </Link>
            </div>

            {/* tombol hamburger buat hp */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="
                    fixed right-4 top-3 z-[60] md:hidden
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
                <HamburgerIcon open={isMobileMenuOpen} />
            </button>

            {/* overlay background item pas menu hp kebuka */}
            <div
                className={`
                    fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm
                    md:hidden transition-opacity duration-300
                    ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* menu sidebar hp yg bisa geser masuk */}
            <div 
                className={`
                    md:hidden fixed top-0 right-0 z-[58] h-full w-72
                    bg-[#09090b]/95 backdrop-blur-xl
                    border-l border-zinc-800/50
                    overflow-y-auto overscroll-contain
                    px-6 pt-24 pb-24
                    flex flex-col gap-4
                    transition-transform duration-300 ease-out
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {navmenu.map((menu) => (
                    <Link 
                        key={menu.id} 
                        href={menu.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-zinc-300 text-[17px] font-medium hover:text-white transition-colors py-3 border-b border-zinc-800/50"
                    >
                        {menu.title}
                    </Link>
                ))}
                <Link href="/blur" onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
                    <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-lg font-mono text-sm py-6">
                        Unggah & Sensor Foto
                    </Button>
                </Link>
            </div>
        </nav>
    )
}