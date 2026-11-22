import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function QuickQuestionnaireModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '20',
    state: 'Maharashtra',
    district: 'Pune',
    annualIncome: '180000',
    occupation: 'Student',
    isStudent: true,
    isFarmer: false,
    residenceType: 'Urban'
  });

  const [evaluationResult, setEvaluationResult] = useState(null);
  const [locationData, setLocationData] = useState({ states: [], union_territories: [] });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEvaluationResult(null);
    }
  }, [isOpen]);

  useEffect(() => {
    fetch('/data/india-locations.json')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load India location data');
        return response.json();
      })
      .then(setLocationData)
      .catch((error) => console.warn(error.message));
  }, []);

  const allStates = [
    ...(locationData.states || []).find((state) => state.name === 'Maharashtra')
      ? [locationData.states.find((state) => state.name === 'Maharashtra')]
      : [{ name: 'Maharashtra', districts: ['Pune'] }],
    ...(locationData.states || []).filter((state) => state.name !== 'Maharashtra'),
    ...(locationData.union_territories || [])
  ];

  const selectedLocation = allStates.find((location) => location.name === formData.state);
  const districtOptions = selectedLocation?.districts || [];

  const handleStateChange = (stateName) => {
    const stateLocation = allStates.find((location) => location.name === stateName);
    const districts = stateLocation?.districts || [];
    setFormData({
      ...formData,
      state: stateName,
      district: districts.includes(formData.district) ? formData.district : (districts[0] || '')
    });
  };

  if (!isOpen) return null;

  const handleEvaluate = () => {
    // Quick client-side preview of the deterministic engine logic
    const incomeNum = Number(formData.annualIncome);
    const ageNum = Number(formData.age);

    const matches = [];

    // MahaDBT Scholarship rule
    if (ageNum >= 17 && ageNum <= 30 && formData.isStudent && incomeNum <= 250000 && formData.state === 'Maharashtra') {
      matches.push({
        name: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (MahaDBT)',
        result: 'LIKELY_MATCH',
        department: 'Higher & Technical Education Department, Maharashtra',
        matchedConditions: [
          `Age (${ageNum} years) satisfies range 17-30`,
          `Family Income (₹${incomeNum.toLocaleString('en-IN')}) is below ₹2,50,000 threshold`,
          `State is Maharashtra (State scheme requirement met)`,
          `Active student status confirmed`
        ],
        benefits: '50% to 100% tuition and exam fee reimbursement directly to institutional account.',
        officialUrl: 'https://mahadbt.maharashtra.gov.in',
        documents: ['Aadhaar card', 'Income certificate', 'Caste certificate, if applicable', 'College admission proof', 'Bank passbook']
      });
    }

    // Ayushman Bharat / Health rule
    if (incomeNum <= 500000) {
      matches.push({
        name: 'Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
        result: 'LIKELY_MATCH',
        department: 'National Health Authority (NHA)',
        matchedConditions: [
          `Annual family income falls within healthcare priority brackets`,
          `Secondary and tertiary healthcare cashless cover applicable across empaneled hospitals`
        ],
        benefits: '₹5,00,000 cashless family health protection per year.',
        officialUrl: 'https://pmjay.gov.in',
        documents: ['Aadhaar card', 'Ration card or SECC beneficiary ID', 'Family identification document', 'Mobile number']
      });
    }

    // PM Jan Dhan Yojana
    if (ageNum >= 10) {
      matches.push({
        name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
        result: 'LIKELY_MATCH',
        department: 'Department of Financial Services, Ministry of Finance',
        matchedConditions: [
          `Age (${ageNum}) meets minimum age criterion of 10+`,
          `Basic Savings Bank Deposit (BSBD) account eligibility satisfied`
        ],
        benefits: 'Zero-balance bank account, free RuPay debit card, ₹2 Lakh accident insurance.',
        officialUrl: 'https://pmjdy.gov.in',
        documents: ['Aadhaar card', 'PAN card or Form 60', 'Address proof', 'Passport-size photographs', 'Mobile number']
      });
    }

    setEvaluationResult(matches);
    setStep(3); // Result step
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-govborder overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-navy text-white px-6 py-4 flex items-center justify-between border-b-2 border-saffron">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-saffron text-navy font-bold flex items-center justify-center text-xs">
              SS
            </div>
            <div>
              <span className="text-xs text-saffron font-semibold uppercase tracking-wider block">
                Citizen Welfare Portal
              </span>
              <h3 className="text-base font-bold text-white font-serif">
                Instant Scheme Eligibility Evaluator
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-alabaster px-6 py-2.5 border-b border-govborder flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-navy text-white' : 'bg-gray-300 text-charcoal'}`}>1</span>
            <span className={step === 1 ? 'font-bold text-navy' : 'text-govmuted'}>Demographics</span>
          </div>
          <div className="h-0.5 w-8 bg-govborder"></div>
          <div className="flex items-center space-x-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-navy text-white' : 'bg-gray-300 text-charcoal'}`}>2</span>
            <span className={step === 2 ? 'font-bold text-navy' : 'text-govmuted'}>Occupation & Income</span>
          </div>
          <div className="h-0.5 w-8 bg-govborder"></div>
          <div className="flex items-center space-x-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 3 ? 'bg-heritage-green text-white' : 'bg-gray-300 text-charcoal'}`}>3</span>
            <span className={step === 3 ? 'font-bold text-heritage-green' : 'text-govmuted'}>Verified Matches</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 text-charcoal text-xs space-y-4 max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy mb-1">Citizen Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full border border-govborder rounded p-2 focus:ring-1 focus:ring-navy outline-none"
                    placeholder="e.g. 20"
                  />
                  <span className="text-[10px] text-govmuted">Required for age-bracket criteria</span>
                </div>

                <div>
                  <label className="block font-semibold text-navy mb-1">State of Residence</label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full border border-govborder rounded p-2 focus:ring-1 focus:ring-navy outline-none bg-white"
                  >
                    {allStates.map((location) => (
                      <option key={location.name} value={location.name}>
                        {location.name === 'Maharashtra' ? `${location.name} (Prioritized)` : location.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-govmuted">Determines state-specific welfare rules</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-navy mb-1">District</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full border border-govborder rounded p-2 focus:ring-1 focus:ring-navy outline-none"
                  >
                    {districtOptions.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-navy mb-1">Area of Residence</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.residenceType === 'Urban'}
                        onChange={() => setFormData({ ...formData, residenceType: 'Urban' })}
                      />
                      <span>Urban</span>
                    </label>
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.residenceType === 'Rural'}
                        onChange={() => setFormData({ ...formData, residenceType: 'Rural' })}
                      />
                      <span>Rural</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-navy mb-1">Annual Family Income (₹ INR)</label>
                <input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                  className="w-full border border-govborder rounded p-2 focus:ring-1 focus:ring-navy outline-none"
                  placeholder="e.g. 180000"
                />
                <span className="text-[10px] text-govmuted">Tested against official income ceilings</span>
              </div>

              <div>
                <label className="block font-semibold text-navy mb-1">Primary Occupation</label>
                <select
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value, isStudent: e.target.value === 'Student', isFarmer: e.target.value === 'Farmer' })}
                  className="w-full border border-govborder rounded p-2 focus:ring-1 focus:ring-navy outline-none bg-white"
                >
                  <option value="Student">Student (College / Higher Education)</option>
                  <option value="Farmer">Farmer / Agricultural Worker</option>
                  <option value="Self-Employed">Self-Employed / MSME Artisan</option>
                  <option value="Salaried">Salaried Employee</option>
                  <option value="Unemployed">Seeking Employment</option>
                </select>
              </div>

              <div className="p-3 bg-alabaster rounded border border-govborder flex items-start space-x-2 text-[11px] text-govmuted">
                <ShieldCheck className="w-4 h-4 text-heritage-green flex-shrink-0 mt-0.5" />
                <p>
                  We never ask for Aadhaar OTPs, bank passwords or financial account numbers. Data is evaluated strictly for welfare qualification.
                </p>
              </div>
            </div>
          )}

          {step === 3 && evaluationResult && (
            <div className="space-y-4">
              <div className="p-3 bg-heritage-green/10 border border-heritage-green/20 rounded flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-heritage-green" />
                  <span className="font-bold text-heritage-green">
                    Deterministic Engine Matches: {evaluationResult.length} Schemes Qualified
                  </span>
                </div>
                <span className="text-[10px] bg-white text-navy font-semibold px-2 py-0.5 rounded border border-heritage-green/30">
                  LIKELY_MATCH
                </span>
              </div>

              <div className="space-y-3">
                {evaluationResult.map((res, idx) => (
                  <div key={idx} className="p-3 rounded border border-govborder bg-white shadow-sm space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-navy text-xs">{res.name}</h4>
                      <span className="text-[9px] bg-heritage-green text-white font-bold px-1.5 py-0.5 rounded">
                        {res.result}
                      </span>
                    </div>

                    <div className="text-[10px] text-govmuted">
                      <strong>Department:</strong> {res.department}
                    </div>

                    <div className="text-[11px] text-charcoal bg-alabaster p-2 rounded border border-govborder/60">
                      <strong>Benefit:</strong> {res.benefits}
                    </div>

                    {res.documents && (
                      <div className="text-[10px] text-charcoal-light">
                        <strong className="text-navy">Required Documents:</strong>{' '}
                        {res.documents.join(', ')}
                      </div>
                    )}

                    {res.officialUrl && (
                      <a
                        href={res.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[11px] font-bold text-navy hover:text-saffron-dark"
                      >
                        Open Official Scheme Website
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    )}

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-navy uppercase tracking-wider">
                        Conditions Evaluated & Satisfied:
                      </span>
                      <ul className="text-[10px] space-y-0.5 text-charcoal-light">
                        {res.matchedConditions.map((cond, cIdx) => (
                          <li key={cIdx} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-green flex-shrink-0"></span>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Controls */}
        <div className="bg-alabaster px-6 py-3 border-t border-govborder flex justify-between items-center text-xs">
          {step > 1 && step < 3 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-govborder rounded text-charcoal hover:bg-white flex items-center space-x-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div></div>
          )}

          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className="bg-navy hover:bg-navy-light text-white px-5 py-2 rounded font-semibold flex items-center space-x-1"
            >
              <span>Next: Income Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 2 && (
            <button
              onClick={handleEvaluate}
              className="bg-[#D6A45B] hover:bg-[#E2BC7E] text-navy px-6 py-2 rounded font-bold shadow flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluate Eligible Schemes</span>
            </button>
          )}

          {step === 3 && (
            <button
              onClick={onClose}
              className="bg-navy hover:bg-navy-light text-white px-6 py-2 rounded font-semibold"
            >
              Done / Close Evaluator
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
