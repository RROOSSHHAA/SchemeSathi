import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  FolderLock, 
  SearchCheck, 
  GraduationCap, 
  Sprout, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';

export default function SubNavBar({ onOpenApply }) {
  return (
    <div className="bg-navy-dark/95 border-b border-navy-light/30 text-white text-xs py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-2">
        {/* Left Primary Action Services */}
        <div className="flex items-center space-x-6 overflow-x-auto py-0.5">
          {onOpenApply ? (
            <button 
              onClick={onOpenApply}
              className="flex items-center space-x-1.5 text-gray-200 hover:text-saffron font-medium whitespace-nowrap transition cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-saffron" />
              <span>Apply for Scheme</span>
            </button>
          ) : (
            <Link 
              to="/questionnaire" 
              className="flex items-center space-x-1.5 text-gray-200 hover:text-saffron font-medium whitespace-nowrap transition"
            >
              <CreditCard className="w-3.5 h-3.5 text-saffron" />
              <span>Apply for Scheme</span>
            </Link>
          )}

          <a 
            href="#documents" 
            className="flex items-center space-x-1.5 text-gray-200 hover:text-saffron font-medium whitespace-nowrap transition"
          >
            <FolderLock className="w-3.5 h-3.5 text-saffron" />
            <span>Digital Locker</span>
          </a>
          <a 
            href="#track" 
            className="flex items-center space-x-1.5 text-gray-200 hover:text-saffron font-medium whitespace-nowrap transition"
          >
            <SearchCheck className="w-3.5 h-3.5 text-saffron" />
            <span>Track Application</span>
          </a>
        </div>

        {/* Right Category Links */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-300">
          <Link to="/questionnaire?cat=education" className="hover:text-white transition flex items-center space-x-1">
            <GraduationCap className="w-3 h-3 text-saffron-light" />
            <span>Scholarships</span>
          </Link>
          <Link to="/questionnaire?cat=agriculture" className="hover:text-white transition flex items-center space-x-1">
            <Sprout className="w-3 h-3 text-saffron-light" />
            <span>Farmer Welfare</span>
          </Link>
          <Link to="/questionnaire?cat=hospitality" className="hover:text-white transition flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-saffron-light" />
            <span>Ayushman Health</span>
          </Link>
          <Link to="/questionnaire?cat=loan" className="hover:text-white transition flex items-center space-x-1">
            <CreditCard className="w-3 h-3 text-saffron-light" />
            <span>Mudra Loans</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
