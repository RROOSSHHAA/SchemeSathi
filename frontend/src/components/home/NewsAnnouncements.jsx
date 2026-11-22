import React from 'react';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

export default function NewsAnnouncements({ onSelectAnnouncement }) {
  const announcements = [
    {
      id: 1,
      title: 'Latest News & Announcements',
      date: '21/11/2026',
      content: 'Central DBT portal announces direct bank transfer verification drive for post-matric higher education scholars.'
    },
    {
      id: 2,
      title: 'Charcoal Slate: MahaDBT Updates',
      date: '22/11/2026',
      content: 'Government of Maharashtra extends document upload window for Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna.'
    },
    {
      id: 3,
      title: 'Ayushman Bharat Card Expansion',
      date: '22/11/2026',
      content: 'Special enrollment camps launched in primary health centers for senior citizens aged 70 and above.'
    },
    {
      id: 4,
      title: 'PM Kisan 19th Installment Release',
      date: '20/11/2026',
      content: 'Mandatory e-KYC and land seeding status verification protocol issued for active beneficiary farmers.'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-govborder pb-2.5">
        <h2 className="text-base font-bold text-navy flex items-center space-x-2">
          <Bell className="w-4 h-4 text-saffron" />
          <span>Latest News & Announcements</span>
        </h2>
      </div>

      {/* Announcements List Container */}
      <div className="gov-card rounded-lg p-3.5 border border-govborder bg-white divide-y divide-govborder/60">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelectAnnouncement && onSelectAnnouncement(item)}
            className="py-2.5 first:pt-0 last:pb-0 hover:bg-alabaster/60 transition rounded px-2 cursor-pointer group"
          >
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-navy mt-1.5 flex-shrink-0 group-hover:bg-saffron transition"></span>
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="text-xs font-bold text-navy group-hover:text-navy-light transition line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-govmuted whitespace-nowrap flex items-center space-x-1">
                    <Calendar className="w-2.5 h-2.5" />
                    <span>{item.date}</span>
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-light mt-0.5 line-clamp-2 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
