import Hero from "@/components/ui/Landing Page/hero";
import About from "@/components/ui/Landing Page/about";
import Preview from "@/components/ui/Landing Page/preview";
import Explanation from "@/components/ui/Landing Page/explanation";
import Next from "@/components/ui/Landing Page/next";

export default function Home() {
  return (
    <main className="bg-black relative overflow-hidden scroll-smooth">
        <div className="absolute top-0 left-0 right-0 h-[115vh] bg-[radial-gradient(ellipse_200%_100%_at_50%_0%,#EAE8F0_30%,#DE8AFF_50%,#BC13FE_70%,#000000_100%)] pointer-events-none"></div>
        <div className="relative z-10 min-h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <Hero/>
          </div>
        </div>
        <div className="relative z-10 text-white max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20 md:gap-32 pb-20">
          <Preview/>
          <About/>
          <Explanation/>
          <Next/>
        </div>
    </main>
  );
}
