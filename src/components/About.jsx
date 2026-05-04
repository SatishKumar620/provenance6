import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clubs, festInfo } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger the stat counters
      gsap.utils.toArray('.stat-number').forEach((el) => {
        const target = parseInt(el.dataset.target);
        gsap.fromTo(el,
          { textContent: '0' },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: 'top 80%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Events', value: 35, suffix: '+' },
    { label: 'Clubs', value: 5, suffix: '' },
    { label: 'Days', value: 2, suffix: '' },
    { label: 'Edition', value: 6, suffix: '.0' },
  ];

  return (
    <section ref={sectionRef} id="clubs" style={{
      padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139,0,0,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 20% 50%, rgba(107,33,168,0.05) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <p style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: '12px', letterSpacing: '0.5em',
            color: 'var(--blood-red)', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>⚔ The Pillars ⚔</p>
          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 900, color: 'var(--text-primary)',
            textShadow: '0 0 40px rgba(212,175,55,0.3)',
            marginBottom: '20px',
          }}>
            <span className="shimmer-text">THE GUILDS</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '15px',
            color: 'var(--text-secondary)', maxWidth: '520px',
            margin: '0 auto', lineHeight: 1.8,
          }}>
            Five legendary guilds unite at {festInfo.venue} for the grandest collegiate arena in {festInfo.date}.
          </p>
        </motion.div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px', marginBottom: '80px',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                textAlign: 'center', padding: '32px 20px',
                background: 'linear-gradient(135deg, rgba(10,22,40,0.8), rgba(5,12,26,0.9))',
                border: '1px solid var(--border-gold)',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              }}
            >
              <div style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 900, color: 'var(--gold)',
                textShadow: '0 0 30px rgba(212,175,55,0.4)',
                lineHeight: 1,
              }}>
                <span className="stat-number" data-target={s.value}>0</span>
                <span>{s.suffix}</span>
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: '12px',
                letterSpacing: '0.3em', color: 'var(--text-secondary)',
                marginTop: '8px', textTransform: 'uppercase',
              }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Clubs grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: '20px',
        }}>
          {clubs.map((club, i) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                padding: '28px',
                background: 'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(5,12,26,0.95))',
                border: `1px solid rgba(${club.color.replace('#','').match(/../g).map(c=>parseInt(c,16)).join(', ')}, 0.25)`,
                cursor: 'none', position: 'relative', overflow: 'hidden',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)',
              }}
            >
              {/* Color bar top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(to right, transparent, ${club.color}, transparent)`,
              }} />

              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{club.icon}</div>
              <h3 style={{
                fontFamily: "'Cinzel', serif", fontSize: '18px',
                fontWeight: 700, color: club.color, letterSpacing: '0.1em',
                marginBottom: '4px',
              }}>{club.name}</h3>
              <p style={{
                fontFamily: "'Noto Serif JP', serif", fontSize: '12px',
                color: 'var(--text-secondary)', letterSpacing: '0.15em',
                marginBottom: '16px',
              }}>{club.subtitle}</p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: "'Inter', sans-serif", fontSize: '13px',
                color: 'var(--text-secondary)',
              }}>
                <div style={{ width: '20px', height: '1px', background: club.color, opacity: 0.6 }} />
                <span>{club.events.length} events</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
