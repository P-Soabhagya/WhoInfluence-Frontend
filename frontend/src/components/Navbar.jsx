import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onInfluencerClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {name: 'About',href: '/about',},
    {name: 'Services',href: '/services',},
    { name: 'Clients', href: '/cliental' },
    { name: 'Videos', href: '/videos' },
    { name: 'Contact Us', href: '/contact'}
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 font-display ${
        isScrolled 
          ? 'py-4 backdrop-blur-2xl border-b border-white/5 shadow-2xl' 
          : 'py-8'
      }`}
      style={isScrolled 
        ? { background: 'linear-gradient(to bottom, rgba(15,23,42,0.75), rgba(2,6,23,0.75))' }
        : { background: 'linear-gradient(to bottom, #0f172a, #020617)' }
      }
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="block group">
            <img
              src="/final-logo.png"
              alt="WhoInfluence"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentElement.innerHTML =
                  '<div class="text-luxury-gradient font-black text-2xl tracking-tighter uppercase">WHOINFLUENCE</div>';
              }}
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(link.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={link.href}
                className="font-bold text-[13px] uppercase tracking-[0.15em] text-white/90 hover:text-white flex items-center gap-1.5 transition-all duration-300"
              >
                {link.name}
                {link.submenu && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                  />
                )}
              </a>

              <AnimatePresence>
                {link.submenu && openDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-6"
                  >
                    <div className="glass-card-premium p-3 min-w-[280px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border-white/10">
                      <div className="flex flex-col gap-1">
                        {link.submenu.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="px-5 py-3 text-xs font-bold text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-3 rounded-2xl bg-white/5 border border-white/10 text-white transition-transform active:scale-90"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-bg-base/95 backdrop-blur-3xl border-t border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className="text-2xl font-black text-white/90"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                  {link.submenu && (
                    <div className="mt-4 ml-4 flex flex-col gap-3 border-l border-white/10 pl-6">
                      {link.submenu.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-sm font-bold text-white/40 hover:text-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;