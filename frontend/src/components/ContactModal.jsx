const API = import.meta.env.VITE_API_URL;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    message: '',
    honeypot: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

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
    
    if (!formData.brand.trim()) tempErrors.brand = 'Company/Brand name is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.honeypot) {
      // bot detected
      setStatus('success');
      setMessage('Message sent successfully!');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
      return;
    }

    if (!validate()) return;

    setStatus('loading');
    
    try {
      const res = await axios.post(`${API}/api/contact`, {
        name: formData.name,
        email: formData.email,
        brand: formData.brand || formData.phone,
        message: formData.message
      });
      setStatus('success');
      setMessage(res.data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', brand: '', message: '', honeypot: '' });
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

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
                  Let's <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Talk.</span>
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Tell us about your brand and goals, and we'll craft a data-backed plan to scale your presence.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    className="bg-green-500/10 border border-green-500/30 text-green-200 p-8 rounded-3xl text-center flex flex-col items-center justify-center my-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 text-2xl font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    >
                      ✓
                    </motion.div>
                    <h3 className="text-xl font-black font-display tracking-tight mb-2 text-white">Message Sent!</h3>
                    <p className="text-sm text-slate-300">{message}</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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

                    {/* Full Name & Work Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-slate-400">Full Name <span className="text-orange-500">*</span></label>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="Your Name"
                          className={`border rounded-2xl p-3 focus:outline-none transition-all duration-300 bg-[#131A26] text-white placeholder-slate-500 text-sm focus:bg-[#182232] ${errors.name ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-white/5 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'}`}
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name}</p>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-slate-400">Work Email <span className="text-orange-500">*</span></label>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="email@brand.com"
                          className={`border rounded-2xl p-3 focus:outline-none transition-all duration-300 bg-[#131A26] text-white placeholder-slate-500 text-sm focus:bg-[#182232] ${errors.email ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-white/5 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'}`}
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Brand Name & Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-slate-400">Brand Name <span className="text-orange-500">*</span></label>
                        <input 
                          type="text" 
                          name="brand"
                          placeholder="e.g. Nykaa, Lenskart"
                          className={`border rounded-2xl p-3 focus:outline-none transition-all duration-300 bg-[#131A26] text-white placeholder-slate-500 text-sm focus:bg-[#182232] ${errors.brand ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-white/5 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'}`}
                          value={formData.brand}
                          onChange={handleChange}
                        />
                        {errors.brand && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.brand}</p>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-slate-400">Phone Number <span className="text-orange-500">*</span></label>
                        <input 
                          type="tel" 
                          name="phone"
                          placeholder="+91 00000 00000"
                          className={`border rounded-2xl p-3 focus:outline-none transition-all duration-300 bg-[#131A26] text-white placeholder-slate-500 text-sm focus:bg-[#182232] ${errors.phone ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-white/5 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'}`}
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Your Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-slate-400">Your Message <span className="text-orange-500">*</span></label>
                      <textarea 
                        name="message"
                        rows="2"
                        placeholder="What are your campaign goals?"
                        className={`border rounded-2xl p-3 focus:outline-none transition-all duration-300 resize-none bg-[#131A26] text-white placeholder-slate-500 text-sm focus:bg-[#182232] ${errors.message ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-white/5 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'}`}
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.message}</p>}
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs font-semibold">{message}</p>
                    )}

                    <motion.button 
                      type="submit" 
                      disabled={status === 'loading'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer mt-2"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <>Send Message <Send size={14} /></>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
