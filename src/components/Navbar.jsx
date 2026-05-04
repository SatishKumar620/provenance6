import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINKS = ["Home","Events","Gallery","Committee","Sponsor","Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navStyle = {
    position:"fixed", top:0, left:0, right:0, zIndex:100,
    padding:"0 2rem",
    height:"64px",
    display:"flex", alignItems:"center", justifyContent:"space-between",
    background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(193,103,255,0.12)" : "none",
    transition:"all 0.3s ease",
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <a href="/" style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.3rem", color:"#fff", textDecoration:"none", letterSpacing:"0.08em" }}>
        <span style={{ color:"var(--color-primary)" }}>P</span>ROVENANCE
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.8rem", color:"var(--color-accent)", marginLeft:"0.3em" }}>6.0</span>
      </a>

      {/* Desktop links */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.25rem" }} className="desktop-nav">
        {LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontFamily:"var(--font-body)", fontSize:"0.875rem", color:"var(--color-text-secondary)", textDecoration:"none", padding:"0.4em 0.9em", borderRadius:"0.375rem", transition:"all 0.2s ease" }}
            onMouseEnter={e => { e.currentTarget.style.color="#fff"; e.currentTarget.style.background="rgba(193,103,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.color="var(--color-text-secondary)"; e.currentTarget.style.background="transparent"; }}>
            {l}
          </a>
        ))}
        <a href="/register" style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"0.9rem", letterSpacing:"0.06em", padding:"0.5em 1.4em", borderRadius:"0.375rem", background:"var(--gradient-cta-primary)", color:"#fff", textDecoration:"none", marginLeft:"0.75rem", boxShadow:"0 0 16px rgba(193,103,255,0.35)", transition:"all 0.3s ease" }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow="0 0 28px rgba(255,102,255,0.55)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow="0 0 16px rgba(193,103,255,0.35)"; }}>
          Register
        </a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} style={{ display:"none", background:"none", border:"none", cursor:"pointer", color:"#fff", fontSize:"1.5rem" }} className="mobile-menu-btn">
        {open ? "✕" : "☰"}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {/* Mobile dropdown */}
      {open && (
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
          style={{ position:"absolute", top:"64px", left:0, right:0, background:"rgba(5,5,5,0.97)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(193,103,255,0.15)", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ fontFamily:"var(--font-body)", fontSize:"1rem", color:"var(--color-text-secondary)", textDecoration:"none", padding:"0.6em 1em", borderRadius:"0.375rem" }}>
              {l}
            </a>
          ))}
          <a href="/register" onClick={() => setOpen(false)}
            style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"1rem", padding:"0.7em 1em", borderRadius:"0.375rem", background:"var(--gradient-cta-primary)", color:"#fff", textDecoration:"none", textAlign:"center", marginTop:"0.5rem" }}>
            Register
          </a>
        </motion.div>
      )}
    </nav>
  );
}
