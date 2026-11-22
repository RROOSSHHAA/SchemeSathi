import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingSahayakButton({ onOpenChat }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in select-none">
      {/* Yojana Saathi Sahayak AI Chat Button */}
      <button
        onClick={onOpenChat}
        className="bg-navy hover:bg-navy-light text-white px-4 py-3 rounded-full shadow-2xl border-2 border-saffron flex items-center space-x-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        aria-label="Open Live Sahayak Chat"
        title="योजनासाथी Sahayak • AI Assistance Desk"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-saffron group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-tight">योजनासाथी Sahayak</div>
          <div className="text-[10px] text-saffron font-medium leading-tight">AI Chat Desk</div>
        </div>
      </button>
    </div>
  );
}
