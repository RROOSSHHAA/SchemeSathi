import React from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Compass, 
  FolderLock, 
  ShieldCheck, 
  Lock, 
  Building, 
  Headphones 
} from 'lucide-react';

export default function ImportantLinks({ onAction }) {
  const links = [
    {
      id: 'questionnaire',
      label: 'Citizen Questionnaire',
      desc: 'Evaluate eligibility instantly',
      icon: FileSpreadsheet,
      action: 'questionnaire'
    },
    {
      id: 'schemes',
      label: 'Scheme Directory',
      desc: 'Explore Central & State portals',
      icon: Search,
      action: 'schemes'
    },
    {
      id: 'official-gov',
      label: 'Official Gov Portals',
      desc: 'gov.in & nic.in directory',
      icon: Compass,
      url: 'https://www.india.gov.in'
    },
    {
      id: 'digilocker',
      label: 'DigiLocker Verification',
      desc: 'Fetch verified certificates',
      icon: FolderLock,
      url: 'https://www.digilocker.gov.in'
    },
    {
      id: 'rules',
      label: 'Rule Verification',
      desc: 'Deterministic matching logic',
      icon: ShieldCheck,
      action: 'rules'
    },
    {
      id: 'security',
      label: 'Privacy & Security',
      desc: 'Zero financial data collection',
      icon: Lock,
      action: 'security'
    },
    {
      id: 'maharashtra',
      label: 'MahaDBT Portal',
      desc: 'Maharashtra state welfare',
      icon: Building,
      url: 'https://mahadbt.maharashtra.gov.in'
    },
    {
      id: 'helpline',
      label: 'Citizen Helpline',
      desc: 'Toll-free public assistance',
      icon: Headphones,
      action: 'faq'
    }
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-govborder pb-3">
        <h2 className="text-lg sm:text-xl font-bold text-navy">Important Links</h2>
      </div>

      {/* Grid of 2-column tiles with generous padding & tap targets */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
        {links.map((link) => {
          const IconComponent = link.icon;
          
          if (link.url) {
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-card p-3 rounded-lg border border-govborder hover:border-navy hover:bg-alabaster/40 transition flex items-center space-x-2.5 text-left group shadow-xs min-h-[56px]"
              >
                <div className="w-8 h-8 rounded-md bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-semibold text-navy truncate group-hover:text-navy-light">
                    {link.label}
                  </h4>
                  <span className="text-[10px] text-govmuted truncate block">Official Portal</span>
                </div>
              </a>
            );
          }

          return (
            <button
              key={link.id}
              onClick={() => onAction(link.action)}
              className="gov-card p-3 rounded-lg border border-govborder hover:border-navy hover:bg-alabaster/40 transition flex items-center space-x-2.5 text-left group shadow-xs min-h-[56px]"
            >
              <div className="w-8 h-8 rounded-md bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition">
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-semibold text-navy truncate group-hover:text-navy-light">
                  {link.label}
                </h4>
                <span className="text-[10px] text-govmuted truncate block">{link.desc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
