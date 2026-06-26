import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, ArrowUpRight, ChevronLeft, ChevronRight, 
  Send, Loader2, Award, Sparkles, MessageCircle, ArrowRight, CheckCircle2 
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CAROUSEL_VIDEOS = [];
const BRAND_LOGOS = [];

// Left pair: hero-1 (top) and hero-2 (bottom)
// Right pair: hero-3 (top) and hero-4 (bottom)
const HERO_VIDEOS = [
  {
    id: 'hero-1',
    src: 'http://localhost:5000/videos/FeaturedVideos/1.mp4',
    title: 'Real UGC',
    creator: '',
    border: 'border-orange-500/40 shadow-orange-500/10',
    rotation: -6,
    pos: 'top-[15%] left-[2%] xl:left-[2%]',
    side: 'left',
  },
  {
    id: 'hero-2',
    src: 'http://localhost:5000/videos/FeaturedVideos/2.mp4',
    title: 'Real creators',
    creator: '',
    border: 'border-amber-500/40 shadow-amber-500/10',
    rotation: 4,
    pos: 'bottom-[15%] left-[1%] xl:left-[5%]',
    side: 'left',
  },
  {
    id: 'hero-3',
    src: 'http://localhost:5000/videos/FeaturedVideos/3.mp4',
    title: 'Choose from 3000+',
    creator: '',
    border: 'border-amber-500/40 shadow-amber-500/10',
    rotation: 5,
    pos: 'top-[12%] right-[2%] xl:right-[2%]',
    side: 'right',
  },
  {
    id: 'hero-4',
    src: 'http://localhost:5000/videos/FeaturedVideos/4.mp4',
    title: 'Authentic engagement',
    creator: '',
    border: 'border-orange-500/40 shadow-orange-500/10',
    rotation: -5,
    pos: 'bottom-[18%] right-[1%] xl:right-[5%]',
    side: 'right',
  }
];

/* ─────────────────────────────────────────────
   Individual video card (used on mobile grid)
───────────────────────────────────────────── */
const UGCVideoCard = ({ src, title, creator, border, rotation, className, autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (autoPlay) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); }
    else { videoRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
  };

  return (
    <div
      className={`relative w-48 md:w-56 aspect-[9/16] rounded-[2rem] overflow-hidden border-2 bg-slate-900 shadow-2xl group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-orange-500/10 ${border} ${className}`}
      style={{ transform: rotation ? `rotate(${rotation}deg)` : 'none' }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop muted autoPlay playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
        <div className="flex justify-end gap-2">
          <button onClick={toggleMute} className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors">
            {isMuted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
          </button>
        </div>
        <div>
          <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110 mb-3">
            {isPlaying ? <Pause size={16} fill="white" className="text-white" /> : <Play size={16} fill="white" className="text-white ml-0.5" />}
          </button>
          <p className="text-white font-bold text-sm tracking-tight leading-tight">{title}</p>
          <p className="text-orange-400 font-medium text-xs mt-0.5">{creator}</p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Interactive stacked card pair
   front/back cards can swap on hover of the back card.
───────────────────────────────────────────── */
const StackedCardPair = ({ front, back }) => {
  // activeId = whichever card is currently "on top"
  const [activeId, setActiveId] = useState(front.id);
  const [hoveredId, setHoveredId] = useState(null);

  const isActive = (id) => id === activeId;
  const isHovered = (id) => id === hoveredId;

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    if (!isActive(id)) {
      // Hovering the back card → bring it forward
      setActiveId(id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const cards = [front, back];

  return (
    <>
      {cards.map((vid) => {
        const active = isActive(vid.id);
        const zIndex = active ? 40 : 30;

        // Offset the back card slightly so it peeks out
        const peekX = vid.id === front.id ? 0 : (front.side === 'left' ? 10 : -10);
        const peekY = vid.id === front.id ? 0 : 12;

        return (
          <motion.div
            key={vid.id}
            className={`absolute ${vid.pos}`}
            style={{ zIndex }}
            // Floating animation blended with hover lift
            animate={{
              y: [peekY, peekY - 10, peekY],
              scale: active && isHovered(vid.id) ? 1.06 : active ? 1 : 0.94,
              x: peekX,
              filter: active ? 'brightness(1)' : 'brightness(0.7)',
            }}
            transition={{
              y: {
                duration: vid.id.endsWith('1') || vid.id.endsWith('3') ? 4.5 : 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              scale: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
              x: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
              filter: { duration: 0.35 },
            }}
            onMouseEnter={() => handleMouseEnter(vid.id)}
            onMouseLeave={handleMouseLeave}
          >
            <UGCVideoCard
              src={vid.src}
              title={vid.title}
              creator={vid.creator}
              border={vid.border}
              rotation={vid.rotation}
              autoPlay={active}
            />
          </motion.div>
        );
      })}
    </>
  );
};

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
const Hero = ({ onContactClick, onInfluencerClick }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselContainerRef = useRef(null);

  const slidePrev = () => setCarouselIndex(prev => Math.max(0, prev - 1));
  const slideNext = () => setCarouselIndex(prev => Math.min(CAROUSEL_VIDEOS.length - 1, prev + 1));

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredBrands = BRAND_LOGOS.filter(brand => selectedCategory === 'all' || brand.category === selectedCategory);

  // Split videos into left and right pairs
  const leftPair  = { front: HERO_VIDEOS[0], back: HERO_VIDEOS[1] };
  const rightPair = { front: HERO_VIDEOS[2], back: HERO_VIDEOS[3] };

  return (
    <div className="relative bg-transparent min-h-screen text-slate-200">
      <div className="relative z-10">
        <Navbar onInfluencerClick={onInfluencerClick} />
        
        <main className="pt-24 overflow-hidden">

          {/* ================= HERO SECTION ================= */}
          <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-12 py-20 bg-gradient-to-b from-[#020617] to-[#0f172a]">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5 flex justify-between max-w-7xl mx-auto px-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-white border-l border-white" />
              ))}
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">

              {/* Text center column */}
              {/* pointer-events-none so the invisible bounding box of this z-20 div
                  does NOT swallow clicks aimed at the floating video cards (z-30+) behind it.
                  pointer-events-auto is restored on the CTA buttons so they still work. */}
              <div className="text-center max-w-3xl relative z-20 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8 border-orange-500/30 bg-orange-500/8"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                </motion.div>

                <h1 className="text-5xl md:text-8xl font-black font-display tracking-tight text-white leading-none">
                  Real <span className="relative inline-block px-4 py-1 mx-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl text-white transform -rotate-1 skew-x-2 shadow-lg shadow-orange-500/20">Content</span> <br />
                  <span className="font-serif italic font-light text-orange-500 tracking-wide text-4xl md:text-7xl">By</span> Real Creators
                </h1>

                <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mt-8 leading-relaxed">
                  We help D2C and modern brands grow through performance-driven influencer marketing, data-backed creator collaborations, and high-converting UGC content.
                </p>

                {/* CTA Buttons — pill shape, pointer-events restored */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none mt-10 pointer-events-auto">
                  <motion.button 
                    onClick={onInfluencerClick}
                    whileHover={{ scale: 1.05, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-black rounded-full shadow-xl shadow-orange-500/20 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2.5 text-[15px] font-['Outfit'] cursor-pointer"
                  >
                    I am an Influencer <ArrowRight size={18} />
                  </motion.button>
                  
                  <motion.button 
                    onClick={onContactClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/70 text-white font-black rounded-full hover:border-white transition-all duration-300 text-[15px] font-['Outfit'] cursor-pointer"
                  >
                    I am a Brand 
                  </motion.button>
                </div>
              </div>

              {/* Floating interactive video cards — large screens only */}
              <div className="hidden lg:block">
                <StackedCardPair front={leftPair.front}  back={leftPair.back} />
                <StackedCardPair front={rightPair.front} back={rightPair.back} />
              </div>
              
              {/* Grid — small screens */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 lg:hidden w-full px-4">
                {HERO_VIDEOS.map((vid) => (
                  <UGCVideoCard 
                    key={vid.id} src={vid.src} title={vid.title} creator={vid.creator}
                    border={vid.border} rotation={0} className="w-full"
                  />
                ))}
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Hero;