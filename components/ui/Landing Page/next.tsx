import { Button } from "../button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function Next(){
    return(
       <div className="flex flex-col items-center gap-6 h-[500px] md:h-[800px] justify-center px-4 text-center">
        <h1 className="font-header font-semibold text-2xl sm:text-3xl text-white">Protect your privacy, don’t let anyone see it</h1>
        <Link href="/blur">
            <Button className="bg-white hover:bg-gray-200 py-4 sm:py-6.5 px-6 rounded-full font-inter text-black w-full sm:w-auto text-sm sm:text-base">Unggah & Sensor Foto <ArrowRightIcon className="ml-1 inline w-4 h-4 sm:w-5 sm:h-5"/></Button>
        </Link>
       </div> 
    )
}