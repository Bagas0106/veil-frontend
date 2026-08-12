import { Button } from "../button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function Hero(){
    return(
        <div className="flex flex-col min-h-screen text-white justify-center bg-gradien-b py-20 lg:py-0">
            <div className="space-y-3 px-2 sm:px-0">
                <h1 className="font-bold tracking-tight text-center text-4xl sm:text-5xl md:text-6xl font-geist text-[#181524]">Bagikan Momennya. <br className="hidden sm:block" /> Sembunyikan Datanya.</h1>
                <p className="text-center font-inter text-[#181524] text-sm md:text-base">Cegah kebocoran data pribadi anda. Veil mem-blur area rawan pada foto secara otomatis dalam hitungan detik. <br className="hidden md:block"/> Cepat, aman, dan dapat diandalkan untuk kebutuhan sehari-hari.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-7 pt-10 px-4 sm:px-0">
                <Link href="/blur">
                    <Button className="bg-[#1C0020] hover:bg-[#1C0020] py-6.5 px-6 rounded-full font-inter w-full sm:w-auto">Unggah & Sensor Foto <ArrowRightIcon/></Button>
                </Link>
                <Link href="/docs">
                    <Button className="bg-[#EAE8F0] hover:bg-[#EAE8F1] py-6.5 px-10 rounded-full font-inter text-[#181524] w-full sm:w-auto">View Documentation</Button>
                </Link>
            </div>
        </div>
    )
}