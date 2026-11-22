import React from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Compass, 
  FolderLock, 
  ShieldCheck, 
  Lock, 
  Building, 
  Headphones, 
  ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      label: 'Rule Engine Verification',
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
      label: 'Citizen Helpline & FAQ',
      desc: 'Toll-free public assistance',
      icon: Headphones,
      action: 'faq'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-govborder pb-2.5">
        <h2 className="text-base font-bold text-navy">Important Links</h2>
      </div>

      {/* Grid of 2-column tiles matching the reference design */}
      <div className="grid grid-cols-2 gap-2.5">
        {links.map((link) => {
          const IconComponent = link.icon;
          
          if (link.url) {
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-card p-2.5 rounded border border-govborder hover:border-navy hover:bg-alabaster/40 transition flex items-center space-x-2 text-left group"
              >
                <div className="w-7 h-7 rounded bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition">
                  <IconComponent className="w-3.5 h-3.5" />
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
              className="gov-card p-2.5 rounded border border-govborder hover:border-navy hover:bg-alabaster/40 transition flex items-center space-x-2 text-left group"
            >
              <div className="w-7 h-7 rounded bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition">
                <IconComponent className="w-3.5 h-3.5" />
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
