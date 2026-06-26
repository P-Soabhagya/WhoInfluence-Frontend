import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Mail, Phone, MapPin, Clock, Globe, Link2, MessageCircle,
  Send, Loader2, Check, ArrowRight, Zap, ShieldCheck, Users, Headphones
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────────
   Reusable fade-up animation variant
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

/* ─────────────────────────────────────────────
   Contact Info Card
───────────────────────────────────────────── */
const InfoCard = ({ icon: Icon, label, value, href, color = '#f97316' }) => (
  <motion.a
    href={href || '#'}
    variants={fadeUp}
    className="flex items-start gap-5 p-5 rounded-2xl border group transition-all duration-300"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${color}50`;
      e.currentTarget.style.background = `${color}08`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
    }}
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
    >
      <Icon size={22} style={{ color }} />
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-white font-semibold text-sm leading-relaxed">{value}</p>
    </div>
  </motion.a>
);

/* ─────────────────────────────────────────────
   Why Card
───────────────────────────────────────────── */
const WhyCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    custom={index}
    variants={fadeUp}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    className="relative p-8 rounded-[28px] group cursor-default"
    style={{
      background: '#FFFFFF',
      border: '1px solid rgba(0,0,0,0.05)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    }}
  >
    {/* Top orange accent line */}
    <div
      className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
    />
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
      style={{
        background: 'rgba(249,115,22,0.08)',
        border: '1px solid rgba(249,115,22,0.2)',
        color: '#f97316',
      }}
    >
      <Icon size={26} />
    </div>
    <h3 className="text-lg font-black font-display tracking-tight mb-2 text-[#111827] group-hover:text-[#f97316] transition-colors duration-300">
      {title}
    </h3>
    <p className="text-[#4B5563] text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

/* ─────────────────────────────────────────────
   Main ContactUs Page
───────────────────────────────────────────── */
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', brand: '', message: '', honeypot: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const scrollToInfluencerForm = () => {
    window.location.href = '/#influencer-form';
  };

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
      // Silently discard spam bots
      setStatus('success');
      setResponseMsg("Thank you! We'll get back to you within 24 hours.");
      return;
    }

    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await axios.post('http://localhost:5000/api/contact', {
        name: formData.name,
        email: formData.email,
        brand: formData.brand || formData.phone,
        message: formData.message,
      });
      setStatus('success');
      setResponseMsg(res.data.message || "Thank you! We'll get back to you within 24 hours.");
      setFormData({ name: '', email: '', phone: '', brand: '', message: '', honeypot: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setResponseMsg('Something went wrong. Please try again.');
    }
  };

  const whyCards = [
    {
      icon: Zap,
      title: 'Fast Response Time',
      desc: 'Our team responds within 2 business hours — no waiting, no ghosting.',
    },
    {
      icon: ShieldCheck,
      title: 'Confidential & Secure',
      desc: 'All inquiries are treated with complete confidentiality and professionalism.',
    },
    {
      icon: Users,
      title: 'Dedicated Account Manager',
      desc: 'Get a single point of contact who understands your brand inside-out.',
    },
    {
      icon: Headphones,
      title: '24/7 Campaign Support',
      desc: 'Our support team is always on standby to keep your campaigns running smoothly.',
    },
  ];

  return (
    <div className="relative bg-transparent min-h-screen">
      <div className="relative z-10">
        <Navbar onInfluencerClick={scrollToInfluencerForm} />

        <main className="pt-24">

          {/* ══════════════════════════════════════
              1. HERO SECTION  (light theme)
          ══════════════════════════════════════ */}
          <section 
            className="relative min-h-[55vh] flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
          >
            {/* Grid lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5 flex justify-between max-w-7xl mx-auto px-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-slate-950 border-l border-slate-950" />
              ))}
            </div>

            {/* Orange blobs */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-[160px] pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.09, 0.04] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500 rounded-full filter blur-[140px] pointer-events-none"
            />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8 bg-orange-500/[0.06] border-orange-500/30"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase text-orange-600">
                  Get In Touch
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl md:text-7xl font-black font-display tracking-tight text-slate-950 leading-none mb-6"
              >
                Let's Build Something{' '}
                <span
                  className="relative inline-block px-4 py-1 mx-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-3xl text-white transform -rotate-1 shadow-lg shadow-orange-500/20"
                >
                  Remarkable
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-slate-500 text-lg max-w-5xl mx-auto leading-relaxed"
              >
                Have a campaign in mind? Need influencer partnerships? Or just want to explore what WhoInfluence can do for your brand — we'd love to hear from you.
              </motion.p>

              {/* Scroll CTA */}
              <motion.a
                href="#contact-form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-10 inline-flex items-center gap-2 px-8 py-4 text-white font-black rounded-full shadow-xl transition-all duration-300 text-[15px] cursor-pointer bg-gradient-to-r from-orange-500 to-amber-400 shadow-orange-500/20 hover:shadow-orange-500/30"
              >
                Start a Conversation <ArrowRight size={18} />
              </motion.a>
            </div>
          </section>

          {/* ══════════════════════════════════════
              2. CONTACT INFO  (dark theme)
          ══════════════════════════════════════ */}
          <section className="py-24 px-6 md:px-12 bg-[#0F172A] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316] rounded-full filter blur-[160px] opacity-5 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.08)' }}>
                  <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                  <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#f97316' }}>Contact Info</span>
                </motion.div>
                <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black font-display tracking-tight text-white">
                  Find Us{' '}
                  <span style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Everywhere
                  </span>
                </motion.h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <InfoCard icon={Mail} label="Email" value="whoinfluence.business@gmail.com" href="mailto:whoinfluence.business@gmail.com" />
                <InfoCard icon={Phone} label="Phone" value="+91 85888 89195" href="tel:+918588889195" />
                <InfoCard icon={Clock} label="Business Hours" value="Mon – Sat · 10:00 AM – 7:00 PM IST" />
                <InfoCard icon={MapPin} label="Location" value="New Delhi, India" />
                <InfoCard icon={Globe} label="Instagram" value="@whoinfluence.in" href="https://www.instagram.com/whoinfluence.in/" color="#e1306c" />
                <InfoCard icon={Link2} label="LinkedIn" value="WhoInfluence" href="https://www.linkedin.com/company/whoinfluence-in/" color="#0077b5" />
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.a
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                href="https://whatsapp.com/channel/0029VbC6H7O1XquZ67yLFz25"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-4 p-5 rounded-2xl border group transition-all duration-300 max-w-md"
                style={{ border: '1px solid rgba(37,211,102,0.25)', background: 'rgba(37,211,102,0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.5)';
                  e.currentTarget.style.background = 'rgba(37,211,102,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)';
                  e.currentTarget.style.background = 'rgba(37,211,102,0.06)';
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#25D366' }}>
                  <MessageCircle size={22} fill="white" stroke="none" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">Join our WhatsApp Channel</p>
                  <p className="text-gray-400 text-xs mt-0.5">Exclusive insights & brand updates</p>
                </div>
                <ArrowRight size={18} className="text-gray-500 group-hover:text-[#25D366] transition-colors" />
              </motion.a>
            </div>
          </section>

          {/* ══════════════════════════════════════
              3. CONTACT FORM  (light theme)
          ══════════════════════════════════════ */}
          <section
            id="contact-form"
            className="py-28 px-6 md:px-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
          >
            {/* Blobs */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 right-1/4 w-96 h-96 rounded-full blur-[130px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, #f97316, transparent)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, #f97316, transparent)' }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="text-center mb-14"
              >
                <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
                  style={{ borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.08)' }}>
                  <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                  <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#f97316' }}>Send a Message</span>
                </motion.div>
                <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black font-display tracking-tight text-[#111827]">
                  Tell Us About Your{' '}
                  <span style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Brand
                  </span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="text-[#4B5563] text-lg mt-4">
                  Fill in the form below and our team will reach out within 24 hours.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="relative p-8 md:p-12 rounded-[40px] overflow-hidden"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
                }}
              >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }} />

                {status === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-16 flex flex-col items-center justify-center text-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2"
                      style={{ background: '#22c55e', boxShadow: '0 0 30px rgba(34,197,94,0.35)' }}>
                      <Check size={36} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black font-display tracking-tight text-[#111827]">Message Sent!</h3>
                    <p className="text-[#4B5563] max-w-sm">{responseMsg}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Bot Honeypot */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                      tabIndex="-1"
                      autoComplete="off"
                    />

                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                        { name: 'email', label: 'Work Email', type: 'email', placeholder: 'email@brand.com' },
                      ].map((f) => (
                        <div key={f.name} className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-gray-500">{f.label} <span className="text-orange-500">*</span></label>
                          <input
                            type={f.type}
                            name={f.name}
                            placeholder={f.placeholder}
                            value={formData[f.name]}
                            onChange={handleChange}
                            className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 bg-[#F9FAFB] border text-[#111827] placeholder-gray-400 focus:bg-white ${errors[f.name] ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-[#E5E7EB] focus:border-orange-500'}`}
                          />
                          {errors[f.name] && <p className="text-red-500 text-[10px] font-bold ml-1">{errors[f.name]}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Row 2: Phone + Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 00000 00000' },
                        { name: 'brand', label: 'Company / Brand', type: 'text', placeholder: 'e.g. Nykaa, Lenskart' },
                      ].map((f) => (
                        <div key={f.name} className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-gray-500">{f.label} <span className="text-orange-500">*</span></label>
                          <input
                            type={f.type}
                            name={f.name}
                            placeholder={f.placeholder}
                            value={formData[f.name]}
                            onChange={handleChange}
                            className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 bg-[#F9FAFB] border text-[#111827] placeholder-gray-400 focus:bg-white ${errors[f.name] ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-[#E5E7EB] focus:border-orange-500'}`}
                          />
                          {errors[f.name] && <p className="text-red-500 text-[10px] font-bold ml-1">{errors[f.name]}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider ml-1 text-gray-500">Your Message <span className="text-orange-500">*</span></label>
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Tell us about your campaign goals, budget, and timeline..."
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full rounded-2xl p-3 text-sm focus:outline-none transition-all duration-300 resize-none bg-[#F9FAFB] border text-[#111827] placeholder-gray-400 focus:bg-white ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-[#E5E7EB] focus:border-orange-500'}`}
                      />
                      {errors.message && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.message}</p>}
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-xs font-semibold">{responseMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-3 text-white text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                        boxShadow: '0 10px 30px rgba(249,115,22,0.25)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 40px rgba(249,115,22,0.35)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(249,115,22,0.25)'; }}
                    >
                      {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <>Send Message <Send size={14} /></>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </section>


          {/* ══════════════════════════════════════
              4. CTA SECTION  (dark theme)
          ══════════════════════════════════════ */}
          <section className="py-28 px-6 md:px-12 relative overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#020617]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#f97316] rounded-full filter blur-[180px] opacity-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8"
                style={{ borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.08)' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#f97316' }}>Let's Connect</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 font-display"
              >
                Ready to Scale Your{' '}
                <span className="relative inline-block">
                <span className="relative z-10 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl inline-block shadow-xl shadow-orange-500/20 -rotate-1 text-white">
                  Brand?
                </span>
              </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Don't wait — start your influencer journey with WhoInfluence today. Our campaigns go live in as little as 72 hours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href="#contact-form"
                  className="px-10 py-4 inline-flex items-center gap-2 text-white font-black rounded-full shadow-xl transition-all duration-300 text-[15px] cursor-pointer bg-gradient-to-r from-orange-500 to-amber-400 shadow-orange-500/20 hover:shadow-orange-500/30"
                >
                  Get Started Now <ArrowRight size={18} />
                </a>
                
                <a
                  href="/services"
                  className="px-10 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white font-black rounded-full transition-all duration-300 text-[15px] cursor-pointer"
                >
                  View Our Services
                </a>
              </motion.div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
