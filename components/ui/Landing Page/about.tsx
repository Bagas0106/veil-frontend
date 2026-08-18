import Image from "next/image"

export default function About(){

    return(
        <div className="w-full" id="about">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-0">
                <div className="flex flex-col w-full lg:w-auto text-center lg:text-left">
                    <div className="space-y-10 lg:space-y-14">
                        <div className="max-w-110 space-y-4 mx-auto lg:mx-0 mt-20">
                            <h1 className="bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-4xl sm:text-5xl font-bold font-header">Keamanan <br className="hidden md:block"/> Tanpa Kompromi</h1>
                            <p className="text-[#C6C6C6] font-inter text-sm md:text-base">Sistem cerdas kami memastikan foto Anda dianalisis dan disensor langsung di perangkat Anda sendiri. Kami sama sekali tidak memiliki akses untuk melihat, melacak, atau menyentuh data asli Anda.</p>
                        </div>
                    </div>
                </div>
                <img src="imageabout.png" alt="placeholder" className="w-[80%] sm:w-[60%] lg:w-auto object-cover [clip-path:polygon(0_0,82%_0,100%_25%,100%_100%,12%_100%,0_82%)]" />
            </div>
        </div>
    )
}