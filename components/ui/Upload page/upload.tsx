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
    globalBlurIntensity: number;
    hoveredRegion: string | null;
}

export default function Upload({ preview, setPreview, isProcessing, setIsProcessing, regions, setRegions, globalMode, customImage, globalBlurIntensity, hoveredRegion }: UploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDraging, setIsDraging] = useState(false);
    const [imgDims, setImgDims] = useState({ width: 1, height: 1 });
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [drawStart, setDrawStart] = useState<{x: number, y: number} | null>(null);
    const [currentDraw, setCurrentDraw] = useState<{x: number, y: number, width: number, height: number} | null>(null);

    const [activeInteraction, setActiveInteraction] = useState<{
        type: 'resize' | 'move',
        id: string,
        startX: number,
        startY: number,
        startBox: {x: number, y: number, width: number, height: number},
        edge?: string
    } | null>(null);

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

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!containerRef.current || !imgRef.current) return;
        
        // Prevent drawing if we are clicking on an existing region
        if ((e.target as HTMLElement).closest('.region-overlay')) return;

        e.preventDefault();

        const rect = imgRef.current.getBoundingClientRect();
        const scaleX = imgDims.width / rect.width;
        const scaleY = imgDims.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        if (x >= 0 && x <= imgDims.width && y >= 0 && y <= imgDims.height) {
            setIsDrawing(true);
            setDrawStart({ x, y });
            setCurrentDraw({ x, y, width: 0, height: 0 });
            e.currentTarget.setPointerCapture(e.pointerId);
        }
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!imgRef.current) return;

        const rect = imgRef.current.getBoundingClientRect();
        const scaleX = imgDims.width / rect.width;
        const scaleY = imgDims.height / rect.height;
        
        const currentX = Math.max(0, Math.min(imgDims.width, (e.clientX - rect.left) * scaleX));
        const currentY = Math.max(0, Math.min(imgDims.height, (e.clientY - rect.top) * scaleY));

        if (activeInteraction) {
            const dx = currentX - activeInteraction.startX;
            const dy = currentY - activeInteraction.startY;
            
            setRegions(prev => prev.map(r => {
                if (r.id !== activeInteraction.id) return r;
                
                let newBox = { ...activeInteraction.startBox };
                
                if (activeInteraction.type === 'move') {
                    newBox.x = Math.max(0, Math.min(imgDims.width - newBox.width, newBox.x + dx));
                    newBox.y = Math.max(0, Math.min(imgDims.height - newBox.height, newBox.y + dy));
                } else if (activeInteraction.type === 'resize' && activeInteraction.edge) {
                    if (activeInteraction.edge.includes('left')) {
                        const newX = Math.min(newBox.x + newBox.width - 10, Math.max(0, newBox.x + dx));
                        newBox.width += (newBox.x - newX);
                        newBox.x = newX;
                    }
                    if (activeInteraction.edge.includes('right')) {
                        newBox.width = Math.max(10, Math.min(imgDims.width - newBox.x, newBox.width + dx));
                    }
                    if (activeInteraction.edge.includes('top')) {
                        const newY = Math.min(newBox.y + newBox.height - 10, Math.max(0, newBox.y + dy));
                        newBox.height += (newBox.y - newY);
                        newBox.y = newY;
                    }
                    if (activeInteraction.edge.includes('bottom')) {
                        newBox.height = Math.max(10, Math.min(imgDims.height - newBox.y, newBox.height + dy));
                    }
                }
                
                return { ...r, box: newBox };
            }));
            return;
        }

        if (isDrawing && drawStart) {
            setCurrentDraw({
                x: Math.min(drawStart.x, currentX),
                y: Math.min(drawStart.y, currentY),
                width: Math.abs(currentX - drawStart.x),
                height: Math.abs(currentY - drawStart.y)
            });
        }
    }

    const handlePointerUp = (e: React.PointerEvent) => {
        if (activeInteraction) {
            setActiveInteraction(null);
            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch(e){}
            return;
        }

        if (isDrawing && currentDraw) {
            if (currentDraw.width > 20 && currentDraw.height > 20) {
                const newRegion: Region = {
                    id: Math.random().toString(36).substring(7),
                    type: 'kustom',
                    value: 'Kustom',
                    box: currentDraw,
                    enabled: true,
                    mode: globalMode
                };
                setRegions(prev => [...prev, newRegion]);
            }
            setIsDrawing(false);
            setDrawStart(null);
            setCurrentDraw(null);
            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch(e){}
        }
    }

    const handleRegionInteractionStart = (e: React.PointerEvent, id: string, type: 'resize' | 'move', edge?: string) => {
        e.stopPropagation();
        e.preventDefault();
        
        const region = regions.find(r => r.id === id);
        if (!region || !imgRef.current) return;
        
        const rect = imgRef.current.getBoundingClientRect();
        const scaleX = imgDims.width / rect.width;
        const scaleY = imgDims.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        setActiveInteraction({
            type, id, startX: x, startY: y, startBox: { ...region.box }, edge
        });
        
        if (containerRef.current) {
            containerRef.current.setPointerCapture(e.pointerId);
        }
    }

    const getOverlayStyle = (currentMode: string) => {
        switch (currentMode) {
            case 'blur':
                return 'bg-zinc-400/20 border border-white/10';
            case 'black':
                return 'bg-black border border-zinc-800';
            case 'white':
                return 'bg-white border border-zinc-200';
            case 'mozaic':
                return 'backdrop-blur-[10px] bg-black/10';
            case 'custom':
                return 'bg-zinc-900 border border-zinc-800 overflow-hidden';
            default:
                return 'bg-zinc-400/20';
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
                        
                        <div 
                            ref={containerRef}
                            className="relative inline-block max-w-full max-h-[65vh] touch-none"
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerLeave={handlePointerUp}
                        >
                            <img 
                                ref={imgRef}
                                src={preview} 
                                alt="preview" 
                                onLoad={handleImageLoad}
                                className="max-w-full max-h-[65vh] object-contain rounded-md select-none pointer-events-none" 
                            />
                            
                            {imgDims.width > 1 && (
                                <div className="absolute inset-0 z-10 pointer-events-none">
                                    {activeRegions.map((r) => {
                                        const currentMode = r.mode || globalMode;
                                        const intensity = r.blurIntensity || globalBlurIntensity;
                                        const imageToUse = r.customImage || customImage;
                                        
                                        return (
                                            <div 
                                                key={r.id}
                                                className={`region-overlay absolute overflow-hidden flex items-center justify-center rounded-sm pointer-events-auto group ${getOverlayStyle(currentMode)}`}
                                                onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'move')}
                                                style={{
                                                    left: `${(r.box.x / imgDims.width) * 100}%`,
                                                    top: `${(r.box.y / imgDims.height) * 100}%`,
                                                    width: `${(r.box.width / imgDims.width) * 100}%`,
                                                    height: `${(r.box.height / imgDims.height) * 100}%`,
                                                    backdropFilter: currentMode === 'blur' ? `blur(${intensity}px)` : undefined,
                                                    WebkitBackdropFilter: currentMode === 'blur' ? `blur(${intensity}px)` : undefined,
                                                    cursor: activeInteraction?.id === r.id && activeInteraction.type === 'move' ? 'grabbing' : 'grab',
                                                    border: activeInteraction?.id === r.id ? '2px solid #EBB2FF' : hoveredRegion === r.id ? '2px solid white' : undefined
                                                }}
                                            >
                                                {currentMode === "mozaic" && (
                                                    <div 
                                                        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                                                        style={{
                                                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 6px, #000 6px, #000 12px), repeating-linear-gradient(90deg, transparent, transparent 6px, #000 6px, #000 12px)'
                                                        }}
                                                    />
                                                )}
                                                {currentMode === "custom" && imageToUse && (
                                                    <img src={imageToUse} className="w-full h-full object-cover grayscale opacity-90 pointer-events-none" alt="custom" />
                                                )}
                                                
                                                {/* Resize Handles */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    <div className="absolute top-0 left-0 w-3 h-3 bg-[#EBB2FF] pointer-events-auto cursor-nwse-resize rounded-br-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'top-left')} />
                                                    <div className="absolute top-0 right-0 w-3 h-3 bg-[#EBB2FF] pointer-events-auto cursor-nesw-resize rounded-bl-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'top-right')} />
                                                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#EBB2FF] pointer-events-auto cursor-nesw-resize rounded-tr-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'bottom-left')} />
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#EBB2FF] pointer-events-auto cursor-nwse-resize rounded-tl-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'bottom-right')} />
                                                    
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#EBB2FF] pointer-events-auto cursor-ns-resize rounded-b-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'top')} />
                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#EBB2FF] pointer-events-auto cursor-ns-resize rounded-t-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'bottom')} />
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#EBB2FF] pointer-events-auto cursor-ew-resize rounded-r-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'left')} />
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#EBB2FF] pointer-events-auto cursor-ew-resize rounded-l-sm" onPointerDown={(e) => handleRegionInteractionStart(e, r.id, 'resize', 'right')} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                    {isDrawing && currentDraw && (
                                        <div 
                                            className="absolute border-2 border-[#EBB2FF] bg-[#EBB2FF]/20"
                                            style={{
                                                left: `${(currentDraw.x / imgDims.width) * 100}%`,
                                                top: `${(currentDraw.y / imgDims.height) * 100}%`,
                                                width: `${(currentDraw.width / imgDims.width) * 100}%`,
                                                height: `${(currentDraw.height / imgDims.height) * 100}%`,
                                            }}
                                        />
                                    )}
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