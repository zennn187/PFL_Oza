export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#FAFAFA] overflow-hidden">
      <div className="relative flex items-center justify-center mb-8">
        
        <div className="absolute w-24 h-24 bg-orange-500/10 rounded-full animate-ping duration-1000"></div>
        <div className="absolute w-32 h-32 bg-orange-500/5 rounded-full animate-ping duration-1500 delay-300"></div>
        
        <div className="w-20 h-20 border-[3px] border-orange-500/10 border-t-[#F97316] border-r-[#F97316]/40 rounded-full animate-spin shadow-[0_0_15px_rgba(249,115,22,0.1)]"></div>
        
        <div className="absolute text-2xl animate-bounce [animation-duration:2s] drop-shadow-[0_4px_6px_rgba(249,115,22,0.2)]">
          🍱
        </div>
      </div>
      
      <div className="text-center space-y-1.5">
        <p className="text-gray-700 text-sm font-black tracking-widest uppercase bg-gradient-to-r from-[#F97316] to-amber-500 bg-clip-text text-transparent">
          On-Catering
        </p>
        <p className="text-gray-400 text-[11px] font-medium tracking-wide flex items-center justify-center gap-1">
          <span>Menyajikan data operasional</span>
          <span className="flex gap-0.5 ml-0.5">
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
          </span>
        </p>
      </div>
    </div>
  );
}