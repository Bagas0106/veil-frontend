import { Switch } from "./switch"
const settingsmenu = [
    {
        setting : "Blur",
        switch : <Switch/>
    },
    {
        setting : "Emote",
        switch : <Switch/>
    }
]

export default function Setting(){
    return(
        <div className="border-2 border-[#EAE8F0]/20 w-95 h-50 rounded-lg text-[#EAE8F0] bg-[#000000] p-4 space-y-2">
            <div className="space-y-4">
                <h1 className="font-header font-semibold text-4xl">Sesuaikan</h1>
                <h2 className="font-header font-semibold text-xl">Mode Sensor</h2>
            </div>
            <div className="bg-[]">
                <div className="bg-[#C8C4D7]/40 py-1 px-2.5 rounded-lg space-y-1">
                    {settingsmenu.map((setting) =>(
                        <div key={setting.setting} className="flex justify-between items-center">
                            <p className="font-semibold">{setting.setting}</p>
                            {setting.switch}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}