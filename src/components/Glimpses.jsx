import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Placeholder glimpse data - replace src with actual images
const glimpses = [
  { id: 1, src: '/glimpses/g1.jpg', caption: 'Opening Ceremony — Provenance 5.0', year: '2025', aspect: 'landscape' },
  { id: 2, src: '/glimpses/g2.jpg', caption: 'Robo War Finals', year: '2025', aspect: 'portrait' },
  { id: 3, src: '/glimpses/g3.jpg', caption: 'Cultural Night Performance', year: '2025', aspect: 'landscape' },
  { id: 4, src: '/glimpses/g4.jpg', caption: 'Hackathon Winners', year: '2025', aspect: 'portrait' },
  { id: 5, src: '/glimpses/g5.jpg', caption: 'Ramp Walk Spectacular', year: '2025', aspect: 'landscape' },
  { id: 6, src: '/glimpses/g6.jpg', caption: 'Coding Battle Arena', year: '2025', aspect: 'portrait' },
  { id: 7, src: '/glimpses/g7.jpg', caption: 'Music & Dance Finals', year: '2024', aspect: 'landscape' },
  { id: 8, src: '/glimpses/g8.jpg', caption: 'Sports Day Champions', year: '2024', aspect: 'landscape' },
  { id: 9, src: '/glimpses/g9.jpg', caption: 'Art Exhibition', year: '2024', aspect: 'portrait' },
];

// Anime-style placeholder card when image not found
const PlaceholderCard = ({ caption, year, index }) => {
  const patterns = [
    'linear-gradient(135deg, #8B0000 0%, #1a0a2e 100%)',
    'linear-gradient(135deg, #0a1628 0%, #1a0a2e 50%, #6B21A8 100%)',
    'linear-gradient(135deg, #020408 0%, #0a1628 50%, #8B0000 100%)',
    'linear-gradient(135deg, #1a2744 0%, #8B0000 100%)',
    'linear-gradient(135deg, #0a1628 0%, #D4AF37 200%)',
  ];

  const icons = ['⚔', '⚡', '🌸', '🔥', '✨', '🏆', '🎭', '🤖', '🎬'];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: patterns[index % patterns.length],
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '12px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent, transparent 20px,
          rgba(212,175,55,0.5) 20px, rgba(212,175,55,0.5) 21px
        )`,
      }} />
      <span style={{ fontSize: '48px', position: 'relative', zIndex: 1 }}>{icons[index % icons.length]}</span>
      <span style={{
        fontFamily: "'Cinzel', serif", fontSize: '12px',
        color: 'rgba(212,175,55,0.7)', letterSpacing: '0.2em',
        position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 16px',
      }}>{caption}</span>
      <span style={{
        fontFamily: "'Noto Serif JP', serif", fontSize: '11px',
        color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em',
        position: 'relative', zIndex: 1,
      }}>PROVENANCE {year}</span>
    </div>
  );
};

export default function Glimpses() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.glimpse-heading',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.glimpse-heading', start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="glimpses" style={{
      padding: 'clamp(60px, 10vw, 120px) 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(139,0,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Section heading */}
      <div className="glimpse-heading" style={{
        textAlign: 'center',
        padding: '0 clamp(20px, 5vw, 80px)',
        marginBottom: '60px',
      }}>
        <p style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: '12px', letterSpacing: '0.5em',
          color: 'var(--blood-red)', textTransform: 'uppercase',
          marginBottom: '16px',
        }}>⚔ Memory Arc ⚔</p>
        <h2 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 900, color: 'var(--text-primary)',
          textShadow: '0 0 40px rgba(212,175,55,0.3)',
          marginBottom: '16px',
        }}>
          <span className="shimmer-text">PAST GLIMPSES</span>
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '15px',
          color: 'var(--text-secondary)', maxWidth: '480px',
          margin: '0 auto', lineHeight: 1.8,
        }}>
          Echoes of battles past. Legends forged in previous arcs of Provenance.
        </p>
      </div>

      {/* Horizontal scroll gallery */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(to right, var(--void), transparent)',
          zIndex: 10, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(to left, var(--void), transparent)',
          zIndex: 10, pointerEvents: 'none',
        }} />

        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            gap: '20px',
            paddingLeft: '10vw',
            paddingRight: '10vw',
          }}
        >
          {glimpses.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.04, y: -8 }}
              onClick={() => setSelected(item)}
              style={{
                flexShrink: 0,
                width: item.aspect === 'portrait' ? 'clamp(220px, 25vw, 300px)' : 'clamp(320px, 38vw, 440px)',
                height: 'clamp(220px, 30vw, 340px)',
                position: 'relative',
                cursor: 'none',
                overflow: 'hidden',
                border: '1px solid rgba(212,175,55,0.15)',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              }}
            >
              {/* Image or placeholder */}
              <img
                src={item.src}
                alt={item.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PlaceholderCard caption={item.caption} year={item.year} index={i} />
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(2,4,8,0.9) 0%, transparent 60%)',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end', padding: '20px',
                }}
              >
                <p style={{
                  fontFamily: "'Cinzel', serif", fontSize: '13px',
                  color: 'var(--text-primary)', marginBottom: '4px',
                }}>{item.caption}</p>
                <p style={{
                  fontFamily: "'Noto Serif JP', serif", fontSize: '11px',
                  color: 'var(--gold)', letterSpacing: '0.2em',
                }}>Provenance {item.year}</p>
              </motion.div>

              {/* Corner badge */}
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                background: 'rgba(139,0,0,0.8)',
                border: '1px solid var(--gold)',
                padding: '2px 8px',
                fontFamily: "'Cinzel', serif", fontSize: '10px',
                color: 'var(--gold)', letterSpacing: '0.15em',
              }}>{item.year}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div style={{
        textAlign: 'center', marginTop: '32px',
        fontFamily: "'Noto Serif JP', serif",
        fontSize: '11px', letterSpacing: '0.3em',
        color: 'var(--text-secondary)', opacity: 0.6,
      }}>
        ← Scroll through memories →
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(2,4,8,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                maxWidth: '90vw', maxHeight: '90vh',
                border: '1px solid var(--border-gold)',
                overflow: 'hidden',
                position: 'relative',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ width: 'min(800px, 90vw)', height: 'min(500px, 80vh)', position: 'relative' }}>
                <img
                  src={selected.src} alt={selected.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => e.target.style.display = 'none'}
                />
                <div style={{ position: 'absolute', inset: 0 }}>
                  <PlaceholderCard caption={selected.caption} year={selected.year} index={selected.id} />
                </div>
              </div>
              <div style={{
                padding: '16px 20px',
                background: 'rgba(5,12,26,0.95)',
                borderTop: '1px solid var(--border-gold)',
              }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '14px', color: 'var(--text-primary)' }}>
                  {selected.caption}
                </p>
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '12px', color: 'var(--gold)', marginTop: '4px' }}>
                  Provenance {selected.year}
                </p>
              </div>
              <button onClick={() => setSelected(null)} style={{
                position: 'absolute', top: '12px', right: '12px',
                background: 'rgba(139,0,0,0.8)', border: '1px solid var(--gold)',
                color: 'var(--gold)', width: '32px', height: '32px',
                fontFamily: "'Cinzel', serif", fontSize: '14px',
                cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
