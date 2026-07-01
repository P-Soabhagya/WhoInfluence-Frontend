import React, { useState } from 'react';
import { 
  Target, Trophy, Sparkles, Compass, Eye, CheckCircle2, 
  BookOpen, Users, Award, HelpCircle, ArrowUpRight, ArrowRight
} from 'lucide-react';
import { portfolioData } from '../data/mock';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import InfluencerModal from '../components/InfluencerModal';

/* ═══════════════════════════════════════════════
   GRID LINES — Background decoration (from services.jsx)
   ═══════════════════════════════════════════════ */
const GridLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    {/* Clean subtle dot pattern */}
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.8) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
      }}
    />
    {/* Subtle designer cross lines */}
    <div className="absolute inset-0 opacity-[0.015]" style={{
      backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
      backgroundSize: '128px 128px'
    }} />
  </div>
);

const AboutUs = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInfluencerModalOpen, setIsInfluencerModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const openInfluencerModal = () => setIsInfluencerModalOpen(true);
  const closeInfluencerModal = () => setIsInfluencerModalOpen(false);

  const handleInfluencerClick = () => {
    window.location.href = '/#influencer-form';
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-slate-800 bg-[#F9FAFB]">
      <Navbar onInfluencerClick={handleInfluencerClick} />

      <main className="flex-grow pt-24 relative z-10">
        
        {/* ═══════════════════════════════════════════
            1. HERO SECTION — Premium Light Theme
            ═══════════════════════════════════════════ */}
        <section 
          className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-12 pt-28 pb-24 overflow-hidden border-b border-slate-200"
          style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
        >
          <GridLines />
          
          {/* Subtle orange glowing blobs / gradient elements */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.13, 0.07] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] right-[-5%] w-96 h-96 bg-orange-500/10 rounded-full blur-[130px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"
          />

          {/* Vertical line decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex justify-between max-w-7xl mx-auto px-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-px h-full bg-slate-900" />
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/[0.06] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-orange-600">
                MEET WHOINFLUENCE
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black font-display tracking-tight text-slate-950 leading-[1.08] mb-8"
            >
              Empowering Brands{' '}
              <span className="relative inline-block">
                <span className="relative z-10 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl inline-block shadow-xl shadow-orange-500/20 -rotate-1 text-white">
                  Through
                </span>
              </span>
              <br className="hidden md:block" />
              <span className="text-black-800/80"> Strategic Creator</span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Collaborations
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12"
            >
              We are a performance-first influencer marketing agency bridging the gap between top brands and authentic creators to unlock exponential digital growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={openContactModal}
                className="btn-premium flex items-center gap-3 group px-10 py-4 text-sm font-black font-display uppercase tracking-widest cursor-pointer text-white"
              >
                Work With Us
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight size={14} />
                </div>
              </button>
              <button
                onClick={handleInfluencerClick}
                className="px-10 py-4 text-sm font-black font-display uppercase tracking-widest rounded-full border border-slate-900/10 text-slate-900 hover:bg-slate-900/5 hover:border-slate-900/20 transition-all duration-300 active:scale-95 flex items-center gap-2"
              >
                Join as Creator
                <ArrowRight size={16} className="text-slate-900" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            2. COMPANY INTRODUCTION SECTION — Dark Theme
            ═══════════════════════════════════════════ */}
        <section className="py-28 px-6 md:px-12 bg-gradient-to-b from-[#0f172a] to-[#020617] relative overflow-hidden border-b border-white/5">
          {/* Subtle glowing blobs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6 border-orange-500/30 bg-orange-500/[0.08]"
              >
                <Sparkles size={12} className="text-orange-400" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-orange-400 font-display">
                  Company Introduction
                </span>
              </motion.div>
              <h2 className="text-2xl md:text-4xl font-black font-display tracking-tight text-white mb-5 leading-tight">
                Creating Influence That Customers Trust & Competitors Notice
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-7xl mx-auto leading-relaxed">
                In a world flooded with ads, people trust people. At WhoInfluence, we help brands cut through the noise by connecting them with creators who spark conversations, build trust, and drive action. From viral product launches to long-term brand advocacy, we craft influencer marketing strategies that transform audience attention into measurable growth.
              </p>
            </div>

            {/* Three Premium Glassmorphic Intro Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  title: "Brand Story",
                  desc: "Every Great Brand Has a Story. We Help the Right People Tell It. We're an influencer marketing team connecting brands with the right creators to build authentic, high-impact campaigns. Through creator expertise, audience insights, and performance-driven strategies, we help businesses earn trust, drive engagement, and grow in the creator economy.",
                  icon: BookOpen,
                },
                {
                  title: "Who We Are",
                  desc: "The Minds Behind Meaningful Influence. We're a team of influencer marketing strategists, creator managers, content experts, and growth specialists dedicated to helping brands stand out in the creator economy. By combining audience insights, creator expertise, and data-driven strategies, we build customized influencer ecosystems that drive real business growth.",
                  icon: Users,
                },
                {
                  title: "What We Do",
                  desc: "From strategy to execution, we manage every stage of your influencer marketing journey. We connect brands with the right creators, build tailored campaigns, manage collaborations, and generate authentic content that boosts trust, engagement, and visibility. Our focus is simple: delivering impactful campaigns that drive measurable results.",
                  icon: Award,
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl hover:bg-white/[0.05] hover:border-orange-500/20 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/[0.08] text-orange-400 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
                    <card.icon size={22} className="text-orange-400" />
                  </div>
                  <h3 className="text-xl font-black font-display tracking-tight text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Specializations mini grid */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-8 text-center font-display">
                Our Specialties
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {portfolioData.about.specializations.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 bg-white/[0.03] rounded-xl border border-white/5 shadow-md">
                    <CheckCircle2 size={16} className="text-orange-400 shrink-0" />
                    <span className="text-slate-200 text-xs md:text-sm font-bold tracking-tight">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            3. MISSION & VISION SECTION — Light Theme
            ═══════════════════════════════════════════ */}
        <section 
          className="py-24 px-6 md:px-12 border-y border-slate-200 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
        >
          {/* Subtle glowing blobs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[130px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6 border-orange-500/20 bg-orange-500/[0.04]"
              >
                <Compass size={12} className="text-orange-500" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-orange-600 font-display">
                  Core Purpose
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-950 mb-5 leading-tight">
                Our Mission & Vision
              </h2>
              <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Empowering businesses with authenticity and strategic vision.
              </p>
            </div>

            {/* Premium Side-by-Side Cards (Visual Pillars) with Orange Hover Glow */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              {/* Mission Pillar Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col justify-between relative group overflow-hidden cursor-default"
              >
                {/* Orange hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-400 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-[2.5rem]" />
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-orange-500 to-amber-400" />
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 mb-8">
                    <Target size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-950 font-display tracking-tight mb-6 group-hover:text-orange-500 transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    Empowering Brands Through Authentic Influence. Our mission is to help businesses unlock the full potential of creator marketing through innovative strategies, meaningful collaborations, and measurable results.
                    We are committed to delivering campaigns that inspire trust, create value, and drive long-term success for every brand we work with.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-500 mt-4 uppercase tracking-wider">
                  <span>Revolutionizing Marketing</span>
                  <span className="w-8 h-[1px] bg-orange-500 inline-block" />
                </div>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 rounded-full" />
              </motion.div>

              {/* Vision Pillar Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col justify-between relative group overflow-hidden cursor-default"
              >
                {/* Orange hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-400 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-[2.5rem]" />
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-orange-500 to-amber-400" />
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 mb-8">
                    <Compass size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-950 font-display tracking-tight mb-6 group-hover:text-orange-500 transition-colors">
                    Our Vision
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                    To Become The World’s Most Trusted Influencer Marketing Partner.
                    We envision a future where every brand can leverage authentic creator relationships to build communities, inspire action, and achieve sustainable growth.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-500 mt-4 uppercase tracking-wider">
                  <span>Empowering Brands Globally</span>
                  <span className="w-8 h-[1px] bg-orange-500 inline-block" />
                </div>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 rounded-full" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            4. CTA SECTION
            ═══════════════════════════════════════════ */}
        <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative overflow-hidden rounded-[3rem] border border-black-200 shadow-2xl bg-white mb-24">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-950 mb-4 leading-tight">
              Ready to Launch Your Next
              <span className="relative inline-block">
                <span className="relative z-10 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl inline-block shadow-xl shadow-orange-500/20 -rotate-1 text-white">
                  Winning Campaign
                </span>
              </span>
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
              Whether you’re launching a new product, expanding your reach, or building brand credibility, our team creates creator-led campaigns designed to capture attention, spark conversations, and drive conversions
            </p>

            <motion.button
              onClick={openContactModal}
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(249,115,22,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 font-black font-display uppercase tracking-widest text-xs text-white rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
            >
              Launch My Campaign
            </motion.button>
          </div>
        </section>
      </main>

      <Footer />

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <InfluencerModal isOpen={isInfluencerModalOpen} onClose={closeInfluencerModal} />
    </div>
  );
};

export default AboutUs;