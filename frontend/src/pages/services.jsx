import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowUpRight, ArrowRight, CheckCircle2, ChevronRight,
  Users, Video, Camera, Star, ShoppingCart, Megaphone,
  Zap, TrendingUp, Target, Play, Globe, Tv, Package, Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

/* ═══════════════════════════════════════════════
   SERVICE DATA — 6 Services with distinct accents
   ═══════════════════════════════════════════════ */
const SERVICES = [
  {
    id: 1,
    icon: Users,
    tag: '01',
    tagLabel: 'Influencer',
    title: 'Influencer Campaign Management',
    tagline: 'Influencer Marketing Campaigns That Drive Brand Awareness, Engagement & Sales',
    short: 'We connect your brand with the right creators, managing every step from discovery to performance reporting.',
    accent: 'from-orange-500 to-amber-400',
    accentSolid: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    borderHover: 'hover:border-orange-500/40',
    stats: [
      { val: '100000+', label: 'Creators' },
      { val: '50+', label: 'Brands' },
      { val: '98%', label: 'On-Time' },
    ],
    content: {
      intro:
        'Influencer marketing has become one of the most effective ways for brands to build trust and reach highly engaged audiences. We help brands collaborate with relevant creators and influencers across Instagram, YouTube, and other digital platforms to generate awareness, engagement, and measurable business results.\n\nWe manage everything from creator discovery and negotiation to content approvals, live posting, and performance reporting.',
      sections: [
         {
          heading: 'Key Benefits',
          type: 'benefits',
          items: [
            { icon: TrendingUp, label: 'Increase brand awareness and visibility' },
            { icon: Play, label: 'Reach targeted audiences' },
            { icon: Target, label: 'Build trust through authentic recommendations' },
            { icon: Star, label: 'Generate quality engagement and conversations' },
            { icon: Zap, label: 'Drive website traffic and product sales' },
            { icon: Globe, label: 'Improve social proof and brand credibility' },
          ],
        },
        {
          heading: 'What We Offer',
          type: 'list',
          items: [
            'Influencer identification and shortlisting',
            'Campaign strategy and planning',
            'Creator outreach and negotiations',
            'Product seeding and sampling campaigns',
            'Content briefing and approvals',
            'Campaign execution and management',
            'Performance tracking and reporting',
            'Paid, barter, and affiliate collaborations',
          ],
        },
        {
          heading: 'Types',
          type: 'list',
          items: [
            'Nano Influencer Campaigns',
            'Micro Influencer Campaigns',
            'Macro Influencer Campaigns',
            'Product Launch Campaigns',
            'Brand Awareness Campaigns',
            'Affiliate Marketing Campaigns',
            'Store Visit Campaigns',
            'User Acquisition Campaigns',
          ],
        },
        {
          heading: 'Platforms We Cover',
          type: 'chips',
          items: [
            'Instagram Reels',
            'Instagram Stories',
            'YouTube Shorts',
            'YouTube Integrations',
            'Celebrity Collaborations',
            'Marketplace Campaigns',
          ],
        },
        {
          heading: 'Best For',
          type: 'chips',
          items: ['Beauty & Skincare','Food & Beverage','Fashion & Apparel', 'Health & Wellness', 'Fintech & Finance', 'FMCG','Lifestyle Brands','Travel & Hospitality'],
        },
      ],
    },
  },
  {
    id: 2,
    icon: Video,
    tag: '02',
    tagLabel: 'Content',
    title: 'UGC Content Creation',
    tagline: 'UGC Content Creation for High-Converting Ads & D2C Brands',
    short: 'Authentic creator-led UGC videos designed for higher CTR, better ROAS, and improved landing page conversions.',
    accent: 'from-orange-500 to-amber-400',
    accentSolid: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    borderHover: 'hover:border-orange-500/40',
    stats: [
      { val: '2x', label: 'Avg. CTR Boost' },
      { val: '40%', label: 'Better ROAS' },
      { val: '6+', label: 'Content Types' },
    ],
    content: {
      intro:
        'User-generated content (UGC) helps brands create authentic connections with consumers. \n\nOur creator-led UGC videos are designed to improve ad performance, increase engagement, and drive conversions across social media, ecommerce websites, and marketplaces.',
      sections: [
        {
          heading: 'Key Benefits',
          type: 'benefits',
          items: [
            { icon: TrendingUp, label: 'Higher ad CTR' },
            { icon: Play, label: 'Better watch time' },
            { icon: Target, label: 'Improved conversion rate' },
            { icon: Star, label: 'Enhanced social proof' },
            { icon: Zap, label: 'Improved ROAS' },
            { icon: Globe, label: 'Increased trust & authenticity' },
          ],
        },
        {
          heading: 'What We Offer',
          type: 'list',
          items: [
            'UGC video creation',
            'Product demo videos',
            'Creator sourcing and management',
            'Script writing and ideation',
            'Testimonial content',
            'Ad creatives for Meta',
            'Lifestyle content production',
            'Marketplace-ready content',
          ],
        },
        {
          heading: 'Content Types',
          type: 'list',
          items: [
            'Product Demonstrations',
            'Unboxing Videos',
            'Testimonial Videos',
            'Before & After Videos',
            'Problem-Solution Videos',
            'Lifestyle Videos',
            'Voiceover UGC',
          ],
        },
        {
          heading: 'Best For',
          type: 'chips',
          items: ['Beauty & Skincare', 'Fitness', 'Fashion', 'Wellness', 'Nutrition Brands', 'FMCG','D2C Brands','Home & Living'],
        },
      ],
    },
  },
  {
    id: 3,
    icon: Camera,
    tag: '03',
    tagLabel: 'Shoot',
    title: 'Professional Shoots',
    tagline: 'Professional Product & Lifestyle Photography Services',
    short: 'Premium product photography and video shoots designed for websites, ads, Amazon listings, and brand campaigns.',
    accent: 'from-orange-500 to-amber-400',
    accentSolid: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    borderHover: 'hover:border-orange-500/40',
    stats: [
      { val: '6+', label: 'Shoot Types' },
      { val: 'HD+', label: 'Quality' },
      { val: '48hr', label: 'Turnaround' },
    ],
    content: 
    {
      intro:
        'High-quality visuals are essential for creating a strong brand identity and increasing conversions. \n\nWe provide professional photography solutions for ecommerce brands, social media campaigns, marketplaces, and advertising requirements.',
      sections: [
        {
          heading: 'Key Benefits',
          type: 'benefits',
          items: [
            { icon: TrendingUp, label: 'Premium brand presentation' },
            { icon: Play, label: 'Higher conversion rates' },
            { icon: Target, label: 'Better marketplace performance' },
            { icon: Star, label: 'Enhanced customer trust' },
            { icon: Zap, label: 'Consistent visual branding' },
            { icon: Globe, label: 'Increased engagement' },
          ],
        },
        {
          heading: 'What We Offer',
          type: 'list',
          items: [
            'Product photography',
            'Lifestyle photography',
            'E-commerce photography',
            'Model shoots',
            'Brand campaign shoots',
            'Flat lay photography',
            'Creative concept shoots',
            'Social media content shoots',
          ],
        },
        {
          heading: 'Shoot Categories',
          type: 'list',
          items: [
            'Product Shoots',
            'Studio Shoots',
            'Lifestyle Shoots',
            'Outdoor Shoots',
            'Campaign Shoots',
            'Fashion Shoots',
            'Food Photography',
            'Catalog Shoots',
          ],
        },
        {
          heading: 'Best For',
          type: 'chips',
          items: ['Beauty & Skincare','Fashion & Apparel', 'Jwellery', 'Food & Beverages', 'FMCG','Electronics','Home Decor','Luxury Brands','D2C Brands'],
        },
      ],
    },
  },
  {
    id: 4,
    icon: Star,
    tag: '04',
    tagLabel: 'Premium',
    title: 'Celebrity & Creator Endorsements',
    tagline: 'Celebrity & Creator Endorsements That Build Brand Credibility',
    short: 'Scale brand trust and recall with celebrity collaborations, public figure endorsements, and model-led campaigns.',
    accent: 'from-orange-500 to-amber-400',
    accentSolid: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    borderHover: 'hover:border-orange-500/40',
    stats: [
      { val: '100+', label: 'Celebrities' },
      { val: 'Pan India', label: 'Reach' },
      { val: 'Full', label: 'Management' },
    ],
    content: {
      intro:
        'Celebrity and creator endorsements help brands establish trust, credibility, and mass awareness. \n\nWe connect brands with celebrities, public figures, macro influencers, and industry experts to create impactful campaigns that drive recognition and customer confidence.',
      sections: [
         {
          heading: 'Key Benefits',
          type: 'benefits',
          items: [
            { icon: TrendingUp, label: 'Increased brand credibility' },
            { icon: Play, label: 'Wider audience reach' },
            { icon: Target, label: 'Stronger consumer trust' },
            { icon: Star, label: 'Higher campaign visibility' },
            { icon: Zap, label: 'Premium brand positioning' },
            { icon: Globe, label: 'Improved purchase intent' },
          ],
        },
        {
          heading: 'What We Offer',
          type: 'list',
          items: [
            'Celebrity sourcing and onboarding',
            'Creator endorsement campaigns',
            'Brand ambassador programs',
            'Contract negotiation',
            'Campaign planning and execution',
            'PR and media coordination',
            'Content production support',
            'Performance reporting',
          ],
        },
        {
          heading: 'Endorsements Types',
          type: 'list',
          items: [
            'Brand Ambassador Campaigns',
            'Product Launch Endorsements',
            'Social Media Endorsements',
            'Event Appearances',
            'Video Testimonials',
            'TV & Digital Campaigns',
            'Influencer-to-Celebrity Campaigns',
            'Long-Term Partnerships',
          ],
        },
        {
          heading: 'Best For',
          type: 'chips',
          items: ['Beauty & Personal care','Fashion & Luxury', 'Healthcare', 'Food & Beverages','Wellness','Real Estate','Fintech','Consumer Electronics','Hospitality'],
        },
      ],
    },
  },
  {
    id: 5,
    icon: ShoppingCart,
    tag: '05',
    tagLabel: 'Marketplace',
    title: 'Amazon Reviews & Ratings Campaigns',
    tagline: 'Amazon Reviews & Ratings Management for Better Marketplace Performance',
    short: 'Boost product credibility, visibility, and trust through creator-led review and rating campaigns.',
    accent: 'from-orange-500 to-amber-400',
    accentSolid: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    borderHover: 'hover:border-orange-500/40',
    stats: [
      { val: '4.5★', label: 'Avg. Rating' },
      { val: '3x', label: 'Visibility' },
      { val: '100%', label: 'Authentic' },
    ],
    content: {
      intro:
        'Customer reviews and ratings play a critical role in influencing purchase decisions on Amazon. \n\nOur review management solutions help brands improve customer satisfaction, strengthen brand reputation, and maintain a positive marketplace presence.',
      sections: [
         {
          heading: 'Key Benefits',
          type: 'benefits',
          items: [
            { icon: TrendingUp, label: 'Improved product credibility' },
            { icon: Play, label: 'Higher conversion rates' },
            { icon: Target, label: 'Better marketplace rankings' },
            { icon: Star, label: 'Increased customer trust' },
            { icon: Zap, label: 'Enhanced brand reputation' },
            { icon: Globe, label: 'Valuable customer insights' },
          ],
        },
        {
          heading: 'What We Offer',
          type: 'list',
          items: [
            'Review monitoring and analysis',
            'Customer feedback management',
            'Reputation management strategies',
            'Rating improvement campaigns',
            'Customer engagement support',
            'Marketplace performance insights',
            'Review response assistance',
            'Brand sentiment tracking',
          ],
        },
        {
          heading: 'Types',
          type: 'list',
          items: [
            'Product Review Monitoring',
            'Ratings Analysis',
            'Customer Feedback Tracking',
            'Reputation Management',
            'Marketplace Optimization Support',
            'Customer Experience Reporting',
          ],
        },
        {
          heading: 'Best For',
          type: 'chips',
          items: ['Beauty & Skincare','Fashion', 'Health & Wellness', 'FMCG','Electronics','Home & kitchen','Personal care','D2C Brands','Pet Accessories'],
        },
      ],
    },
  },
  {
    id: 6,
    icon: Megaphone,
    tag: '06',
    tagLabel: 'Growth',
    title: 'Talent Management',
    tagline: 'Talent Management Services for Creators, Influencers & Digital Personalities',
    short: 'Empowering creators with brand partnerships, personal branding, and growth strategies for long-term success.',
    accent: 'from-orange-500 to-amber-400',
    accentSolid: '#f97316',
    glow: 'rgba(249,115,22,0.15)',
    borderHover: 'hover:border-orange-500/40',
    stats: [
      { val: 'Multi', label: 'Platform' },
      { val: 'Monthly', label: 'Calendars' },
      { val: '360°', label: 'Strategy' },
    ],
    content: {
      intro:
        'We help creators and influencers grow their careers through strategic brand partnerships, content planning, personal branding, and business management. Our talent management services are designed to maximize earning opportunities and build long-term creator success.',
      sections: [
        {
          heading: 'Key Benefits',
          type: 'benefits',
          items: [
            { icon: TrendingUp, label: 'Access to premium brand collaborations' },
            { icon: Play, label: 'Better revenue opportunities' },
            { icon: Target, label: 'Professional representation' },
            { icon: Star, label: 'Long-term career growth' },
            { icon: Zap, label: 'Personal brand development' },
            { icon: Globe, label: 'Streamlined partnership management' },
          ],
        },
        {
          heading: 'What We Offer',
          type: 'list',
          items: [
            'Creator representation',
            'Brand deal management',
            'Contract negotiations',
            'Content strategy support',
            'Personal branding consultation',
            'Campaign coordination',
            'Business development',
            'Long-term growth planning',
          ],
        },
        {
          heading: 'Talents we manage',
          type: 'list',
          items: [
            'Influencers',
            'UGC Creators',
            'Content Creators',
            'Fashion Creators',
            'Beauty Creators',
            'Fitness Influencers',
            'Lifestyle Creators',
            'Industry Experts',
          ],
        },
        {
          heading: 'Best For',
          type: 'chips',
          items: ['Beauty & Skincare','Fashion','Lifestyle','Fitness','Health& Wellness','Technology','Food & Beverage','Finance','Travel & Hospitality'],
        },
      ],
    },
  },
];

/* ═══════════════════════════════════════════════
   SERVICE MODAL — Premium scrollable popup
   ═══════════════════════════════════════════════ */
const ServiceModal = ({ service, onClose }) => {
  const bodyRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  /* Track scroll progress */
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#0f172a] to-[#020617]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scroll progress */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 z-30">
          <div
            className={`h-full bg-gradient-to-r ${service.accent} rounded-full transition-[width] duration-75`}
            style={{ width: `${scrollPct}%` }}
          />
        </div>



        {/* ── Sticky Header ── */}
        <div className="shrink-0 flex items-center justify-between px-6 md:px-8 pt-8 pb-5 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center shadow-lg shrink-0`}
              style={{ boxShadow: `0 8px 24px ${service.glow}` }}
            >
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5"
                style={{ color: service.accentSolid }}
              >
                {service.tag} · {service.tagLabel}
              </p>
              <h2 className="text-lg md:text-xl font-black text-white leading-tight">
                {service.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group shrink-0"
            aria-label="Close modal"
          >
            <X size={18} className="text-white/60 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-8 scrollbar-hide">
          {/* Tagline */}
          <p className="text-white/40 text-sm font-semibold italic">{service.tagline}</p>

          {/* Intro (supports newlines) */}
          {service.content.intro.split('\n\n').map((p, i) => (
            <p key={i} className="text-slate-300 text-[15px] leading-relaxed">
              {p}
            </p>
          ))}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {service.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 text-center"
              >
                <p
                  className="text-xl md:text-2xl font-black"
                  style={{ color: service.accentSolid }}
                >
                  {s.val}
                </p>
                <p className="text-[10px] text-white/35 font-bold uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Content sections */}
          {service.content.sections.map((section, si) => (
            <div key={si}>
              <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2.5">
                <span
                  className={`w-6 h-[2px] rounded-full bg-gradient-to-r ${service.accent} inline-block`}
                />
                {section.heading}
              </h3>

              {/* List style */}
              {section.type === 'list' && (
                <ul className="space-y-2.5">
                  {section.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: service.accentSolid }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Chips style */}
              {section.type === 'chips' && (
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item, ii) => (
                    <span
                      key={ii}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/10 bg-white/[0.03]"
                      style={{ color: service.accentSolid }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* Benefits style */}
              {section.type === 'benefits' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.items.map((item, ii) => {
                    const BIcon = item.icon;
                    return (
                      <div
                        key={ii}
                        className="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4"
                      >
                        <div
                          className={`w-8 h-8 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center shrink-0`}
                        >
                          <BIcon size={14} className="text-white" />
                        </div>
                        <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* spacer for sticky footer */}
          <div className="h-2" />
        </div>

        {/* ── Sticky CTA Footer ── */}
        <div className="shrink-0 px-6 md:px-8 py-5 border-t border-white/[0.07] bg-[#020617] flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <a
            href="https://wa.me/919818849554"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r ${service.accent} shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-sm`}
            style={{ boxShadow: `0 8px 28px ${service.glow}` }}
          >
            Start Your Campaign
            <ArrowUpRight size={15} />
          </a>
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white/60 border border-white/10 hover:bg-white/5 hover:text-white transition-all duration-300 text-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════
   SERVICE CARD — Interactive premium card
   ═══════════════════════════════════════════════ */
const ServiceCard = ({ service, index, onOpen }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={() => onOpen(service)}
      className={`relative group rounded-[2rem] p-8 md:p-9 cursor-pointer border border-white/10 ${service.borderHover} transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)]`}
      style={{ background: 'rgba(255, 255, 255, 0.035)' }}
    >
      {/* Hover radial glow */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${service.glow} 0%, transparent 65%)`,
        }}
      />

      {/* Tag */}
      <p
        className="text-[10px] font-black uppercase tracking-[0.25em] mb-5"
        style={{ color: service.accentSolid }}
      >
        {service.tag} · {service.tagLabel}
      </p>

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}
        style={{ boxShadow: `0 12px 32px ${service.glow}` }}
      >
        <Icon size={24} className="text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-white transition-colors">
        {service.title}
      </h3>

      {/* Short description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.short}</p>

      {/* Stats mini-row */}
      <div className="flex gap-5 mb-6">
        {service.stats.map((s, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-base font-black" style={{ color: service.accentSolid }}>
              {s.val}
            </span>
            <span className="text-[9px] text-white/25 font-bold uppercase tracking-wider">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA line */}
      <div className="flex items-center gap-1.5 text-sm font-bold text-white/30 group-hover:text-white transition-colors duration-300">
        <span>Explore Service</span>
        <ChevronRight
          size={16}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>

      {/* Bottom gradient accent line */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-2/3 bg-gradient-to-r ${service.accent} transition-all duration-500 rounded-full`}
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════
   GRID LINES — Background decoration for light sections
   ═══════════════════════════════════════════════ */
const GridLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    {/* Clean subtle dot pattern */}
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.8) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
      }}
    />
    {/* Subtle designer cross lines */}
    <div className="absolute inset-0 opacity-[0.015]" style={{
      backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
      backgroundSize: '128px 128px'
    }} />
  </div>
);

/* ═══════════════════════════════════════════════
   DARK GRID LINES — Background decoration for dark sections
   ═══════════════════════════════════════════════ */
const DarkGridLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    {/* Clean subtle dot pattern */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
      }}
    />
    {/* Subtle designer cross lines */}
    <div className="absolute inset-0 opacity-[0.015]" style={{
      backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
      backgroundSize: '128px 128px'
    }} />
  </div>
);



/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
const ServicesPage = () => {
  const [activeService, setActiveService] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleInfluencerClick = () => {
    window.location.href = '/#influencer-form';
  };

  return (
    <div className="relative min-h-screen text-slate-800 overflow-x-hidden bg-white">
      <Navbar onInfluencerClick={handleInfluencerClick} />

      <main>
        {/* ═══════════════════════════════════════════
            HERO SECTION — Premium Light Theme
            ═══════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-12 pt-36 pb-28 overflow-hidden bg-slate-50 border-b border-slate-200">
          <GridLines />

          {/* Vertical line decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex justify-between max-w-7xl mx-auto px-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-px h-full bg-slate-900" />
            ))}
          </div>

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.8) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/[0.06] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-orange-600">
                India's Best Influencer Marketing Agency
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black font-display tracking-tight text-slate-950 leading-[1.08] mb-8"
            >
              Best Influencer{' '}
              <span className="relative inline-block">
                <span className="relative z-10 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl inline-block shadow-xl shadow-orange-500/20 -rotate-1 text-white">
                  Marketing
                </span>
              </span>
              <br className="hidden md:block" />
              <span className="text-black-800/80"> Agency in India for</span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Scalable Brand Growth
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-slate-600 text-base md:text-lg max-w-6xl mx-auto leading-relaxed mb-12"
            >
              At WhoInfluence, we help brands build high-performing influencer marketing campaigns
              across Instagram, YouTube, Reels, Shorts, and creator-led content platforms.
              From product launches to performance-driven campaigns, we connect your brand with the right
              creators to maximize reach, engagement, trust, and conversions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="https://wa.me/919818849554"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium flex items-center gap-3 group px-10 py-4 text-sm"
              >
                Start Your Campaign
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight size={14} />
                </div>
              </a>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-10 py-4 text-sm font-bold rounded-full border border-slate-900/10 text-slate-900 hover:bg-slate-900/5 hover:border-slate-900/20 transition-all duration-300 active:scale-95 flex items-center gap-2"
              >
                Talk to Our Team
                <ArrowRight size={16} className="text-slate-900" />
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap justify-center gap-6 mt-16"
            >
              {[
                { icon: Users, label: '100000+ Creators' },
                { icon: TrendingUp, label: '30+ Brands Served' },
                { icon: Globe, label: 'Instagram & Reels' },
                { icon: Tv, label: 'YouTube Campaigns' },
              ].map((b, i) => {
                const BIcon = b.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-500 font-semibold"
                  >
                    <BIcon size={14} className="text-orange-500" />
                    <span>{b.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SERVICES SHOWCASE — 6 Cards in grid
            ═══════════════════════════════════════════ */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#020617]"
        >
          <DarkGridLines />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/25 bg-orange-500/[0.08] mb-6"
              >
                <Zap size={12} className="text-orange-400" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-orange-400">
                  Our Services
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-5"
              >
                Everything Your Brand{' '}
                <span className="font-serif italic font-light text-orange-500">Needs</span>
                <br/>
                <span className="text-white">to Win Online</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed"
              >
                From discovery to delivery — comprehensive influencer marketing solutions designed to
                put your brand in front of the right audience at the right time.
              </motion.p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  onOpen={setActiveService}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-20"
            >
              <p className="text-slate-500 text-sm mb-6">
                Not sure which service is right for you?
              </p>
              <a
                href="https://wa.me/919818849554"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-3 group px-10 py-4"
              >
                Get a Free Consultation
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight size={14} />
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY WHOINFLUENCE — Premium Light Theme Section
            ═══════════════════════════════════════════ */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-slate-50 border-t border-slate-200">
          <GridLines />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.06] mb-6">
                  <Sparkles size={12} className="text-amber-600" />
                  <span className="text-xs font-black tracking-widest uppercase text-amber-600">
                    Why Us
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black font-display text-slate-950 tracking-tight leading-tight mb-6">
                  Why Brands Choose{' '}
                  <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                    WhoInfluence
                  </span>
                </h2>

                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  WhoInfluence is a leading influencer marketing agency helping brands connect with the right creators to drive awareness, engagement, and sales. 
                  Our expertise in influencer strategy, creator partnerships, campaign management, and performance marketing enables brands to achieve measurable results at scale.
                </p>

                <a
                  href="https://wa.me/919818849554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-3 px-8 py-4 text-sm group"
                >
                  Start Your Campaign
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </motion.div>

              {/* Right feature cards */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {[
                  {
                    icon: Target,
                    title: 'Data-Driven Campaigns',
                    desc: 'Every campaign is powered by audience insights, creator analytics, and performance metrics to ensure maximum reach, engagement, conversions, and return on investment.',
                  },
                  {
                    icon: Users,
                    title: '100000+ Verified Influencers',
                    desc: 'Access our extensive network of carefully vetted micro, macro, and celebrity influencers across lifestyle, beauty, tech, finance, food, fashion, fitness, and more.',
                  },
                  {
                    icon: Zap,
                    title: 'Quick Turnaround & Execution',
                    desc: "From campaign brief to content go-live, our streamlined processes help brands launch influencer marketing campaigns quickly without compromising quality.",
                  },
                  {
                    icon: Package,
                    title: 'End-to-End Campaign Management',
                    desc: "We handle creator sourcing, outreach, negotiations, content approvals, posting schedules, performance tracking, and reporting—so your team can focus on growth.",
                  },
                ].map((item, i) => {
                  const IIcon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="relative bg-white p-6 rounded-[1.5rem] border border-slate-950/5 group cursor-default overflow-hidden"
                      style={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {/* Hover glow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-400 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 rounded-[1.5rem]" />

                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20 relative z-10">
                        <IIcon size={18} className="text-white" />
                      </div>
                      <h4 className="text-base font-black text-slate-900 mb-2 group-hover:text-orange-600 transition-colors relative z-10">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed relative z-10">{item.desc}</p>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 rounded-full" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FINAL CTA — Transitioning to Dark Footer
            ═══════════════════════════════════════════ */}
        <section
          className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden border-t border-white/[0.05] bg-gradient-to-b from-[#0f172a] to-[#020617]"
        >
          <DarkGridLines />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/25 bg-orange-500/[0.08] mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-orange-400">
                  Scale Your Brand with Creators
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight leading-tight mb-6">
                Ready for{' '}
                <span className="relative inline-block">
                <span className="relative z-10 px-4 py-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl inline-block shadow-xl shadow-orange-500/20 -rotate-1 text-white">
                  WHOINFLUENCE?
                </span>
              </span>
                
              </h2>

              <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xl mx-auto">
                If you are ready to scale your socials, book a slot below directly or fill in your
                details so our marketing specialist can get in touch with you!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/919818849554"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium flex items-center gap-3 group px-10 py-4"
                >
                  Schedule a Call on WhatsApp
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="btn-ghost flex items-center gap-2 px-10 py-4"
                >
                  Send us a Message
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-semibold mt-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                We typically reply within 3 hours
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Service detail modal ── */}
      <AnimatePresence>
        {activeService && (
          <ServiceModal
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Contact modal (reused from site) ── */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default ServicesPage;