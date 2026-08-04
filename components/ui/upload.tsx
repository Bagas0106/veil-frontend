"use client"

import React, { useRef ,useState } from "react"
import { Button } from "./button"
import { CloudUpload , Camera} from "lucide-react"

export default function Upload(){
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDraging, setIsDraging] = useState(false);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const processFile = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraging(true);
    }

    const handlerDragLeave = () => {
        setIsDraging(false);
    }

    const handlerDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraging(false);
        const file = e.dataTransfer.files?.[0];
        if(!file) return;
        processFile(file);
    } 

    return(
        <>
            <input ref={inputRef} onChange={handleFile} type="file" accept="image/*" className="hidden" />
            {
                preview ? (
                    <img src={preview} alt="preview" className="w-fit h-fit object-cover" />
                ) : (
                    <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handlerDragLeave}
                        onDrop={handlerDragDrop}
                        className={`outline-3 outline-dashed w-235 h-100 outline-[#EAE8F0]/40 hover:outline-[#EAE8F0]/65 bg-[#C8C4D7]/10 hover:bg-[#C8C4D7]/12 rounded-lg flex flex-col items-center justify-center text-[#EAE8F0] gap-8 transition-all duration-300 cursor-pointer ${
                            isDraging 
                            ? "outline-[#EBB2FF] bg-[#EBB2FF]/10 scale-[1.02]"
                            : "outline-[#EAE8F0]/40 hover:outline-[#EAE8F0]/65 bg-[#C8C4D7]/10 hover:bg-[#C8C4D7]/12"
                        }`}
                    >
                        <div className="flex gap-4">
                            <CloudUpload size={70} className="bg-[#EBB2FF] text-[#8A2BE2] rounded-xl p-2.5" strokeWidth={1.8}/>
                            <Camera size={70} className="bg-[#EBB2FF] text-[#8A2BE2] rounded-xl p-2.5" strokeWidth={1.8}/>
                        </div>
                        <div className="text-center space-y-3">
                            <p className="font-heading text-3xl font-light">Drag & drop images here</p>
                            <p className="font-mono text-xs tracking-wider">Supports PNG, JPG, TIFF up to 50MB</p>
                        </div>
                        <div className="flex items-center justify-center w-40 gap-4">
                            <div className="flex-1 h-px bg-[#EAE8F0]"></div>
                            <p className="font-mono text-xs">OR</p>
                            <div className="flex-1 h-px bg-[#EAE8F0]"></div>
                        </div>
                        <Button onClick={handleClick} className="font-mono border border-[#EBB2FF] py-5 px-6 text-xs  bg-[#211824] cursor-pointer">Browse Files</Button>
                    </div>
                )
            }
            
        </>
    )
}