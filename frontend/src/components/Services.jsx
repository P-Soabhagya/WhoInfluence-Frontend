import React from 'react';
import { motion } from 'framer-motion';
import {
  Search, Zap, Handshake, BarChart3, MonitorPlay, Aperture,
  Star, Camera, Award, ShoppingBag, Smile, Megaphone
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Influencer Marketing",
      desc: "We design and execute end-to-end influencer marketing campaigns that drive measurable growth- leveraging both paid and barter collaborations across Instagram, YouTube, and emerging platforms.",
      icon: <Star size={28} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
    {
      title: "UGC Content Creation",
      desc: "High-performing user-generated content for ads, reels, and product pages that drives clicks and sales.",
      icon: <MonitorPlay size={28} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
    {
      title: "Professional Shoots",
      desc: "Premium product shoots, model shoots, and brand visuals tailored for e-commerce, ads, and social media.",
      icon: <Camera size={28} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
    {
      title: "Celebrity & Creator Endorsements",
      desc: "Collaborate with top creators and celebrities to build trust, visibility, and brand authority.",
      icon: <Award size={28} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
    {
      title: "Amazon Reviews & Ratings Management",
      desc: "Boost your product credibility with authentic reviews, ratings, and content optimised for Amazon growth.",
      icon: <Smile size={28} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
    {
      title: "Talent Management",
      desc: "End-to-end creator management, including onboarding, collaboration handling, and long-term partnerships.",
      icon: <Handshake size={28} />,
      gradient: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.22)',
    },
  ];

  return (
    <section
      id="services"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
    >
      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-0 w-120 h-120 rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-0 w-[28rem] h-[28rem] rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-0 left-1/2 w-[24rem] h-[24rem] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent)' }}
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
              Our Services
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-slate-950 leading-tight">
            Everything Your Brand{' '}
            {/* <span
              style={{
                background: 'linear-gradient(90deg, #f97316, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Needs to Win
            </span> */}
            <span className="relative inline-block">
              <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                Needs to Win
              </span>
            </span>
          </h2>
          <p className="text-md max-w-6xl mx-auto mt-6 leading-relaxed" style={{ color: '#4B5563' }}>
            From discovery to delivery — comprehensive influencer marketing solutions designed to put your brand in front of the right audience at the right time.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative p-10 rounded-[28px] overflow-hidden group cursor-default"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Hover glow overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.1] transition-opacity duration-500 rounded-[28px]`}
              />

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.gradient} text-white shadow-xl`}
                style={{ boxShadow: `0 10px 30px ${service.glow}` }}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-black font-display tracking-tight mb-4 group-hover:text-orange-500 transition-colors relative z-10" style={{ color: '#111827' }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed group-hover:text-gray-600 transition-colors relative z-10" style={{ color: '#4B5563' }}>
                {service.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-gradient-to-r ${service.gradient} transition-all duration-500 rounded-full`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;