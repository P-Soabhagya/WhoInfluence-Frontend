import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Palette, Eye } from 'lucide-react';

const WhyChooseUs = () => {
  const points = [
    {
      title: "Data-Backed Creator Selection",
      desc: "We don’t just pick influencers — we shortlist creators based on audience quality, engagement, and brand fit to ensure maximum ROI.",
      icon: <BarChart2 size={32} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
    {
      title: "Fast & Reliable Execution",
      desc: "From onboarding creators to content delivery, our streamlined processes ensure campaigns go live quickly without compromising quality.",
      icon: <Palette size={32} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
    {
      title: "Conversion Focused Approach",
      desc: "We specialise in creating UGC and performance-driven campaigns that help brands scale on platforms like D2C websites and marketplaces.",
      icon: <Eye size={32} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    }
  ];

  return (
    <section
      className="py-28 px-6 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-1/4 w-120 h-120 rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15), transparent)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-10 left-1/4 w-104 h-104 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15), transparent)' }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
            style={{
              borderColor: 'rgba(249, 115, 22, 0.3)',
              background: 'rgba(249, 115, 22, 0.08)',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f97316' }} />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#f97316' }}>
              Why Choose Us
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-slate-950 leading-tight">
            Why{' '}
            {/* <span
              style={{
                background: 'linear-gradient(90deg, #f97316, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WhoInfluence?
            </span> */}
            <span className="relative inline-block">
              <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                WhoInfluence?
              </span>
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-6 leading-relaxed" style={{ color: '#4B5563' }}>
            We've spent years refining our process to deliver the highest ROI in the influencer marketing industry.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative p-10 rounded-[28px] overflow-hidden group cursor-default text-center"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 rounded-[28px]`}
              />

              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br ${point.gradient} text-white shadow-xl`}
                style={{ boxShadow: `0 10px 35px ${point.glow}` }}
              >
                {point.icon}
              </div>

              <h3 className="text-2xl font-black font-display tracking-tight mb-4 group-hover:text-orange-500 transition-colors" style={{ color: '#111827' }}>
                {point.title}
              </h3>
              <p className="leading-relaxed group-hover:text-gray-600 transition-colors" style={{ color: '#4B5563' }}>
                {point.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-gradient-to-r ${point.gradient} transition-all duration-500 rounded-full`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
