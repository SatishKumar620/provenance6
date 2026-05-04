import { motion } from "framer-motion";

const LINKS = [
  { label:"Events", href:"#events" }, { label:"Gallery", href:"#gallery" },
  { label:"Register", href:"/register" }, { label:"Brochure", href:"/brochure" },
  { label:"Schedule", href:"/schedule" }, { label:"Contact", href:"#contact" },
];

export default function Footer() {
  return (
    <footer style={{ background:"var(--color-bg-surface)", borderTop:"1px solid var(--color-border-subtle)", padding:"3rem 2rem 2rem" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"2rem", marginBottom:"2.5rem" }}>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.4rem", color:"#fff", marginBottom:"0.5rem" }}>
              <span style={{ color:"var(--color-primary)" }}>P</span>ROVENANCE
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.8rem", color:"var(--color-accent)", marginLeft:"0.3em" }}>6.0</span>
            </div>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", letterSpacing:"0.15em", color:"var(--color-text-muted)", marginBottom:"0.5rem" }}>INFINITE REALMS: THE ANIME PROTOCOL</p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--color-text-secondary)", lineHeight:1.6 }}>
              RVSCET's flagship inter-college techno-cultural fest.<br/>May 14–15, 2026 · Jamshedpur
            </p>
          </div>
          <div>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", letterSpacing:"0.2em", color:"var(--color-primary)", marginBottom:"1rem" }}>QUICK LINKS</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {LINKS.map(l => (
                <a key={l.label} href={l.href} style={{ fontFamily:"var(--font-body)", fontSize:"0.85rem", color:"var(--color-text-secondary)", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color="var(--color-primary)"}
                  onMouseLeave={e => e.currentTarget.style.color="var(--color-text-secondary)"}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", letterSpacing:"0.2em", color:"var(--color-primary)", marginBottom:"1rem" }}>CONTACT</p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"0.85rem", color:"var(--color-text-secondary)", lineHeight:1.8 }}>
              Helix v2.0 — RVSCET<br/>
              Jamshedpur, Jharkhand<br/>
              <a href="mailto:helix@rvscet.ac.in" style={{ color:"var(--color-primary)", textDecoration:"none" }}>helix@rvscet.ac.in</a>
            </p>
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--color-border-subtle)", paddingTop:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-text-muted)", letterSpacing:"0.1em" }}>
            © 2026 PROVENANCE 6.0 · HELIX V2.0 · RVSCET. ALL RIGHTS RESERVED.
          </p>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-text-muted)" }}>
            Built by Web Team · Priyanshu Ghosh
          </p>
        </div>
      </div>
    </footer>
  );
}
