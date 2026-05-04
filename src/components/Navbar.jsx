import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Events', href: '#events' },
  { label: 'Clubs', href: '#clubs' },
  { label: 'Glimpses', href: '#glimpses' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 40px' : '20px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(2, 4, 8, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', cursor: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px',
              border: '2px solid var(--gold)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(139,0,0,0.8), rgba(204,0,0,0.4))',
            }}>
              <span style={{ fontSize: '14px' }}>⚡</span>
            </div>
            <div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '0.15em',
                lineHeight: 1,
              }}>PROVENANCE</div>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '10px',
                color: 'var(--blood-red)',
                letterSpacing: '0.3em',
                lineHeight: 1.2,
              }}>6.0</div>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
          className="desktop-nav">
          {navLinks.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ color: 'var(--gold)' }}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '12px',
                letterSpacing: '0.2em',
                color: activeLink === href ? 'var(--gold)' : 'var(--text-secondary)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              onClick={() => setActiveLink(href)}
            >
              {label}
              {activeLink === href && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute', bottom: '-4px', left: 0, right: 0,
                    height: '1px', background: 'var(--gold)',
                  }} />
              )}
            </motion.a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'none', flexDirection: 'column', gap: '5px', padding: '8px',
          }}
          className="hamburger"
        >
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{
              rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
              y: menuOpen && i === 0 ? 9 : menuOpen && i === 2 ? -9 : 0,
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} style={{
              width: '24px', height: '1px', background: 'var(--gold)',
            }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px',
              background: 'rgba(2,4,8,0.97)',
              borderLeft: '1px solid var(--border-gold)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center', gap: '32px',
            }}
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '18px',
                  letterSpacing: '0.3em',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  cursor: 'none',
                }}
              >{label}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          nav { padding: 16px 20px !important; }
        }
      `}</style>
    </>
  );
}
