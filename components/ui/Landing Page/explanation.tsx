export default function Explanation(){
    const ex = [
        {
            id : "1p",
            src : "trashcan.svg",
            title : "Terhapus Seketika",
            description : "Begitu proses pemburaman selesai dan hasil diunduh, sistem akan langsung menghancurkan data tersebut detik itu juga.",
            margin : ""
        },
        {
            id :"2p",
            src : "zero.svg",
            title : "Bebas Risiko",
            description : "Karena ketiadaan penyimpanan data secara absolut, risiko kebocoran pihak ketiga menjadi nol.",
            margin : "mt-21"
        }
    ]
    return(
        <div className="space-y-10 ">
            <h1 className="bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-6xl font-header">Privasi Paling Utama</h1>
            <div className="grid grid-cols-[1fr_1fr] gap-4 ">
                <div className="space-y-4 border p-5 rounded-lg border-[#2D2D2D]">
                    <img src="database.svg" alt="" className="pl-14 opacity-80"/>
                    <div className="flex flex-col max-w-130 gap-1">
                        <h1 className="font-header font-semibold text-3xl text-white">Tanpa Penyimpanan Server</h1>
                        <p className="font-header text-md text-[#C6C6C6]">Veil bekerja secara privat tanpa meninggalkan jejak digital sedikit pun. Gambar atau video Anda hanya numpang lewat untuk diproses dan tidak akan pernah menetap di database kami.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {ex.map((exp) => (
                        <div key={exp.id} className="flex p-5 border border-[#2D2D2D] rounded-lg justify-between ">
                            <div className={`flex flex-col gap-1 mt-16 ${exp.margin}`}>
                                <h1 className="font-header font-semibold text-2xl text-white">{exp.title}</h1>
                                <div className="max-w-70">
                                    <p className="font-header text-md text-[#C6C6C6]">{exp.description}</p>
                                </div>
                            </div>
                            <img src={exp.src} alt="" className="w-[230px] h-[182px] object-contain opacity-50"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}