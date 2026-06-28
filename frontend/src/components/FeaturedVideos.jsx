const API = import.meta.env.VITE_API_URL;
console.log("API =", API);
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Play, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const getFullUrl = (urlPath) => {
  if (!urlPath) return '';
  if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) {
    return urlPath;
  }
  return `${API}${urlPath}`;
};

const VideoCard = ({ video, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch((err) => {
        console.log("Play interrupted or blocked:", err.message);
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const color = video.color || '#f97316';
  const videoUrl = getFullUrl(video.videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="shrink-0 w-72 md:w-80 group cursor-pointer relative snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(video)}
    >
      <div
        // className="absolute left-1 right-1 top-6 bottom-6 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-[28px] blur-xl"
        style={{
          backgroundImage: `linear-gradient(to right, ${color}, #f59e0b)`,
        }}
      ></div>
      <div
        className="relative aspect-9/16 rounded-[28px] overflow-hidden mb-6 transition-all duration-500 bg-[#1E293B] backdrop-blur-md border border-white/10 hover:border-orange-500/30 shadow-xl"
      >
        {/* HTML5 Video Element for Live Preview */}
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            preload="metadata"
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{ filter: isHovered ? 'brightness(1.15) scale(1.05)' : 'brightness(0.85) scale(1)' }}
          />
        ) : (
          /* Fallback Overlay */
          <div
            className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            style={{ background: `linear-gradient(to bottom, transparent, ${color})` }}
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent z-10" />

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            animate={{ scale: isHovered ? 1.15 : 1 }}
          >
            <Play className="text-white fill-white ml-1" size={28} />
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: color }}
          >
            {video.brand}
          </p>
          <h4 className="text-xl leading-tight font-black font-display tracking-tight text-white transition-colors">
            {video.title}
          </h4>
        </div>
      </div>

      <div className="flex justify-between items-center px-2">
        <p className="text-gray-400 font-medium text-sm">{video.views || '0 Views'}</p>
        <div className="h-1 w-16 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full w-2/3"
            style={{ background: `linear-gradient(90deg, ${color}, #ff8a3d)` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API}/api/videos`);
        setVideos(res.data.data);
      } catch (err) {
        setVideos([
          { id: 1, brand: "Lenskart", title: "Style Your Vision", views: "4.2M", color: "#f97316", videoUrl: '/videos/FeaturedVideos/1.mp4' },
          { id: 2, brand: "OPPO", title: "Capture Moments", views: "7.8M", color: "#f97316", videoUrl: '/videos/FeaturedVideos/2.mp4' },
          { id: 3, brand: "Nykaa", title: "Glow Up", views: "5.6M", color: "#f97316", videoUrl: '/videos/FeaturedVideos/3.mp4' },
          { id: 4, brand: "Foxtale", title: "Beauty Simplified", views: "5.6M", color: "#f97316", videoUrl: '/videos/FeaturedVideos/4.mp4' },
          { id: 5, brand: "Swiggy", title: "Food Deliveries", views: "5.6M", color: "#f97316", videoUrl: '/videos/FeaturedVideos/5.mp4' },
          { id: 6, brand: "Everteen", title: "Hygiene First", views: "5.6M", color: "#f97316", videoUrl: '/videos/FeaturedVideos/6.mp4' },
        ]);
      }
    };
    fetchVideos();
  }, []);

  // Keyboard listener to close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="videos"
      className="py-28 px-6 relative overflow-hidden bg-[#0F172A] text-white"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff6a00] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff6a00] rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
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
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight"
          >
            Content That Drives{' '}

            <span className="relative inline-block">
              <span className="relative z-10 inline-block px-4 py-1 text-white bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl -rotate-1 shadow-xl shadow-orange-500/20">
                Real Results
              </span>
            </span>
          </motion.h2>
          <p className="text-lg mt-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            From storytelling to performance, see how our campaigns convert.
          </p>
        </div>
      </div>

      <div
        className="flex overflow-x-auto pb-8 gap-8 scrollbar-hide relative z-10 w-full snap-x snap-mandatory"
        style={{
          paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2))',
          paddingRight: 'max(1.5rem, calc((100vw - 80rem) / 2))'
        }}
      >
        {videos.map((video, i) => (
          <VideoCard
            key={video.id || i}
            video={video}
            index={i}
            onSelect={setSelectedVideo}
          />
        ))}
      </div>

      {/* Video Playback Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 border border-white/10 hover:bg-black/80 hover:scale-105 active:scale-95 transition-all text-white cursor-pointer"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={20} />
              </button>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={getFullUrl(selectedVideo.videoUrl)}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info Area */}
              <div className="p-6 md:p-8 border-t border-white/5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
                      {selectedVideo.brand}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-black text-white mt-2">
                      {selectedVideo.title}
                    </h3>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <p className="font-semibold text-white">{selectedVideo.views || '0 Views'}</p>
                    <p className="text-xs mt-1">Duration: {selectedVideo.duration || '0:15'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedVideos;
