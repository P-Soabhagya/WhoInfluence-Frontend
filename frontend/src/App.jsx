import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ServicesPage from './pages/services'
import Cliental from './pages/Cliental'
import AboutUs from './pages/AboutUs'
import VideosPage from './pages/videos'
import ContactUs from './pages/ContactUs'


function App() {
  return (
    <Router>
      <div className="App relative min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617]">
        {/* Global Animated Background Grid */}
        <div className="fixed inset-0 z-0 pointer-events-none animated-grid-bg animate-grid"></div>
        
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/cliental" element={<Cliental />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
