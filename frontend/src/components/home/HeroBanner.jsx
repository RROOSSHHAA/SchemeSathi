import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HeroBanner({ onOpenQuestionnaire }) {
  return (
    <section className="bg-gradient-to-r from-navy via-navy to-[#0F233D] text-white relative overflow-hidden py-14 sm:py-18 lg:py-24 border-b-4 border-saffron">
      {/* Decorative Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D6A45B_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text & Action Column with Generous Negative Space */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-saffron/40 text-saffron-light text-xs font-semibold backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-saffron" />
              <span>National Welfare Eligibility & Citations System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18] font-serif">
              Welcome to the <br />
              <span className="text-white">Citizen Services Portal</span>
            </h1>

            <div className="pt-1">
              <button
                onClick={onOpenQuestionnaire}
                className="bg-[#D6A45B] hover:bg-[#E2BC7E] text-navy font-bold text-sm sm:text-base px-8 py-4 rounded-lg shadow-xl transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2.5"
              >
                <span>Access Your Services Instantly</span>
                <ArrowRight className="w-4 h-4 text-navy stroke-[2.5]" />
              </button>
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-sm sm:text-base font-semibold text-gray-200 tracking-wide">
                Secure, Transparent, and Efficient Governance.
              </p>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed">
                Empowering Indian citizens with deterministic scheme eligibility verification, official gov.in source citations, and verified step-by-step application guidance.
              </p>
            </div>
          </div>

          {/* Right Citizen Showcase Column with Enhanced Responsiveness & Spacing */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Back illumination glow */}
              <div className="absolute -inset-4 bg-saffron/15 rounded-3xl blur-2xl -z-10"></div>

              {/* Citizen Showcase Montage Container */}
              <div className="bg-navy-dark/75 border border-white/20 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md">
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                  
                  {/* Figure 1: Indian Farmer */}
                  <Link
                    to="/schemes?cat=agriculture"
                    aria-label="View farmer welfare schemes"
                    className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3.5 text-center"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/70 mb-3 shadow-lg bg-stone-800 flex-shrink-0">
                      <img 
                        src="/assets/farmer.webp"
                        alt="Indian Farmer Beneficiary"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">Farmer Welfare</span>
                    <span className="text-[10px] text-saffron mt-0.5 font-medium">PM Kisan & Subsidies</span>
                  </Link>

                  {/* Figure 2: Girl Student */}
                  <Link
                    to="/schemes?cat=education"
                    aria-label="View student and youth DBT scholarship schemes"
                    className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3.5 text-center"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/70 mb-3 shadow-lg bg-stone-800 flex-shrink-0">
                      <img 
                        src="/assets/students and youth.webp"
                        alt="Student Beneficiary"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">Students & Youth</span>
                    <span className="text-[10px] text-saffron mt-0.5 font-medium">DBT Scholarships</span>
                  </Link>

                  {/* Figure 3: Professional Indian Woman */}
                  <Link
                    to="/schemes?cat=women"
                    aria-label="View women MSME and SHG support schemes"
                    className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3.5 text-center"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/70 mb-3 shadow-lg bg-stone-800 flex-shrink-0">
                      <img 
                        src="/assets/women msme.webp"
                        alt="Women Entrepreneur"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">Women MSME</span>
                    <span className="text-[10px] text-saffron mt-0.5 font-medium">Mudra & SHG Support</span>
                  </Link>

                  {/* Figure 4: Senior Citizen */}
                  <Link
                    to="/schemes?cat=senior"
                    aria-label="View senior citizen pension and healthcare schemes"
                    className="group relative rounded-xl overflow-hidden bg-gradient-to-t from-navy-dark to-navy border border-saffron/30 hover:border-saffron transition flex flex-col items-center p-3.5 text-center"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/70 mb-3 shadow-lg bg-stone-800 flex-shrink-0">
                      <img 
                        src="/assets/senior citizens.webp"
                        alt="Senior Citizen Beneficiary"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">Senior Citizens</span>
                    <span className="text-[10px] text-saffron mt-0.5 font-medium">Pensions & Healthcare</span>
                  </Link>

                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-heritage-green flex-shrink-0" />
                    <span>Verified Citizen Coverage Across 36 States & UTs</span>
                  </div>
                  <span className="text-saffron font-semibold bg-white/5 px-2.5 py-0.5 rounded border border-saffron/30">
                    Maharashtra Prioritized
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
