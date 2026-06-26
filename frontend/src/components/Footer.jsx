import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="text-white pt-20 pb-10 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#020617]"
    >

      {/* Subtle top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
      />

      {/* Background blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ background: 'rgba(249,250,251,0.06)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[130px] pointer-events-none opacity-10"
        style={{ background: 'rgba(249,250,251,0.05)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-white/10">

          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <img
              src="/final-logo.png"
              alt="WhoInfluence"
              className="h-25 w-auto object-contain self-start"
              onError={(e) => {
                e.target.onerror = null;
                e.target.outerHTML =
                  '<div class="font-black text-2xl tracking-tight self-start" style="background:linear-gradient(90deg,#f97316,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">WHOINFLUENCE</div>';
              }}
            />
            <p className="text-gray-400 leading-relaxed text-sm">
              Leading the way in influencer marketing across India. We connect brands with authentic voices to create meaningful impact.
            </p>
            <div className="flex gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/whoinfluence.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300"
              >
                <img src="./public/socialmedialogo/insta.png" alt="Instagram" className="w-10 h-10 object-contain" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/whoinfluence-in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
              >
                <img src="./public/socialmedialogo/linked.png" alt="LinkedIn" className="w-8 h-8 object-contain" />
              </a>

              {/* Gmail */}
              <a
                href="mailto:whoinfluence.business@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
              >
                <img src="./public/socialmedialogo/gmail.png" alt="Gmail" className="w-8 h-8 object-contain" />
              </a>

              {/* Phone */}
              <a
                href="tel:+919818849554"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
              >
                <img src="./public/socialmedialogo/call.png" alt="Call" className="w-10 h-10 object-contain" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-white tracking-widest uppercase">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Services', href: '/services' },
                { label: 'Featured Work', href: '/videos' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className="w-0 h-px group-hover:w-4 transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*Contact us */}
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-white tracking-widest uppercase"> Contact Us</h4>
            <ul className="flex flex-col gap-4">
              {[
                'E-mail: [whoinfluence.business@gmail.com]',
              
                'Call: +91 98188 49554',
              ].map((service, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className="w-0 h-px group-hover:w-4 transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
                    />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Broadcast Channel */}
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-bold text-white tracking-widest uppercase">Stay Connected</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Join our WhatsApp Broadcast Channel for exclusive marketing insights, campaign tips, and brand updates — delivered directly to you.
            </p>

            <motion.a
              href="https://whatsapp.com/channel/0029VbC6H7O1XquZ67yLFz25"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-4 p-4 rounded-2xl border group transition-all duration-300"
              style={{
                border: '1px solid rgba(37,211,102,0.25)',
                background: 'rgba(37,211,102,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,211,102,0.5)';
                e.currentTarget.style.background = 'rgba(37,211,102,0.12)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(37,211,102,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)';
                e.currentTarget.style.background = 'rgba(37,211,102,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* WhatsApp icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: '#25D366' }}
              >
                <MessageCircle size={22} fill="white" stroke="none" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">WhoInfluence Channel</p>
                <p className="text-gray-400 text-xs mt-0.5">Join our broadcast channel</p>
              </div>
              <ArrowUpRight size={18} className="text-gray-500 group-hover:text-[#25D366] transition-colors duration-300" />
            </motion.a>

            {/* Stats pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full self-start"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-gray-400 text-xs font-medium">Get exclusive brand tips</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-sm">
          <p>
            © 2026{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #909090ff, #e0e0e0ff, #909090ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WhoInfluence Agency
            </span>
            . All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;