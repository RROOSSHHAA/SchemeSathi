import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  SearchCheck
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

          <Link 
            to="/tracker" 
            className="flex items-center space-x-1.5 text-gray-200 hover:text-saffron font-medium whitespace-nowrap transition"
          >
            <SearchCheck className="w-3.5 h-3.5 text-saffron" />
            <span>Track Application</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
