import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import InfluencerModal from '../components/InfluencerModal';
import { motion } from 'framer-motion';



const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.04 },
  }),
};

const Cliental = () => {
  const [isContactModalOpen,    setIsContactModalOpen]    = useState(false);
  const [isInfluencerModalOpen, setIsInfluencerModalOpen] = useState(false);

  const closeContactModal    = () => setIsContactModalOpen(false);
  const closeInfluencerModal = () => setIsInfluencerModalOpen(false);
  const handleInfluencerClick = () => { window.location.href = '/#influencer-form'; };

  return (
    <div 
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
    >
      <Navbar onInfluencerClick={handleInfluencerClick} />

      {/* Subtle orange glowing blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"
      />

      <main
  className="
    flex-grow
    pt-32
    pb-24
    px-6
    max-w-6xl
    mx-auto
    w-full
  "
>

        {/* HEADING */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/[0.06] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-orange-600">
              Trusted by Top Brands
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-7xl font-black font-display tracking-tight text-slate-950 leading-[1.08] mb-6"
          >
            Brands That{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl inline-block shadow-xl shadow-orange-500/20 -rotate-1 text-white">
                Trust
              </span>
            </span>{' '}Us
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Over 200+ brands have partnered with WhoInfluence to run high-impact influencer campaigns that drive real results.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="max-w-[1600px] mx-auto -mt-10 px-0"
        >
          <div className="relative overflow-hidden">
            <img
              src="/collage-1.png"
              alt="Our Clientele Collage"
              className="w-[100%] max-w-none h-auto object-contain"
            />
          </div>
        </motion.div>


        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-2"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black mb-6">
            Want to join the list?
          </p>

          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(249,115,22,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 20 }}
            className="inline-flex items-center gap-3 px-12 py-4 text-sm font-black uppercase tracking-widest text-white rounded-full cursor-pointer font-display"
            style={{
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              boxShadow: '0 10px 30px rgba(249,115,22,0.25)',
            }}
          >
            Work With Us
          </motion.button>
        </motion.div>

      </main>

      <Footer />
      <ContactModal    isOpen={isContactModalOpen}    onClose={closeContactModal} />
      <InfluencerModal isOpen={isInfluencerModalOpen} onClose={closeInfluencerModal} />
    </div>
  );
};

export default Cliental;