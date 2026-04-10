import { useState, useRef, useEffect } from 'react';
import { mockPatient } from '@/lib/mockData';
import { askCoach } from '@/lib/agents';
import { Send, Loader2, Sparkles, Phone } from 'lucide-react';
import PetraVoiceAgent from '@/components/PetraVoiceAgent';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

const starterQuestions = [
  "What does my HbA1c of 7.6% mean for my long-term health?",
  "My LDL is very high — what's the risk and what can I do?",
  "How does my daily step count affect my diabetes?",
  "What's the single most impactful change I can make right now?",
];

export default function Coach() {
  const p = mockPatient;
  const [petraOpen, setPetraOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hi ${p.firstName} 👋 I'm your VitaCore AI health coach.\n\nI've reviewed your health data — your labs, wearables, and lifestyle survey. I'm here to help you understand what it means and what to do next, always in partnership with your care team at Centrum Health.\n\nWhat would you like to explore today?`
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    const response = await askCoach(p, userMsg, newMessages.slice(1).slice(-8));
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] md:h-screen max-w-3xl mx-auto bg-[#F8FAFC]">
      <PetraVoiceAgent isOpen={petraOpen} onClose={() => setPetraOpen(false)} patientContext={p} />

      {/* Header */}
      <div className="p-5 pb-4 border-b border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Sparkles size={20} className="text-teal-600" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#0F172A]">VitaCore Coach</h1>
            <p className="text-xs text-slate-400">AI health coach · Powered by your real health data</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setPetraOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
            >
              <Phone size={13} />
              Petra anrufen
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles size={13} className="text-teal-600" />
              </div>
            )}
            <div className={cn("max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
              msg.role === 'user'
                ? "bg-[#0F172A] text-white rounded-tr-sm"
                : "bg-white border border-slate-100 text-slate-700 rounded-tl-sm")}>
              {msg.role === 'assistant' ? (
                <ReactMarkdown className="prose prose-sm max-w-none prose-slate [&>p]:my-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                  {msg.content}
                </ReactMarkdown>
              ) : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center">
              <Sparkles size={13} className="text-teal-600" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <Loader2 size={14} className="text-teal-400 animate-spin" />
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold text-slate-400">Suggested questions:</p>
            {starterQuestions.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)}
                className="w-full text-left text-sm text-slate-500 hover:text-[#0F172A] border border-slate-100 bg-white rounded-xl px-4 py-3 hover:border-teal-200 hover:shadow-sm transition-all">
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask about your health data..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-teal-300 focus:ring-1 focus:ring-teal-200 transition-all" />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-white disabled:opacity-30 hover:bg-slate-800 transition-all shrink-0">
            <Send size={14} />
          </button>
        </div>
        <p className="text-[10px] text-slate-300 text-center mt-2">VitaCore Coach provides health education — not medical advice. Always consult your physician.</p>
      </div>
    </div>
  );
}