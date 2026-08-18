"use client"
import { Region } from "@/app/blur/page"
import { Loader2, ChevronRight, ChevronDown, Download, ImagePlus } from "lucide-react"
import { useState, useRef } from "react"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu"

type Props = {
    preview: string | null;
    isProcessing: boolean;
    regions: Region[];
    setRegions: React.Dispatch<React.SetStateAction<Region[]>>;
    globalMode: string;
    setGlobalMode: (val: string) => void;
    customImage: string | null;
    setCustomImage: (val: string | null) => void;
    globalBlurIntensity: number;
    setGlobalBlurIntensity: (val: number) => void;
    hoveredRegion: string | null;
    setHoveredRegion: (val: string | null) => void;
}

const MODES = [
    { id: 'blur', label: 'Blur Halus' },
    { id: 'mozaic', label: 'Mozaic' },
    { id: 'black', label: 'Blok Hitam' },
    { id: 'white', label: 'Blok Putih' },
    { id: 'custom', label: 'Gambar Kustom' },
];

const Checkbox = ({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) => (
    <div 
        onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
        className={`w-[18px] h-[18px] border flex items-center justify-center cursor-pointer transition-colors rounded-[4px] shrink-0 ${checked ? 'bg-white border-white text-black' : 'border-zinc-600 bg-transparent hover:border-zinc-400'}`}
    >
        {checked && <svg width="12" height="10" viewBox="0 0 10 8" fill="none" className="ml-[1px] mt-[1px]"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
)

export default function Setting({ preview, isProcessing, regions, setRegions, globalMode, setGlobalMode, customImage, setCustomImage, globalBlurIntensity, setGlobalBlurIntensity, hoveredRegion, setHoveredRegion }: Props){
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleRegion = (id: string, state: boolean) => {
        setRegions(prev => prev.map(r => r.id === id ? { ...r, enabled: state } : r));
    }

    const setRegionMode = (id: string, newMode: string) => {
        setRegions(prev => prev.map(r => r.id === id ? { ...r, mode: newMode } : r));
    }

    const setRegionBlurIntensity = (id: string, intensity: number) => {
        setRegions(prev => prev.map(r => r.id === id ? { ...r, blurIntensity: intensity } : r));
    }

    const toggleGroup = (type: string, state: boolean) => {
        setRegions(prev => prev.map(r => r.type === type ? { ...r, enabled: state } : r));
    }

    const toggleCatExpand = (cat: string) => {
        setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
    }

    const toggleItemExpand = (id: string) => {
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    }

    const handleCustomImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCustomImage(URL.createObjectURL(file));
        }
    }

    const handleRegionCustomImage = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRegions(prev => prev.map(r => r.id === id ? { ...r, customImage: URL.createObjectURL(file) } : r));
        }
    }

    const handleDownload = async (mimeType: string, extension: string, quality?: number) => {
        if (!preview) return;
        
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const img = new Image();
            img.crossOrigin = "anonymous";
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = preview;
            });

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const activeRegions = regions.filter(r => r.enabled);

            for (const r of activeRegions) {
                const currentMode = r.mode || globalMode;
                const intensity = r.blurIntensity || globalBlurIntensity;
                const imageToUse = r.customImage || customImage;

                const { x, y, width, height } = r.box;

                ctx.save();
                ctx.beginPath();
                ctx.rect(x, y, width, height);
                ctx.clip();

                if (currentMode === 'blur') {
                    ctx.filter = `blur(${intensity}px)`;
                    ctx.drawImage(img, 0, 0);
                } else if (currentMode === 'black') {
                    ctx.fillStyle = 'black';
                    ctx.fill();
                    ctx.strokeStyle = '#27272a';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else if (currentMode === 'white') {
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.strokeStyle = '#e4e4e7';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else if (currentMode === 'mozaic') {
                    ctx.filter = 'blur(10px)';
                    ctx.drawImage(img, 0, 0);
                    ctx.filter = 'none';
                    
                    ctx.fillStyle = 'rgba(0,0,0,0.1)';
                    ctx.fill();

                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                    for (let px = x; px < x + width; px += 12) {
                        ctx.beginPath();
                        ctx.moveTo(px, y);
                        ctx.lineTo(px, y + height);
                        ctx.stroke();
                    }
                    for (let py = y; py < y + height; py += 12) {
                        ctx.beginPath();
                        ctx.moveTo(x, py);
                        ctx.lineTo(x + width, py);
                        ctx.stroke();
                    }
                } else if (currentMode === 'custom' && imageToUse) {
                    const customImg = new Image();
                    customImg.crossOrigin = "anonymous";
                    await new Promise((resolve, reject) => {
                        customImg.onload = resolve;
                        customImg.onerror = reject;
                        customImg.src = imageToUse;
                    });
                    ctx.filter = 'grayscale(100%)';
                    ctx.drawImage(customImg, x, y, width, height);
                } else {
                    ctx.fillStyle = 'rgba(161, 161, 170, 0.2)';
                    ctx.fill();
                }
                
                ctx.restore();
            }

            const dataUrl = canvas.toDataURL(mimeType, quality);
            const link = document.createElement('a');
            link.download = `veil-protected.${extension}`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Download failed', err);
            alert('Gagal mengunduh gambar');
        }
    };

    // default kategori klo ga nemu apa apa ato gada gambar
    const baseCategories = ["wajah", "plat_nomor", "Barcode/qr"];
    const detectedCategories = Array.from(new Set(regions.map(r => r.type)));
    const categories = preview ? (detectedCategories.length > 0 ? detectedCategories : baseCategories) : baseCategories;

    return(
        <div className="w-full lg:w-[420px] max-h-[80vh] bg-zinc-950 border border-zinc-800 p-6 flex flex-col gap-5 rounded-xl shadow-2xl font-mono overflow-hidden">
            {/* header */}
            <div className="flex justify-between items-end border-b border-zinc-800 pb-4 shrink-0">
                <h1 className="text-sm font-semibold tracking-widest text-zinc-300">LOG DETEKSI</h1>
                <div className="border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs px-2 py-0.5 rounded-sm">
                    {regions.length}
                </div>
            </div>

            {/* action global dipindah ke atas */}
            <div className={`shrink-0 space-y-3 pb-2 transition-opacity ${!preview ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex flex-col bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 gap-3">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium tracking-wide text-zinc-400">Mode Global</p>
                        <div className="w-40">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="w-full bg-zinc-950 border border-zinc-700 hover:border-zinc-500 text-xs font-medium tracking-wide text-zinc-300 py-1.5 px-3 rounded-md transition-colors flex justify-between items-center outline-none">
                                        <span className="truncate">{MODES.find(m => m.id === globalMode)?.label}</span>
                                        <ChevronDown className="text-zinc-500 shrink-0 ml-2" size={14} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-md shadow-2xl p-1" align="end">
                                    {MODES.map(o => (
                                        <DropdownMenuItem 
                                            key={o.id}
                                            className="text-xs font-medium tracking-wide focus:bg-zinc-800 focus:text-white cursor-pointer rounded-sm px-3 py-2 outline-none transition-colors"
                                            onClick={() => setGlobalMode(o.id)}
                                        >
                                            {o.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {globalMode === 'blur' && (
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-medium tracking-wide text-zinc-400">Intensitas Blur</p>
                            <input 
                                type="range" 
                                min="1" max="40" 
                                value={globalBlurIntensity} 
                                onChange={(e) => setGlobalBlurIntensity(parseInt(e.target.value))}
                                className="flex-1 max-w-[160px] accent-[#EBB2FF]"
                            />
                        </div>
                    )}
                    {globalMode === 'custom' && (
                        <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-2.5 rounded-md">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 bg-zinc-800 rounded border border-zinc-700 flex items-center justify-center overflow-hidden">
                                    {customImage ? <img src={customImage} alt="custom global" className="w-full h-full object-cover grayscale" /> : <ImagePlus size={12} className="text-zinc-500" />}
                                </div>
                                <p className="text-[10px] tracking-wide text-zinc-400">File Kustom Global</p>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleCustomImage} accept="image/*" className="hidden" />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200 transition-colors"
                            >
                                Pilih
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* list konten bisa di scroll */}
            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 min-h-[150px]">
                {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-80">
                        <Loader2 className="animate-spin text-zinc-400" size={32} strokeWidth={1.5}/>
                        <p className="text-xs tracking-widest text-zinc-500 uppercase">Memproses...</p>
                    </div>
                ) : (
                    categories.map(cat => {
                        const catRegions = regions.filter(r => r.type === cat);
                        const isDetected = catRegions.length > 0;
                        const allEnabled = isDetected && catRegions.every(r => r.enabled);
                        const isExpanded = expandedCats[cat];
                        
                        return (
                            <div key={cat} className="space-y-2">
                                {/* baris kategori */}
                                <div 
                                    onClick={() => isDetected && toggleCatExpand(cat)}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                        isDetected 
                                        ? 'bg-zinc-900/50 border-zinc-700 cursor-pointer hover:border-zinc-500' 
                                        : 'bg-zinc-950 border-dashed border-zinc-800/60 cursor-not-allowed opacity-70'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`transition-opacity ${!preview ? 'opacity-30' : 'opacity-100'}`}>
                                            <Checkbox checked={allEnabled && isDetected} onChange={(state) => toggleGroup(cat, state)} />
                                        </div>
                                        <p className="text-sm font-medium tracking-wide text-zinc-300">deteksi_{cat.toLowerCase()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] tracking-widest font-bold uppercase ${!preview ? 'text-zinc-600' : (isDetected ? 'text-green-500/90' : 'text-red-500/70')}`}>
                                            {!preview ? 'STANDBY' : (isDetected ? 'TERDETEKSI' : 'TIDAK TERDETEKSI')}
                                        </span>
                                        {isDetected ? (
                                            isExpanded ? <ChevronDown size={14} className="text-green-500/90" /> : <ChevronRight size={14} className="text-green-500/90" />
                                        ) : (
                                            <ChevronRight size={14} className={!preview ? 'text-zinc-700' : 'text-red-500/70 opacity-50'} />
                                        )}
                                    </div>
                                </div>

                                {/* baris item klo diexpand */}
                                {isExpanded && isDetected && (
                                    <div className="pl-4 pr-1 space-y-2 pb-2">
                                        {catRegions.map((r, idx) => {
                                            const isItemExpanded = expandedItems[r.id];
                                            const currentMode = r.mode || globalMode;
                                            
                                            return (
                                                <div 
                                                    key={r.id} 
                                                    className={`bg-zinc-900/30 border ${hoveredRegion === r.id ? 'border-zinc-500 bg-zinc-800/40' : 'border-zinc-800'} rounded-lg overflow-hidden transition-colors`}
                                                    onMouseEnter={() => setHoveredRegion(r.id)}
                                                    onMouseLeave={() => setHoveredRegion(null)}
                                                >
                                                    <div 
                                                        onClick={() => toggleItemExpand(r.id)}
                                                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Checkbox checked={r.enabled} onChange={(state) => toggleRegion(r.id, state)} />
                                                            <p className="text-sm font-medium tracking-wide text-zinc-300 truncate max-w-[150px]">{cat}_{idx + 1}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[10px] tracking-widest font-bold uppercase ${r.enabled ? 'text-green-500/90' : 'text-zinc-500'}`}>
                                                                {r.enabled ? 'DISENSOR' : 'DIABAIKAN'}
                                                            </span>
                                                            {isItemExpanded ? <ChevronDown size={14} className={r.enabled ? 'text-green-500/90' : 'text-zinc-500'} /> : <ChevronRight size={14} className={r.enabled ? 'text-green-500/90' : 'text-zinc-500'} />}
                                                        </div>
                                                    </div>

                                                    {/* panel mode sensor */}
                                                    {isItemExpanded && (
                                                        <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 space-y-4">
                                                            <p className="text-xs font-semibold tracking-widest text-zinc-400">MODE SENSOR</p>
                                                            
                                                            <div className="flex flex-col gap-3">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <button className="w-full bg-zinc-950 border border-zinc-700 hover:border-zinc-500 text-xs font-medium tracking-wide text-zinc-300 py-2.5 px-3 rounded-md transition-colors flex justify-between items-center outline-none">
                                                                            <span>{r.mode ? MODES.find(m => m.id === r.mode)?.label : `Default (${MODES.find(m => m.id === globalMode)?.label})`}</span>
                                                                            <ChevronDown className="text-zinc-500 shrink-0 ml-2" size={14} />
                                                                        </button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-md shadow-2xl p-1" align="end">
                                                                        <DropdownMenuItem 
                                                                            className="text-xs font-medium tracking-wide focus:bg-zinc-800 focus:text-white cursor-pointer rounded-sm px-3 py-2 outline-none transition-colors" 
                                                                            onClick={() => setRegionMode(r.id, '')}
                                                                        >
                                                                            Gunakan Default Global
                                                                        </DropdownMenuItem>
                                                                        <div className="h-px bg-zinc-800 my-1"></div>
                                                                        {MODES.map(o => (
                                                                            <DropdownMenuItem 
                                                                                key={o.id}
                                                                                className="text-xs font-medium tracking-wide focus:bg-zinc-800 focus:text-white cursor-pointer rounded-sm px-3 py-2 outline-none transition-colors"
                                                                                onClick={() => setRegionMode(r.id, o.id)}
                                                                            >
                                                                                {o.label}
                                                                            </DropdownMenuItem>
                                                                        ))}
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>

                                                                {(currentMode === 'blur') && (
                                                                    <div className="flex items-center justify-between gap-3 bg-zinc-950 border border-zinc-800 p-2.5 rounded-md">
                                                                        <p className="text-[10px] tracking-wide text-zinc-400">Intensitas</p>
                                                                        <input 
                                                                            type="range" 
                                                                            min="1" max="40" 
                                                                            value={r.blurIntensity || globalBlurIntensity} 
                                                                            onChange={(e) => setRegionBlurIntensity(r.id, parseInt(e.target.value))}
                                                                            className="flex-1 max-w-[120px] accent-[#EBB2FF]"
                                                                        />
                                                                    </div>
                                                                )}

                                                                {(currentMode === 'custom') && (
                                                                    <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-2.5 rounded-md">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-7 h-7 bg-zinc-800 rounded border border-zinc-700 flex items-center justify-center overflow-hidden">
                                                                                {(r.customImage || customImage) ? <img src={r.customImage || customImage || ""} alt="custom region" className="w-full h-full object-cover grayscale" /> : <ImagePlus size={12} className="text-zinc-500" />}
                                                                            </div>
                                                                            <p className="text-[10px] tracking-wide text-zinc-400">File Kustom Area</p>
                                                                        </div>
                                                                        <input type="file" id={`file-${r.id}`} onChange={(e) => handleRegionCustomImage(r.id, e)} accept="image/*" className="hidden" />
                                                                        <button 
                                                                            onClick={() => document.getElementById(`file-${r.id}`)?.click()}
                                                                            className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200 transition-colors"
                                                                        >
                                                                            Pilih
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>

            {/* action bawah */}
            {preview && (
                <div className="pt-2 shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button 
                                className="w-full py-4 bg-zinc-200 hover:bg-white text-black font-sans font-bold text-lg rounded-lg transition-colors flex justify-center items-center gap-2 outline-none"
                            >
                                <Download size={20} strokeWidth={2.5}/> 
                                <span>Download</span>
                                <ChevronDown size={18} className="text-zinc-600 ml-1" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full min-w-[200px] bg-zinc-950 border-zinc-800 text-zinc-300 rounded-md shadow-2xl p-1" align="center" side="top" sideOffset={8}>
                            <DropdownMenuItem 
                                className="text-sm font-semibold tracking-wide focus:bg-zinc-800 focus:text-white cursor-pointer rounded-sm px-4 py-3 outline-none transition-colors flex justify-between"
                                onClick={async () => {
                                    await handleDownload('image/png', 'png');
                                }}
                            >
                                Simpan sebagai PNG
                            </DropdownMenuItem>
                            <div className="h-px bg-zinc-800 my-1"></div>
                            <DropdownMenuItem 
                                className="text-sm font-semibold tracking-wide focus:bg-zinc-800 focus:text-white cursor-pointer rounded-sm px-4 py-3 outline-none transition-colors flex justify-between"
                                onClick={async () => {
                                    await handleDownload('image/jpeg', 'jpg', 0.9);
                                }}
                            >
                                Simpan sebagai JPG
                            </DropdownMenuItem>
                            <div className="h-px bg-zinc-800 my-1"></div>
                            <DropdownMenuItem 
                                className="text-sm font-semibold tracking-wide focus:bg-zinc-800 focus:text-white cursor-pointer rounded-sm px-4 py-3 outline-none transition-colors flex justify-between"
                                onClick={async () => {
                                    await handleDownload('image/webp', 'webp', 0.9);
                                }}
                            >
                                Simpan sebagai WEBP
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #52525b;
                }
            `}</style>
        </div>
    )
}