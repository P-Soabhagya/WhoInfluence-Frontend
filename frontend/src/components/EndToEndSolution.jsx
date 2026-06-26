import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, BarChart, Cpu, Lightbulb, Users, Shield, Smile, Link } from 'lucide-react';

const EndToEndSolution = () => {
  return (
    <section className="bg-transparent">
      {/* ===== End-to-End Solutions Section ===== */}
      <div
        className="py-28 px-6 relative overflow-hidden transition-colors duration-500 bg-[#0F172A] text-white"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#f97316] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f97316] rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
              style={{
                borderColor: 'rgba(249,115,22,0.3)',
                background: 'rgba(249,115,22,0.08)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f97316' }} />
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#f97316' }}>
                End-to-End Solutions
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-black font-display tracking-tight leading-tight text-white"
            >
              We Handle{' '}
              <span className="relative inline-block">
                <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                  Everything
                </span>
              </span>
              So You Don’t Have To.
            </motion.h2>
            <p className="mt-6 text-lg max-w-5xl mx-auto text-slate-400">
              From strategy and creator discovery to content execution, approvals, posting, and performance tracking — we manage the entire influencer marketing lifecycle seamlessly.
              <br></br>
              Our goal is simple: Deliver stress-free, high-performing campaigns that drive real business results.
            </p>
          </div>

          {/* Timeline / Steps */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, #f97316, transparent)',
                transform: 'translateX(-50%)',
              }}
            />

            {[
              { step: '01', title: 'Strategy & Planning', desc: ' Understanding your brand, audience, and growth goals.' },
              { step: '02', title: 'Creator Sourcing', desc: 'Handpicked creators aligned with your brand.' },
              { step: '03', title: 'Campaign Execution', desc: 'Content creation, approvals & posting.' },
              { step: '04', title: 'Optimisation & Scaling', desc: 'Boosting top-performing content for better ROI.' },
              { step: '05', title: 'Reporting & Insights', desc: 'Transparent performance tracking with actionable insights.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Step number bubble */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 z-10 relative md:absolute md:left-1/2 md:-translate-x-1/2 shadow-lg shadow-orange-500/20"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                  }}
                >
                  {item.step}
                </div>

                {/* Content card */}
                <div className={`flex-1 relative group ${i % 2 === 0 ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'}`}>
                  <div
                    className="relative p-8 rounded-[24px] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-orange-500/30"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <h3 className="text-xl font-black font-display tracking-tight mb-3 text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndToEndSolution;
