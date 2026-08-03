import Image from "next/image";
import Hero from "@/components/ui/hero";
import About from "@/components/ui/about";
import Preview from "@/components/ui/preview";

export default function Home() {
  return (
    <main className="bg-[#19101C]">
      <div className="bg-gradient-to-b from-[#f4ebff] via-[#a621ff] to-[#19101C] min-h-screen">
        <Hero/>
      </div>
      <div className="text-white">
        <About/>
        <Preview/>
      </div>
    </main>
    
  );
}
