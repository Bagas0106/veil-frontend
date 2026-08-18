"use client"

import React, { useRef, useState } from "react"
import { CloudUpload, Camera, Loader2, RefreshCcw } from "lucide-react"
import { Region } from "@/app/blur/page"

type UploadProps = {
    preview: string | null;
    setPreview: (val: string | null) => void;
    isProcessing: boolean;
    setIsProcessing: (val: boolean) => void;
    regions: Region[];
    setRegions: React.Dispatch<React.SetStateAction<Region[]>>;
    globalMode: string;
    customImage: string | null;
}

export default function Upload({ preview, setPreview, isProcessing, setIsProcessing, regions, setRegions, globalMode, customImage }: UploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDraging, setIsDraging] = useState(false);
    const [imgDims, setImgDims] = useState({ width: 1, height: 1 });
    const imgRef = useRef<HTMLImageElement>(null);

    const processImageApi = async (file: File) => {
        setIsProcessing(true);
        setRegions([]);
        
        try {
            const formData = new FormData();
            formData.append("file", file);
            
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/extract`, {
                method: "POST",
                body: formData
            });
            
            if (!res.ok) throw new Error("API Error");
            const data = await res.json();
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formattedRegions = (data.regions || []).map((r: any) => ({
                ...r,
                id: Math.random().toString(36).substring(7),
                enabled: true
            }));
            
            setRegions(formattedRegions);
        } catch (error) {
            console.error("Error processing image", error);
        } finally {
            setIsProcessing(false);
        }
    }

    const processFile = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        processImageApi(file);
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
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
    
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        setImgDims({ width: img.naturalWidth, height: img.naturalHeight });
    }
    
    const clearImage = () => {
        setPreview(null);
        setRegions([]);
    }

    const getOverlayStyle = (currentMode: string) => {
        switch (currentMode) {
            case 'blur':
                return 'backdrop-blur-3xl bg-zinc-400/20 border border-white/10';
            case 'black':
                return 'bg-black border border-zinc-800';
            case 'white':
                return 'bg-white border border-zinc-200';
            case 'mozaic':
                return 'backdrop-blur-[10px] bg-black/10';
            case 'custom':
                return 'bg-zinc-900 border border-zinc-800 overflow-hidden';
            default:
                return 'backdrop-blur-3xl bg-zinc-400/20';
        }
    }

    const activeRegions = regions.filter(r => r.enabled);

    return(
        <div className="flex-1 w-full max-w-4xl font-inter">
            <input ref={inputRef} onChange={handleFile} type="file" accept="image/*" className="hidden" />
            
            {preview ? (
                <div className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col gap-6 rounded-xl">
                    <div className="relative w-full overflow-hidden bg-black flex items-center justify-center min-h-[450px] p-6 border border-zinc-900 rounded-lg">
                        {isProcessing && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white gap-4">
                                <Loader2 className="animate-spin text-white" size={40} strokeWidth={1.5} />
                                <div className="space-y-1 text-center">
                                    <p className="font-medium text-lg animate-pulse tracking-tight text-white">Memproses Privasi</p>
                                </div>
                            </div>
                        )}
                        
                        <div className="relative inline-block max-w-full max-h-[65vh]">
                            <img 
                                ref={imgRef}
                                src={preview} 
                                alt="preview" 
                                onLoad={handleImageLoad}
                                className="max-w-full max-h-[65vh] object-contain rounded-md" 
                            />
                            
                            {imgDims.width > 1 && activeRegions.length > 0 && (
                                <div className="absolute inset-0 z-10 pointer-events-none">
                                    {activeRegions.map((r) => {
                                        const currentMode = r.mode || globalMode;
                                        return (
                                            <div 
                                                key={r.id}
                                                className={`absolute overflow-hidden flex items-center justify-center transition-all duration-300 rounded-sm ${getOverlayStyle(currentMode)}`}
                                                style={{
                                                    left: `${(r.box.x / imgDims.width) * 100}%`,
                                                    top: `${(r.box.y / imgDims.height) * 100}%`,
                                                    width: `${(r.box.width / imgDims.width) * 100}%`,
                                                    height: `${(r.box.height / imgDims.height) * 100}%`
                                                }}
                                            >
                                                {currentMode === "mozaic" && (
                                                    <div 
                                                        className="absolute inset-0 opacity-30 mix-blend-overlay"
                                                        style={{
                                                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 6px, #000 6px, #000 12px), repeating-linear-gradient(90deg, transparent, transparent 6px, #000 6px, #000 12px)'
                                                        }}
                                                    />
                                                )}
                                                {currentMode === "custom" && customImage && (
                                                    <img src={customImage} className="w-full h-full object-cover grayscale opacity-90" alt="custom" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-zinc-500 text-sm font-medium tracking-tight">
                            {!isProcessing && activeRegions.length > 0 && (
                                <span>{activeRegions.length} area disensor</span>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={clearImage} 
                                className="px-4 py-2 border border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900 transition-colors flex gap-2 items-center text-sm font-medium tracking-tight rounded-md"
                            >
                                <RefreshCcw size={16} strokeWidth={1.5} /> Mulai Ulang
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handlerDragLeave}
                    onDrop={handlerDragDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`w-full min-h-[500px] border border-solid flex flex-col items-center justify-center text-zinc-300 gap-8 transition-colors duration-200 cursor-pointer bg-zinc-950 rounded-xl ${
                        isDraging 
                        ? "border-white bg-zinc-900"
                        : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                    }`}
                >
                    <div className="flex gap-6">
                        <div className="bg-zinc-900 p-5 border border-zinc-800 rounded-lg">
                            <CloudUpload size={40} strokeWidth={1.5} className="text-[#EBB2FF]"/>
                        </div>
                        <div className="bg-zinc-900 p-5 border border-zinc-800 rounded-lg">
                            <Camera size={40} strokeWidth={1.5} className="text-[#EBB2FF]"/>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <p className="font-medium text-2xl tracking-tight text-white">Tarik foto ke sini</p>
                        <p className="text-sm text-zinc-500 tracking-tight">Mendukung file PNG, JPG, WEBP hingga 50MB</p>
                    </div>
                    
                    <div className="flex items-center w-48 gap-4 py-2 opacity-60">
                        <div className="flex-1 h-px bg-zinc-800"></div>
                        <p className="text-xs uppercase tracking-tight font-medium">atau</p>
                        <div className="flex-1 h-px bg-zinc-800"></div>
                    </div>
                    
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            inputRef.current?.click();
                        }} 
                        className="bg-white hover:bg-zinc-200 text-black px-8 py-4 text-sm font-medium tracking-tight transition-colors rounded-md"
                    >
                        Pilih File Gambar
                    </button>
                </div>
            )}
        </div>
    )
}