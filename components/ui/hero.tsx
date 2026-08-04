import { Button } from "./button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function Hero(){
    return(
        <div className="flex flex-col min-h-screen text-white justify-center bg-gradien-b ">
            <div className=" space-y-3">
                <h1 className="font-bold tracking-tight text-center text-6xl font-geist text-[#181524]">Bagikan Momennya. <br /> Sembunyikan Datanya.</h1>
                <p className="text-center font-inter text-[#181524]">Cegah kebocoran data pribadi anda. Veil mem-blur area rawan pada foto secara otomatis dalam hitungan detik. <br /> Cepat, aman, dan dapat diandalkan untuk kebutuhan sehari-hari.</p>
            </div>
            <div className="flex justify-center gap-7 pt-10 ">
                <Link href="/blur">
                    <Button className="bg-[#1C0020] hover:bg-[#1C0020] py-6.5 px-6 rounded-sm font-inter">Unggah & Sensor Foto <ArrowRightIcon/></Button>
                </Link>
                <Button className="bg-[#EAE8F0] hover:bg-[#EAE8F1] py-6.5 px-6 rounded-sm font-inter text-[#181524]">View Documentation</Button>
            </div>
        </div>
    )
}