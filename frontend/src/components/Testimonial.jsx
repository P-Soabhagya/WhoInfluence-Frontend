import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Helper to classify brand vs creator deterministically based on ID/Name/Role
const getReviewerBadge = (item) => {
  if (!item) return 'Brand';
  if (item.reviewerType) return item.reviewerType;
  const name = item.name || '';
  const role = item.role || '';
  if (name.includes('Ananya') || name.includes('Radha') || name.includes('Himanshu') || role.toLowerCase().includes('creator')) {
    return 'Creator';
  }
  return 'Brand';
};

// Helper to generate appropriate Highlight/Title
const getReviewTitle = (item) => {
  if (!item) return 'Amazing Collaboration';
  if (item.title) return item.title;
  const id = item.id;
  if (id === 1) return 'Working with the perfect creator match';
  if (id === 2) return 'Support & clear communication';
  if (id === 3) return 'Professional & smooth execution';
  if (id === 4) return 'Incredible creator matching';
  if (id === 5) return 'UGC campaign exceeded expectations';
  
  const text = item.text.toLowerCase();
  if (text.includes('ugc')) return 'UGC campaign exceeded expectations';
  if (text.includes('support') || text.includes('communication')) return 'Excellent support & communication';
  if (text.includes('match') || text.includes('creator')) return 'Perfect creator partnerships';
  return 'Highly professional collaboration';
};

// Review Modal Component
const ReviewModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    title: '',
    reviewerType: 'Brand',
    stars: 5,
    text: ''
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

  const handleStarClick = (rating) => {
    setFormData({ ...formData, stars: rating });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.role.trim()) tempErrors.role = 'Role / Company is required';
    if (!formData.title.trim()) tempErrors.title = 'Review Title is required';
    if (!formData.text.trim()) tempErrors.text = 'Review content is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const res = await axios.post('http://localhost:5000/api/testimonials', formData);
      setStatus('success');
      setMessage('Review published successfully!');
      onSuccess(res.data.data);
      setFormData({ name: '', role: '', title: '', reviewerType: 'Brand', stars: 5, text: '' });
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setMessage('Failed to submit review. Please try again.');
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
            className="w-full max-w-lg rounded-[2.5rem] overflow-hidden relative z-10 shadow-[0_25px_60px_-15px_rgba(249,115,22,0.15)] bg-gradient-to-b from-[#0F172A]/98 to-[#090D16]/98 border border-white/10 text-white flex flex-col"
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
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="p-6 md:p-8">
              <div className="mb-6 pr-8">
                <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
                  Share Your <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Experience.</span>
                </h2>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Join our wall of feedback. Let other creators and brands know how WhoInfluence helped you grow.
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
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      ✓
                    </div>
                    <h3 className="text-lg font-black font-display tracking-tight mb-1 text-white">Review Submitted!</h3>
                    <p className="text-xs text-slate-300">{message}</p>
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
                    {/* Name & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-slate-400">Your Name *</label>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="e.g. Radha Shah"
                          className={`border rounded-xl p-3 focus:outline-none transition-all duration-300 bg-[#131A26] text-white placeholder-slate-500 text-xs focus:bg-[#182232] ${errors.name ? 'border-red-500' : 'border-white/5 focus:border-orange-500'}`}
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-[9px] font-semibold ml-1">{errors.name}</p>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-slate-400">Company / Role *</label>
                        <input 
                          type="text" 
                          name="role"
                          placeholder="e.g. Carbamide Forte"
                          className={`border rounded-xl p-3 focus:outline-none transition-all duration-300 bg-[#131A26] text-white placeholder-slate-500 text-xs focus:bg-[#182232] ${errors.role ? 'border-red-500' : 'border-white/5 focus:border-orange-500'}`}
                          value={formData.role}
                          onChange={handleChange}
                        />
                        {errors.role && <p className="text-red-500 text-[9px] font-semibold ml-1">{errors.role}</p>}
                      </div>
                    </div>

                    {/* Headline Highlight */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-slate-400">Review Headline *</label>
                      <input 
                        type="text" 
                        name="title"
                        placeholder="e.g. Working with the perfect creator match"
                        className={`border rounded-xl p-3 focus:outline-none transition-all duration-300 bg-[#131A26] text-white placeholder-slate-500 text-xs focus:bg-[#182232] ${errors.title ? 'border-red-500' : 'border-white/5 focus:border-orange-500'}`}
                        value={formData.title}
                        onChange={handleChange}
                      />
                      {errors.title && <p className="text-red-500 text-[9px] font-semibold ml-1">{errors.title}</p>}
                    </div>

                    {/* Category Type & Rating stars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-slate-400">Are you a Brand or Creator?</label>
                        <select 
                          name="reviewerType"
                          className="border border-white/5 rounded-xl p-3 focus:outline-none bg-[#131A26] text-white text-xs focus:bg-[#182232]"
                          value={formData.reviewerType}
                          onChange={handleChange}
                        >
                          <option value="Brand">Brand</option>
                          <option value="Creator">Creator</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-slate-400">Rating</label>
                        <div className="flex gap-1.5 py-2">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => handleStarClick(num)}
                              className="focus:outline-none transform hover:scale-125 transition-transform"
                            >
                              <svg
                                className={`w-6 h-6 ${num <= formData.stars ? 'text-orange-500 fill-orange-500' : 'text-slate-600'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-slate-400">Review Message *</label>
                      <textarea 
                        name="text"
                        rows="3"
                        placeholder="Tell us about the campaign results, communication, etc."
                        className={`border rounded-xl p-3 focus:outline-none transition-all duration-300 resize-none bg-[#131A26] text-white placeholder-slate-500 text-xs focus:bg-[#182232] ${errors.text ? 'border-red-500' : 'border-white/5 focus:border-orange-500'}`}
                        value={formData.text}
                        onChange={handleChange}
                      ></textarea>
                      {errors.text && <p className="text-red-500 text-[9px] font-semibold ml-1">{errors.text}</p>}
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-[10px] font-semibold">{message}</p>
                    )}

                    <motion.button 
                      type="submit" 
                      disabled={status === 'loading'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-[10px] uppercase tracking-widest transition-all duration-300 cursor-pointer mt-2"
                    >
                      {status === 'loading' ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        'Submit Review'
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

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/testimonials');
        setTestimonials(res.data.data);
      } catch {
        setTestimonials([
          {
            id: 1,
            name: "Radha Shah",
            role: "Carbamide Forte",
            logo: "./logo/CF.png",
            text: "Had a wonderful experience collaborating on this campaign. The team was professional, supportive, and always available whenever needed. The process was smooth, and communication was excellent throughout."
          },
          {
            id: 2,
            name: "Gautam Parmar",
            role: "Carbamide Forte",
            tagline: "",
            logo: "./logo/CF.png",
            text: "I enjoyed the quick support, clear communication, and cooperative approach of the team. They were responsive to our requirements and made the process smooth and easy to work with."
          },
          {
            id: 3,
            name: "Himanshu",
            role: "Everteen",
            tagline: "",
            logo: "./logo/everteen.png",
            text: "What we enjoyed most about working with the team was their professionalism and smooth communication throughout the collaboration. They understood the brief well, delivered high-quality content on time, and were receptive to feedback, making the entire process efficient and enjoyable."
          }
        ]);
      }
    };
    fetchTestimonials();
  }, []);

  const goNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };
  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleReviewSuccess = (newReview) => {
    setTestimonials((prev) => {
      const updated = [...prev, newReview];
      setDirection(1);
      setIndex(updated.length - 1);
      return updated;
    });
  };

  const current = testimonials[index];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#020617] text-white"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff6a00] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff6a00] rounded-full filter blur-3xl"></div>
      </div>      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">

        {/* Left Side: Header Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 text-left"
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
              Client Testimonials
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black font-display leading-tight" style={{ color: 'white' }}>
            What Our{' '}
           <span className="relative inline-block">
                <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                  Clients Say
                </span>
              </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl max-w-md leading-relaxed" style={{ color: '#9ca3af' }}>
            More than 200+ brands trust WhoInfluence to scale their brand presence with authentic creator partnerships.
          </p>

          {/* Decorative element for left side */}
          <div className="mt-12 hidden lg:flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1C2533] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#1C2533] bg-[#1ebda5] flex items-center justify-center text-[10px] font-bold text-white">
                +200
              </div>
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-gray-700 to-transparent" />
          </div>
        </motion.div>

        {/* Right Side: Testimonial Card */}
        {current && (
          <div className="lg:col-span-7 w-full">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="relative py-10 px-8 md:py-12 md:px-12 rounded-[32px] overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                }}
              >
                {/* Gradient top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
                />

                {/* Header bar: Label & + Write Review Button */}
                <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-8 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-xs tracking-wider uppercase font-black text-orange-500/80">Live Review Feed</span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    + Write Review
                  </button>
                </div>

                {/* Horizontal Split Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start relative z-10 py-2">
                  {/* Left Column: Author Info & Highlight */}
                  <div className="md:col-span-5 flex flex-col gap-3 md:border-r md:border-white/5 md:pr-8">
                    <div>
                      <h4 className="text-xl md:text-2xl font-black font-display text-white tracking-tight leading-snug">
                        "{getReviewTitle(current)}"
                      </h4>
                      <p className="text-sm text-slate-200 mt-4 font-bold">{current.name}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{current.role}</p>
                      <span 
                        className={`inline-block mt-3.5 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          getReviewerBadge(current) === 'Creator'
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}
                      >
                        {getReviewerBadge(current)}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Review Text & Stars */}
                  <div className="md:col-span-7 flex flex-col gap-4 justify-center">
                    <div className="flex gap-1.5">
                      {[...Array(Number(current.stars || 5))].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5.5 h-5.5 text-orange-500 fill-orange-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                      "{current.text}"
                    </p>
                  </div>
                </div>

                {/* Footer Navigation controls */}
                <div className="flex items-center justify-between pt-5 mt-8 border-t border-white/5 relative z-10 flex-wrap gap-4">
                  <div className="flex gap-3">
                    <button
                      onClick={goPrev}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group"
                      style={{
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.02)',
                        color: 'white',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#f97316';
                        e.currentTarget.style.background = 'rgba(249,115,22,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={goNext}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group"
                      style={{
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.02)',
                        color: 'white',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#f97316';
                        e.currentTarget.style.background = 'rgba(249,115,22,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Progressive Dots */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                        className="transition-all duration-500 rounded-full"
                        style={{
                          width: i === index ? '24px' : '8px',
                          height: '5px',
                          background: i === index
                            ? 'linear-gradient(90deg, #f97316, #f59e0b)'
                            : 'rgba(255,255,255,0.15)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleReviewSuccess} 
      />
    </section>
  );
};

export default Testimonial;
