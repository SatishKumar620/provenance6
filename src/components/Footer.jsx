import { motion } from 'framer-motion';
import { festInfo } from '../data/events';

export default function Footer() {
  return (
    <footer id="contact" style={{
      position: 'relative',
      borderTop: '1px solid var(--border-gold)',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, var(--void) 0%, rgba(5,12,26,0.95) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top CTA */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 60px)',
          borderBottom: '1px solid var(--border-gold)',
        }}>
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
              marginBottom: '20px',
            }}>⚔ Final Call ⚔</p>
            <h2 style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 'clamp(24px, 5vw, 52px)',
              fontWeight: 900, color: 'var(--text-primary)',
              marginBottom: '16px',
              textShadow: '0 0 40px rgba(212,175,55,0.3)',
            }}>
              <span className="shimmer-text">JOIN THE BATTLE</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: '15px',
              color: 'var(--text-secondary)',
              maxWidth: '480px', margin: '0 auto 36px',
              lineHeight: 1.8,
            }}>
              Your arc begins at {festInfo.venue} on {festInfo.date}. Will your name be written in the legend?
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 40px',
                  background: 'linear-gradient(135deg, var(--crimson), var(--blood-red))',
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '13px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', cursor: 'none',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          padding: 'clamp(40px, 6vw, 60px) clamp(20px, 5vw, 80px)',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: '20px', fontWeight: 900,
              color: 'var(--gold)', marginBottom: '8px',
            }}>PROVENANCE</div>
            <div style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '14px', color: 'var(--blood-red)',
              letterSpacing: '0.3em', marginBottom: '16px',
            }}>6.0</div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px', color: 'var(--text-secondary)',
              lineHeight: 1.7, maxWidth: '220px',
            }}>
              The annual techno-cultural extravaganza of RVSCET, Coimbatore.
            </p>
          </div>

          {/* Event info */}
          <div>
            <h4 style={{
              fontFamily: "'Cinzel', serif", fontSize: '13px',
              color: 'var(--gold)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>Event Details</h4>
            {[
              { icon: '📅', text: 'May 14 & 15, 2026' },
              { icon: '🏛', text: 'RVSCET Campus' },
              { icon: '📍', text: 'Coimbatore, Tamil Nadu' },
              { icon: '⏰', text: '9:00 AM onwards' },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                display: 'flex', gap: '10px', alignItems: 'center',
                marginBottom: '10px',
                fontFamily: "'Inter', sans-serif", fontSize: '13px',
                color: 'var(--text-secondary)',
              }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>

          {/* Contact / Clubs */}
          <div>
            <h4 style={{
              fontFamily: "'Cinzel', serif", fontSize: '13px',
              color: 'var(--gold)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>The Guilds</h4>
            {['HELIX — Tech & AI', 'TARANGANI — Cultural', 'XPECTRA — Media', 'RVS PANTHERS — Sports', 'CIRCUITORN — IoT'].map(g => (
              <div key={g} style={{
                fontFamily: "'Inter', sans-serif", fontSize: '13px',
                color: 'var(--text-secondary)', marginBottom: '8px',
                paddingLeft: '12px', borderLeft: '1px solid var(--border-gold)',
              }}>{g}</div>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 style={{
              fontFamily: "'Cinzel', serif", fontSize: '13px',
              color: 'var(--gold)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>Follow the Arc</h4>
            {[
              { name: 'Instagram', icon: '📸', href: '#' },
              { name: 'LinkedIn', icon: '💼', href: '#' },
              { name: 'YouTube', icon: '🎬', href: '#' },
            ].map(s => (
              <motion.a
                key={s.name}
                href={s.href}
                whileHover={{ x: 4, color: 'var(--gold)' }}
                style={{
                  display: 'flex', gap: '10px', alignItems: 'center',
                  marginBottom: '10px', textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif", fontSize: '13px',
                  color: 'var(--text-secondary)', cursor: 'none',
                  transition: 'color 0.3s ease',
                }}
              >
                <span>{s.icon}</span><span>{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-gold)',
          padding: '20px clamp(20px, 5vw, 80px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{
            fontFamily: "'Noto Serif JP', serif", fontSize: '11px',
            color: 'var(--text-secondary)', letterSpacing: '0.15em',
          }}>
            © 2026 Provenance 6.0 · RVSCET · All rights reserved
          </p>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: '11px',
            color: 'var(--blood-red)', letterSpacing: '0.3em',
          }}>
            ⚔ MAY THE LEGEND CONTINUE ⚔
          </p>
        </div>
      </div>
    </footer>
  );
}
