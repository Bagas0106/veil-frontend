"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";


export default function Preview(){
    const images = [
        "images/image1.png",
        "images/image2.png",
        "images/image3.png",
        "images/image4.png",
        "images/image5.png",
        "linus.jpg"
    ]

    const infiniteImage = [...images,...images];
    const [selectedImages, setSelectedImages] = useState(images[0]);

    return(
        <div className="flex flex-col justify-center items-center gap-6 md:gap-8 overflow-hidden w-full " id="preview">
            <div className="flex flex-col justify-center items-center gap-2 px-2">
                <h1 className="font-heading font-bold bg-[linear-gradient(to_bottom,#EAE8F0_0%,#EAE8F0_51%,#7B7B7B_100%)] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl text-center">Proteksi Identitas Visual </h1>
                <p className=" text-[#C6C6C6] font-inter text-center text-sm md:text-base">Amankan setiap detail foto dari kebocoran data. Sensoring presisi untuk dokumen resmi, identitas <br className="hidden md:block"/> diri, dan area rawan privasi lainnya.</p>
            </div>
            <div className="w-full max-w-5xl mx-auto border border-[#EBB2FF]/50 p-2 sm:p-4 rounded-xl flex flex-col gap-2 sm:gap-4">
                <div className="flex gap-1.5 shrink-0 px-2 sm:px-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EBB2FF]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EBB2FF]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EBB2FF]/40"></div>
                </div>
                <div className="w-full aspect-[4/3] md:aspect-[2/1] mx-auto p-2 sm:p-4 rounded-lg flex justify-center items-center bg-black/20">
                    <img src={selectedImages} alt="main preview" className="w-full h-full max-h-[300px] md:max-h-[565px] object-contain rounded-xl"/>
                </div>
            </div>
            <div className="w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                    className="flex gap-3 sm:gap-4 w-max"
                    animate={{x: ["0%","-50%"] }}
                    transition={{
                        repeat:Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {infiniteImage.map((img,index) => (
                        <div className="border bg-[#1C1424] border-[#EBB2FF]/20 rounded-xl p-2 sm:p-3" key={index}>
                        <div
                            onClick={() => setSelectedImages(img)}
                            className={`shrink-0 cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                                selectedImages === img
                                ? "opacity-100 scale-100 sm:scale-103"
                                : "border-transparent opacity-50 hover:opacity-100"
                            }`}
                        >
                            <img src={img} alt="Thumbnail" className="w-[150px] h-[90px] sm:w-[280px] sm:h-[160px] object-cover" />
                        </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}