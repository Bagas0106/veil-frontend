import Image from "next/image"
import { Button } from "./button"

export default function Navbar(){
    return(
        <nav className="contents">
            <div className="fixed left-10 top-3 z-50 flex gap-4 mix-blend-difference text-white ">
               <h1 className="font-bold text-2xl">Veil</h1>
            </div>
            <div>
                <Button className="fixed right-6 top-3 z-50 text-white bg-[#1C0020] hover:bg-[#1C0020]  rounded-lg font-mono text-sm">Unggah & Sensor Foto</Button>
            </div>
        </nav>
    )
}