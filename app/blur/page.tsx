import Setting from "@/components/ui/setting"
import Upload from "@/components/ui/upload"
import { ShieldCheck } from "lucide-react"

export default function BlurPage(){
    return(
        <div className="min-h-screen bg-gradient-to-b from-[#1C0020] via-[#1C0020] to-[#BC13FE]/50">
            <div className="max-w-[85rem] mx-auto pt-30 space-y-8">
                <div className="space-y-2">
                    <h1 className="font-header text-white text-4xl font-semibold tracking-tight">Unggah Foto</h1>
                    <p className="font-inter text-[#EAE8F0]/75">Pilih foto yang ingin dilindungi. Proses sensor dilakukan langsung di perangkat Anda.</p>
                </div>
                <div className="flex gap-10">
                    <Upload/>
                    <Setting/>
                </div>
                <div className="h-20 flex gap-3 backdrop-blur-md">
                    <div className="bg-[#EBB2FF] w-1"></div>
                    <div className="py-2">
                        <ShieldCheck className="text-[#EBB2FF]" size={20}/>
                    </div>
                    <div className="text-white text-sm py-2 space-y-1">
                        <p className="font-mono">100% Privasi Terjamin</p>
                        <p className="font-inter">Sistem mem-blur area sensitif secara lokal. <br />Tidak ada satupun foto asli yang dikirim atau disimpan ke server kami.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}