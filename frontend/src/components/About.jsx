import React from 'react';
import { CheckCircle2, Shield, Target, Trophy, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/mock';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-40 bg-[#0F172A] relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left: Premium Visuals */}
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10"
            >
              <img
                src="https://images.pexels.com/photos/7481953/pexels-photo-7481953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Influencer Marketing"
                className="w-full h-[700px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent opacity-80"></div>
            </motion.div>
            
            {/* Elite Floating Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-12 -right-12 bg-/90 backdrop-blur-xl p-10 rounded-4xl shadow-[0_50px_80px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Trophy size={24} className="text-primary" />
                </div>
                <div>
                  <div className="text-4xl font-black text-white">8.5%</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Success Rate</div>
                </div>
              </div>
              <div className="text-sm text-slate-300 font-medium max-w-[200px]">Driving industry-leading engagement for top-tier brands.</div>
            </motion.div>
          </div>

          {/* Right: Refined Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black uppercase tracking-[0.25em] mb-10 w-fit">
              <Sparkles size={14} />
              The WhoInfluence Edge
            </div>
            
            <h2 className="text-5xl font-black font-display text-white mb-10 leading-[1.1] tracking-tighter">
              WE DON'T JUST MANAGE. <br/>
              <span className="relative inline-block">
                <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                  WE DOMINATE.
                </span>
              </span>
              {/* <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-400">WE DOMINATE.</span> */}
            </h2>
            
            <p className="text-md text-slate-300 mb-10 leading-relaxed font-medium">
              We are a performance-focused influencer marketing agency helping D2C brands scale through strategic creator collaborations, data-driven insights, and high-converting content. Our approach goes beyond impressions and engagement; we focus on delivering measurable business results, from brand awareness to customer acquisition and revenue growth.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                { title: 'Performance-First Approach', icon: Target },
                { title: 'Curated Creator Network', icon: Shield },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all group">
                  <item.icon className="text-primary transition-transform group-hover:scale-110" size={20} />
                  <span className="text-white font-bold tracking-wide">{item.title}</span>
                </div>
              ))}
            </div>

            {/* Expertise Domains */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-[2px] bg-orange-500/60 rounded-full" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black font-display">Expertise Domains</h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  'Data-Driven Decisions',
                  'Authentic Creator Partnerships',
                  'High-Converting Content',
                  'Transparent Communication',
                  'Fast Turnaround Times',
                  'Results That Matter',
                ].map((chip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] border-l-orange-500/50 border-l-2 hover:bg-white/[0.07] hover:border-l-orange-500 transition-all duration-300 group cursor-default"
                  >
                    <span className="text-slate-300 text-xs font-semibold tracking-wide group-hover:text-white transition-colors leading-snug">{chip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;