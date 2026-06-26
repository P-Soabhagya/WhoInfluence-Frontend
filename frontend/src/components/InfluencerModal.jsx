import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { InfluencerForm } from './InfluencerLandingForm';

const InfluencerModal = ({ isOpen, onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-visible">
          {/* Backdrop Overlay */}
          <motion.div 
            className="fixed inset-0 bg-[#030712]/75 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            className="w-full max-w-xl rounded-[2.5rem] overflow-hidden relative z-10 shadow-[0_25px_60px_-15px_rgba(249,115,22,0.15)] bg-gradient-to-b from-[#0F172A]/98 to-[#090D16]/98 border border-white/10 text-white flex flex-col"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
          >
            {/* Top Glow Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />
            
            {/* Close Button */}
            <button 
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-400 hover:text-white transition-all hover:rotate-90 duration-300 z-20 cursor-pointer"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Content Container (Compact, no scroll) */}
            <div className="p-6 md:p-8">
              <div className="mb-5 pr-8">
                <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white mb-1">
                  Join Our <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Network.</span>
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Are you a creator? Partner with top-tier brands and elevate your content journey.
                </p>
              </div>

              <InfluencerForm theme="dark" onSuccess={() => setTimeout(onClose, 3000)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InfluencerModal;
