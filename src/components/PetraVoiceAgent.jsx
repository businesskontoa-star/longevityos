import { useState, useCallback, useEffect } from 'react';
import { useConversation, ConversationProvider } from '@elevenlabs/react';
import { Phone, PhoneOff, Mic, MicOff, X, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENT_ID = 'agent_4101knsvze4ff5398rbghyjs6016';

function PetraVoiceAgentInner({ isOpen, onClose, patientContext }) {
  const [micGranted, setMicGranted] = useState(false);
  const [micError, setMicError] = useState(false);
  const [inputLevel, setInputLevel] = useState(0);

  const conversation = useConversation({
    onConnect: () => console.log('Petra connected'),
    onDisconnect: () => console.log('Petra disconnected'),
    onError: (err) => console.error('Petra error:', err),
  });

  const isConnected = conversation.status === 'connected';
  const isConnecting = conversation.status === 'connecting';

  // Animate input level
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(async () => {
      const level = await conversation.getInputVolume?.();
      setInputLevel(level ?? Math.random() * 0.5);
    }, 100);
    return () => clearInterval(interval);
  }, [isConnected]);

  const startCall = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicGranted(true);
      setMicError(false);
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'websocket',
        overrides: patientContext ? {
          agent: {
            firstMessage: `Hallo! Ich bin Petra, Ihre persönliche KI-Gesundheitsbegleiterin von VitaCore. Ich sehe, dass wir einige wichtige Werte besprechen sollten — besonders Ihren HbA1c-Wert und das LDL-Cholesterin. Wie kann ich Ihnen heute helfen?`
          }
        } : undefined,
      });
    } catch (e) {
      if (e.name === 'NotAllowedError') setMicError(true);
    }
  }, [conversation, patientContext]);

  const endCall = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const handleClose = useCallback(() => {
    if (isConnected) endCall();
    onClose();
  }, [isConnected, endCall, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full md:w-[420px] mx-4 mb-4 md:mb-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* Header bar */}
        <div className="bg-[#0F172A] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-white text-xs font-semibold">VitaCore Voice</span>
          </div>
          <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Main area */}
        <div className="bg-gradient-to-b from-[#0F172A] via-[#0F172A] to-[#1e293b] px-6 py-8 flex flex-col items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            {/* Outer pulse rings when speaking */}
            {isConnected && conversation.isSpeaking && (
              <>
                <div className="absolute inset-0 rounded-full bg-teal-400/20 animate-ping scale-110" />
                <div className="absolute inset-0 rounded-full bg-teal-400/10 animate-ping scale-125" style={{ animationDelay: '0.3s' }} />
              </>
            )}
            {/* Avatar circle */}
            <div className={cn(
              "relative w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-300",
              isConnected && conversation.isSpeaking ? "border-teal-400 shadow-[0_0_40px_rgba(20,184,166,0.5)]" :
              isConnected ? "border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" :
              "border-white/10"
            )}>
              {/* Blonde avatar illustration */}
              <div className="w-full h-full bg-gradient-to-b from-[#f5deb3] to-[#e8c99a] flex items-end justify-center overflow-hidden">
                {/* Face */}
                <div className="relative w-full h-full flex flex-col items-center">
                  {/* Hair */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#d4a843] to-[#c49a2a] rounded-t-full" />
                  {/* Hair sides */}
                  <div className="absolute top-6 left-1 w-8 h-20 bg-[#d4a843] rounded-b-full" />
                  <div className="absolute top-6 right-1 w-8 h-20 bg-[#d4a843] rounded-b-full" />
                  {/* Face skin */}
                  <div className="absolute top-8 left-6 right-6 bottom-8 bg-gradient-to-b from-[#fde3c8] to-[#f5c9a0] rounded-[50%]" />
                  {/* Eyes */}
                  <div className="absolute top-14 left-9 w-3.5 h-2 bg-[#5b3d2e] rounded-full" />
                  <div className="absolute top-14 right-9 w-3.5 h-2 bg-[#5b3d2e] rounded-full" />
                  {/* Eye shine */}
                  <div className="absolute top-14 left-10 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                  <div className="absolute top-14 right-10 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                  {/* Smile */}
                  <div className="absolute top-20 left-10 right-10 h-2 border-b-2 border-[#c0706b] rounded-b-full" />
                  {/* Shoulders */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-[#14B8A6] to-[#0d9488] rounded-t-[40%]" />
                  {/* Neck */}
                  <div className="absolute bottom-10 left-12 right-12 h-8 bg-[#f5c9a0]" />
                </div>
              </div>
            </div>
            {/* Mic indicator */}
            {isConnected && !conversation.isSpeaking && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center shadow-lg">
                <Mic size={14} className="text-[#0F172A]" />
              </div>
            )}
          </div>

          {/* Name & status */}
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-white">Petra</h2>
            <p className="text-sm text-white/50 mt-0.5">VitaCore AI Health Coach</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-teal-400 animate-pulse" : isConnecting ? "bg-amber-400 animate-pulse" : "bg-white/20")} />
              <span className="text-xs text-white/60 font-medium">
                {isConnected
                  ? conversation.isSpeaking ? "Petra spricht..." : "Petra hört zu..."
                  : isConnecting ? "Verbinde..."
                  : "Bereit für Gespräch"}
              </span>
            </div>
          </div>

          {/* Sound wave when speaking */}
          {isConnected && (
            <div className="flex items-center gap-1 h-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-teal-400 transition-all duration-150"
                  style={{
                    height: conversation.isSpeaking
                      ? `${Math.max(6, Math.sin((Date.now() / 200) + i) * 20 + 16)}px`
                      : '6px',
                    opacity: conversation.isSpeaking ? 0.8 + Math.sin(i) * 0.2 : 0.3,
                  }}
                />
              ))}
            </div>
          )}

          {/* Mic error */}
          {micError && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-center">
              <p className="text-sm text-red-400">Mikrofonzugriff verweigert. Bitte Erlaubnisse prüfen.</p>
            </div>
          )}

          {/* Call button */}
          <div className="flex flex-col items-center gap-3 w-full">
            {!isConnected ? (
              <button
                onClick={startCall}
                disabled={isConnecting}
                className="w-16 h-16 rounded-full bg-teal-400 hover:bg-teal-300 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all active:scale-95 disabled:opacity-50"
              >
                <Phone size={24} className="text-[#0F172A]" />
              </button>
            ) : (
              <button
                onClick={endCall}
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95"
              >
                <PhoneOff size={24} className="text-white" />
              </button>
            )}
            <p className="text-xs text-white/30 text-center">
              {isConnected ? "Auflegen" : isConnecting ? "Verbinde..." : "Gespräch starten"}
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-white/20 text-center leading-relaxed px-4">
            Petra ist eine KI und gibt keine medizinischen Diagnosen. Konsultieren Sie immer Ihren Arzt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PetraVoiceAgent(props) {
  return (
    <ConversationProvider>
      <PetraVoiceAgentInner {...props} />
    </ConversationProvider>
  );
}