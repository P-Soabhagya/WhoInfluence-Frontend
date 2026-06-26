import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="mb-4 rounded-xl shadow-md border overflow-hidden relative group"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      }}
    >
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 rounded-full" />
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="font-bold text-[#111827] text-[17px] font-['Outfit'] pr-8">
          {question}
        </span>
        <div className={`shrink-0 transition-colors duration-300 ${isOpen ? 'text-[#f97316]' : 'text-gray-400'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-[#4B5563] text-[15px] font-['Inter'] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is influencer marketing?",
      answer: "Influencer marketing is a strategy where brands partner with popular content creators to promote their products or services. It leverages the trust and relationship these creators have built with their audience to drive brand awareness and sales."
    },
    {
      question: "How much does influencer marketing cost?",
      answer: "Costs vary widely depending on the influencer's reach, engagement rate, niche, and the scope of the campaign. Nano-influencers may accept product seeding, while macro-influencers and celebrities charge substantial fees. We tailor campaigns to fit your specific budget."
    },
    {
      question: "Which platforms do you work with?",
      answer: "We execute campaigns across Instagram, YouTube, Reels, Shorts, and creator-led marketplace platforms, ensuring brands connect with audiences through impactful and platform-native content."
    },
    {
      question: "How long does a campaign take?",
      answer: "A standard campaign takes about 3 to 6 weeks from strategy and influencer selection to content creation, approval, and publishing. Complex or large-scale campaigns may take longer."
    },
    {
      question: "Do you provide UGC videos for advertisements?",
      answer: "Yes. We create high-performing UGC (User-Generated Content) tailored for Meta ads, D2C campaigns, and landing pages, designed to drive engagement, trust, and conversions."
    },
    {
      question: "Do you manage celebrity collaborations?",
      answer: "Absolutely. We facilitate celebrity endorsements, model collaborations, and premium influencer partnerships aligned with your brand positioning and campaign goals."
    },
    {
      question: "Can you help with Amazon growth?",
      answer: "Yes. Our Amazon growth solutions include review campaigns, creator-led product videos, ratings support, and content strategies focused on improving visibility and customer trust."
    }
  ];

  return (
    <section 
      className="py-24 px-6 overflow-hidden relative" 
      id="faq"
      style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f97316, transparent)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f97316, transparent)' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
            style={{
              borderColor: 'rgba(249,115,22,0.3)',
              background: 'rgba(249,115,22,0.08)',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f97316' }} />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#f97316' }}>
              FAQ's
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black font-display tracking-tight text-[#111827] mb-4"
          >
            Frequently Asked
            <span className="relative inline-block">
              <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                Questions
              </span>
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#4B5563] text-lg font-['Inter']"
          >
            Got questions? We've got answers to help you understand influencer marketing better
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;