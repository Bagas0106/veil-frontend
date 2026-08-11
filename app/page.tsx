import Hero from "@/components/ui/Landing Page/hero";
import About from "@/components/ui/Landing Page/about";
import Preview from "@/components/ui/Landing Page/preview";
import Explanation from "@/components/ui/Landing Page/explanation";
import Next from "@/components/ui/Landing Page/next";

export default function Home() {
  return (
    <main className="bg-[#000000]">
        <div className="bg-gradient-to-b from-[#f4ebff] via-[#f4ebff] to-[#a621ff] min-h-screen">
          <div className="max-w-[85rem] mx-auto">
            <Hero/>
          </div>
        </div>s
        <div className="text-white max-w-[85rem] mx-auto">
          <Preview/>
          <About/>
          <Explanation/>
          <Next/>
        </div>
    </main>
    
  );
}
