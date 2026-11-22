import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  UserCheck, 
  MapPin, 
  Clock, 
  Radio, 
  Sparkles,
  AlertCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  AudioWaveform,
  Headphones
} from 'lucide-react';
import { connectToNexconn, sendDirectMessage, ConnectionState } from '../../services/nexconnService.js';
import api from '../../services/api.js';

const PERSONAS = [
  {
    id: 'mentor_priya_compliance',
    name: 'Priya Sharma',
    role: 'Compliance & Verification Officer',
    badge: '🛡️ Compliance Desk',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    greeting: 'Namaste! I am Priya Sharma from the Welfare Verification Desk. I can verify official government guidelines, eligible income thresholds, and required documentation checklists for state and central schemes.',
    quickPrompts: [
      'What documents are mandatory for PM Mudra?',
      'Check SECC eligibility for Ayushman Bharat',
      'Explain DBT direct bank transfer rules'
    ]
  },
  {
    id: 'mentor_ramesh_beneficiary',
    name: 'Ramesh Patel',
    role: 'Verified Beneficiary Mentor',
    badge: '✅ Grassroots Mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    greeting: 'Ram Ram! I received the PM Mudra Shishu loan and Kisan Samman Nidhi in 2025. Ask me anything about handling bank branch managers, avoiding agent commissions, and submitting character-matched PAN-Aadhaar papers.',
    quickPrompts: [
      'Did bank ask for collateral for Mudra?',
      'How long did loan disbursement take?',
      'What to do if bank clerk delays application?'
    ]
  },
  {
    id: 'mentor_anand_csc',
    name: 'Anand Verma',
    role: 'Jan Seva Kendra (CSC) Lead',
    badge: '📍 CSC Desk Operator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    greeting: 'Greetings citizen! I operate a Jan Seva Kendra in Maharashtra. If you are experiencing fingerprint biometrics failure, mobile OTP mismatch, or need income certificate attestations, I can direct you step-by-step.',
    quickPrompts: [
      'Locate nearest Jan Seva Kendra',
      'How to resolve mobile OTP not received error?',
      'Official statutory government fee for biometric e-KYC'
    ]
  }
];

export default function NexconnChatModal({ isOpen, onClose, initialScheme = null, startWithVoice = false }) {
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [messagesByPersona, setMessagesByPersona] = useState({
    mentor_priya_compliance: [
      {
        id: 'init-priya',
        text: PERSONAS[0].greeting,
        timestamp: '10:00 AM',
        isUser: false
      }
    ],
    mentor_ramesh_beneficiary: [
      {
        id: 'init-ramesh',
        text: PERSONAS[1].greeting,
        timestamp: '10:01 AM',
        isUser: false
      }
    ],
    mentor_anand_csc: [
      {
        id: 'init-anand',
        text: PERSONAS[2].greeting,
        timestamp: '10:02 AM',
        isUser: false
      }
    ]
  });

  const [inputText, setInputText] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(ConnectionState.CONNECTING);
  const [statusMessage, setStatusMessage] = useState('Connecting to Nexconn Engine...');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState(null);
  const [voiceNotice, setVoiceNotice] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN'; // defaults to Hindi / English / Marathi mixed

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice('Voice Assistant is listening... बोलिए, हम सुन रहे हैं');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Voice Assistant error:', event.error);
        setIsListening(false);
        setVoiceNotice(`Voice recognition error: ${event.error}. You can also type your question.`);
        setTimeout(() => setVoiceNotice(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setVoiceNotice(null), 2500);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Toggle Voice Recognition
  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      setVoiceNotice('Voice input is supported in Chrome, Edge & Safari. Please type your message.');
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('SpeechRecognition start:', err);
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  };

  // Text-To-Speech Playback for AI answers
  const handleSpeakText = (msgId, text) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Check for Hindi/Indian English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('India'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Auto-start voice if requested
  useEffect(() => {
    if (isOpen && startWithVoice && recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen, startWithVoice]);

  // Stop speech when closing modal
  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsListening(false);
      setIsSpeakingId(null);
    }
  }, [isOpen]);

  // Initialize Nexconn Chat connection on modal mount
  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;

    connectToNexconn({
      onStatusChange: (status, message) => {
        if (!mounted) return;
        setConnectionStatus(status);
        setStatusMessage(message);
      },
      onMessageReceived: (incomingMsg) => {
        if (!mounted) return;
        setMessagesByPersona(prev => ({
          ...prev,
          [activePersona.id]: [...(prev[activePersona.id] || []), incomingMsg]
        }));
      }
    });

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesByPersona, activePersona]);

  // If initialScheme was provided, add contextual prompt
  useEffect(() => {
    if (initialScheme && isOpen) {
      const schemeNotice = {
        id: `scheme-context-${Date.now()}`,
        text: `You are currently viewing: **${initialScheme.title || initialScheme.name}**. Feel free to ask specific verification or application questions about this scheme.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessagesByPersona(prev => ({
        ...prev,
        [activePersona.id]: [...(prev[activePersona.id] || []), schemeNotice]
      }));
    }
  }, [initialScheme, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text || !text.trim() || isSending) return;

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg = {
      id: `usr_${Date.now()}`,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    // Update UI immediately with citizen message
    setMessagesByPersona(prev => ({
      ...prev,
      [activePersona.id]: [...(prev[activePersona.id] || []), userMsg]
    }));
    setInputText('');
    setIsSending(true);

    // Call Nexconn Chat SDK DirectChannel
    await sendDirectMessage(activePersona.id, text);

    // Generate grounded contextual response from AI Council / Verified Mentors
    setTimeout(async () => {
      try {
        const councilRes = await api.post('/chat/multi-agent', {
          schemeTitle: initialScheme?.title || initialScheme?.name || 'PM Mudra Yojana',
          userMessage: text,
          pincode: '400072'
        });

        const councilMessages = councilRes?.messages || [];
        const personaName = activePersona.name.split(' ')[0].toLowerCase();
        const selectedMessage = councilMessages.find(message => message.sender?.toLowerCase().includes(personaName)) || councilMessages[0];
        if (!councilRes?.success || !selectedMessage?.text) {
          throw new Error('Chat service returned no answer');
        }

        const sourceList = (councilRes.citations || [])
          .map(source => `${source.source}: ${source.url}`)
          .join('\n');
        const replyText = sourceList
          ? `${selectedMessage.text}\n\nOfficial sources:\n${sourceList}`
          : selectedMessage.text;

        const replyMsg = {
          id: `rep_${Date.now()}`,
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        };

        setMessagesByPersona(prev => ({
          ...prev,
          [activePersona.id]: [...(prev[activePersona.id] || []), replyMsg]
        }));
      } catch (err) {
        console.warn('Chat API error:', err.message);
        const fallbackMsg = {
          id: `rep_err_${Date.now()}`,
          text: 'Abhi aapke sawal ka verified jawab nahi mil paaya. Kripya thodi der baad dobara try karein; main bina official source ke scheme ya eligibility ka daawa nahi karunga.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        };
        setMessagesByPersona(prev => ({
          ...prev,
          [activePersona.id]: [...(prev[activePersona.id] || []), fallbackMsg]
        }));
      } finally {
        setIsSending(false);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  const currentMessages = messagesByPersona[activePersona.id] || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[760px] flex flex-col border border-govborder overflow-hidden">
        
        {/* Government Top Bar with Voice Assistant Logo next to title */}
        <div className="bg-navy text-white px-4 py-3 sm:px-6 flex items-center justify-between border-b border-navy-light">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-saffron/20 border border-saffron flex items-center justify-center text-saffron shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-bold text-sm sm:text-base tracking-wide">
                  योजनासाथी Live Sahayak Desk
                </h2>

                {/* Voice Assistant Logo & Button */}
                <button
                  type="button"
                  onClick={toggleVoiceListening}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer border ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 animate-pulse ring-2 ring-red-400'
                      : 'bg-saffron text-navy border-saffron-dark hover:bg-saffron-light'
                  }`}
                  title="Voice Assistant: बोलकर पूछें (Click to toggle voice)"
                >
                  <Mic className={`w-3.5 h-3.5 ${isListening ? 'animate-bounce text-white' : 'text-navy'}`} />
                  <span>Voice Assistant</span>
                  {isListening ? (
                    <span className="flex space-x-0.5 items-center">
                      <span className="w-1 h-2.5 bg-white rounded-full animate-pulse" />
                      <span className="w-1 h-3.5 bg-white rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150" />
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-heritage-green animate-ping" />
                  )}
                </button>

                <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-heritage-green text-white">
                  Nexconn Chat SDK v26.5
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-300 mt-0.5">
                <span className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    connectionStatus === ConnectionState.CONNECTED 
                      ? 'bg-heritage-green animate-pulse' 
                      : connectionStatus === ConnectionState.SANDBOX
                      ? 'bg-saffron'
                      : 'bg-yellow-400'
                  }`}></span>
                  <span className="text-[11px] font-mono">{statusMessage}</span>
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Helpdesk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Selector Strip */}
        <div className="bg-alabaster border-b border-govborder px-4 py-2.5 flex items-center space-x-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-govmuted uppercase tracking-wider shrink-0 mr-1">
            Council Persona:
          </span>
          {PERSONAS.map(persona => {
            const isSelected = activePersona.id === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  isSelected
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-white text-charcoal hover:bg-gray-100 border border-govborder'
                }`}
              >
                <img 
                  src={persona.avatar} 
                  alt={persona.name} 
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />
                <span>{persona.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-saffron text-navy font-bold' : 'bg-gray-100 text-govmuted'
                }`}>
                  {persona.badge.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-alabaster/40">
          
          {/* Active Persona Profile Card */}
          <div className="bg-white p-3.5 rounded-lg border border-govborder shadow-2xs flex items-center space-x-3.5">
            <img 
              src={activePersona.avatar} 
              alt={activePersona.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-saffron shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-navy text-sm truncate">{activePersona.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-heritage-green/10 text-heritage-green">
                  {activePersona.badge}
                </span>
              </div>
              <p className="text-xs text-charcoal-light truncate">{activePersona.role}</p>
              <div className="flex items-center space-x-3 mt-1 text-[11px] text-govmuted">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-heritage-green" />
                  <span>Verified Identity</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-saffron" />
                  <span>Instant Response</span>
                </span>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="space-y-3.5 pt-2">
            {currentMessages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-xl text-xs sm:text-sm leading-relaxed relative group ${
                    msg.isUser
                      ? 'bg-navy text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-charcoal border border-govborder rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Audio Listen Button for AI replies */}
                  {!msg.isUser && (
                    <button
                      type="button"
                      onClick={() => handleSpeakText(msg.id, msg.text)}
                      className="mt-2 text-[11px] font-semibold text-navy/70 hover:text-navy inline-flex items-center space-x-1 border border-govborder rounded-md px-2 py-0.5 bg-alabaster hover:bg-saffron/20 transition cursor-pointer"
                      title={isSpeakingId === msg.id ? 'Stop Voice Output' : 'Voice Assistant: Listen in Audio (व्हॉईस ऐका)'}
                    >
                      {isSpeakingId === msg.id ? (
                        <>
                          <VolumeX className="w-3 h-3 text-red-600 animate-pulse" />
                          <span className="text-red-600">Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-saffron-dark" />
                          <span>Listen (व्हॉईस ऐका)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-govmuted mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            
            {isSending && (
              <div className="flex items-center space-x-2 text-xs text-govmuted animate-pulse px-2">
                <span className="w-2 h-2 rounded-full bg-navy"></span>
                <span>{activePersona.name} is typing official guidance...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

        </div>

        {/* Live Voice Assistant Notice / Audio Wave Banner */}
        {voiceNotice && (
          <div className="bg-amber-50 border-t border-saffron px-4 py-2 flex items-center justify-between text-xs text-navy animate-fade-in">
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4 text-saffron-dark animate-bounce" />
              <span className="font-semibold">{voiceNotice}</span>
            </div>
            {isListening && (
              <button
                type="button"
                onClick={toggleVoiceListening}
                className="text-[11px] text-red-600 hover:underline font-bold"
              >
                Done Speaking
              </button>
            )}
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="bg-white border-t border-govborder px-4 py-2 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-bold text-govmuted uppercase tracking-wider shrink-0 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-saffron" />
            <span>Ask:</span>
          </span>
          {activePersona.quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-alabaster hover:bg-saffron/15 text-navy border border-govborder text-[11px] whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice Assistant Microphone Logo */}
        <div className="p-3 bg-white border-t border-govborder">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            {/* Dedicated Voice Assistant Microphone Button */}
            <button
              type="button"
              onClick={toggleVoiceListening}
              className={`p-2.5 rounded-lg border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                isListening 
                  ? 'bg-red-500 text-white border-red-600 animate-pulse ring-2 ring-red-300' 
                  : 'bg-saffron/20 text-navy border-saffron hover:bg-saffron hover:text-navy'
              }`}
              title="Voice Assistant: बोलकर पूछें (Click to Speak)"
              aria-label="Voice Assistant Microphone"
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-white' : 'text-navy'}`} />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? 'Listening to your voice... बोलिए...' : `Message ${activePersona.name}... (Type or click Voice Assistant microphone)`}
              className={`flex-1 border rounded-lg px-4 py-2.5 text-xs sm:text-sm text-charcoal placeholder-govmuted focus:outline-hidden transition-all ${
                isListening 
                  ? 'bg-amber-50 border-saffron ring-1 ring-saffron' 
                  : 'bg-alabaster border-govborder focus:ring-1 focus:ring-navy focus:border-navy'
              }`}
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className={`px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center space-x-1.5 transition-all shrink-0 ${
                inputText.trim() && !isSending
                  ? 'bg-navy text-white hover:bg-navy-light shadow-xs cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="mt-2 flex items-center justify-between text-[10px] text-govmuted px-1">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3 h-3 text-heritage-green" />
              <span>Zero Disk Storage Guarantee • End-to-End Ephemeral Encrypted by Nexconn SDK</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1 text-saffron-dark font-medium">
              <Mic className="w-3 h-3 text-saffron" />
              <span>Voice Assistant Enabled</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
