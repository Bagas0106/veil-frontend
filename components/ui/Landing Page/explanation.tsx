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
            margin : "mt-8 lg:mt-21"
        }
    ]
    return(
        <div className="space-y-8 lg:space-y-10 w-full">
            <h1 className="bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl font-header text-center lg:text-left">Privasi Paling Utama</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 items-stretch">
                <div className="flex flex-col justify-between border p-5 sm:p-8 rounded-lg border-[#2D2D2D]">
                    <div className="flex-1 flex justify-center items-center py-8 lg:py-10">
                        <img src="database.svg" alt="" className="w-[60%] lg:w-auto opacity-80"/>
                    </div>
                    <div className="flex flex-col max-w-130 gap-1 mt-4 lg:mt-6 text-center lg:text-left mx-auto lg:mx-0">
                        <h1 className="font-header font-semibold text-2xl lg:text-3xl text-white">Tanpa Penyimpanan Server</h1>
                        <p className="font-header text-sm lg:text-md text-[#C6C6C6]">Veil bekerja secara privat tanpa meninggalkan jejak digital sedikit pun. Gambar atau video Anda hanya numpang lewat untuk diproses dan tidak akan pernah menetap di database kami.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {ex.map((exp) => (
                        <div key={exp.id} className="flex-1 flex flex-col sm:flex-row p-5 sm:p-8 border border-[#2D2D2D] rounded-lg justify-between items-center sm:items-stretch relative overflow-hidden">
                            <div className={`flex flex-col justify-center gap-1 w-full sm:w-2/3 z-10 text-center sm:text-left ${exp.margin}`}>
                                <h1 className="font-header font-semibold text-xl lg:text-2xl text-white">{exp.title}</h1>
                                <div className="max-w-70 mx-auto sm:mx-0">
                                    <p className="font-header text-sm lg:text-md text-[#C6C6C6]">{exp.description}</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/3 flex justify-center sm:justify-end items-center mt-4 sm:mt-0 relative sm:absolute right-0 opacity-20 sm:opacity-50">
                                <img src={exp.src} alt="" className="w-[120px] lg:w-[230px] h-[120px] lg:h-[182px] object-contain"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}