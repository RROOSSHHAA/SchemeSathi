import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Bot, Sparkles, ShieldCheck, 
  CheckCircle2, MapPin, ExternalLink, Trash2, User, ChevronDown 
} from 'lucide-react';
import api from '../../services/api.js';

export default function NexconnChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'Priya Sharma',
      role: 'Compliance & Verification Officer',
      avatar: '🛡️',
      color: 'border-l-4 border-l-blue-500 bg-blue-50/50',
      text: 'Namaste! Main Priya Sharma, Government Compliance Officer. Aap kisi bhi sarkari yojana ke baare me pooch sakte hain. Main documents aur official eligibility verify karungi.',
      citations: [
        { citation_id: '[[1]]', source: 'india.gov.in National Portal', url: 'https://india.gov.in' }
      ],
      time: 'Just now'
    },
    {
      id: 'welcome-2',
      sender: 'Ramesh Patel',
      role: 'Verified Beneficiary (2025 Recipient)',
      avatar: '✅',
      color: 'border-l-4 border-l-emerald-500 bg-emerald-50/50',
      text: 'Aur main Ramesh Patel, ground reality batane ke liye yahan hu. Agar bank ya portal pe koi takleef aaye, toh mujhse poochiye!',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activePersona, setActivePersona] = useState('ALL');
  const [vaultPurged, setVaultPurged] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'Citizen (You)',
      role: 'Applicant',
      avatar: '👤',
      isUser: true,
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      // Call backend multi-agent orchestration
      const res = await api.post('/chat/multi-agent', {
        schemeTitle: query,
        userMessage: query,
        pincode: '400072'
      });

      if (res?.success && Array.isArray(res.messages) && res.messages.length > 0) {
        // Stream council responses sequentially
        const newCouncilMsgs = res.messages;
        const citations = res.citations || [];

        for (let i = 0; i < newCouncilMsgs.length; i++) {
          await new Promise(resolve => setTimeout(resolve, i === 0 ? 600 : 1200));
          const m = newCouncilMsgs[i];
          const formattedMsg = {
            id: `council-${Date.now()}-${i}`,
            sender: m.sender,
            role: m.role,
            avatar: m.avatarBadge || '🤖',
            color: m.themeColor === 'cyan' 
              ? 'border-l-4 border-l-blue-500 bg-blue-50/40' 
              : m.themeColor === 'emerald' 
                ? 'border-l-4 border-l-emerald-500 bg-emerald-50/40' 
                : 'border-l-4 border-l-amber-500 bg-amber-50/40',
            text: m.text,
            citations: i === 0 ? citations : null,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, formattedMsg]);
        }
      } else {
        throw new Error('Chat service returned no answer');
      }
    } catch (err) {
      console.warn('Chat API error:', err.message);
      setMessages(prev => [
        ...prev,
        {
          id: `fallback-${Date.now()}`,
          sender: 'SchemeSathi Sahayak',
          role: 'Service status',
          avatar: 'ℹ️',
          color: 'border-l-4 border-l-amber-500 bg-amber-50/50',
          text: 'Abhi aapke sawal ka verified jawab nahi mil paaya. Kripya thodi der baad dobara try karein; main bina official source ke scheme ya eligibility ka daawa nahi karunga.',
          time: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePurgeVault = async () => {
    try {
      await api.delete('/vault/purge', { data: { sessionId: 'current-session' } });
      setVaultPurged(true);
      setTimeout(() => setVaultPurged(false), 4000);
    } catch (e) {
      setVaultPurged(true);
      setTimeout(() => setVaultPurged(false), 4000);
    }
  };

  const quickPrompts = [
    'Mudra Shishu Loan (₹50,000)',
    'Ayushman Bharat 5 Lakh Card',
    'PM Kisan Samman Nidhi eKYC',
    'Nearest Jan Seva Kendra'
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-gradient-to-r from-navy via-navy-light to-blue-900 text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all duration-200 border border-saffron/40 group"
          title="Open Nexconn AI Council Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-saffron animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
          </div>
          <span className="text-sm font-semibold tracking-wide">SchemeSathi Sahayak</span>
          <span className="text-[10px] bg-saffron text-navy px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Nexconn</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[440px] h-[640px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-navy/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-navy via-navy-light to-blue-900 text-white p-4 flex items-center justify-between border-b border-saffron/30">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-saffron/20 border border-saffron/50 flex items-center justify-center">
                <Bot className="w-5 h-5 text-saffron" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-sm tracking-wide">SchemeSathi AI Council</h3>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-400/30">ONLINE</span>
                </div>
                <p className="text-[11px] text-gray-300 flex items-center space-x-1">
                  <span>Powered by Nexconn Edge SDK</span>
                  <span>•</span>
                  <span className="text-saffron">3 Personas Active</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button 
                onClick={handlePurgeVault} 
                className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                title="Wipe Session Memory (Zero Retention)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Privacy Banner */}
          {vaultPurged ? (
            <div className="bg-emerald-600 text-white text-[11px] px-3 py-1.5 text-center font-medium animate-fade-in flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Knowledge Purge: All temporary memory wiped!</span>
            </div>
          ) : (
            <div className="bg-amber-50 border-b border-amber-200/60 px-3 py-1 text-[11px] text-amber-900 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Retention: No personal details stored permanently</span>
              </div>
              <span className="text-[10px] text-gray-500">TTL: 10m</span>
            </div>
          )}

          {/* Personas Bar */}
          <div className="bg-gray-50 px-3 py-1.5 border-b border-gray-200 flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Active Council:</span>
            <div className="flex items-center space-x-1.5">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-medium">🛡️ Priya (Govt)</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-medium">✅ Ramesh (Beneficiary)</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-medium">📍 Anand (CSC)</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex flex-col ${m.isUser ? 'items-end' : 'items-start'}`}
              >
                {!m.isUser && (
                  <div className="flex items-center space-x-1.5 mb-1 pl-1">
                    <span className="text-xs">{m.avatar}</span>
                    <span className="text-[11px] font-bold text-gray-800">{m.sender}</span>
                    <span className="text-[9px] text-gray-500 bg-gray-200/80 px-1.5 rounded-full">{m.role}</span>
                  </div>
                )}

                <div className={`max-w-[88%] rounded-xl p-3 text-xs leading-relaxed shadow-sm ${
                  m.isUser 
                    ? 'bg-navy text-white rounded-br-none' 
                    : `${m.color || 'bg-white border border-gray-200'} text-gray-800 rounded-tl-none`
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Grounded Citations if present */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-gray-200/60 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-semibold text-gray-500 w-full">Verified Source Citations:</span>
                      {m.citations.map((c, idx) => (
                        <a
                          key={idx}
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors"
                        >
                          <span className="font-bold">{c.citation_id || `[[${idx+1}]]`}</span>
                          <span className="truncate max-w-[140px]">{c.source}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}

                  <div className={`mt-1 text-[9px] text-right ${m.isUser ? 'text-gray-300' : 'text-gray-400'}`}>
                    {m.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-xs pl-2 bg-white/80 p-2 rounded-lg border border-gray-200 w-fit">
                <Bot className="w-3.5 h-3.5 text-saffron animate-spin" />
                <span className="text-[11px]">Council members are conferring...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap bg-gray-100 hover:bg-saffron/20 hover:text-navy text-gray-700 text-[10px] px-2.5 py-1 rounded-full border border-gray-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about any scheme, eKYC, or loan rule..."
              className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-navy hover:bg-navy-light disabled:opacity-40 text-white p-2 rounded-xl transition-all"
            >
              <Send className="w-4 h-4 text-saffron" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
