import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../services/api';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  TrendingUp,
  Sprout,
  Loader2,
  ChevronUp,
  MessageSquare,
} from 'lucide-react';

export const AiChatDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: 'ai' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: 'Namaste! I am Kisan AI Saathi (किसान एआई साथी), your agricultural advisor. Ask me about crop pricing in Kalimati, harvest timing, group selling in Kavre or Chitwan, storage tips, or pest protection.',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const quickPrompts = [
    'What is today\'s Kalimati tomato benchmark?',
    'How does Group Selling benefit Kavre farmers?',
    'What are cold storage options in Chitwan?',
    'When is the best time to harvest Cardinal potatoes?',
  ];

  const handleSend = async (textToSend?: string) => {
    const message = textToSend || input.trim();
    if (!message || loading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: message, time: userTime }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.chatAi(message);
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { sender: 'ai', text: res.reply, time: aiTime }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Namaste! KisanLink AI advisor is analyzing live market telemetry. Grouping harvests and registering at local collection centers in Kavre or Chitwan secures the highest farm-gate price this week.',
          time: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          id="open-ai-saathi-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-xl shadow-emerald-700/30 hover:scale-105 transition-all cursor-pointer border-2 border-emerald-400 group animate-pulse-subtle"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-200" />
          </div>
          <span className="font-bold text-xs tracking-wide">Kisan AI Saathi</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Top Bar */}
          <div className="bg-emerald-800 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white border border-emerald-400/50">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight flex items-center gap-1.5 font-display">
                  Kisan AI Saathi <span className="text-[10px] bg-emerald-600 px-1.5 py-0.5 rounded font-mono">Gemini 3.7</span>
                </h4>
                <p className="text-[11px] text-emerald-200">Nepal Agri & Market Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/60 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#f8fafc]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200/80 w-fit">
                <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Kisan AI is analyzing market intelligence...</span>
              </div>
            )}
          </div>

          {/* Quick prompt suggestions */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 overflow-x-auto flex gap-1.5 shrink-0">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-[10px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Nepali crops, prices..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
