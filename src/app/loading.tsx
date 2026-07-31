export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="border border-[rgba(0,229,255,0.2)] rounded-lg overflow-hidden bg-[#0F172A]/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(0,229,255,0.1)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF4D6D]" />
              <div className="w-3 h-3 rounded-full bg-[#FFC857]" />
              <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
            </div>
            <span className="text-xs text-[#94A3B8] ml-2 font-mono">
              cyberSentinel.exe
            </span>
          </div>
          <div className="p-4 font-mono text-sm space-y-3 min-h-[200px]">
            <div className="flex items-start gap-2 text-[#94A3B8]">
              <span className="text-[#00E5FF] shrink-0">[</span>
              <span>Initializing Security Engine...</span>
              <span className="text-[#00E5FF] shrink-0">]</span>
            </div>
            <div className="flex items-start gap-2 text-[#94A3B8]">
              <span className="text-[#00E5FF] shrink-0">[</span>
              <span>Loading Threat Intelligence...</span>
              <span className="text-[#00E5FF] shrink-0">]</span>
            </div>
            <div className="flex items-start gap-2 text-[#94A3B8] animate-pulse">
              <span className="text-[#00E5FF] shrink-0">[</span>
              <span>Connecting Secure Database...</span>
              <span className="text-[#00E5FF] shrink-0">]</span>
              <span className="text-[#00E5FF]">_</span>
            </div>
          </div>
        </div>
        <div className="mt-4 h-1 bg-[#0F172A] rounded-full overflow-hidden border border-[rgba(0,229,255,0.1)]">
          <div className="h-full w-2/3 bg-gradient-to-r from-[#00E5FF] to-[#00FF88] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
