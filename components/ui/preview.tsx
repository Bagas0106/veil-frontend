

export default function Preview(){

    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="h-162 w-300 border border-[#EBB2FF]/50 p-4 rounded-lg space-y-4">
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#EBB2FF]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#EBB2FF]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#EBB2FF]/40"></div>
                </div>
                <div className="flex items-center justify-center">
                    <img src="linus.jpg" alt="" width={450} className="rounded-xl"/>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}