import { Button } from "../button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function Next(){
    return(
       <div className="flex flex-col items-center gap-4 h-150 justify-center">
        <h1 className="font-header font-semibold text-3xl text-white">Protect your privacy,  don’t let anyone see it</h1>
        <Link href="/blur">
            <Button className="bg-white hover:bg-white py-6.5 px-6 rounded-full font-inter text-black">Unggah & Sensor Foto <ArrowRightIcon/></Button>
        </Link>
       </div> 
    )
}