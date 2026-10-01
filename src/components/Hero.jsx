import SearchBar from "./SearchBar";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative">
      <div className="h-screen min-h-[700px] relative flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="w-full">
            <h1 className="font-sans text-5xl sm:text-6xl md:text-[7vw] lg:text-[6.5vw] xl:text-[7rem] text-cream-light font-medium leading-[1.0] tracking-tight mb-4 md:mb-6">
              Creation & confidence.<br />
              Without compromise.
            </h1>
          </div>

          <div className="flex items-center gap-3 text-cream-light cursor-pointer group pb-4">
            <span className="font-sans font-medium text-lg">Scroll</span>
            <div className="w-10 h-10 rounded-full border border-cream-light/50 flex items-center justify-center group-hover:bg-cream-light group-hover:text-ink transition-colors">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
