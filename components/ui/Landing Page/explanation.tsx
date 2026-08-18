export default function Explanation(){
    const ex = [
        {
            id: "1p",
            src: "trashcan.svg",
            title: "Terhapus Seketika",
            description: "Begitu proses pemburaman selesai dan hasil diunduh, sistem akan langsung menghancurkan data tersebut detik itu juga.",
            imageClass: "absolute right-0 top-0 bottom-0 h-full w-[45%] object-cover object-right opacity-60 pointer-events-none" 
        },
        {
            id: "2p",
            src: "zero.svg",
            title: "Bebas Risiko",
            description: "Karena ketiadaan penyimpanan data secara absolut, risiko kebocoran pihak ketiga menjadi nol.",
            imageClass: "absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[80%] object-contain object-right pr-4 opacity-60 pointer-events-none"
        }
    ]
    return(
        <div className="space-y-6 lg:space-y-8 w-full">
            <h1 className="bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-[42px] font-header font-bold tracking-tight text-center lg:text-left">
                Privasi Paling Utama
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                {/* card kiri */}
                <div className="flex flex-col border p-6 sm:p-8 rounded-xl border-[#2D2D2D] relative overflow-hidden bg-black min-h-[450px]">
                    <div className="flex-1 flex justify-center items-center py-6">
                        <img src="database.svg" alt="Database" className="w-[60%] max-w-[260px] opacity-60 pointer-events-none" />
                    </div>
                    <div className="flex flex-col gap-2 relative z-10 text-center lg:text-left mt-auto">
                        <h2 className="font-header font-bold text-2xl lg:text-[26px] text-white tracking-tight">Tanpa Penyimpanan Server</h2>
                        <p className="font-header text-[15px] leading-relaxed text-[#A1A1AA] max-w-[95%] mx-auto lg:mx-0">
                            Veil bekerja secara privat tanpa meninggalkan jejak digital sedikit pun. Gambar atau video Anda hanya numpang lewat untuk diproses dan tidak akan pernah menetap di database kami.
                        </p>
                    </div>
                </div>

                {/* card kanan */}
                <div className="flex flex-col gap-4">
                    {ex.map((exp) => (
                        <div key={exp.id} className="flex-1 flex flex-col p-6 sm:p-8 border border-[#2D2D2D] rounded-xl relative overflow-hidden bg-black min-h-[220px]">
                            <div className="flex flex-col gap-2 relative z-10 w-[70%] sm:w-[60%] mt-auto">
                                <h2 className="font-header font-bold text-xl lg:text-[22px] text-white tracking-tight">{exp.title}</h2>
                                <p className="font-header text-[14px] sm:text-[15px] leading-relaxed text-[#A1A1AA]">
                                    {exp.description}
                                </p>
                            </div>
                            <img src={exp.src} alt="" className={exp.imageClass} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}