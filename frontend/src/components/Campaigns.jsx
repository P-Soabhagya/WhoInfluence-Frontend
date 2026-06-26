import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Eye, ArrowRight } from 'lucide-react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(res.data.data);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
        setCampaigns([
          { id: 1, brand: "Lenskart", reach: "42M+", engagement: "8.4%", creators: 120, gradient: 'from-[#f97316] to-[#f59e0b]', glow: 'rgba(249, 115, 22,0.2)', category: "Eyewear" },
          { id: 2, brand: "OPPO India", reach: "68M+", engagement: "6.2%", creators: 85, gradient: 'from-[#f97316] to-[#f59e0b]', glow: 'rgba(249, 115, 22,0.2)', category: "Tech" },
          { id: 3, brand: "Carbamide Forte", reach: "28M+", engagement: "11.3%", creators: 200, gradient: 'from-[#f97316] to-[#f59e0b]', glow: 'rgba(249, 115, 22,0.2)', category: "Health" },
          { id: 4, brand: "Foxtale", reach: "42M+", engagement: "8.4%", creators: 120, gradient: 'from-[#f97316] to-[#f59e0b]', glow: 'rgba(249, 115, 22,0.2)', category: "Beauty" },
          { id: 5, brand: "Swiggy", reach: "68M+", engagement: "6.2%", creators: 85, gradient: 'from-[#f97316] to-[#f59e0b]', glow: 'rgba(249, 115, 22,0.2)', category: "Food" },
          { id: 6, brand: "Everteen", reach: "28M+", engagement: "11.3%", creators: 200, gradient: 'from-[#f97316] to-[#f59e0b]', glow: 'rgba(249, 115, 22,0.2)', category: "Health" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <section
      id="campaigns"
      className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#020617]"
    >
      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/4 w-120 h-120 rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f9731628, transparent)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-0 right-1/4 w-104 h-104 rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f9731628, transparent)' }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
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
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
        >
          <div className="max-w-xl">
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
                Case Studies
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-tight" style={{ color: 'white' }}>
              Brands We've{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #f97316, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Transformed
              </span>
            </h2>
            <p className="text-lg mt-4 leading-relaxed" style={{ color: '#9ca3af' }}>
              Real campaigns, real creators, real impact. See how we help brands dominate the digital landscape.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 shrink-0 transition-all"
            style={{
              color: 'white',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)';
              e.currentTarget.style.background = 'rgba(249,115,22,0.1)';
              e.currentTarget.style.color = '#f97316';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = 'white';
            }}
          >
            View All Case Studies <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((camp, i) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative rounded-[28px] overflow-hidden group cursor-default flex flex-col h-full"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Top gradient banner */}
              <div
                className={`h-48 relative overflow-hidden bg-linear-to-br ${camp.gradient || 'to-[#f97316]'} flex items-center justify-center`}
                style={{ opacity: 0.85 }}
              >
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                  {camp.category}
                </div>
                <span className="text-5xl font-black uppercase tracking-tighter text-white/20 relative z-10 select-none">
                  {camp.brand}
                </span>
              </div>

              <div className="p-8 flex flex-col flex-1 gap-6">
                <h3 className="text-2xl font-black font-display tracking-tight" style={{ color: 'white' }}>{camp.brand}</h3>

                <div className="grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 mb-1" style={{ color: '#f97316' }}>
                      <Eye size={14} />
                      <span className="text-xs font-bold uppercase">Reach</span>
                    </div>
                    <p className="text-xl font-bold" style={{ color: 'white' }}>{camp.reach}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 mb-1" style={{ color: '#f97316' }}>
                      <TrendingUp size={14} />
                      <span className="text-xs font-bold uppercase">Engage</span>
                    </div>
                    <p className="text-xl font-bold" style={{ color: 'white' }}>{camp.engagement}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 mb-1" style={{ color: '#f97316' }}>
                      <Users size={14} />
                      <span className="text-xs font-bold uppercase">Creators</span>
                    </div>
                    <p className="text-xl font-bold" style={{ color: 'white' }}>{camp.creators}</p>
                  </div>
                </div>

                <button
                  className="mt-auto font-bold flex items-center gap-2 transition-all text-sm"
                  style={{ color: '#f97316' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f97316'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#f97316'}
                >
                  Read Full Story <ArrowRight size={14} />
                </button>
              </div>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-linear-to-r ${camp.gradient || 'from-[#f97316] to-[#f59e0b]'} transition-all duration-500 rounded-full`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;