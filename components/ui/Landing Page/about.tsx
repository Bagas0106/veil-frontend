import Image from "next/image"

export default function About(){

    return(
        <div className="">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="space-y-14">
                        <div className="max-w-110 space-y-4">
                            <h1 className="bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-5xl font-bold font-header">Keamanan <br /> Tanpa Kompromi</h1>
                            <p className="text-[#C6C6C6] font-inter text-sm">Sistem cerdas kami memastikan foto Anda dianalisis dan disensor langsung di perangkat Anda sendiri. Kami sama sekali tidak memiliki akses untuk melihat, melacak, atau menyentuh data asli Anda.</p>
                        </div>
                        <div className="flex gap-14">
                            <div className="">
                                <p className="bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-6xl font-header">90%</p>
                                <p className="font-inter text-[#C6C6C6] text-lg">Face Detection</p>
                            </div>
                            <div>
                                <p className="bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-6xl font-header">90%</p>
                                <p className="font-inter text-[#C6C6C6] text-lg">Face Detection</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="imageabout.png" alt="placeholder" className=" object-cover [clip-path:polygon(0_0,82%_0,100%_25%,100%_100%,12%_100%,0_82%)]" />
            </div>
        </div>
    )
}