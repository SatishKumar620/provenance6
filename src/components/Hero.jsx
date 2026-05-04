import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const VIDEO_SRC = "/hero-video.mp4";
const FALLBACK_BG = "/wp15625089-demon-slayer-kimetsu-no-yaiba-the-movie-infinity-castle-wallpapers.jpg";

export default function Hero() {
  const lettersRef = useRef([]);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    gsap.fromTo(letters, { opacity: 0, y: 60, skewX: -10 }, { opacity: 1, y: 0, skewX: 0, duration: 1.2, ease: "power4.out", stagger: 0.08, delay: 0.5 });
    gsap.fromTo(overlayRef.current, { opacity: 0.95 }, { opacity: 0.55, duration: 2, ease: "power2.inOut", delay: 0.3 });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try autoplay with sound first
    video.muted = false;
    video.play().then(() => {
      setVideoReady(true);
      setMuted(false);
    }).catch(() => {
      // Browser blocked sound — fallback to muted autoplay
      video.muted = true;
      video.play().then(() => {
        setVideoReady(true);
        setMuted(true);
      }).catch(() => {});
    });

    // Unlock sound on first user touch/click
    const unlock = () => {
      if (video.muted) {
        video.muted = false;
        setMuted(false);
      }
    };
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("click", unlock, { once: true });
    return () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  const title = "PROVENANCE";

  return (
    <section style={{ position:"relative", width:"100%", height:"100dvh", minHeight:"100vh", overflow:"hidden", background:"#000", display:"flex", alignItems:"center", justifyContent:"center" }}>

      {/* FALLBACK IMAGE — shows until video plays */}
      <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:`url(${FALLBACK_BG})`, backgroundSize:"cover", backgroundPosition:"center 30%", opacity: videoReady ? 0 : 1, transition:"opacity 1.5s ease", pointerEvents:"none" }} />

      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        loop
        playsInline
        autoPlay
        preload="auto"
        style={{
          position:"absolute", zIndex:1,
          // Responsive cover — fills screen on both portrait & landscape
          top:"50%", left:"50%",
          transform:"translate(-50%, -50%)",
          minWidth:"100%", minHeight:"100%",
          width:"auto", height:"auto",
          // On portrait mobile, video is landscape so we scale it up
          objectFit:"cover",
          opacity: videoReady ? 1 : 0,
          transition:"opacity 1.5s ease",
          pointerEvents:"none",
        }}
      />

      {/* Black bars fill — covers letterbox gaps with matching dark color */}
      <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none", background:"#000", mixBlendMode:"multiply" }} />

      {/* OVERLAY */}
      <div ref={overlayRef} style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none", background:"linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(8,0,0,0.35) 50%, rgba(0,0,0,0.85) 100%)" }} />

      {/* GRAIN */}
      <div style={{ position:"absolute", inset:0, zIndex:4, pointerEvents:"none", opacity:0.05, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"150px" }} />

      {/* CONTENT */}
      <div style={{ position:"relative", zIndex:5, textAlign:"center", padding:"0 1.5rem", width:"100%" }}>
        <h1 style={{ fontFamily:"'Cinzel Decorative', serif", fontSize:"clamp(1rem, 7.5vw, 8rem)", fontWeight:900, letterSpacing:"0.12em", color:"#fff", margin:0, lineHeight:1, whiteSpace:"nowrap", display:"flex", justifyContent:"center", textShadow:"0 0 60px rgba(204,0,0,0.5), 0 2px 8px rgba(0,0,0,0.9)" }}>
          {title.split("").map((char, i) => (
            <span key={i} ref={(el) => (lettersRef.current[i] = el)} style={{ display:"inline-block", opacity:0 }}>{char}</span>
          ))}
        </h1>

        <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:1.6, duration:0.8 }} style={{ fontFamily:"'Cinzel Decorative', serif", fontSize:"clamp(2rem, 7vw, 5rem)", color:"#D4AF37", letterSpacing:"0.35em", marginTop:"0.15em", textShadow:"0 0 30px rgba(212,175,55,0.8)" }}>
          6.0
        </motion.div>

        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:2, duration:0.8 }} style={{ fontFamily:"'Noto Serif JP', serif", fontSize:"clamp(0.55rem, 1.8vw, 0.95rem)", color:"rgba(255,255,255,0.65)", letterSpacing:"0.28em", marginTop:"1.2rem", textTransform:"uppercase", whiteSpace:"nowrap" }}>
          無限の戦い — The Infinite Battle
        </motion.p>

        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:2.2, duration:1 }} style={{ height:"1px", background:"linear-gradient(to right, transparent, #CC0000, #D4AF37, #CC0000, transparent)", margin:"1.2rem auto 0", width:"min(560px, 78vw)", transformOrigin:"center" }} />

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:2.5, duration:0.7 }} style={{ marginTop:"2rem", display:"flex", gap:"0.85rem", justifyContent:"center", alignItems:"center" }}>
          <a href="#events" style={{ display:"inline-block", fontFamily:"'Cinzel Decorative', serif", fontSize:"clamp(0.55rem, 1.5vw, 0.8rem)", letterSpacing:"0.22em", color:"#D4AF37", border:"1px solid #D4AF37", padding:"0.8em 2.2em", textDecoration:"none", textTransform:"uppercase", background:"rgba(0,0,0,0.35)", backdropFilter:"blur(6px)", transition:"all 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="#D4AF37"; e.currentTarget.style.color="#000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="rgba(0,0,0,0.35)"; e.currentTarget.style.color="#D4AF37"; }}>
            Explore Events
          </a>

          <button onClick={toggleMute} title={muted ? "Unmute" : "Mute"} style={{ background:"rgba(0,0,0,0.45)", border:"1px solid rgba(212,175,55,0.6)", borderRadius:"50%", width:"42px", height:"42px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)", flexShrink:0 }}>
            {muted ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            )}
          </button>
        </motion.div>
      </div>

      {/* SCROLL */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:3, duration:1 }} style={{ position:"absolute", bottom:"1.8rem", left:"50%", transform:"translateX(-50%)", zIndex:5, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.35rem" }}>
        <span style={{ fontFamily:"'Noto Serif JP', serif", fontSize:"0.6rem", letterSpacing:"0.3em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase" }}>Scroll</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }} style={{ width:"1px", height:"36px", background:"linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)" }} />
      </motion.div>

    </section>
  );
}
