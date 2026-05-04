import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS } from "../data/events.js";

const CATEGORIES = [
  { id:"all", label:"All Events", icon:"✦", color:"#C167FF" },
  { id:"tech-ai", label:"Tech & AI", icon:"⚡", color:"#C167FF" },
  { id:"gaming", label:"Gaming", icon:"🎮", color:"#FF66FF" },
  { id:"robotics-iot", label:"Robotics & IoT", icon:"🤖", color:"#15E6D8" },
  { id:"cultural", label:"Cultural", icon:"🎭", color:"#FF4655" },
  { id:"media", label:"Media", icon:"📸", color:"#9F8AFF" },
  { id:"sports", label:"Sports", icon:"🏆", color:"#DACAB2" },
  { id:"culinary", label:"Culinary", icon:"🍱", color:"#FF8C00" },
];

const cardVariants = {
  hidden: { opacity:0, y:20 },
  visible: { opacity:1, y:0, transition:{ duration:0.3, ease:"easeOut" } },
};

export default function EventPool() {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = EVENTS.filter(e => e.status !== "cancelled");
    if (active !== "all") list = list.filter(e => e.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e => e.name.toLowerCase().includes(q) || e.tagline.toLowerCase().includes(q));
    }
    return list;
  }, [active, search]);

  const activeColor = CATEGORIES.find(c => c.id === active)?.color || "#C167FF";

  return (
    <section id="events" style={{ padding:"5rem 2rem", background:"var(--color-bg-base)" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", letterSpacing:"0.25em", color:"var(--color-primary)", marginBottom:"0.75rem" }}>EXPLORE</p>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem, 5vw, 3.5rem)", fontWeight:700, color:"#fff", letterSpacing:"0.05em" }}>EVENT POOL</h2>
          <div style={{ width:"60px", height:"2px", background:"var(--gradient-cta-primary)", margin:"1rem auto 1.5rem" }} />
          {/* Search */}
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..."
            style={{ fontFamily:"var(--font-body)", fontSize:"0.9rem", background:"var(--color-bg-surface)", border:"1px solid var(--color-border-subtle)", borderRadius:"0.5rem", padding:"0.6em 1.2em", color:"#fff", width:"100%", maxWidth:"360px", outline:"none", transition:"border 0.2s" }}
            onFocus={e => e.target.style.borderColor="var(--color-border-active)"}
            onBlur={e => e.target.style.borderColor="var(--color-border-subtle)"} />
        </motion.div>

        {/* Category chips */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem", justifyContent:"center", marginBottom:"2.5rem" }}>
          {CATEGORIES.map(cat => (
            <motion.button key={cat.id} whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} onClick={() => setActive(cat.id)}
              style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", padding:"0.4em 1.1em", borderRadius:"9999px", border:`1px solid ${active===cat.id ? cat.color : "rgba(255,255,255,0.1)"}`, background: active===cat.id ? `${cat.color}22` : "transparent", color: active===cat.id ? cat.color : "var(--color-text-secondary)", boxShadow: active===cat.id ? `0 0 16px ${cat.color}44` : "none", cursor:"pointer", transition:"all 0.2s", display:"flex", alignItems:"center", gap:"0.4em" }}>
              <span>{cat.icon}</span><span>{cat.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial="hidden" animate="visible"
            variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.05 } } }}
            style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1.25rem" }}>
            {filtered.map(event => (
              <motion.div key={event.id} variants={cardVariants}
                style={{ background:"var(--color-bg-surface)", border:"1px solid var(--color-border-subtle)", borderRadius:"0.75rem", overflow:"hidden", transition:"all 0.3s ease" }}
                whileHover={{ y:-4 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=activeColor+"66"; e.currentTarget.style.boxShadow=`0 8px 40px ${activeColor}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--color-border-subtle)"; e.currentTarget.style.boxShadow="none"; }}>
                {/* Poster placeholder */}
                <div style={{ height:"160px", background:`linear-gradient(135deg, ${activeColor}11 0%, #12122A 100%)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <span style={{ fontSize:"3rem" }}>{CATEGORIES.find(c=>c.id===event.category)?.icon || "✦"}</span>
                  <span style={{ position:"absolute", top:"0.75rem", left:"0.75rem", fontFamily:"var(--font-mono)", fontSize:"0.6rem", padding:"0.25em 0.7em", borderRadius:"9999px", background:`${activeColor}33`, color:activeColor, border:`1px solid ${activeColor}55`, backdropFilter:"blur(4px)" }}>
                    {CATEGORIES.find(c=>c.id===event.category)?.label}
                  </span>
                </div>
                <div style={{ padding:"1.25rem" }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.1rem", color:"#fff", marginBottom:"0.3rem" }}>{event.name}</h3>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"0.78rem", fontStyle:"italic", color:"var(--color-text-muted)", marginBottom:"1rem" }}>{event.tagline}</p>
                  <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginBottom:"1rem" }}>
                    {[["📍", event.venue], ["⏱", event.duration], ["👥", event.format]].map(([icon, val]) => val && (
                      <span key={icon} style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--color-text-secondary)" }}>{icon} {val}</span>
                    ))}
                  </div>
                  <a href={`/events/${event.id}`} style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"0.8rem", color:activeColor, textDecoration:"none", letterSpacing:"0.05em" }}
                    onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
                    onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                    View Details →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"4rem", color:"var(--color-text-muted)", fontFamily:"var(--font-mono)" }}>No events found.</div>
        )}
      </div>
    </section>
  );
}
