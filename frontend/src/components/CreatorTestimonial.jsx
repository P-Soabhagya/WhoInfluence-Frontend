import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Star, Camera, Video } from 'lucide-react';
import testimonialVideos from '../data/testimonialvideos.json';

// ─── Creators Data ─────────────────────────────
const creators = [
  {
    id: 1,
    name: 'Manasa',
    handle: '@manasa',
    platform: 'instagram',
    followers: '1.2M',
    rating: 5,
    quote: 'WhoInfluence connected me with brands that truly aligned with my audience. Every campaign felt authentic!',
    videoId: '',
    thumbnail: '/testimonialvideos/testimonial-1.mp4',
    accent: '#f97316',
  },
  {
    id: 2,
    name: 'Aarzoo Dhaiya',
    handle: '@aarzoodhaiya',
    platform: 'youtube',
    followers: '890K',
    rating: 5,
    quote: 'The team at WhoInfluence is incredibly professional. They handled everything seamlessly end-to-end.',
    videoId: '',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    accent: '#f97316',
  },
  {
    id: 3,
    name: 'Nishu Singh',
    handle: '@nishu',
    platform: 'instagram',
    followers: '2.1M',
    rating: 5,
    quote: 'From brand briefing to content delivery, the process was smooth. Great results and amazing support!',
    videoId: '',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    accent: '#f97316',
  },
  {
    id: 4,
    name: 'Geetika Negi',
    handle: '@geetnegi',
    platform: 'youtube',
    followers: '650K',
    rating: 5,
    quote: 'The campaigns they designed for me were perfectly tailored to my community. ROI was fantastic!',
    videoId: '',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    accent: '#f97316',
  },
  {
    id: 5,
    name: 'Grishma Rajani',
    handle: '@grishmarajani',
    platform: 'instagram',
    followers: '480K',
    rating: 5,
    quote: 'WhoInfluence truly understands creator-brand synergy. I felt valued and my audience responded well.',
    videoId: '',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    accent: '#f97316',
  },
  {
    id: 6,
    name: 'Lavisha Bedi',
    handle: '@lavishabedi',
    platform: 'youtube',
    followers: '1.5M',
    rating: 5,
    quote: 'The data-driven approach helped me work with brands my audience actually trusts. Excellent experience!',
    videoId: '',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    accent: '#f97316',
  },
];

// ─── Merge JSON video data into creators ────────
const creatorsWithVideos = creators.map(c => {
  const video = testimonialVideos.find(v => v.id === c.id) || {};
  return {
    ...c,
      videoUrl: video.videoUrl ? `http://localhost:5000${video.videoUrl}` : null,
    description: video.description ?? '',
  };
});

// ─── Helper Components ─────────────────────────
const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={14} fill="#f97316" stroke="none" />
    ))}
  </div>
);

const PlatformIcon = ({ platform }) =>
  platform === 'youtube' ? (
    <Video size={14} className="text-orange-400" />
  ) : (
    <Camera size={14} className="text-orange-400" />
  );

// ─── Individual Video Card ─────────────────────
const VideoCard = ({ creator, index, onPlay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(creator)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div
        className="absolute inset-0 rounded-[22px] blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${creator.accent}40 0%, transparent 70%)` }}
      />

      <div
        className="relative rounded-[22px] overflow-hidden backdrop-blur-md transition-all duration-500 shadow-sm border"
        style={{
          background: '#FFFFFF',
          borderColor: hovered ? 'rgba(249, 115, 22, 0.2)' : 'rgba(0, 0, 0, 0.05)',
          boxShadow: hovered ? '0 15px 35px rgba(249, 115, 22, 0.08)' : '0 4px 20px rgba(0,0,0,0.02)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, ${creator.accent}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div className="relative aspect-video overflow-hidden">
          {/* Local mp4 — use <video> so the first frame shows as thumbnail */}
          {creator.videoUrl ? (
            <video
              src={creator.videoUrl}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
              playsInline
              preload="metadata"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: creator.thumbnail ? `url(${creator.thumbnail})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                background: creator.thumbnail
                  ? undefined
                  : `linear-gradient(135deg, ${creator.accent}30, #0a0a0a)`,
              }}
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.5) 50%, rgba(15,23,42,0.8) 100%)',
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${creator.accent}80, rgba(0,0,0,0.5))`,
                opacity: 0.6,
              }}
            >
              {creator.name.charAt(0)}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 1 : 0.85 }}
              transition={{ duration: 0.25 }}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: hovered
                  ? `linear-gradient(135deg, ${creator.accent}, rgba(255,255,255,0.9))`
                  : 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                boxShadow: hovered ? `0 0 30px ${creator.accent}60` : 'none',
              }}
            >
              <Play size={22} fill={hovered ? '#0a0a0a' : 'white'} stroke="none" className="ml-1" />
            </motion.div>
          </div>

          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: '#FFFFFF',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${creator.accent}40`,
                color: creator.accent,
              }}
            >
              <PlatformIcon platform={creator.platform} />
              {creator.niche}
            </div>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <div
              className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              {creator.followers}
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-sm text-slate-900">{creator.name}</p>
              <p className="text-slate-500 text-xs">{creator.handle}</p>
            </div>
            <StarRating count={creator.rating} />
          </div>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            "{creator.quote}"
          </p>

          <div
            className="mt-4 h-[1px] rounded-full transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, ${creator.accent}, transparent)`,
              width: hovered ? '80%' : '30%',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Video Lightbox Modal ──────────────────────
const VideoModal = ({ creator, onClose }) => {
  if (!creator) return null;

  // Support local .mp4 videos (from JSON) and YouTube video IDs
  const isLocalVideo = creator.videoUrl && (creator.videoUrl.startsWith('http://localhost') || !creator.videoUrl.startsWith('http'));
  const embedUrl = !isLocalVideo && creator.videoId
    ? `https://www.youtube.com/embed/${creator.videoId}?autoplay=1&rel=0`
    : null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
        onClick={onClose}
      >
        <motion.div
          key="modal-box"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="relative w-full max-w-3xl rounded-[24px] overflow-hidden"
          style={{
            background: '#0F172A',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 60px ${creator.accent}25`,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{ background: `linear-gradient(90deg, ${creator.accent}, #0F172A)` }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            <X size={16} className="text-white" />
          </button>

          <div className="relative aspect-video bg-black">
            {isLocalVideo ? (
              <video
                src={creator.videoUrl}
                title={`${creator.name} testimonial`}
                className="absolute inset-0 w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
            ) : embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${creator.name} testimonial`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{ background: `linear-gradient(135deg, ${creator.accent}15, #0F172A)` }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${creator.accent}, rgba(255,255,255,0.1))` }}
                >
                  <Play size={32} fill="white" stroke="none" className="ml-1" />
                </div>
                <p className="text-gray-400 text-sm text-center px-8">
                  Video coming soon — add a video URL to <br />
                  <code className="text-[#1ebda5] text-xs">testimonialvideos.json</code>
                </p>
              </div>
            )}
          </div>

          <div className="p-6 flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${creator.accent}, rgba(255,255,255,0.1))` }}
            >
              {creator.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-white font-bold">{creator.name}</p>
                <span className="text-gray-400 text-sm">{creator.handle}</span>
                <StarRating count={creator.rating} />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"{creator.quote}"</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Main Section ──────────────────────────────
const CreatorTestimonial = () => {
  const [activeCreator, setActiveCreator] = useState(null);

  return (
    <>
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 60%, #F9FAFB 100%)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-1/4 w-120 h-120 rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f9731630, transparent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-10 left-1/4 w-104 h-104 rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f9731630, transparent)' }}
        />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-6"
              style={{ borderColor: 'rgba(249,115,22,0.3)', background: 'rgba(249, 115, 22, 0.08)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f97316' }} />
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: '#f97316' }}>
                Creator Voices
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-tight" style={{ color: '#111827' }}>
              Hear It From Our{' '}
              <span className="relative inline-block">
                <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                  Creators
                </span>
              </span>
            </h2>
            <p className="mt-6 text-lg max-w-5xl mx-auto leading-relaxed" style={{ color: '#4B5563' }}>
              Real creators sharing their real experience of working with WhoInfluence — in their own words, on camera.
            </p>

            <div
              className="w-24 h-[2px] mx-auto mt-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorsWithVideos.map((creator, index) => (
              <VideoCard
                key={creator.id}
                creator={creator}
                index={index}
                onPlay={setActiveCreator}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <p className="text-slate-500 text-sm font-medium">
              100000+ creators trust WhoInfluence across Instagram, YouTube & more
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              {['#f97316'].map((c, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.6 + i * 0.2 }} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {activeCreator && (
        <VideoModal creator={activeCreator} onClose={() => setActiveCreator(null)} />
      )}
    </>
  );
};

export default CreatorTestimonial;