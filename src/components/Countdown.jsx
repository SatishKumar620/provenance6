import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function getTimeLeft() {
  const eventDate = new Date('2026-05-14T09:00:00');
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TimeBlock = ({ value, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    style={{
      textAlign: 'center',
      padding: 'clamp(16px, 3vw, 28px) clamp(20px, 4vw, 40px)',
      background: 'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(5,12,26,0.95))',
      border: '1px solid var(--border-gold)',
      position: 'relative',
      overflow: 'hidden',
      clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
      minWidth: 'clamp(80px, 14vw, 140px)',
    }}
  >
    {/* Animated border glow */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at top, rgba(212,175,55,0.08), transparent 70%)',
    }} />

    <motion.div
      key={value}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'backOut' }}
      style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: 'clamp(32px, 6vw, 64px)',
        fontWeight: 900,
        color: 'var(--gold)',
        textShadow: '0 0 30px rgba(212,175,55,0.5)',
        lineHeight: 1,
        position: 'relative', zIndex: 1,
      }}
    >
      {String(value).padStart(2, '0')}
    </motion.div>

    <div style={{
      fontFamily: "'Noto Serif JP', serif",
      fontSize: 'clamp(10px, 1.2vw, 12px)',
      letterSpacing: '0.4em',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      marginTop: '8px',
      position: 'relative', zIndex: 1,
    }}>{label}</div>
  </motion.div>
);

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 80px)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,0,0,0.08) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: '12px', letterSpacing: '0.5em',
            color: 'var(--blood-red)', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>⚔ The Battle Begins In ⚔</p>
          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(24px, 4vw, 44px)',
            fontWeight: 900, color: 'var(--text-primary)',
            marginBottom: '48px',
            textShadow: '0 0 40px rgba(212,175,55,0.3)',
          }}>
            <span className="shimmer-text">COUNTDOWN TO PROVENANCE 6.0</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex', gap: 'clamp(8px, 2vw, 20px)',
            justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center',
          }}
        >
          <TimeBlock value={time.days} label="Days" />
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 4vw, 48px)',
            color: 'var(--blood-red)', textShadow: '0 0 20px rgba(204,0,0,0.6)',
            alignSelf: 'flex-start', paddingTop: '4px',
          }}>:</span>
          <TimeBlock value={time.hours} label="Hours" />
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 4vw, 48px)',
            color: 'var(--blood-red)', textShadow: '0 0 20px rgba(204,0,0,0.6)',
            alignSelf: 'flex-start', paddingTop: '4px',
          }}>:</span>
          <TimeBlock value={time.minutes} label="Minutes" />
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 'clamp(24px, 4vw, 48px)',
            color: 'var(--blood-red)', textShadow: '0 0 20px rgba(204,0,0,0.6)',
            alignSelf: 'flex-start', paddingTop: '4px',
          }}>:</span>
          <TimeBlock value={time.seconds} label="Seconds" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: "'Cinzel', serif", fontSize: '14px',
            letterSpacing: '0.2em', color: 'var(--text-secondary)',
            marginTop: '40px',
          }}
        >
          MAY 14 & 15, 2026 · RVSCET · COIMBATORE
        </motion.p>
      </div>
    </section>
  );
}
