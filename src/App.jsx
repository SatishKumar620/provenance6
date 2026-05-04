import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Events from './components/Events';
import Glimpses from './components/Glimpses';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

export default function App() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh' }}>
      {/* Film grain */}
      <div className="grain" />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Hero — Zenitsu Infinity Castle */}
      <div id="home">
        <Hero />
      </div>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Countdown */}
      <Countdown />

      {/* Section divider */}
      <div className="section-divider" />

      {/* Guilds overview */}
      <About />

      {/* Section divider */}
      <div className="section-divider" />

      {/* Events */}
      <Events />

      {/* Section divider */}
      <div className="section-divider" />

      {/* Past Glimpses */}
      <Glimpses />

      {/* Section divider */}
      <div className="section-divider" />

      {/* Footer / Contact */}
      <Footer />
    </div>
  );
}
