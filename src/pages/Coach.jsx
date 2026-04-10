import { useState, useRef, useEffect } from 'react';
import { mockPatient } from '@/lib/mockData';
import { askCoach } from '@/lib/agents';
import { Send, Mic, Loader2, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

const starterQuestions = [
  "What does my hsCRP result mean for my long-term health?",
  "Why is my biological age higher than my actual age?",
  "What's the single biggest thing I can do to improve my longevity score?",
  "How is sleep connected to my inflammation levels?",
];

export default function Coach() {
  const p = mockPatient;
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi ${p.name.split(' ')[0]} 👋 I'm your AI health coach. I can help you understand your health data, explain what your results mean, and guide you toward the right next steps — always with your care team at Centrum Health in mind.\n\nWhat would you like to know today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    const history = newMessages.slice(1).slice(-8);
    const response = await askCoach(p, userMsg, history);

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-0px)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bot size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">AI Health Coach</h1>
            <p className="text-xs text-muted-foreground">Powered by LongevityOS · Always guided by your care team</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} className="text-primary" />
              </div>
            )}
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
              msg.role === 'user'
                ? "bg-primary text-primary-foreground rounded-tr-sm"
                : "bg-card border border-border text-foreground rounded-tl-sm"
            )}>
              {msg.role === 'assistant' ? (
                <ReactMarkdown className="prose prose-sm prose-invert max-w-none [&>p]:my-1 [&>ul]:my-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                  {msg.content}
                </ReactMarkdown>
              ) : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 size={14} className="text-muted-foreground animate-spin" />
            </div>
          </div>
        )}

        {/* Starter questions */}
        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-muted-foreground">Try asking:</p>
            {starterQuestions.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)}
                className="w-full text-left text-sm text-muted-foreground hover:text-foreground border border-border rounded-xl px-4 py-2.5 hover:bg-secondary transition-all">
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask about your health data..."
            className="flex-1 bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-all"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-all shrink-0">
            <Send size={15} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          This coach provides health education, not medical advice. Always consult your physician.
        </p>
      </div>
    </div>
  );
}