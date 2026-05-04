import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clubs } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ event, index, clubColor, glowColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, scale: 1.02 }}
    style={{
      background: 'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(5,12,26,0.95))',
      border: `1px solid rgba(${hexToRgb(clubColor)}, 0.25)`,
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'none',
      clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
      transition: 'border-color 0.3s ease',
    }}
  >
    {/* Corner accent */}
    <div style={{
      position: 'absolute', top: 0, right: 0,
      width: '48px', height: '48px',
      background: `linear-gradient(225deg, rgba(${hexToRgb(clubColor)}, 0.3), transparent)`,
    }} />

    {/* Top line accent */}
    <div style={{
      position: 'absolute', top: 0, left: '20px', right: '30px',
      height: '1px',
      background: `linear-gradient(to right, transparent, rgba(${hexToRgb(clubColor)}, 0.6), transparent)`,
    }} />

    {/* Glow on hover */}
    <motion.div
      whileHover={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 70%)`,
        pointerEvents: 'none', opacity: 0, transition: 'opacity 0.3s ease',
      }}
    />

    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{
        display: 'inline-block',
        background: `rgba(${hexToRgb(clubColor)}, 0.15)`,
        border: `1px solid rgba(${hexToRgb(clubColor)}, 0.3)`,
        padding: '3px 10px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.15em',
        color: clubColor,
        marginBottom: '12px',
        textTransform: 'uppercase',
      }}>{event.tag}</div>

      <h3 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(14px, 1.8vw, 18px)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '10px',
        lineHeight: 1.3,
      }}>{event.name}</h3>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        marginBottom: '16px',
      }}>{event.desc}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '20px', height: '1px', background: `rgba(${hexToRgb(clubColor)}, 0.6)` }} />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          color: clubColor,
          letterSpacing: '0.1em',
          opacity: 0.8,
        }}>⏱ {event.duration}</span>
      </div>
    </div>
  </motion.div>
);

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '212, 175, 55';
}

export default function Events() {
  const [activeClub, setActiveClub] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const club = clubs[activeClub];

  return (
    <section ref={sectionRef} id="events" style={{
      padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      {/* Section header */}
      <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: '12px',
          letterSpacing: '0.5em',
          color: 'var(--blood-red)',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>⚔ Arc Selection ⚔</p>
        <h2 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(28px, 5vw, 56px)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          marginBottom: '16px',
          textShadow: '0 0 40px rgba(212,175,55,0.3)',
        }}>
          <span className="shimmer-text">BATTLE ARENAS</span>
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: 1.8,
        }}>
          5 Guilds. 35+ Events. Choose your arc and forge your legend.
        </p>
      </div>

      {/* Club tabs */}
      <div style={{
        display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
        marginBottom: '48px',
      }}>
        {clubs.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => setActiveClub(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '10px 20px',
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'none',
              border: `1px solid ${activeClub === i ? c.color : 'rgba(212,175,55,0.2)'}`,
              background: activeClub === i
                ? `linear-gradient(135deg, rgba(${hexToRgb(c.color)}, 0.25), rgba(${hexToRgb(c.color)}, 0.1))`
                : 'rgba(5,12,26,0.6)',
              color: activeClub === i ? c.color : 'var(--text-secondary)',
              transition: 'all 0.3s ease',
              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              boxShadow: activeClub === i ? `0 0 20px rgba(${hexToRgb(c.color)}, 0.3)` : 'none',
            }}
          >
            <span style={{ marginRight: '6px' }}>{c.icon}</span>
            {c.name}
          </motion.button>
        ))}
      </div>

      {/* Active club header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeClub}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginBottom: '32px',
            padding: '20px 28px',
            background: `linear-gradient(135deg, rgba(${hexToRgb(club.color)}, 0.1), transparent)`,
            border: `1px solid rgba(${hexToRgb(club.color)}, 0.2)`,
            borderLeft: `4px solid ${club.color}`,
          }}
        >
          <span style={{ fontSize: '36px' }}>{club.icon}</span>
          <div>
            <h3 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 700,
              color: club.color,
              letterSpacing: '0.1em',
            }}>{club.name}</h3>
            <p style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '13px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.2em',
            }}>{club.subtitle} &nbsp;·&nbsp; {club.events.length} Events &nbsp;·&nbsp; {club.animeRef}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Event cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeClub}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '20px',
          }}
        >
          {club.events.map((event, i) => (
            <EventCard
              key={event.name}
              event={event}
              index={i}
              clubColor={club.color}
              glowColor={club.glowColor}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
