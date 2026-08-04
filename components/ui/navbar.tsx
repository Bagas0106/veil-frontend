"use client"

import Image from "next/image"
import { useState } from "react";
import { Button } from "./button"
import Link from "next/link";

export default function Navbar(){
    const [darkSection, setDarkSection] = useState(true);
    return(
        <nav className="">
            <div className="fixed left-10 top-3 z-50 flex gap-4 mix-blend-difference text-white ">
               <h1 className="font-bold text-2xl">Veil</h1>
            </div>
            <Link href="/blur">
                <Button className={`
                    ${darkSection
                        ? "bg-white text-black"
                        : "bg-black text-white"}
                    fixed right-6 top-3 z-50 rounded-lg font-mono text-sm mix-blend-difference
                    `}
                >Unggah & Sensor Foto</Button>
            </Link>
        </nav>
    )
}