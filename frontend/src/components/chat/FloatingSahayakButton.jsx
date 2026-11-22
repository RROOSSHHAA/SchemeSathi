import React from 'react';
import { MessageSquare, Mic, Sparkles } from 'lucide-react';

export default function FloatingSahayakButton({ onOpenChat, onOpenVoice }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 animate-fade-in select-none">
      
      {/* 1. Voice Assistant Side Companion Button with Microphone Logo */}
      <button
        onClick={onOpenVoice || onOpenChat}
        className="bg-saffron hover:bg-saffron-dark text-navy px-3.5 py-3 rounded-full shadow-2xl border-2 border-navy flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
        aria-label="Open Voice Assistant"
        title="Voice Assistant • बोलकर योजना खोजें (Click to Speak)"
      >
        <div className="relative">
          <Mic className="w-5 h-5 text-navy group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green" />
        </div>
        <div className="text-left hidden md:block pr-1">
          <div className="text-xs font-bold leading-tight">Voice Assistant</div>
          <div className="text-[10px] text-navy/80 font-medium leading-tight">बोलकर पूछें</div>
        </div>
      </button>

      {/* 2. Main Yojana Saathi Sahayak AI Chat Button */}
      <button
        onClick={onOpenChat}
        className="bg-navy hover:bg-navy-light text-white px-4 py-3 rounded-full shadow-2xl border-2 border-saffron flex items-center space-x-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        aria-label="Open Live Sahayak Chat"
        title="योजनासाथी Sahayak • AI Assistance Helpdesk"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-saffron group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-tight flex items-center space-x-1">
            <span>योजनासाथी Sahayak</span>
          </div>
          <div className="text-[10px] text-saffron font-medium leading-tight flex items-center space-x-1">
            <span>Live Chat Desk</span>
          </div>
        </div>
      </button>

    </div>
  );
}
