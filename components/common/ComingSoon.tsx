"use client";

import { useRouter } from "next/navigation";

interface ComingSoonProps {
  feature?: string;
  emoji?: string;
  description?: string;
}

export default function ComingSoon({
  feature = "This Feature",
  emoji = "",
  description = "We're cooking something amazing! This feature is coming soon.",
}: ComingSoonProps) {
  const router = useRouter();

  return (
    <div className="h-[100dvh] bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-3xl rounded-full pointer-events-none animate-pulse" />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(251,146,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-2xl mx-auto text-center space-y-8">
        
        {/* Floating emoji */}
        <div className="relative inline-block">
          <div className="text-8xl animate-bounce">
            {emoji}
          </div>
          <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-2xl -z-10" />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            YapYard
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Brewing...
            </span>
          </h1>
          <p className="text-xl text-neutral-400 font-medium">
            {feature}
          </p>
        </div>

        {/* Description */}
        <p className="text-neutral-500 text-lg max-w-md mx-auto leading-relaxed">
          {description}
        </p>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto space-y-2">
          <div className="flex justify-between text-xs text-neutral-600 font-medium">
            <span>Progress</span>
            <span>73%</span>
          </div>
          
          <div className="h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
            <div className="h-full w-[73%] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>


        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-white text-sm font-semibold hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}