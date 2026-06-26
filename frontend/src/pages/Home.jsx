import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustedBrands from '../components/TrustedBrands';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import FeaturedVideos from '../components/FeaturedVideos';
import EndToEndSolution from '../components/EndToEndSolution';
import CreatorTestimonial from '../components/CreatorTestimonial';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import InfluencerModal from '../components/InfluencerModal';
import InfluencerLandingForm from '../components/InfluencerLandingForm';
import FAQ from '../components/FAQ';


const Home = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isInfluencerModalOpen, setIsInfluencerModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const openInfluencerModal = () => setIsInfluencerModalOpen(true);
  const closeInfluencerModal = () => setIsInfluencerModalOpen(false);

  // Scroll to influencer form section
  const scrollToInfluencerForm = () => {
    const element = document.getElementById('influencer-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-transparent min-h-screen">
      
      <div className="relative z-10">
        <Navbar onInfluencerClick={scrollToInfluencerForm} />
      
      <main>
        <Hero 
          onContactClick={openContactModal} 
          onInfluencerClick={openInfluencerModal} 
        />
        
        <TrustedBrands />
        
        <About />

        <WhyChooseUs />

        <FeaturedVideos />
        
        <Services />

        <EndToEndSolution />

        <CreatorTestimonial />

        <Testimonial />

        <InfluencerLandingForm/>
        <FAQ />
        
      </main>

      <Footer />
      
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <InfluencerModal isOpen={isInfluencerModalOpen} onClose={closeInfluencerModal} />
      </div>
    </div>
  );
};

export default Home;
