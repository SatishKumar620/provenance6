import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

// Lightning bolt SVG paths for Zenitsu thunder breathing effect
const LightningBolt = ({ style, className }) => (
  <svg viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={style} className={className}>
    <path d="M35 5L10 65H30L20 115L55 45H35L45 5H35Z"
      fill="url(#thunder-grad)" filter="url(#thunder-blur)" />
    <defs>
      <linearGradient id="thunder-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE566" />
        <stop offset="50%" stopColor="#F5C842" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
      <filter id="thunder-blur">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  </svg>
);

// Infinity Castle pillars
const CastlePillar = ({ x, delay, scale = 1 }) => (
  <motion.div
    initial={{ scaleY: 0, opacity: 0 }}
    animate={{ scaleY: 1, opacity: 0.6 }}
    transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute',
      bottom: 0,
      left: `${x}%`,
      width: `${3 * scale}px`,
      height: `${200 + Math.random() * 300}px`,
      background: 'linear-gradient(to top, rgba(212,175,55,0.15), transparent)',
      transformOrigin: 'bottom center',
      borderLeft: '1px solid rgba(212,175,55,0.2)',
      borderRight: '1px solid rgba(212,175,55,0.2)',
    }}
  />
);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const lightningContainerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.15]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered title letters animation
      gsap.fromTo('.hero-letter',
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.2,
          stagger: 0.06,
          ease: 'power4.out',
          delay: 0.5
        }
      );

      // Tagline slide in
      gsap.fromTo('.hero-tagline',
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 1.8, ease: 'power3.out' }
      );

      // Date and venue
      gsap.fromTo('.hero-meta',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 2.2, ease: 'power2.out' }
      );

      // CTA buttons
      gsap.fromTo('.hero-cta',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 2.6, ease: 'back.out(1.7)' }
      );

      // Continuous lightning bolts spawning
      const spawnLightning = () => {
        const container = lightningContainerRef.current;
        if (!container) return;

        const bolt = document.createElement('div');
        const x = Math.random() * 100;
        const size = 20 + Math.random() * 40;

        bolt.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: ${Math.random() * 70}%;
          width: ${size}px;
          height: ${size * 2}px;
          opacity: 0;
          pointer-events: none;
          z-index: 2;
        `;
        bolt.innerHTML = `<svg viewBox="0 0 60 120" width="100%" height="100%">
          <path d="M35 5L10 65H30L20 115L55 45H35L45 5H35Z" fill="#F5C842" opacity="0.9" filter="url(#gb)"/>
          <defs><filter id="gb"><feGaussianBlur stdDeviation="3"/></filter></defs>
        </svg>`;

        container.appendChild(bolt);

        gsap.to(bolt, {
          opacity: 1, duration: 0.05,
          onComplete: () => {
            gsap.to(bolt, {
              opacity: 0, duration: 0.15, delay: 0.05,
              onComplete: () => bolt.remove()
            });
          }
        });
      };

      // Spawn lightning at random intervals
      const interval = setInterval(spawnLightning, 400 + Math.random() * 600);

      // Floating particles (demon slayer haori pattern circles)
      gsap.utils.toArray('.particle').forEach((p, i) => {
        gsap.to(p, {
          y: '-120vh',
          x: `random(-50, 50)`,
          rotation: `random(-360, 360)`,
          opacity: 0,
          duration: `random(4, 8)`,
          delay: i * 0.3,
          repeat: -1,
          ease: 'none',
          repeatDelay: `random(0, 2)`
        });
      });

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleChars = "PROVENANCE".split('');
  const versionChars = "6.0".split('');

  const pillarPositions = [5, 12, 20, 30, 45, 55, 68, 78, 88, 95];

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      height: '100vh',
      minHeight: '700px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* VIDEO BACKGROUND — Zenitsu Infinity Castle scene */}
      <motion.div style={{ y, scale, position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(2,4,8,0.3) 0%, rgba(5,12,26,0.5) 50%, rgba(2,4,8,0.9) 100%)',
          zIndex: 1
        }} />
        {/* Primary video embed — Demon Slayer Infinity Castle */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        >
          {/* Replace with actual video file in /public/hero-video.mp4 */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback animated background if video not loaded */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(100, 0, 0, 0.25) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 20% 60%, rgba(107, 33, 168, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 30%, rgba(245, 200, 66, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, #020408 0%, #050C1A 30%, #0A1628 60%, #020408 100%)
          `,
          zIndex: 0
        }} />
      </motion.div>

      {/* Infinity Castle Pillars */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
        {pillarPositions.map((x, i) => (
          <CastlePillar key={i} x={x} delay={0.1 * i} scale={1 + (i % 3) * 0.5} />
        ))}
      </div>

      {/* Lightning container */}
      <div ref={lightningContainerRef} style={{
        position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none'
      }} />

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{
            position: 'absolute',
            bottom: '0',
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#F5C842' : i % 3 === 1 ? '#CC0000' : '#D4AF37',
            opacity: 0.7,
            boxShadow: `0 0 6px currentColor`,
          }} />
        ))}
      </div>

      {/* Scanline effect */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
      }} />

      {/* HERO CONTENT */}
      <motion.div style={{ opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px' }}>

        {/* Pre-title */}
        <motion.p
          className="hero-tagline"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            letterSpacing: '0.4em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '24px',
            opacity: 0,
          }}>
          ⚔ &nbsp; R V S C E T &nbsp; P R E S E N T S &nbsp; ⚔
        </motion.p>

        {/* Main Title — Split letter animation */}
        <div style={{ perspective: '800px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px, 0.8vw, 10px)', flexWrap: 'wrap' }}>
            {titleChars.map((char, i) => (
              <span key={i} className="hero-letter shimmer-text" style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 'clamp(32px, 8vw, 120px)',
                fontWeight: 900,
                display: 'inline-block',
                opacity: 0,
                lineHeight: 1,
                textShadow: '0 0 40px rgba(212,175,55,0.5)',
              }}>{char}</span>
            ))}
          </div>

          {/* Version number */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px, 0.5vw, 8px)', marginTop: '-8px' }}>
            {versionChars.map((char, i) => (
              <span key={i} className="hero-letter" style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 'clamp(20px, 5vw, 72px)',
                fontWeight: 900,
                display: 'inline-block',
                opacity: 0,
                color: 'var(--blood-red)',
                textShadow: '0 0 30px rgba(204,0,0,0.8), 0 0 60px rgba(204,0,0,0.4)',
                lineHeight: 1,
              }}>{char}</span>
            ))}
          </div>
        </div>

        {/* Decorative sword divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '20px 0' }}>
          <div style={{ height: '1px', width: 'clamp(60px, 12vw, 160px)', background: 'linear-gradient(to right, transparent, var(--gold))' }} />
          <span style={{ color: 'var(--gold)', fontSize: '20px' }}>⚡</span>
          <div style={{ height: '1px', width: 'clamp(60px, 12vw, 160px)', background: 'linear-gradient(to left, transparent, var(--gold))' }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(14px, 2vw, 22px)',
          color: 'var(--text-primary)',
          letterSpacing: '0.2em',
          marginBottom: '8px',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}>The Legend Returns</p>

        {/* Meta info */}
        <div className="hero-meta" style={{
          display: 'flex', gap: 'clamp(12px, 3vw, 40px)', justifyContent: 'center',
          alignItems: 'center', flexWrap: 'wrap',
          marginTop: '20px', marginBottom: '40px', opacity: 0
        }}>
          {[
            { icon: '📅', text: 'May 14 & 15, 2026' },
            { icon: '⚔', text: 'RVSCET' },
            { icon: '🏛', text: 'Coimbatore' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(12px, 1.4vw, 15px)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.1em',
            }}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta" style={{
          display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', opacity: 0
        }}>
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 48px)',
              background: 'linear-gradient(135deg, var(--crimson), var(--blood-red))',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(12px, 1.4vw, 15px)',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              cursor: 'none',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            }}>
            View Events
          </motion.a>
          <motion.a
            href="#glimpses"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 48px)',
              background: 'transparent',
              border: '1px solid var(--border-gold)',
              color: 'var(--text-primary)',
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(12px, 1.4vw, 15px)',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              cursor: 'none',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            }}>
            Past Glimpses
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '11px', letterSpacing: '0.3em', color: 'var(--text-secondary)' }}>SCROLL</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to top, var(--void), transparent)',
        zIndex: 5, pointerEvents: 'none'
      }} />
    </section>
  );
}
