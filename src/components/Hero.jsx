import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FEST_DATE = new Date("2026-05-14T09:00:00+05:30");

function useCountdown() {
  const [t, setT] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = FEST_DATE - Date.now();
      if (diff <= 0) return setT({ d:0, h:0, m:0, s:0 });
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const pad = (n) => String(n).padStart(2, "0");

export default function Hero() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const { d, h, m, s } = useCountdown();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => { setVideoReady(true); setMuted(true); }).catch(() => {});
    const unlock = () => { if (video.muted) { video.muted = false; setMuted(false); } };
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("click", unlock, { once: true });
    return () => { window.removeEventListener("touchstart", unlock); window.removeEventListener("click", unlock); };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
  };

  return (
    <section style={{ position:"relative", width:"100%", height:"100dvh", minHeight:"100vh", overflow:"hidden", background:"#050505", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>

      {/* Fallback bg */}
      <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:"url(/castle.jpg)", backgroundSize:"cover", backgroundPosition:"center", opacity: videoReady ? 0 : 1, transition:"opacity 1.5s ease" }} />

      {/* Video */}
      <video ref={videoRef} src="/hero-video.mp4" loop playsInline preload="auto"
        style={{ position:"absolute", inset:0, zIndex:1, width:"100%", height:"100%", objectFit:"cover", opacity: videoReady ? 1 : 0, transition:"opacity 1.5s ease", pointerEvents:"none" }} />

      {/* Purple gradient overlay */}
      <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(135deg, rgba(5,5,5,0.85) 0%, rgba(26,10,46,0.7) 50%, rgba(5,5,5,0.9) 100%)", pointerEvents:"none" }} />

      {/* Bottom fade */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%", zIndex:3, background:"linear-gradient(to top, #050505, transparent)", pointerEvents:"none" }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:4, textAlign:"center", padding:"0 1.5rem", width:"100%", maxWidth:"900px" }}>

        {/* Badge */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}
          style={{ display:"inline-block", fontFamily:"var(--font-mono)", fontSize:"0.7rem", letterSpacing:"0.2em", color:"var(--color-primary)", border:"1px solid var(--color-border-active)", padding:"0.35em 1.2em", borderRadius:"9999px", marginBottom:"1.5rem", background:"rgba(193,103,255,0.08)", backdropFilter:"blur(8px)" }}>
          PROVENANCE 6.0 &nbsp;·&nbsp; MAY 14–15 &nbsp;·&nbsp; RVSCET
        </motion.div>

        {/* Main title */}
        <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.8 }}
          style={{ fontFamily:"var(--font-display)", fontSize:"clamp(3rem, 10vw, 8rem)", fontWeight:700, lineHeight:1, color:"#fff", letterSpacing:"0.05em", textShadow:"0 0 60px rgba(193,103,255,0.5), 0 0 120px rgba(255,102,255,0.2)", marginBottom:"0.4rem" }}>
          INFINITE REALMS
        </motion.h1>

        <motion.h2 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6, duration:0.7 }}
          style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1rem, 3vw, 2rem)", fontWeight:500, color:"var(--color-secondary)", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:"1rem" }}>
          The Anime Protocol
        </motion.h2>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8, duration:0.7 }}
          style={{ fontFamily:"var(--font-body)", fontSize:"clamp(0.85rem, 1.5vw, 1rem)", color:"var(--color-text-secondary)", marginBottom:"0.6rem" }}>
          A multi-club inter-college fest powered by Helix v2.0
        </motion.p>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9, duration:0.7 }}
          style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", color:"var(--color-text-muted)", letterSpacing:"0.15em", marginBottom:"2.5rem" }}>
          5 Clubs &nbsp;·&nbsp; 30+ Events &nbsp;·&nbsp; RVSCET, Jamshedpur
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1, duration:0.6 }}
          style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"3rem" }}>
          <a href="/register" style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"1rem", letterSpacing:"0.08em", padding:"0.75em 2.2em", borderRadius:"0.375rem", background:"var(--gradient-cta-primary)", color:"#fff", textDecoration:"none", boxShadow:"0 0 24px rgba(193,103,255,0.4)", transition:"all 0.3s ease", display:"flex", alignItems:"center", gap:"0.5em" }}
            onMouseEnter={e => { e.currentTarget.style.background="var(--gradient-cta-hover)"; e.currentTarget.style.boxShadow="0 0 36px rgba(255,102,255,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="var(--gradient-cta-primary)"; e.currentTarget.style.boxShadow="0 0 24px rgba(193,103,255,0.4)"; }}>
            ⚡ Register Now
          </a>
          <a href="/brochure" style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"1rem", letterSpacing:"0.08em", padding:"0.75em 2.2em", borderRadius:"0.375rem", background:"transparent", color:"var(--color-primary)", border:"1px solid var(--color-border-active)", textDecoration:"none", transition:"all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(193,103,255,0.1)"; e.currentTarget.style.boxShadow="0 0 20px rgba(193,103,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.boxShadow="none"; }}>
            ↓ Download Brochure
          </a>
        </motion.div>

        {/* Countdown */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:0.8 }}
          style={{ display:"flex", gap:"clamp(1rem, 4vw, 2.5rem)", justifyContent:"center" }}>
          {[["DAYS", pad(d)], ["HRS", pad(h)], ["MINS", pad(m)], ["SECS", pad(s)]].map(([label, val]) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(1.8rem, 5vw, 3rem)", fontWeight:500, color:"#fff", lineHeight:1, textShadow:"0 0 20px rgba(193,103,255,0.6)" }}>{val}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", letterSpacing:"0.2em", color:"var(--color-text-muted)", marginTop:"0.3rem" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mute button */}
      <button onClick={toggleMute} style={{ position:"absolute", bottom:"2rem", right:"1.5rem", zIndex:5, background:"rgba(13,13,26,0.6)", border:"1px solid rgba(193,103,255,0.4)", borderRadius:"50%", width:"40px", height:"40px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}>
        {muted
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C167FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C167FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        }
      </button>

      {/* Scroll indicator */}
      <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.6 }}
        style={{ position:"absolute", bottom:"1.8rem", left:"50%", transform:"translateX(-50%)", zIndex:5, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.3rem" }}>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.55rem", letterSpacing:"0.3em", color:"var(--color-text-muted)" }}>SCROLL</span>
        <div style={{ width:"1px", height:"32px", background:"linear-gradient(to bottom, var(--color-primary), transparent)" }} />
      </motion.div>

    </section>
  );
}
