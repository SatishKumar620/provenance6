import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const YOUTUBE_VIDEO_ID = "nAe82r8C9_4";

export default function Hero() {
  const lettersRef = useRef([]);
  const overlayRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    gsap.fromTo(
      letters,
      { opacity: 0, y: 60, skewX: -10 },
      {
        opacity: 1,
        y: 0,
        skewX: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.5,
      }
    );
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0.95 },
      { opacity: 0.55, duration: 2, ease: "power2.inOut", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    if (window.YT && window.YT.Player) { initPlayer(); return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(tag, firstScript);
    window.onYouTubeIframeAPIReady = initPlayer;
    return () => { window.onYouTubeIframeAPIReady = null; };
  }, []);

  function initPlayer() {
    if (!playerContainerRef.current) return;
    new window.YT.Player(playerContainerRef.current, {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1, mute: 1, loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0, showinfo: 0, rel: 0,
        modestbranding: 1, playsinline: 1,
        disablekb: 1, fs: 0, iv_load_policy: 3,
      },
      events: {
        onReady: (e) => { e.target.playVideo(); setVideoReady(true); },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.ENDED) e.target.playVideo();
        },
      },
    });
  }

  const title = "PROVENANCE";

  return (
    <section style={{ position:"relative", width:"100%", height:"100dvh", minHeight:"100vh", overflow:"hidden", background:"#000", display:"flex", alignItems:"center", justifyContent:"center" }}>

      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"max(100vw, 177.78vh)", height:"max(100vh, 56.25vw)" }}>
          <div ref={playerContainerRef} style={{ width:"100%", height:"100%" }} />
        </div>
        <div style={{ position:"absolute", inset:0, background:"#000", opacity: videoReady ? 0 : 1, transition:"opacity 1.5s ease", pointerEvents:"none" }} />
      </div>

      <div ref={overlayRef} style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(10,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%)", pointerEvents:"none" }} />

      <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none", opacity:0.06, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px 128px" }} />

      <div style={{ position:"relative", zIndex:3, textAlign:"center", padding:"0 1rem", width:"100%" }}>
        <h1 style={{ fontFamily:"'Cinzel Decorative', serif", fontSize:"clamp(2.2rem, 10vw, 8rem)", fontWeight:900, letterSpacing:"0.2em", color:"#fff", margin:0, lineHeight:1, display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"0.02em", textShadow:"0 0 40px rgba(204,0,0,0.6), 0 2px 8px rgba(0,0,0,0.9)" }}>
          {title.split("").map((char, i) => (
            <span key={i} ref={(el) => (lettersRef.current[i] = el)} style={{ display:"inline-block", opacity:0 }}>{char}</span>
          ))}
        </h1>

        <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:1.6, duration:0.8, ease:"easeOut" }} style={{ fontFamily:"'Cinzel Decorative', serif", fontSize:"clamp(1.8rem, 6vw, 5rem)", color:"#D4AF37", letterSpacing:"0.4em", marginTop:"0.1em", textShadow:"0 0 30px rgba(212,175,55,0.7)" }}>
          6.0
        </motion.div>

        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:2, duration:0.8 }} style={{ fontFamily:"'Noto Serif JP', serif", fontSize:"clamp(0.75rem, 2.5vw, 1.1rem)", color:"rgba(255,255,255,0.7)", letterSpacing:"0.3em", marginTop:"1.5rem", textTransform:"uppercase" }}>
          無限の戦い — The Infinite Battle
        </motion.p>

        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:2.2, duration:1, ease:"easeInOut" }} style={{ height:"2px", background:"linear-gradient(to right, transparent, #CC0000, #D4AF37, #CC0000, transparent)", margin:"1.5rem auto 0", width:"min(600px, 80vw)", transformOrigin:"center" }} />

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:2.5, duration:0.7 }} style={{ marginTop:"2.5rem" }}>
          <a href="#events" style={{ display:"inline-block", fontFamily:"'Cinzel Decorative', serif", fontSize:"clamp(0.7rem, 1.8vw, 0.9rem)", letterSpacing:"0.25em", color:"#D4AF37", border:"1px solid #D4AF37", padding:"0.75em 2.5em", textDecoration:"none", textTransform:"uppercase", background:"rgba(0,0,0,0.3)", backdropFilter:"blur(4px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="#D4AF37"; e.currentTarget.style.color="#000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="rgba(0,0,0,0.3)"; e.currentTarget.style.color="#D4AF37"; }}>
            Explore Events
          </a>
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:3, duration:1 }} style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", zIndex:3, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem" }}>
        <span style={{ fontFamily:"'Noto Serif JP', serif", fontSize:"0.65rem", letterSpacing:"0.3em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase" }}>Scroll</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.5, ease:"easeInOut" }} style={{ width:"1px", height:"40px", background:"linear-gradient(to bottom, rgba(212,175,55,0.8), transparent)" }} />
      </motion.div>

    </section>
  );
}
