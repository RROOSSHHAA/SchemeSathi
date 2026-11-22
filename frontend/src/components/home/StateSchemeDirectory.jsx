import React, { useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const statesAndUnionTerritories = [
  ['Andhra Pradesh', 'YSR Navasakam'], ['Arunachal Pradesh', 'CMLADA'],
  ['Assam', 'Orunodoi'], ['Bihar', 'Mukhyamantri Nischay Swayam Sahayata Bhata'],
  ['Chhattisgarh', 'Rajiv Gandhi Kisan Nyay Yojana'], ['Goa', 'CM Scholarship Scheme'],
  ['Gujarat', 'Kisan Suryoday Yojana'], ['Haryana', 'Ayushman Bharat Haryana'],
  ['Himachal Pradesh', 'CM Himachali Swavalamban'], ['Jharkhand', 'Mukhyamantri Sukhad Yojana'],
  ['Karnataka', 'Gruha Jyothi'], ['Kerala', 'Karunya Arogya Suraksha Padhathi'],
  ['Madhya Pradesh', 'Ladli Behna Yojana'], ['Maharashtra', 'MahaDBT / Lek Ladki'],
  ['Manipur', 'CM-HTC'], ['Meghalaya', 'CM-ELEVATE'],
  ['Mizoram', 'CM Special Category Scholarship'], ['Nagaland', 'Chief Minister Health Insurance'],
  ['Odisha', 'Subhadra Yojana'], ['Punjab', 'Aashirwad Scheme'],
  ['Rajasthan', 'Mukhyamantri Ayushman Jeevan Raksha'], ['Sikkim', 'CM Merit Scholarship'],
  ['Tamil Nadu', 'Kalaignar Magalir Urimai Thogai'], ['Telangana', 'Rythu Bandhu'],
  ['Tripura', 'Mukhyamantri Yuba Yogayog'], ['Uttar Pradesh', 'Mukhyamantri Abhyudaya Yojana'],
  ['Uttarakhand', 'Atal Ayushman Uttarakhand'], ['West Bengal', 'Lakshmir Bhandar'],
  ['Andaman and Nicobar Islands', 'Island Agricultural Development'], ['Chandigarh', 'Dr. Ambedkar Scholarship'],
  ['Dadra and Nagar Haveli and Daman and Diu', 'Community Welfare Scheme'],
  ['Delhi', 'Mukhyamantri Tirth Yatra'], ['Jammu and Kashmir', 'J&K Direct Benefit Transfer'],
  ['Ladakh', 'Ladakh Renewable Energy Scheme'], ['Lakshadweep', 'Island Social Security'],
  ['Puducherry', 'Pudhu Vaazhvu']
];

export default function StateSchemeDirectory() {
  const [query, setQuery] = useState('');
  const filteredStates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return statesAndUnionTerritories;
    return statesAndUnionTerritories.filter(([state, scheme]) =>
      `${state} ${scheme}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <section id="states" className="gov-card bg-white rounded-xl border border-govborder p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-govborder pb-4 mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-navy">State & Union Territory Schemes</h2>
          <p className="text-xs text-govmuted mt-1">Explore welfare schemes available across India</p>
        </div>
        <label className="relative block w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-govmuted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search state or scheme"
            className="w-full rounded-md border border-govborder pl-8 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStates.map(([state, scheme]) => (
          <div key={state} className="border border-govborder rounded-lg p-3.5 bg-alabaster/50 hover:border-saffron hover:shadow-sm transition">
            <div className="flex items-start space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-navy text-saffron flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-navy">{state}</h3>
                <p className="text-[11px] text-govmuted mt-1 leading-relaxed">{scheme}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredStates.length === 0 && (
        <p className="text-sm text-govmuted text-center py-8">No matching state or scheme found.</p>
      )}
    </section>
  );
}
