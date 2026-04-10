import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const AGENT_ID = 'agent_4101knsvze4ff5398rbghyjs6016';

export default function PetraVoiceAgent({ isOpen, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    // Clear and inject the widget element
    containerRef.current.innerHTML = '';
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', AGENT_ID);
    widget.style.width = '100%';
    containerRef.current.appendChild(widget);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full md:w-[440px] mx-4 mb-4 md:mb-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-[#0F172A] to-[#1e293b]">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-white text-sm font-semibold">Petra · VitaCore AI Health Coach</span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Widget container */}
        <div className="p-6 flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-teal-400/30 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
            <div className="w-full h-full bg-gradient-to-b from-[#f5deb3] to-[#e8c99a] flex items-end justify-center overflow-hidden">
              <div className="relative w-full h-full flex flex-col items-center">
                <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#d4a843] to-[#c49a2a] rounded-t-full" />
                <div className="absolute top-5 left-1 w-7 h-18 bg-[#d4a843] rounded-b-full" />
                <div className="absolute top-5 right-1 w-7 h-18 bg-[#d4a843] rounded-b-full" />
                <div className="absolute top-7 left-5 right-5 bottom-7 bg-gradient-to-b from-[#fde3c8] to-[#f5c9a0] rounded-[50%]" />
                <div className="absolute top-12 left-8 w-3 h-2 bg-[#5b3d2e] rounded-full" />
                <div className="absolute top-12 right-8 w-3 h-2 bg-[#5b3d2e] rounded-full" />
                <div className="absolute top-17 left-9 right-9 h-1.5 border-b-2 border-[#c0706b] rounded-b-full" />
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-[#14B8A6] to-[#0d9488] rounded-t-[40%]" />
                <div className="absolute bottom-8 left-10 right-10 h-6 bg-[#f5c9a0]" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-extrabold text-white">Hallo! Ich bin Petra</h2>
            <p className="text-sm text-white/50 mt-1">Klicken Sie auf das Mikrofon um zu starten</p>
          </div>

          {/* ElevenLabs widget renders here */}
          <div ref={containerRef} className="w-full flex justify-center min-h-[80px]" />

          <p className="text-[10px] text-white/20 text-center leading-relaxed px-4">
            Petra ist eine KI und gibt keine medizinischen Diagnosen. Konsultieren Sie immer Ihren Arzt.
          </p>
        </div>
      </div>
    </div>
  );
}