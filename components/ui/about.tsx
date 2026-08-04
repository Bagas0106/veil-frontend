import { ShieldUser } from "lucide-react"
import { EyeOff } from "lucide-react"
import { ChevronRightIcon } from "lucide-react"
import { User2 } from "lucide-react"
const explanation = [
    {
        icon : <ShieldUser/>,
        title : "Keamanan tanpa Kompromi", 
        subtitle : "DIPROSES DI PERANGKAT ANDA",
        description : "Sistem cerdas kami memastikan foto Anda dianalisis dan disensor langsung di perangkat Anda sendiri. Kami sama sekali tidak memiliki akses untuk melihat, melacak, atau menyentuh data asli Anda."
    },
    {
        icon : <EyeOff/>,
        title : "Privasi Paling Utama", 
        subtitle : "TANPA PENYIMPANAN SERVER",
        description : "Veil bekerja tanpa meninggalkan jejak digital. Begitu proses pemburaman selesai dan Anda mengunduh hasilnya, sistem akan langsung membuang data tersebut seketika. 100% aman dan bebas dari risiko kebocoran."
    },
]

export default function About(){
    return(
        <div className="min-h-screen grid grid-cols-[1fr_1.7fr] content-center ">
            <div className="flex flex-col gap-14">
                {explanation.map((ex) => (
                    <div 
                        key={ex.title}
                        className="space-y-4"
                    >
                        <h1 className="font-bold text-3xl text-[#EBB2FF] tracking-tight flex items-center gap-2"> {ex.icon}{ex.title}</h1>
                        <p className="font-mono text-white">{ex.subtitle}</p>
                        <p className="text-white font-inter max-w-md">{ex.description}</p>
                    </div>
                ))}
            </div>
            <div className="font-mono relative ">
                <div className="border-2 p-5 w-full max-w-[340px] rounded-lg -rotate-4 space-y-2 ">
                    <div className="flex justify-between items-center">
                        <p className="text-[#EBB2FF] flex pl-3">LOG DETEKSI</p>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-[#EBB2FF]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#EBB2FF]/40"></div>
                        </div>
                    </div>
                    <hr className="border-zinc-800"/>
                    <div className="flex justify-between">
                        <p className="text-white flex"><ChevronRightIcon color="white"/> deteksi_wajah</p>
                        <p className="text-[#EBB2FF]">TERDETEKSI</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white flex"><ChevronRightIcon color="white"/> nomor_indentitas</p>
                        <p className="text-[#EBB2FF]">DISENSOR</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-white flex"><ChevronRightIcon color="white"/> namalengkap</p>
                        <p className="text-[#EBB2FF]">DISENROR</p>
                    </div>
                </div>
                <div className="border-2 p-8 w-140 h-70 rounded-lg rotate-7 space-y-2 absolute right-7 top-47 space-y-6">
                    <div className="flex gap-4 w-full">
                        <div className="w-40 h-40 border-2 border-dashed border-[#EBB2FF]/60 rounded-lg flex items-center justify-center"><User2 size={100} strokeWidth={0.5}></User2></div>
                        <div className="space-y-4 w-full">
                            <div className="w-full">
                                <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm "></div>
                            </div>
                            <div className="flex gap-2 w-full">
                                <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                                <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                            </div>
                            <div className="flex gap-2 w-full">
                                <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                                <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                            </div>
                            <div className="grid grid-cols-[1fr_2.7fr] gap-2 w-full">
                                <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                                <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr] gap-2 w-full">
                        <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                        <div className="h-3.5 w-full bg-[#C8C4D7]/50 rounded-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}