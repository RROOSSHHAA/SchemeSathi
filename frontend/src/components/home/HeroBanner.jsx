import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroBanner({ onOpenQuestionnaire }) {
  return (
    <section className="bg-gradient-to-r from-navy via-navy to-[#0F233D] text-white relative overflow-hidden py-10 lg:py-14 border-b-4 border-saffron">
      {/* Decorative Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D6A45B_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Action Column */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/10 border border-saffron/40 text-saffron-light text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-saffron" />
              <span>National Welfare Eligibility & Citations System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Welcome to the <br className="hidden sm:inline" />
              <span className="text-white">Citizen Services Portal</span>
            </h1>

            <div>
              <button
                onClick={onOpenQuestionnaire}
                className="bg-[#D6A45B] hover:bg-[#E2BC7E] text-navy font-bold text-sm sm:text-base px-7 py-3.5 rounded shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
              >
                <span>Access Your Services Instantly</span>
                <ArrowRight className="w-4 h-4 text-navy" />
              </button>
            </div>

            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-200 tracking-wide">
                Secure, Transparent, and Efficient Governance.
              </p>
              <p className="text-xs text-gray-400 mt-1 max-w-md leading-relaxed">
                Empowering Indian citizens with deterministic scheme eligibility verification, official gov.in source citations, and verified step-by-step application guidance.
              </p>
            </div>
          </div>

          {/* Right Citizen Montage Column — Matching the 4 figures in reference image */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Subtle back illumination glow */}
              <div className="absolute -inset-4 bg-saffron/15 rounded-3xl blur-2xl -z-10"></div>

              {/* Citizen Showcase Montage Container */}
              <div className="bg-navy-dark/70 border border-white/15 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm">
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                  
                  {/* Figure 1: Indian Farmer */}
                  <div className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/60 mb-2.5 shadow-md bg-stone-800">
                      <img 
                        src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=300&q=80" 
                        alt="Indian Farmer Beneficiary"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <span className="text-xs font-bold text-white">Farmer Welfare</span>
                    <span className="text-[10px] text-saffron mt-0.5">PM Kisan & Subsidies</span>
                  </div>

                  {/* Figure 2: Girl Student */}
                  <div className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/60 mb-2.5 shadow-md bg-stone-800">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
                        alt="Student Beneficiary"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <span className="text-xs font-bold text-white">Students & Youth</span>
                    <span className="text-[10px] text-saffron mt-0.5">DBT Scholarships</span>
                  </div>

                  {/* Figure 3: Professional Indian Woman */}
                  <div className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/60 mb-2.5 shadow-md bg-stone-800">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                        alt="Women Entrepreneur"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <span className="text-xs font-bold text-white">Women MSME</span>
                    <span className="text-[10px] text-saffron mt-0.5">Mudra & SHG Support</span>
                  </div>

                  {/* Figure 4: Senior Citizen */}
                  <div className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/60 mb-2.5 shadow-md bg-stone-800">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                        alt="Senior Citizen Beneficiary"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <span className="text-xs font-bold text-white">Senior Citizens</span>
                    <span className="text-[10px] text-saffron mt-0.5">Pensions & Healthcare</span>
                  </div>

                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-heritage-green" />
                    <span>Verified Citizen Coverage Across 36 States & UTs</span>
                  </div>
                  <span className="text-saffron font-medium">Maharashtra Prioritized</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
