import { motion } from "framer-motion";

const CLUBS = [
  { id:"helix", name:"Helix v2.0", tagline:"Code. Create. Conquer.", description:"The premier technical society of RVSCET, driving innovation across AI, development, design, and competitive programming.", mission:"To build a culture of technical excellence and creative problem-solving.", accentColor:"#C167FF", eventCount:8, icon:"⚡" },
  { id:"tarangini", name:"Tarangini", tagline:"Art is the language of the soul.", description:"The cultural and performing arts committee of RVSCET, breathing life through dance, music, fashion, and traditional art forms.", mission:"To celebrate India's rich cultural heritage while providing a stage for every creative voice.", accentColor:"#FF66FF", eventCount:7, icon:"🎭" },
  { id:"circuitron", name:"Circuitron", tagline:"Build. Automate. Dominate.", description:"The robotics and electronics division of RVSCET, hosting hands-on engineering challenges in hardware design and automation.", mission:"To inspire a generation of hardware engineers and robotics innovators.", accentColor:"#15E6D8", eventCount:5, icon:"🤖" },
  { id:"xpectra", name:"Xpectra", tagline:"Capture. Create. Captivate.", description:"The media and visual storytelling club running competitions in photography, short-form video, AI filmmaking, and culinary arts.", mission:"To empower visual storytellers who communicate ideas with impact.", accentColor:"#9F8AFF", eventCount:4, icon:"📸" },
  { id:"panthers", name:"RVS Panthers", tagline:"Sweat. Compete. Elevate.", description:"The sports committee organizing the athletic backbone of Provenance 6.0 — from cricket and basketball to arm wrestling.", mission:"To cultivate physical excellence and sporting spirit on campus.", accentColor:"#FF4655", eventCount:6, icon:"🏆" },
];

export default function ClubsGrid() {
  return (
    <section id="clubs" style={{ padding:"5rem 2rem", background:"var(--color-bg-base)" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ textAlign:"center", marginBottom:"3rem" }}>
          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", letterSpacing:"0.25em", color:"var(--color-primary)", marginBottom:"0.75rem" }}>POWERED BY</p>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem, 5vw, 3.5rem)", fontWeight:700, color:"#fff", letterSpacing:"0.05em" }}>THE 5 CLUBS</h2>
          <div style={{ width:"60px", height:"2px", background:"var(--gradient-cta-primary)", margin:"1rem auto 0" }} />
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"1.25rem" }}>
          {CLUBS.map((club, i) => (
            <motion.div key={club.id} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.1, duration:0.5 }}
              style={{ background:"var(--color-bg-surface)", border:"1px solid var(--color-border-subtle)", borderRadius:"0.75rem", padding:"1.5rem", cursor:"default", transition:"all 0.3s ease" }}
              whileHover={{ scale:1.02 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=club.accentColor+"99"; e.currentTarget.style.boxShadow=`0 8px 40px ${club.accentColor}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--color-border-subtle)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ fontSize:"2rem", marginBottom:"0.75rem" }}>{club.icon}</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.25rem" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.15rem", color:"#fff" }}>{club.name}</h3>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", padding:"0.2em 0.6em", borderRadius:"9999px", background:`${club.accentColor}22`, color:club.accentColor, border:`1px solid ${club.accentColor}44` }}>{club.eventCount} events</span>
              </div>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"0.8rem", fontStyle:"italic", color:"var(--color-text-muted)", marginBottom:"0.85rem" }}>{club.tagline}</p>
              <div style={{ borderTop:"1px solid var(--color-border-subtle)", paddingTop:"0.85rem", marginBottom:"0.85rem" }}>
                <p style={{ fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--color-text-secondary)", lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{club.description}</p>
              </div>
              <a href={`#events`} style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:"0.8rem", color:club.accentColor, textDecoration:"none", letterSpacing:"0.05em", transition:"opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
                onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                View Events →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
