import { motion } from 'framer-motion';

const TrustedBrands = () => {
  const brandLogos = [
    { name: "5:15 PM", logo: "/logo/515PM.png" },
    { name: "Amazon", logo: "/logo/AMAZON.png" },
    { name: "Avimee Herbal", logo: "/logo/avimee.png" },
    { name: "Bioderma", logo: "/logo/bioderma.png" },
    { name: "CF", logo: "/logo/CF.png" },
    { name: "Country Delight", logo: "/logo/countrydelight.png" },
    { name: "Foxtale", logo: "/logo/foxtale.png" },
    { name: "Lenskart", logo: "/logo/Lenskart.png" },
    { name: "Neud", logo: "/logo/NEUD.png" },
    { name: "ONN", logo: "/logo/onn.png" },
    { name: "Oppo", logo: "/logo/oppo.png" },
    { name: "Pilgrim", logo: "/logo/pilgrim.png" },
    { name: "PLIX", logo: "/logo/plixx.png" },
    { name: "Suroskie", logo: "/logo/suroskie.png" },
    { name: "Swiggy", logo: "/logo/swiggy.png" },
    { name: "UBIQ", logo: "/logo/UBIK.png" },
    { name: "Pure Nutritions", logo: "/logo/PureNutrition.png" },
    { name: "Everteen", logo: "/logo/EVERTEEN.png" },
    { name: "Naqkashi Jwar", logo: "/logo/Naqkashi.png" },
    { name: "Neeraj diwan", logo: "/logo/astrology.png"},
    { name: "darpan tv", logo: "/logo/darpan.png"},
    { name: "Spearhead", logo: "/logo/spearhead.png"}
    ];

  return (
    <section className="py-8 bg-gradient-to-b from-[#fafafa] via-[#fcfcfd] to-[#fafafa] relative overflow-hidden border-b border-gray-100/80">

      {/* Subtle animating orange background glow orb */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-orange-500 rounded-full filter blur-[80px] pointer-events-none z-0"
      />

      <div className="max-w-[1440px] mx-auto px-6 mb-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block relative">
            <span className="text-xs md:text-sm font-black tracking-[0.45em] uppercase font-['Outfit'] bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400 bg-clip-text text-transparent">
              Trusted by World-Class Brands
            </span>
            <div className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A3D]/45 to-transparent blur-[0.5px]"></div>
          </div>
        </motion.div>
      </div>

      <div className="relative flex overflow-x-hidden w-full select-none relative z-10">
        {/* Gradients on the left and right sides for smooth fading edge */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/80 to-transparent z-10 pointer-events-none" />

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-loop {
            display: flex;
            width: max-content;
            animation: marquee 52s linear infinite;
          }
          .animate-marquee-loop:hover {
            animation-play-state: paused;
          }
        `}} />
        
        {/* Continuous double list flow for mathematically seamless loops */}
        <div className="animate-marquee-loop flex items-center gap-12 md:gap-16 shrink-0">
          {/* Copy 1 */}
          <div className="flex items-center gap-12 md:gap-16 shrink-0">
            {brandLogos.map((brand, i) => (
              <div 
                key={`c1-${i}`} 
                className="inline-flex items-center justify-center h-16 md:h-20 shrink-0 transition-all duration-300 transform hover:scale-105"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-12 md:h-16 w-auto object-contain filter grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Copy 2 (Seamless loop connector) */}
          <div className="flex items-center gap-12 md:gap-16 shrink-0">
            {brandLogos.map((brand, i) => (
              <div 
                key={`c2-${i}`} 
                className="inline-flex items-center justify-center h-16 md:h-20 shrink-0 transition-all duration-300 transform hover:scale-105"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-12 md:h-16 w-auto object-contain filter grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;