const API = import.meta.env.VITE_API_URL;
import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';


export const InfluencerForm = ({ theme = 'light', onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    socialLink: '',
    message: '',
    honeypot: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    const cleanPhone = formData.phone.trim().replace(/[\s\-]/g, '');
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,12}$/.test(cleanPhone)) {
      tempErrors.phone = 'Please enter a valid 10-12 digit phone number';
    }
    
    if (!formData.socialLink.trim()) {
      tempErrors.socialLink = 'Social link is required';
    } else if (!/^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*\.)+[a-z]{2,}(:\d+)?(\/.*)?$/.test(formData.socialLink.trim())) {
      tempErrors.socialLink = 'Please enter a valid URL';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.honeypot) {
      // Spam detected, simulate success
      setStatus('success');
      setMessage('Application submitted successfully!');
      return;
    }

    if (!validate()) return;

    setStatus('loading');
    
    try {
      const res = await axios.post(`${API}/api/influencer`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        socialLink: formData.socialLink,
        message: formData.message
      });
      setStatus('success');
      setMessage(res.data.message || 'Application submitted successfully!');
      setFormData({ name: '', phone: '', email: '', socialLink: '', message: '', honeypot: '' });
      if (onSuccess) onSuccess(res.data.message || 'Application submitted successfully!');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const isDark = theme === 'dark';

  return (
    status === 'success' ? (
      <div 
        className={`p-8 rounded-3xl text-center flex flex-col items-center justify-center my-4 ${
          isDark 
            ? 'bg-green-500/10 border border-green-500/30 text-green-200' 
            : 'bg-orange-500/5 border border-orange-500/10'
        }`}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white font-bold"
          style={{ 
            background: isDark ? '#22c55e' : '#f97316', 
            boxShadow: isDark ? '0 0 20px rgba(34,197,94,0.4)' : '0 10px 30px rgba(249, 115, 22, 0.2)' 
          }}
        >
          <Check size={28} />
        </div>
        <h4 className={`text-xl font-black font-display tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
          Application Received!
        </h4>
        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-[#4B5563]'}`}>{message}</p>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Honeypot Spam Prevention */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Name and Phone side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={`text-[11px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Full Name <span className="text-orange-500">*</span>
            </label>
            <input 
              type="text" 
              name="name"
              placeholder="John Doe"
              className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 ${
                isDark 
                  ? `bg-[#131A26] border ${errors.name ? 'border-red-500 focus:ring-red-500/10' : 'border-white/5'} text-white placeholder-slate-500 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500` 
                  : `bg-[#F9FAFB] border ${errors.name ? 'border-red-500 focus:ring-red-500/10' : 'border-[#E5E7EB]'} text-[#111827] placeholder-gray-400 focus:bg-white focus:border-orange-500`
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-[11px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Phone Number <span className="text-orange-500">*</span>
            </label>
            <input 
              type="tel" 
              name="phone"
              placeholder="+91 00000 00000"
              className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 ${
                isDark 
                  ? `bg-[#131A26] border ${errors.phone ? 'border-red-500 focus:ring-red-500/10' : 'border-white/5'} text-white placeholder-slate-500 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500` 
                  : `bg-[#F9FAFB] border ${errors.phone ? 'border-red-500 focus:ring-red-500/10' : 'border-[#E5E7EB]'} text-[#111827] placeholder-gray-400 focus:bg-white focus:border-orange-500`
              }`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Email and Social link side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={`text-[11px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Email Address <span className="text-orange-500">*</span>
            </label>
            <input 
              type="email" 
              name="email"
              placeholder="john@example.com"
              className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 ${
                isDark 
                  ? `bg-[#131A26] border ${errors.email ? 'border-red-500 focus:ring-red-500/10' : 'border-white/5'} text-white placeholder-slate-500 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500` 
                  : `bg-[#F9FAFB] border ${errors.email ? 'border-red-500 focus:ring-red-500/10' : 'border-[#E5E7EB]'} text-[#111827] placeholder-gray-400 focus:bg-white focus:border-orange-500`
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={`text-[11px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Social Media Link <span className="text-orange-500">*</span>
            </label>
            <input 
              type="text" 
              name="socialLink"
              placeholder="https://instagram.com/yourprofile"
              className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 ${
                isDark 
                  ? `bg-[#131A26] border ${errors.socialLink ? 'border-red-500 focus:ring-red-500/10' : 'border-white/5'} text-white placeholder-slate-500 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500` 
                  : `bg-[#F9FAFB] border ${errors.socialLink ? 'border-red-500 focus:ring-red-500/10' : 'border-[#E5E7EB]'} text-[#111827] placeholder-gray-400 focus:bg-white focus:border-orange-500`
              }`}
              value={formData.socialLink}
              onChange={handleChange}
            />
            {errors.socialLink && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.socialLink}</p>}
          </div>
        </div>

        {/* Message / About You */}
        <div className="flex flex-col gap-1.5">
          <label className={`text-[11px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            About You
          </label>
          <textarea 
            rows="2" 
            name="message"
            placeholder="Niche, followers count, goals..."
            className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 resize-none ${
              isDark 
                ? 'bg-[#131A26] border border-white/5 text-white placeholder-slate-500 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500' 
                : 'bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] placeholder-gray-400 focus:bg-white focus:border-orange-500'
            }`}
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-xs font-semibold">{message}</p>
        )}

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className={`w-full font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-xs cursor-pointer ${
            isDark 
              ? 'bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30' 
              : 'text-white'
          }`}
          style={!isDark ? {
            background: 'linear-gradient(135deg, #f97316, #f59e0b)',
            boxShadow: '0 10px 30px rgba(249,115,22,0.25)',
          } : undefined}
        >
          {status === 'loading' ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <>Submit Application <Send size={14} /></>
          )}
        </button>
      </form>
    )
  );
};

const InfluencerLandingForm = () => {
  return (
    <section id="influencer-form" className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
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
                Join the Network
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display mb-8 leading-tight text-slate-950">
              Are You an
              <span className="relative inline-block">
                <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                  Influencer?
                </span>
              </span>
            </h2>
            <p className="text-xl mb-10 leading-relaxed text-slate-500">
              Join India's most innovative network of top-tier creators. We connect you with premium brands and help you monetize your influence effortlessly.
            </p>
            <div className="flex flex-col gap-6">
              {[
                "Direct Collaboration with Global Brands",
                "Dedicated Talent Manager",
                "Exclusive Campaign Opportunities",
                "Data-Driven Growth Insights"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-lg text-slate-700">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316' }}>
                    <Check size={16} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="p-10 md:p-12 rounded-[40px] relative overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.04)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }} />

            <h3 className="text-3xl font-black font-display mb-8 text-slate-950">Apply to Join</h3>
            
            <InfluencerForm theme="light" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerLandingForm;
