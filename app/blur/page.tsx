"use client"
import Setting from "@/components/ui/Upload page/setting"
import Upload from "@/components/ui/Upload page/upload"
import { ShieldCheck } from "lucide-react"
import { useState } from "react"

export type Box = { x: number, y: number, width: number, height: number }
export type Region = { id: string, type: string, value: string, box: Box, enabled: boolean, mode?: string }

export default function BlurPage(){
    const [preview, setPreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [regions, setRegions] = useState<Region[]>([]);
    const [globalMode, setGlobalMode] = useState<string>("blur");
    const [customImage, setCustomImage] = useState<string | null>(null);

    return(
        <div className="min-h-screen bg-black text-white font-inter selection:bg-white selection:text-black">
            <div className="max-w-[85rem] mx-auto pt-24 px-6 space-y-12 pb-20">
                <div className="space-y-4">
                    <h1 className="font-header text-5xl md:text-6xl font-medium tracking-tight">Unggah Foto</h1>
                    <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed tracking-tight">
                        Pilih foto yang ingin dilindungi. Proses deteksi dan sensor dilakukan menggunakan AI secara lokal.
                    </p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <Upload 
                        preview={preview}
                        setPreview={setPreview}
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                        regions={regions}
                        setRegions={setRegions}
                        globalMode={globalMode}
                        customImage={customImage}
                    />
                    <Setting 
                        preview={preview}
                        isProcessing={isProcessing}
                        regions={regions}
                        setRegions={setRegions}
                        globalMode={globalMode}
                        setGlobalMode={setGlobalMode}
                        customImage={customImage}
                        setCustomImage={setCustomImage}
                    />
                </div>
                
                <div className="flex gap-4">
                    <div className="bg-white w-1 rounded-full"></div>
                    <div className="py-1">
                        <ShieldCheck className="text-white" size={24} strokeWidth={1.5}/>
                    </div>
                    <div className="text-white text-sm py-1 space-y-1.5">
                        <p className="font-mono font-medium tracking-tight">100% Privasi Terjamin</p>
                        <p className="font-inter text-zinc-400 leading-relaxed tracking-tight">
                            Sistem mem-blur area sensitif secara lokal. <br />
                            Tidak ada satupun foto asli yang dikirim atau disimpan ke server kami.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}