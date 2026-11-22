import React from 'react';
import { Bell, Calendar } from 'lucide-react';

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
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-govborder pb-3">
        <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center space-x-2">
          <Bell className="w-5 h-5 text-saffron" />
          <span>Latest News & Announcements</span>
        </h2>
      </div>

      {/* Announcements List Container with Roomy Padding */}
      <div className="gov-card rounded-xl p-4 sm:p-5 border border-govborder bg-white divide-y divide-govborder/60 shadow-xs">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelectAnnouncement && onSelectAnnouncement(item)}
            className="py-3.5 first:pt-1 last:pb-1 hover:bg-alabaster/60 transition rounded-lg px-2.5 cursor-pointer group"
          >
            <div className="flex items-start space-x-3">
              <span className="w-2 h-2 rounded-full bg-navy mt-1.5 flex-shrink-0 group-hover:bg-saffron transition"></span>
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-navy group-hover:text-navy-light transition line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-govmuted whitespace-nowrap flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                </div>
                <p className="text-xs text-charcoal-light mt-1 line-clamp-2 leading-relaxed">
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
