import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN SYSTEM — Luxury Atelier Aesthetic
// Rose gold × Ivory × Deep Charcoal × Blush
// Fonts: Playfair Display (headings) + Cormorant Garamond (body)
// ============================================================

const COLORS = {
  roseGold: "#C8956C",
  roseGoldLight: "#E8B99A",
  roseGoldDark: "#A0714F",
  ivory: "#FAF7F2",
  ivoryDark: "#F0EAE0",
  blush: "#F5E6E0",
  blushDeep: "#E8C5B8",
  charcoal: "#2C2420",
  charcoalMid: "#4A3F3A",
  charcoalLight: "#6B5E58",
  cream: "#FDF9F5",
  gold: "#D4A853",
  white: "#FFFFFF",
};

const GOOGLE_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600&display=swap');
`;

// ============================================================
// GLOBAL STYLES
// ============================================================
const globalStyles = `
  ${GOOGLE_FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Cormorant Garamond', serif;
    background: ${COLORS.ivory};
    color: ${COLORS.charcoal};
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.ivoryDark}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.roseGold}; border-radius: 3px; }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 500;
    color: ${COLORS.charcoal};
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .section-subtitle {
    font-family: 'Raleway', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${COLORS.roseGold};
  }
  .ornament {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: ${COLORS.roseGold};
    font-size: 0.9rem;
  }
  .ornament::before, .ornament::after {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: ${COLORS.roseGold};
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.4); opacity: 0; }
  }
  .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
  .animate-fadeIn { animation: fadeIn 0.5s ease forwards; }
  .float-anim { animation: float 4s ease-in-out infinite; }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${COLORS.roseGold};
    color: white;
    font-family: 'Raleway', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 14px 32px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  .btn-primary:hover::before { left: 100%; }
  .btn-primary:hover { background: ${COLORS.roseGoldDark}; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,149,108,0.35); }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: ${COLORS.charcoal};
    font-family: 'Raleway', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 13px 31px;
    border: 1.5px solid ${COLORS.charcoal};
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-outline:hover { background: ${COLORS.charcoal}; color: white; }

  .card {
    background: white;
    border: 1px solid ${COLORS.ivoryDark};
    transition: all 0.3s ease;
  }
  .card:hover { box-shadow: 0 16px 48px rgba(44,36,32,0.1); transform: translateY(-3px); }

  input, select, textarea {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    background: white;
    border: 1px solid ${COLORS.ivoryDark};
    padding: 12px 16px;
    color: ${COLORS.charcoal};
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: ${COLORS.roseGold}; }
  label {
    font-family: 'Raleway', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${COLORS.charcoalLight};
    display: block;
    margin-bottom: 6px;
  }

  .tag {
    display: inline-block;
    background: ${COLORS.blush};
    color: ${COLORS.roseGoldDark};
    font-family: 'Raleway', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 12px;
  }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
  }
`;

// ============================================================
// ICONS (inline SVGs)
// ============================================================
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    scissors: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    whatsapp: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    package: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    ruler: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M21.3 8.7l-2 2-2-2 2-2 2 2zM15.3 14.7l-6 6H3v-6.3l6-6 6 6.3z"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    trending: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>,
  };
  return icons[name] || null;
};

// ============================================================
// NAVIGATION
// ============================================================
function Navbar({ activePage, setActivePage, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = {
    en: { home: "Home", services: "Services", portfolio: "Portfolio", about: "About", blog: "Blog", contact: "Contact", book: "Book Appointment" },
    te: { home: "హోమ్", services: "సేవలు", portfolio: "పోర్ట్‌ఫోలియో", about: "గురించి", blog: "బ్లాగ్", contact: "సంప్రదించండి", book: "అపాయింట్‌మెంట్" },
    hi: { home: "होम", services: "सेवाएं", portfolio: "पोर्टफोलियो", about: "हमारे बारे में", blog: "ब्लॉग", contact: "संपर्क", book: "अपॉइंटमेंट" },
  }[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "home", label: t.home },
    { id: "services", label: t.services },
    { id: "portfolio", label: t.portfolio },
    { id: "about", label: t.about },
    { id: "blog", label: t.blog },
    { id: "contact", label: t.contact },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(250,247,242,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.ivoryDark}` : "none",
      transition: "all 0.4s ease",
      padding: "0 32px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div onClick={() => setActivePage("home")} style={{ cursor: "pointer" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600, color: COLORS.charcoal, letterSpacing: "-0.01em", lineHeight: 1 }}>
            Tailoring <span style={{ color: COLORS.roseGold, fontStyle: "italic" }}>Studio</span>
          </div>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.charcoalLight, marginTop: 2 }}>Est. 2009 · Hyderabad</div>
        </div>

        {/* Desktop Nav */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => setActivePage(link.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: activePage === link.id ? COLORS.roseGold : COLORS.charcoal,
              borderBottom: activePage === link.id ? `1px solid ${COLORS.roseGold}` : "1px solid transparent",
              paddingBottom: 2, transition: "all 0.2s",
            }}>{link.label}</button>
          ))}
          {/* Language Toggle */}
          <div style={{ display: "flex", gap: 4, border: `1px solid ${COLORS.ivoryDark}`, padding: "4px 8px", background: "white" }}>
            {["en","te","hi"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? COLORS.roseGold : "transparent",
                color: lang === l ? "white" : COLORS.charcoalLight,
                border: "none", cursor: "pointer", padding: "2px 8px",
                fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s",
              }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.7rem" }} onClick={() => setActivePage("booking")}>
            {t.book}
          </button>
          <button onClick={() => setActivePage("dashboard")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.charcoal }}>
            <Icon name="user" size={18} />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}
          className="hide-desktop" id="mob-menu-btn">
          <Icon name={mobileOpen ? "x" : "menu"} size={22} color={COLORS.charcoal} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: COLORS.ivory, borderTop: `1px solid ${COLORS.ivoryDark}`, padding: "20px 32px 24px" }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => { setActivePage(link.id); setMobileOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: activePage === link.id ? COLORS.roseGold : COLORS.charcoal,
              padding: "10px 0", borderBottom: `1px solid ${COLORS.ivoryDark}`,
            }}>{link.label}</button>
          ))}
          <button className="btn-primary" style={{ marginTop: 16, width: "100%" }} onClick={() => { setActivePage("booking"); setMobileOpen(false); }}>
            {t.book}
          </button>
        </div>
      )}
    </nav>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection({ setActivePage }) {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "2,400+", label: "Happy Customers" },
    { value: "50+", label: "Design Styles" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.charcoal} 0%, #3d2f2a 50%, #5a3d35 100%)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
      {/* Decorative background patterns */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 80%, rgba(200,149,108,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,149,108,0.1) 0%, transparent 50%)` }} />
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, border: `1px solid rgba(200,149,108,0.2)`, borderRadius: "50%", transform: "rotate(45deg)" }} />
      <div style={{ position: "absolute", top: "15%", right: "8%", width: 200, height: 200, border: `1px solid rgba(200,149,108,0.15)`, borderRadius: "50%" }} />

      {/* Diagonal fabric texture overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`,
        backgroundSize: "20px 20px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 1 }}>
        {/* Left content */}
        <div style={{ animation: "fadeUp 0.8s ease forwards" }}>
          <div className="ornament" style={{ color: COLORS.roseGold, marginBottom: 24, fontSize: "0.75rem", fontFamily: "'Raleway', sans-serif", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Premium Tailoring · Since 2009
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 500, color: "white", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
            Crafting <span style={{ color: COLORS.roseGold, fontStyle: "italic" }}>Elegance</span>,<br/>
            Stitch by<br/>
            Perfect Stitch
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 36, maxWidth: 460 }}>
            Bespoke tailoring for the modern Indian woman. From bridal blouses to designer kurtis, every creation is a work of art tailored to your perfect measurements.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
            <button className="btn-primary" style={{ fontSize: "0.8rem" }} onClick={() => setActivePage("booking")}>
              Book Appointment <Icon name="arrow" size={16} />
            </button>
            <button className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => setActivePage("portfolio")}>
              View Portfolio
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ animation: `fadeUp 0.8s ease ${0.2 + i * 0.1}s both` }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 600, color: COLORS.roseGold }}>{s.value}</div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tailor photo placeholder + floating cards */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {/* Main portrait frame */}
          <div style={{ width: 380, height: 480, position: "relative" }}>
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(160deg, ${COLORS.blush} 0%, ${COLORS.blushDeep} 100%)`, position: "relative", overflow: "hidden" }}>
              {/* Stylized tailor silhouette */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 0 }}>
                <svg viewBox="0 0 280 400" style={{ width: "85%", opacity: 0.9 }}>
                  {/* Body */}
                  <ellipse cx="140" cy="100" rx="45" ry="55" fill={COLORS.roseGoldDark} opacity="0.8" />
                  <path d="M90 155 Q70 220 65 310 Q100 330 140 335 Q180 330 215 310 Q210 220 190 155 Q165 175 140 178 Q115 175 90 155Z" fill={COLORS.charcoal} />
                  {/* Dupatta / saree drape */}
                  <path d="M85 160 Q50 200 30 280 Q20 340 40 380 Q60 370 75 330 Q80 270 100 220Z" fill={COLORS.roseGold} opacity="0.7" />
                  <path d="M195 160 Q230 190 250 240 Q260 280 250 340 Q240 370 220 380" fill="none" stroke={COLORS.roseGoldLight} strokeWidth="3" opacity="0.6" />
                  {/* Hair */}
                  <path d="M100 70 Q90 30 140 20 Q190 30 180 70 Q165 50 140 48 Q115 50 100 70Z" fill={COLORS.charcoal} />
                  {/* Fabric/measuring tape in hand */}
                  <rect x="205" y="200" width="35" height="6" rx="3" fill={COLORS.gold} transform="rotate(-20, 205, 200)" />
                  <rect x="210" y="206" width="30" height="4" rx="2" fill={COLORS.roseGoldLight} transform="rotate(-20, 210, 206)" />
                  {/* Scissors */}
                  <circle cx="65" cy="240" r="5" fill="none" stroke={COLORS.gold} strokeWidth="2" />
                  <circle cx="72" cy="252" r="5" fill="none" stroke={COLORS.gold} strokeWidth="2" />
                  <line x1="68" y1="242" x2="90" y2="265" stroke={COLORS.gold} strokeWidth="2" />
                  <line x1="75" y1="249" x2="90" y2="265" stroke={COLORS.gold} strokeWidth="2" />
                </svg>
              </div>
              {/* Rose gold corner accents */}
              <div style={{ position: "absolute", top: 12, left: 12, width: 40, height: 40, borderTop: `2px solid ${COLORS.roseGold}`, borderLeft: `2px solid ${COLORS.roseGold}` }} />
              <div style={{ position: "absolute", bottom: 12, right: 12, width: 40, height: 40, borderBottom: `2px solid ${COLORS.roseGold}`, borderRight: `2px solid ${COLORS.roseGold}` }} />
            </div>
            {/* Offset frame */}
            <div style={{ position: "absolute", top: 16, left: 16, right: -16, bottom: -16, border: `1px solid rgba(200,149,108,0.4)`, zIndex: -1 }} />
          </div>

          {/* Floating badge — experience */}
          <div className="float-anim" style={{ position: "absolute", top: 20, left: -20, background: COLORS.roseGold, color: "white", padding: "16px 20px", boxShadow: "0 8px 32px rgba(200,149,108,0.4)" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>15+</div>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.9 }}>Years of<br/>Expertise</div>
          </div>

          {/* Floating badge — rating */}
          <div style={{ position: "absolute", bottom: 40, right: -30, background: "white", padding: "14px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={12} color={COLORS.gold} />)}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 600, color: COLORS.charcoal }}>5.0 Rating</div>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", color: COLORS.charcoalLight, letterSpacing: "0.05em" }}>2,400+ Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)" }}>
        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll to explore</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)", animation: "float 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ============================================================
// SERVICES SECTION
// ============================================================
function ServicesSection({ setActivePage }) {
  const services = [
    { icon: "✂️", title: "Blouse Stitching", desc: "Perfect fitting blouses crafted to your exact measurements with premium fabrics.", price: "From ₹350", tag: "Popular" },
    { icon: "🌸", title: "Designer Blouses", desc: "Hand-embroidered and designer blouses with mirror work, zari, and thread art.", price: "From ₹800", tag: "Trending" },
    { icon: "👰", title: "Bridal Blouses", desc: "Exquisite bridal blouses with intricate embroidery for your most special day.", price: "From ₹2,000", tag: "Signature" },
    { icon: "🎀", title: "Churidars", desc: "Classic and contemporary churidars tailored for elegance and comfort.", price: "From ₹600", tag: "" },
    { icon: "👘", title: "Kurtis", desc: "Casual to formal kurtis in fusion styles perfect for every occasion.", price: "From ₹500", tag: "" },
    { icon: "🪡", title: "Lehengas", desc: "Stunning lehengas for weddings, festivals and celebrations.", price: "From ₹3,000", tag: "Premium" },
    { icon: "🔧", title: "Alterations", desc: "Expert alterations and repairs to give your clothes a perfect new fit.", price: "From ₹150", tag: "" },
  ];

  return (
    <section id="services" style={{ padding: "100px 32px", background: COLORS.ivory }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>What We Create</div>
          <h2 className="section-title">Our Services</h2>
          <div style={{ width: 60, height: 1, background: COLORS.roseGold, margin: "16px auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <div key={i} className="card" style={{ padding: "32px 28px", cursor: "pointer", position: "relative", overflow: "hidden", animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}
              onClick={() => setActivePage("booking")}>
              {s.tag && <div className="tag" style={{ position: "absolute", top: 16, right: 16 }}>{s.tag}</div>}
              {/* Decorative corner */}
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, background: `linear-gradient(135deg, transparent 50%, ${COLORS.blush} 50%)` }} />

              <div style={{ fontSize: "2.5rem", marginBottom: 20, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 500, color: COLORS.charcoal, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: "0.95rem", color: COLORS.charcoalLight, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: COLORS.roseGold }}>{s.price}</span>
                <span style={{ color: COLORS.roseGold, fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
                  Order <Icon name="arrow" size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  const skills = [
    { name: "Bridal Blouses", level: 98 },
    { name: "Designer Embroidery", level: 95 },
    { name: "Pattern Drafting", level: 92 },
    { name: "Fabric Selection", level: 97 },
    { name: "Alterations", level: 99 },
  ];

  return (
    <section style={{ padding: "100px 32px", background: COLORS.charcoal, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 50%, rgba(200,149,108,0.08) 0%, transparent 60%)` }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
        {/* Left: story */}
        <div>
          <div className="section-subtitle" style={{ marginBottom: 16 }}>Our Story</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 500, color: "white", lineHeight: 1.2, marginBottom: 28 }}>
            Lakshmi Devi — Master<br/>
            <span style={{ color: COLORS.roseGold, fontStyle: "italic" }}>Tailor & Designer</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 20 }}>
          Lakshmi Devi discovered her passion for tailoring at age 14. Over 15 years, she has woven her mastery of traditional Telugu craftsmanship with contemporary fashion sensibility.
          </p>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 36 }}>
            Every bride who walks out of Lakshmi's Boutique carries with her not just a garment, but a piece of art — stitched with love, precision, and an intimate understanding of what makes a woman feel extraordinary.
          </p>

          {/* Certifications */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["NIFT Certified", "Bridal Specialist", "Zardosi Expert", "Export Quality"].map((cert, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.8)", fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                <div style={{ width: 20, height: 20, background: COLORS.roseGold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="check" size={12} color="white" />
                </div>
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Right: skills */}
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "white", fontWeight: 500, marginBottom: 32 }}>Areas of Expertise</h3>
          {skills.map((s, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.05em", color: "rgba(255,255,255,0.8)" }}>{s.name}</span>
                <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", color: COLORS.roseGold, fontWeight: 600 }}>{s.level}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${s.level}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.roseGold}, ${COLORS.gold})`, borderRadius: 2, animation: "shimmer 2s ease infinite", backgroundSize: "200% 100%" }} />
              </div>
            </div>
          ))}

          {/* Awards */}
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Best Bridal Boutique", year: "2023" },
              { label: "Excellence in Craftsmanship", year: "2022" },
              { label: "Customer Choice Award", year: "2021" },
              { label: "Top Women Entrepreneur", year: "2020" },
            ].map((a, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,149,108,0.2)", padding: "16px 20px" }}>
                <div style={{ color: COLORS.roseGold, fontSize: "0.7rem", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 4 }}>{a.year}</div>
                <div style={{ color: "white", fontSize: "0.85rem", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.4 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PORTFOLIO GALLERY
// ============================================================
function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);

  const filters = ["All", "Blouses", "Bridal", "Kurtis", "Lehengas", "Churidars"];

  // Synthetic portfolio items with gradient placeholders
  const items = [
    { cat: "Bridal", title: "Royal Zardosi Blouse", color: ["#E8C5B8", "#C8956C"], height: 320 },
    { cat: "Blouses", title: "Kantha Embroidered", color: ["#C9D4C5", "#8BA888"], height: 260 },
    { cat: "Lehengas", title: "Bridal Lehenga Set", color: ["#D4A8C7", "#A06090"], height: 380 },
    { cat: "Kurtis", title: "Anarkali Kurti", color: ["#C8D4E8", "#6080A0"], height: 300 },
    { cat: "Bridal", title: "Temple Jewel Blouse", color: ["#E8D8C0", "#C09060"], height: 270 },
    { cat: "Churidars", title: "Silk Churidar Set", color: ["#D8C8E8", "#8060A8"], height: 350 },
    { cat: "Blouses", title: "Mirror Work Blouse", color: ["#E0D0C8", "#A08070"], height: 290 },
    { cat: "Bridal", title: "Banarasi Bridal Set", color: ["#E8C8B0", "#B88060"], height: 340 },
    { cat: "Kurtis", title: "Designer Cotton Kurti", color: ["#C8E0D0", "#60A080"], height: 260 },
  ];

  const filtered = activeFilter === "All" ? items : items.filter(i => i.cat === activeFilter);

  return (
    <section style={{ padding: "100px 32px", background: COLORS.cream }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Our Work</div>
          <h2 className="section-title">Portfolio Gallery</h2>
          <div style={{ width: 60, height: 1, background: COLORS.roseGold, margin: "16px auto 24px" }} />
          {/* Filters */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                background: activeFilter === f ? COLORS.charcoal : "white",
                color: activeFilter === f ? "white" : COLORS.charcoal,
                border: `1px solid ${activeFilter === f ? COLORS.charcoal : COLORS.ivoryDark}`,
                fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 20px",
                cursor: "pointer", transition: "all 0.2s",
              }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div style={{ columns: "3 280px", columnGap: 20 }}>
          {filtered.map((item, i) => (
            <div key={`${activeFilter}-${i}`} onClick={() => setLightboxImg(item)} style={{
              breakInside: "avoid", marginBottom: 20, cursor: "zoom-in", position: "relative",
              overflow: "hidden", animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
            }}>
              <div style={{ height: item.height, background: `linear-gradient(135deg, ${item.color[0]}, ${item.color[1]})`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Stylized fabric pattern */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 21px)` }} />
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "3rem", marginBottom: 8, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>
                    {i % 3 === 0 ? "👘" : i % 3 === 1 ? "✂️" : "🌸"}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: "rgba(0,0,0,0.5)", fontStyle: "italic" }}>{item.title}</div>
                </div>
                {/* Hover overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(44,36,32,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <Icon name="eye" size={28} color="white" />
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "white", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 8 }}>View Work</div>
                </div>
              </div>
              {/* Caption */}
              <div style={{ padding: "12px 0", background: COLORS.cream }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: COLORS.charcoal }}>{item.title}</div>
                <div className="tag" style={{ marginTop: 4 }}>{item.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: `linear-gradient(135deg, ${lightboxImg.color[0]}, ${lightboxImg.color[1]})`, width: "min(500px, 90vw)", height: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ fontSize: "5rem", marginBottom: 16 }}>🌸</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "rgba(0,0,0,0.6)", fontStyle: "italic" }}>{lightboxImg.title}</div>
            <div className="tag" style={{ marginTop: 12 }}>{lightboxImg.cat}</div>
            <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.3)", border: "none", color: "white", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="x" size={18} color="white" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const testimonials = [
    { name: "Priya Lakshmi", role: "Bride, Oct 2024", text: "Meena Devi created the most beautiful bridal blouse I've ever seen. Every detail was perfect, from the zardosi embroidery to the exact fit. I felt like royalty on my wedding day. Highly recommend to every bride!", rating: 5, location: "Hyderabad" },
    { name: "Sneha Reddy", role: "Working Professional", text: "I've been getting my churidars stitched here for 3 years. The quality, fit and attention to detail is unmatched. They always deliver on time and the fabric suggestions are excellent.", rating: 5, location: "Guntur" },
    { name: "Kavitha Sharma", role: "College Student", text: "Got my lehenga done for farewell. It was stunning! All my friends were asking where I got it stitched. The price was very reasonable for such premium quality work.", rating: 5, location: "Amaravathi" },
    { name: "Radha Venkat", role: "Mother of Bride", text: "Both my daughter's wedding blouses were made here. The bridal work, the finishing — everything was exquisite. Meena ji has a true gift for understanding what a bride needs.", rating: 5, location: "Hyderabad" },
  ];

  const t = testimonials[active];
  return (
    <section style={{ padding: "100px 32px", background: COLORS.blush, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%", height: "80%", border: `1px solid rgba(200,149,108,0.15)`, borderRadius: "50%" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="section-subtitle" style={{ marginBottom: 12 }}>What They Say</div>
        <h2 className="section-title" style={{ marginBottom: 48 }}>Client Stories</h2>

        <div style={{ background: "white", padding: "48px 48px 40px", boxShadow: "0 24px 80px rgba(44,36,32,0.08)", marginBottom: 32, transition: "all 0.3s", animation: "fadeIn 0.4s ease" }} key={active}>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 24 }}>
            {Array(t.rating).fill().map((_, i) => <Icon key={i} name="star" size={18} color={COLORS.gold} />)}
          </div>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontStyle: "italic", color: COLORS.charcoal, lineHeight: 1.8, marginBottom: 28 }}>
            "{t.text}"
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${COLORS.roseGold}, ${COLORS.blushDeep})`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "white" }}>{t.name[0]}</span>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: COLORS.charcoal }}>{t.name}</div>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: COLORS.charcoalLight, letterSpacing: "0.05em" }}>{t.role} · {t.location}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 28 : 8, height: 8, background: i === active ? COLORS.roseGold : COLORS.blushDeep, border: "none", cursor: "pointer", borderRadius: 4, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRICING SECTION
// ============================================================
function PricingSection({ setActivePage }) {
  const plans = [
    {
      name: "Essential",
      desc: "Perfect for everyday stitching needs",
      color: COLORS.ivory,
      textColor: COLORS.charcoal,
      items: [
        { service: "Blouse Stitching", price: "₹350–550" },
        { service: "Churidar Set", price: "₹600–900" },
        { service: "Kurti", price: "₹500–800" },
        { service: "Simple Alterations", price: "₹150–300" },
      ],
      cta: "Order Now",
    },
    {
      name: "Designer",
      desc: "For special occasions & celebrations",
      color: COLORS.charcoal,
      textColor: "white",
      popular: true,
      items: [
        { service: "Designer Blouse", price: "₹800–1,500" },
        { service: "Embroidered Kurti", price: "₹1,200–2,000" },
        { service: "Embroidered Churidar", price: "₹1,500–2,500" },
        { service: "Party Wear Lehenga", price: "₹3,000–6,000" },
      ],
      cta: "Book Consultation",
    },
    {
      name: "Bridal",
      desc: "Your dream look on your special day",
      color: COLORS.ivory,
      textColor: COLORS.charcoal,
      items: [
        { service: "Bridal Blouse", price: "₹2,000–8,000" },
        { service: "Bridal Lehenga", price: "₹8,000–25,000" },
        { service: "Complete Bridal Set", price: "₹15,000–40,000" },
        { service: "Reception Outfit", price: "₹5,000–15,000" },
      ],
      cta: "Book Bridal Consultation",
    },
  ];

  return (
    <section style={{ padding: "100px 32px", background: COLORS.cream }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Investment</div>
          <h2 className="section-title">Pricing & Packages</h2>
          <div style={{ width: 60, height: 1, background: COLORS.roseGold, margin: "16px auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ background: plan.color, border: plan.popular ? `2px solid ${COLORS.roseGold}` : `1px solid ${COLORS.ivoryDark}`, padding: "40px 32px", position: "relative", boxShadow: plan.popular ? "0 24px 64px rgba(200,149,108,0.25)" : "none", transform: plan.popular ? "scale(1.03)" : "scale(1)", transition: "transform 0.3s" }}>
              {plan.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.roseGold, color: "white", fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 20px" }}>Most Popular</div>}
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 500, color: plan.popular ? COLORS.roseGold : COLORS.charcoal, marginBottom: 8 }}>{plan.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: plan.popular ? "rgba(255,255,255,0.65)" : COLORS.charcoalLight, marginBottom: 32, lineHeight: 1.6 }}>{plan.desc}</div>
              <div style={{ borderTop: `1px solid ${plan.popular ? "rgba(255,255,255,0.1)" : COLORS.ivoryDark}`, paddingTop: 24, marginBottom: 32 }}>
                {plan.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${plan.popular ? "rgba(255,255,255,0.07)" : COLORS.ivoryDark}` }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: plan.popular ? "rgba(255,255,255,0.85)" : COLORS.charcoal }}>{item.service}</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 600, color: plan.popular ? COLORS.roseGoldLight : COLORS.roseGold, whiteSpace: "nowrap" }}>{item.price}</span>
                  </div>
                ))}
              </div>
              <button className={plan.popular ? "btn-primary" : "btn-outline"} style={{ width: "100%", justifyContent: "center", color: !plan.popular ? COLORS.charcoal : undefined, borderColor: !plan.popular ? COLORS.charcoal : undefined }} onClick={() => setActivePage("booking")}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BOOKING PAGE
// ============================================================
function BookingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const services = ["Blouse Stitching", "Designer Blouse", "Bridal Blouse", "Churidar", "Kurti", "Lehenga", "Alterations"];
  const times = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

  const handleSubmit = () => {
    if (form.name && form.phone && form.service && form.date) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.ivory, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 32px 60px" }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ width: 80, height: 80, background: `linear-gradient(135deg, ${COLORS.roseGold}, ${COLORS.gold})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Icon name="check" size={36} color="white" />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 500, color: COLORS.charcoal, marginBottom: 16 }}>Appointment Confirmed!</h2>
          <p style={{ fontSize: "1.1rem", color: COLORS.charcoalLight, lineHeight: 1.7, marginBottom: 24 }}>
            Thank you, <strong>{form.name}</strong>! Your appointment for <strong>{form.service}</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong> has been booked. We'll send a confirmation to your WhatsApp.
          </p>
          <div style={{ background: COLORS.blush, padding: "20px 24px", marginBottom: 28 }}>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.roseGoldDark, marginBottom: 8 }}>Booking Reference</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: COLORS.charcoal, fontWeight: 600 }}>TS-{Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
          </div>
          <button className="btn-primary" onClick={() => setSubmitted(false)}>Book Another Appointment</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.ivory, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Schedule a Visit</div>
          <h1 className="section-title">Book an Appointment</h1>
          <div style={{ width: 60, height: 1, background: COLORS.roseGold, margin: "16px auto 0" }} />
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: s < 3 ? 1 : "none" }}>
              <div style={{ width: 36, height: 36, background: step >= s ? COLORS.roseGold : "white", border: `2px solid ${step >= s ? COLORS.roseGold : COLORS.ivoryDark}`, color: step >= s ? "white" : COLORS.charcoalLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", fontWeight: 700, transition: "all 0.3s", flexShrink: 0 }}>{s}</div>
              {s < 3 && <div style={{ flex: 1, height: 2, background: step > s ? COLORS.roseGold : COLORS.ivoryDark, transition: "all 0.3s" }} />}
            </div>
          ))}
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "40px" }}>
          {step === 1 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 500, color: COLORS.charcoal, marginBottom: 28 }}>Personal Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div><label>Full Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Priya Sharma" /></div>
                <div><label>Phone Number *</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" /></div>
                <div style={{ gridColumn: "1/-1" }}><label>Email Address</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="priya@example.com" /></div>
              </div>
              <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => form.name && form.phone && setStep(2)}>Continue <Icon name="arrow" size={16} /></button>
            </div>
          )}
          {step === 2 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 500, color: COLORS.charcoal, marginBottom: 28 }}>Service & Schedule</h3>
              <div style={{ display: "grid", gap: 20 }}>
                <div>
                  <label>Service Required *</label>
                  <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div><label>Preferred Date *</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} min={new Date().toISOString().split('T')[0]} /></div>
                  <div>
                    <label>Preferred Time</label>
                    <select value={form.time} onChange={e => setForm({...form, time: e.target.value})}>
                      <option value="">Select time</option>
                      {times.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div><label>Special Notes</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Any specific requirements or references..." rows={3} /></div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                <button className="btn-outline" onClick={() => setStep(1)}>Back</button>
                <button className="btn-primary" onClick={() => form.service && form.date && setStep(3)}>Continue <Icon name="arrow" size={16} /></button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 500, color: COLORS.charcoal, marginBottom: 28 }}>Confirm Booking</h3>
              <div style={{ background: COLORS.blush, padding: "24px", marginBottom: 24 }}>
                {[["Name", form.name], ["Phone", form.phone], ["Service", form.service], ["Date", form.date], ["Time", form.time || "To be confirmed"]].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.blushDeep}` }}>
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: COLORS.charcoalLight }}>{label}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: COLORS.charcoal, fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>
              {/* Payment options */}
              <div style={{ marginBottom: 24 }}>
                <label>Payment Method</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 8 }}>
                  {["Pay Now (Razorpay)", "Pay at Studio", "WhatsApp Confirm"].map((m, i) => (
                    <button key={m} style={{ background: i === 0 ? COLORS.blush : "white", border: `2px solid ${i === 0 ? COLORS.roseGold : COLORS.ivoryDark}`, padding: "12px 8px", cursor: "pointer", fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: i === 0 ? COLORS.roseGoldDark : COLORS.charcoalLight, textAlign: "center", transition: "all 0.2s" }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-outline" onClick={() => setStep(2)}>Back</button>
                <button className="btn-primary" onClick={handleSubmit}>Confirm Booking <Icon name="check" size={16} /></button>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp quick book */}
        <div style={{ marginTop: 24, background: "#25D366", color: "white", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
          onClick={() => window.open("https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20Tailoring%20Studio", "_blank")}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Icon name="whatsapp" size={24} color="white" />
            <div>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>Prefer WhatsApp?</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", opacity: 0.9 }}>Chat directly for quick appointment booking</div>
            </div>
          </div>
          <Icon name="arrow" size={20} color="white" />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MEASUREMENT FORM
// ============================================================
function MeasurementForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({});

  const measurements = [
    { key: "bust", label: "Bust / Chest", hint: "Around the fullest part" },
    { key: "waist", label: "Waist", hint: "Around the narrowest part" },
    { key: "hip", label: "Hip", hint: "Around the fullest part" },
    { key: "shoulder", label: "Shoulder Width", hint: "Across both shoulders" },
    { key: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist" },
    { key: "blouseLength", label: "Blouse Length", hint: "Shoulder to waist" },
    { key: "neckDepth", label: "Front Neck Depth", hint: "From shoulder to neck dip" },
    { key: "armhole", label: "Arm Hole", hint: "Around the arm opening" },
    { key: "height", label: "Height", hint: "Total height" },
    { key: "chestFront", label: "Chest (Front)", hint: "Across front chest" },
  ];

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <div style={{ fontSize: "3rem", marginBottom: 16 }}>📏</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: COLORS.charcoal, marginBottom: 12 }}>Measurements Saved!</h3>
      <p style={{ color: COLORS.charcoalLight, lineHeight: 1.7 }}>Your measurements have been saved securely. Our tailor will review before your appointment.</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: COLORS.ivory, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Accurate Fit</div>
          <h1 className="section-title">Measurement Form</h1>
          <p style={{ marginTop: 16, color: COLORS.charcoalLight, fontSize: "1.05rem", lineHeight: 1.7 }}>All measurements in inches. Need help? Watch our <a href="#" style={{ color: COLORS.roseGold }}>measurement guide video</a>.</p>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label>Customer Name</label>
              <input placeholder="Your full name" />
            </div>
            {measurements.map(m => (
              <div key={m.key}>
                <label>{m.label}</label>
                <input type="number" step="0.5" placeholder={`e.g. 36"`} onChange={e => setForm({...form, [m.key]: e.target.value})} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: COLORS.charcoalLight, marginTop: 4 }}>{m.hint}</div>
              </div>
            ))}
            <div style={{ gridColumn: "1/-1" }}>
              <label>Special Notes</label>
              <textarea placeholder="Any special requirements, fitting preferences..." rows={3} />
            </div>
          </div>
          <button className="btn-primary" style={{ marginTop: 28, width: "100%", justifyContent: "center" }} onClick={() => setSubmitted(true)}>
            Save Measurements <Icon name="ruler" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ORDER TRACKING
// ============================================================
function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const mockOrder = {
    id: "TS-A8F2C1",
    service: "Designer Bridal Blouse",
    customer: "Ananya Reddy",
    placed: "22 May 2026",
    delivery: "05 Jun 2026",
    status: 3,
    steps: [
      { label: "Order Placed", date: "22 May", done: true },
      { label: "Fabric Sourced", date: "24 May", done: true },
      { label: "Cutting & Drafting", date: "27 May", done: true },
      { label: "Stitching in Progress", date: "30 May", done: false },
      { label: "Embroidery & Finishing", date: "02 Jun", done: false },
      { label: "Quality Check", date: "04 Jun", done: false },
      { label: "Ready for Pickup", date: "05 Jun", done: false },
    ],
  };

  const handleSearch = () => {
    if (orderId.toUpperCase().startsWith("TS")) setOrder(mockOrder);
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.ivory, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Real-Time Updates</div>
          <h1 className="section-title">Order Tracking</h1>
        </div>

        <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "32px", marginBottom: 32 }}>
          <label>Enter Order ID</label>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="e.g. TS-A8F2C1" style={{ flex: 1 }} />
            <button className="btn-primary" style={{ whiteSpace: "nowrap" }} onClick={handleSearch}>Track Order</button>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: COLORS.charcoalLight, marginTop: 10 }}>
            Try: <span style={{ color: COLORS.roseGold, cursor: "pointer" }} onClick={() => { setOrderId("TS-A8F2C1"); setOrder(mockOrder); }}>TS-A8F2C1</span>
          </p>
        </div>

        {order && (
          <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "40px", animation: "fadeIn 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: COLORS.charcoal, fontWeight: 500 }}>{order.service}</div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: COLORS.charcoalLight, letterSpacing: "0.05em", marginTop: 4 }}>Order #{order.id} · {order.customer}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="tag">In Progress</div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: COLORS.charcoalLight, marginTop: 6 }}>Est. Delivery: {order.delivery}</div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              {order.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: i < order.steps.length - 1 ? 24 : 0 }}>
                  {i < order.steps.length - 1 && <div style={{ position: "absolute", left: 15, top: 32, bottom: 0, width: 2, background: step.done ? COLORS.roseGold : COLORS.ivoryDark }} />}
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: step.done ? COLORS.roseGold : "white", border: `2px solid ${step.done ? COLORS.roseGold : COLORS.ivoryDark}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, transition: "all 0.3s" }}>
                    {step.done ? <Icon name="check" size={14} color="white" /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.ivoryDark }} />}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", fontWeight: step.done ? 600 : 400, color: step.done ? COLORS.charcoal : COLORS.charcoalLight, letterSpacing: "0.02em" }}>{step.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: COLORS.charcoalLight, marginTop: 2 }}>{step.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, padding: "16px 20px", background: COLORS.blush, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
              onClick={() => window.open("https://wa.me/919876543210?text=Hi%2C%20order%20status%20for%20" + order.id, "_blank")}>
              <Icon name="whatsapp" size={22} color="#25D366" />
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: COLORS.charcoal }}>Get WhatsApp Updates for this Order</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CUSTOMER DASHBOARD
// ============================================================
function CustomerDashboard({ setActivePage }) {
  const [activeTab, setActiveTab] = useState("overview");

  const orders = [
    { id: "TS-A8F2C1", service: "Bridal Blouse", date: "22 May 2026", status: "In Progress", amount: "₹4,500" },
    { id: "TS-B3D7E2", service: "Churidar Set", date: "10 Apr 2026", status: "Delivered", amount: "₹900" },
    { id: "TS-C5F9A3", service: "Designer Kurti", date: "01 Mar 2026", status: "Delivered", amount: "₹1,200" },
  ];

  const tabs = ["overview", "orders", "measurements", "appointments"];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.ivory, paddingTop: 70 }}>
      <div style={{ background: COLORS.charcoal, color: "white", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.roseGoldLight, marginBottom: 8 }}>Welcome back</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 500, color: "white" }}>Ananya Reddy</h1>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Customer since January 2023 · 5 Orders</div>
          </div>
          <button className="btn-primary" onClick={() => setActivePage("booking")}>New Order <Icon name="plus" size={16} /></button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${COLORS.ivoryDark}`, marginBottom: 32 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "12px 24px", color: activeTab === tab ? COLORS.roseGold : COLORS.charcoalLight, borderBottom: activeTab === tab ? `2px solid ${COLORS.roseGold}` : "2px solid transparent", transition: "all 0.2s" }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
              {[
                { label: "Total Orders", value: "5", icon: "package", color: COLORS.roseGold },
                { label: "Active Orders", value: "1", icon: "scissors", color: "#3B82F6" },
                { label: "Total Spent", value: "₹12,400", icon: "trending", color: "#10B981" },
                { label: "Loyalty Points", value: "620 pts", icon: "star", color: COLORS.gold },
              ].map((s, i) => (
                <div key={i} style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "24px 20px", display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={s.icon} size={20} color={s.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600, color: COLORS.charcoal }}>{s.value}</div>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.charcoalLight }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "28px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 500, color: COLORS.charcoal, marginBottom: 20 }}>Recent Orders</h3>
              {orders.slice(0, 2).map((o, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${COLORS.ivoryDark}` }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: COLORS.charcoal, fontWeight: 500 }}>{o.service}</div>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", color: COLORS.charcoalLight, letterSpacing: "0.05em", marginTop: 2 }}>#{o.id} · {o.date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: COLORS.roseGold }}>{o.amount}</span>
                    <div className="tag" style={{ background: o.status === "Delivered" ? "#D1FAE5" : COLORS.blush, color: o.status === "Delivered" ? "#065F46" : COLORS.roseGoldDark }}>{o.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}` }}>
              <div style={{ padding: "20px 28px", borderBottom: `1px solid ${COLORS.ivoryDark}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 500, color: COLORS.charcoal }}>All Orders</h3>
              </div>
              {orders.map((o, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px", borderBottom: `1px solid ${COLORS.ivoryDark}`, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: COLORS.charcoal, fontWeight: 500 }}>{o.service}</div>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", color: COLORS.charcoalLight, letterSpacing: "0.05em", marginTop: 4 }}>Order #{o.id} · {o.date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: COLORS.roseGold }}>{o.amount}</span>
                    <div className="tag" style={{ background: o.status === "Delivered" ? "#D1FAE5" : COLORS.blush, color: o.status === "Delivered" ? "#065F46" : COLORS.roseGoldDark }}>{o.status}</div>
                    {o.status === "In Progress" && <button style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.roseGold, fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }} onClick={() => setActivePage("tracking")}>Track →</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "measurements" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 500, color: COLORS.charcoal }}>Saved Measurements</h3>
                <button className="btn-outline" style={{ fontSize: "0.7rem", padding: "8px 16px" }} onClick={() => setActivePage("measurements")}>Update</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
                {[["Bust", "36\""], ["Waist", "30\""], ["Hip", "38\""], ["Shoulder", "14\""], ["Sleeve", "22\""], ["Blouse Length", "15\""], ["Height", "5'4\""], ["Arm Hole", "16\""]].map(([label, val]) => (
                  <div key={label} style={{ background: COLORS.blush, padding: "16px" }}>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.charcoalLight, marginBottom: 6 }}>{label}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600, color: COLORS.roseGold }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div style={{ animation: "fadeIn 0.3s ease", background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 500, color: COLORS.charcoal }}>Upcoming Appointments</h3>
              <button className="btn-primary" style={{ fontSize: "0.7rem", padding: "8px 16px" }} onClick={() => setActivePage("booking")}>Book New</button>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "20px", background: COLORS.blush, border: `1px solid ${COLORS.blushDeep}` }}>
              <Icon name="calendar" size={24} color={COLORS.roseGold} />
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: COLORS.charcoal, fontWeight: 500 }}>Bridal Blouse Fitting</div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: COLORS.charcoalLight, marginTop: 4 }}>05 June 2026 · 3:00 PM</div>
              </div>
              <div className="tag" style={{ marginLeft: "auto" }}>Upcoming</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================
function AdminDashboard() {
  const [tab, setTab] = useState("overview");

  const orders = [
    { id: "TS-A8F2C1", customer: "Ananya Reddy", service: "Bridal Blouse", amount: "₹4,500", status: "In Progress", date: "22 May" },
    { id: "TS-D2E6F4", customer: "Meghana Rao", service: "Designer Kurti", amount: "₹1,200", status: "Cutting", date: "25 May" },
    { id: "TS-G7H1I5", customer: "Sunitha Devi", service: "Churidar Set", amount: "₹850", status: "Ready", date: "28 May" },
    { id: "TS-J4K8L6", customer: "Pooja Sharma", service: "Lehenga", amount: "₹9,500", status: "Embroidery", date: "20 May" },
    { id: "TS-M3N5O7", customer: "Divya Reddy", service: "Blouse Alteration", amount: "₹250", status: "Delivered", date: "18 May" },
  ];

  const metrics = [
    { label: "This Month Revenue", value: "₹42,800", change: "+18%", icon: "trending", color: "#10B981" },
    { label: "Active Orders", value: "12", change: "+3 new", icon: "package", color: COLORS.roseGold },
    { label: "Appointments Today", value: "6", change: "2 pending", icon: "calendar", color: "#3B82F6" },
    { label: "New Customers", value: "8", change: "+5 this week", icon: "user", color: COLORS.gold },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0EB", paddingTop: 70 }}>
      {/* Admin header */}
      <div style={{ background: COLORS.charcoal, color: "white", padding: "24px 32px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.roseGoldLight, marginBottom: 4 }}>Admin Panel</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 500, color: "white" }}>Lakshmi's Boutique Dashboard</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Icon name="bell" size={20} color="rgba(255,255,255,0.7)" />
              <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: COLORS.roseGold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "white", fontWeight: 700 }}>3</div>
            </div>
            <div style={{ width: 36, height: 36, background: COLORS.roseGold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "white", fontSize: "0.9rem" }}>M</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px" }}>
        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 32 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ background: "white", border: `1px solid rgba(0,0,0,0.06)`, padding: "24px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 8 }}>{m.label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 600, color: COLORS.charcoal }}>{m.value}</div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: m.color, marginTop: 4, fontWeight: 600 }}>{m.change}</div>
              </div>
              <div style={{ width: 44, height: 44, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={m.icon} size={20} color={m.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid rgba(0,0,0,0.08)`, marginBottom: 24 }}>
          {["overview", "orders", "appointments", "customers", "settings"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "12px 20px", color: tab === t ? COLORS.roseGold : "#6B7280", borderBottom: tab === t ? `2px solid ${COLORS.roseGold}` : "2px solid transparent" }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div style={{ background: "white", border: `1px solid rgba(0,0,0,0.06)` }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid rgba(0,0,0,0.06)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 500, color: COLORS.charcoal }}>
              {tab === "overview" ? "Recent Orders" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </h3>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Search orders..." style={{ border: `1px solid rgba(0,0,0,0.1)`, padding: "6px 12px", fontSize: "0.8rem", width: 200 }} />
              <button className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.7rem" }}>Export</button>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: COLORS.ivory }}>
                  {["Order ID", "Customer", "Service", "Date", "Amount", "Status", "Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 24px", textAlign: "left", fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.charcoalLight, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid rgba(0,0,0,0.04)` }}>
                    <td style={{ padding: "16px 24px", fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: COLORS.roseGold }}>{o.id}</td>
                    <td style={{ padding: "16px 24px", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: COLORS.charcoal }}>{o.customer}</td>
                    <td style={{ padding: "16px 24px", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: COLORS.charcoalMid }}>{o.service}</td>
                    <td style={{ padding: "16px 24px", fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", color: COLORS.charcoalLight }}>{o.date}</td>
                    <td style={{ padding: "16px 24px", fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 600, color: COLORS.charcoal }}>{o.amount}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ display: "inline-block", background: o.status === "Delivered" ? "#D1FAE5" : o.status === "Ready" ? "#DBEAFE" : COLORS.blush, color: o.status === "Delivered" ? "#065F46" : o.status === "Ready" ? "#1D4ED8" : COLORS.roseGoldDark, fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px" }}>{o.status}</span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.roseGold, fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600 }}>View →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BLOG SECTION
// ============================================================
function BlogSection() {
  const posts = [
    { title: "5 Trending Blouse Designs for Sarees in 2026", date: "28 May 2026", cat: "Trends", readTime: "4 min", color: COLORS.blush },
    { title: "How to Take Perfect Blouse Measurements at Home", date: "15 May 2026", cat: "Guide", readTime: "6 min", color: "#C9D4C5" },
    { title: "Bridal Blouse Guide: Styles for Every Bride", date: "01 May 2026", cat: "Bridal", readTime: "8 min", color: "#D4A8C7" },
    { title: "Choosing Fabrics: Silk vs Cotton for Summer Kurtis", date: "20 Apr 2026", cat: "Fabrics", readTime: "5 min", color: "#C8D4E8" },
    { title: "Lehenga or Saree? What to Pick for Your Wedding", date: "10 Apr 2026", cat: "Wedding", readTime: "7 min", color: "#E8D8C0" },
    { title: "Care Tips to Keep Embroidered Outfits Beautiful", date: "01 Apr 2026", cat: "Care", readTime: "3 min", color: "#D8C8E8" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.ivory, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Insights & Inspiration</div>
          <h1 className="section-title">Style Blog</h1>
          <div style={{ width: 60, height: 1, background: COLORS.roseGold, margin: "16px auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
          {posts.map((post, i) => (
            <div key={i} className="card" style={{ overflow: "hidden", cursor: "pointer", animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}>
              <div style={{ height: 200, background: `linear-gradient(135deg, ${post.color}, ${post.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ fontSize: "3.5rem" }}>{["✨", "📏", "👰", "🌿", "💍", "🧵"][i]}</div>
                <div className="tag" style={{ position: "absolute", top: 16, left: 16 }}>{post.cat}</div>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12, fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.05em", color: COLORS.charcoalLight }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 500, color: COLORS.charcoal, lineHeight: 1.5, marginBottom: 16 }}>{post.title}</h3>
                <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.roseGold, display: "flex", alignItems: "center", gap: 4 }}>
                  Read More <Icon name="arrow" size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FAQ SECTION
// ============================================================
function FAQSection() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "How long does blouse stitching take?", a: "Standard blouse stitching takes 3–5 working days. Designer blouses take 7–10 days. Bridal blouses require 15–20 days. Rush orders are available for an additional charge." },
    { q: "What measurements do I need to provide?", a: "You'll need: Bust, Waist, Hip, Shoulder width, Sleeve length, Blouse length, Front/back neck depth, and Arm hole measurements. Use our online measurement form for guidance." },
    { q: "Do you offer home visit for measurements?", a: "Yes! For bridal and premium orders above ₹2,000, we offer free home visits in Hyderabad. For other areas, there's a small travel charge." },
    { q: "Can I bring my own fabric?", a: "Absolutely! You can bring your own saree blouse piece or any fabric. We'll advise on the ideal cut and design to suit your fabric." },
    { q: "Do you accept payment via UPI?", a: "We accept all payment methods: Razorpay (cards, UPI, net banking), PhonePe, Google Pay, cash, and cheque for large orders." },
    { q: "What if the stitching doesn't fit perfectly?", a: "We offer free alterations within 14 days of delivery. Your satisfaction is our guarantee. We'll redo the fitting until you're completely happy." },
    { q: "Do you deliver outside Hyderabad?", a: "Yes! We ship across Andhra Pradesh and Telangana via courier. For other states, courier charges apply. Delivery takes 3–5 additional days." },
    { q: "Can I see previous work before placing an order?", a: "Yes, visit our Portfolio Gallery to see our latest work. You can also visit the studio to see physical samples and talk to our team." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.ivory, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Got Questions?</div>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <div style={{ width: 60, height: 1, background: COLORS.roseGold, margin: "16px auto 0" }} />
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, marginBottom: 8 }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, color: COLORS.charcoal }}>{faq.q}</span>
              <div style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0 }}>
                <Icon name="chevron" size={20} color={COLORS.roseGold} />
              </div>
            </button>
            {open === i && (
              <div style={{ padding: "0 24px 20px", animation: "fadeIn 0.2s ease" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: COLORS.charcoalLight, lineHeight: 1.8 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.ivory, padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-subtitle" style={{ marginBottom: 12 }}>Get In Touch</div>
          <h1 className="section-title">Contact Us</h1>
          <div style={{ width: 60, height: 1, background: COLORS.roseGold, margin: "16px auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, alignItems: "start" }}>
          {/* Info */}
          <div>
            <div style={{ background: COLORS.charcoal, color: "white", padding: "40px 32px", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 500, color: "white", marginBottom: 28 }}>Visit Our Studio</h3>
              {[
                { icon: "map", text: "Plot No. 78, Incois Road, Pragathi Nagar,\nHyderabad, Telangana 500090" },
                { icon: "phone", text: "+91 98765 43210\n+91 91234 56789" },
                { icon: "mail", text: "hello@tailoringstudio.in\nbookings@tailoringstudio.in" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 24 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(200,149,108,0.15)", border: `1px solid rgba(200,149,108,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={c.icon} size={16} color={COLORS.roseGold} />
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, whiteSpace: "pre-line" }}>{c.text}</div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 8 }}>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Studio Hours</div>
                {[["Mon – Sat", "10:00 AM – 7:00 PM"], ["Sunday", "11:00 AM – 4:00 PM"]].map(([day, hrs]) => (
                  <div key={day} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{day}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.roseGoldLight, fontSize: "0.9rem" }}>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp button */}
            <div style={{ background: "#25D366", color: "white", padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
              onClick={() => window.open("https://wa.me/919876543210", "_blank")}>
              <Icon name="whatsapp" size={28} color="white" />
              <div>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>WhatsApp Us</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", opacity: 0.85 }}>+91 98765 43210 · Quick Response</div>
              </div>
              <Icon name="arrow" size={18} color="white" style={{ marginLeft: "auto" }} />
            </div>
          </div>

          {/* Contact form */}
          <div>
            {sent ? (
              <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "48px", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>✉️</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: COLORS.charcoal, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: COLORS.charcoalLight, lineHeight: 1.7 }}>We'll get back to you within 24 hours. For urgent queries, WhatsApp us directly.</p>
              </div>
            ) : (
              <div style={{ background: "white", border: `1px solid ${COLORS.ivoryDark}`, padding: "40px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 500, color: COLORS.charcoal, marginBottom: 28 }}>Send a Message</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div><label>Your Name</label><input placeholder="Priya Sharma" /></div>
                  <div><label>Phone Number</label><input placeholder="+91 98765 43210" /></div>
                  <div style={{ gridColumn: "1/-1" }}><label>Email</label><input placeholder="priya@example.com" /></div>
                  <div style={{ gridColumn: "1/-1" }}><label>Subject</label>
                    <select>
                      <option>General Enquiry</option>
                      <option>Order Status</option>
                      <option>Bridal Consultation</option>
                      <option>Pricing</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}><label>Message</label><textarea placeholder="Tell us how we can help you..." rows={5} /></div>
                </div>
                <button className="btn-primary" style={{ marginTop: 24, width: "100%", justifyContent: "center" }} onClick={() => setSent(true)}>
                  Send Message <Icon name="arrow" size={16} />
                </button>
              </div>
            )}

            {/* Google Maps placeholder */}
            <div style={{ marginTop: 20, height: 240, background: `linear-gradient(135deg, ${COLORS.blush} 0%, ${COLORS.ivoryDark} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${COLORS.ivoryDark}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 40px)` }} />
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <Icon name="map" size={32} color={COLORS.roseGold} />
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.charcoal, marginTop: 10 }}>Lakshmi's Boutique · Hyderabad</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: COLORS.charcoalLight, marginTop: 4 }}>MG Road, Pragathi Nagar</div>
                <button style={{ marginTop: 12, background: COLORS.roseGold, color: "white", border: "none", cursor: "pointer", padding: "8px 20px", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em" }}
                  onClick={() => window.open("https://maps.google.com/?q=Pragathi Nagar+Hyderabad", "_blank")}>
                  Open in Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HOMEPAGE (assembles sections)
// ============================================================
function HomePage({ setActivePage }) {
  return (
    <>
      <HeroSection setActivePage={setActivePage} />
      <ServicesSection setActivePage={setActivePage} />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection setActivePage={setActivePage} />

      {/* Quick CTA strip */}
      <section style={{ background: COLORS.roseGold, padding: "48px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 500, color: "white", marginBottom: 12 }}>
            Ready to Create Something Beautiful?
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "rgba(255,255,255,0.85)", marginBottom: 28 }}>
            Book your appointment today and experience the art of bespoke tailoring.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setActivePage("booking")} style={{ background: "white", color: COLORS.roseGoldDark, border: "none", padding: "14px 32px", fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>
              Book Appointment
            </button>
            <button onClick={() => window.open("https://wa.me/919876543210", "_blank")} style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.6)", padding: "12px 30px", fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="whatsapp" size={18} color="white" /> WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section style={{ padding: "80px 32px", background: COLORS.ivory }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div className="section-subtitle" style={{ marginBottom: 12 }}>Questions?</div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Frequently Asked</h2>
            <p style={{ fontSize: "1.05rem", color: COLORS.charcoalLight, lineHeight: 1.8, marginBottom: 24 }}>
              Find answers to common questions about our services, pricing, timelines and more.
            </p>
            <button className="btn-primary" onClick={() => setActivePage("faq")}>View All FAQs <Icon name="arrow" size={16} /></button>
          </div>
          <div>
            {[
              "How long does blouse stitching take?",
              "Do you do home visits for measurements?",
              "Can I bring my own fabric?",
            ].map((q, i) => (
              <div key={i} style={{ padding: "18px 0", borderBottom: `1px solid ${COLORS.ivoryDark}`, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setActivePage("faq")}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: COLORS.charcoal }}>{q}</span>
                <Icon name="arrow" size={16} color={COLORS.roseGold} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ setActivePage }) {
  return (
    <footer style={{ background: COLORS.charcoal, color: "white", padding: "64px 32px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 600, marginBottom: 4 }}>
              Tailoring <span style={{ color: COLORS.roseGold, fontStyle: "italic" }}>Studio</span>
            </div>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>Est. 2009 · Hyderabad, TG</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 280 }}>
              Crafting elegance, one stitch at a time. Premium tailoring for the modern Indian woman.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <div onClick={() => window.open("https://wa.me/919876543210", "_blank")} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon name="whatsapp" size={16} color="rgba(255,255,255,0.6)" />
              </div>
              <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon name="globe" size={16} color="rgba(255,255,255,0.6)" />
              </div>
            </div>
          </div>

          {[
            { title: "Services", links: [["Blouse Stitching", "services"], ["Designer Blouses", "services"], ["Bridal Blouses", "services"], ["Kurtis & Churidars", "services"], ["Alterations", "services"]] },
            { title: "Quick Links", links: [["Portfolio", "portfolio"], ["Book Appointment", "booking"], ["Order Tracking", "tracking"], ["Measurement Form", "measurements"], ["Blog", "blog"]] },
            { title: "Info", links: [["About Us", "about"], ["Pricing", "home"], ["FAQ", "faq"], ["Contact", "contact"], ["Admin", "admin"]] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.roseGold, marginBottom: 20 }}>{col.title}</h4>
              {col.links.map(([label, page]) => (
                <button key={label} onClick={() => setActivePage(page)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", marginBottom: 10, transition: "color 0.2s", padding: 0 }}
                  onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.9)"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
            © 2026 Lakshmi's Boutique · Hyderabad · All Rights Reserved
          </div>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
            Privacy Policy · Terms of Service · Sitemap
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// WHATSAPP FLOATING BUTTON
// ============================================================
function WhatsAppFloat() {
  return (
    <div onClick={() => window.open("https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20enquire%20about%20tailoring%20services", "_blank")}
      style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, cursor: "pointer" }}>
      <div style={{ position: "absolute", inset: -4, background: "rgba(37,211,102,0.3)", borderRadius: "50%", animation: "pulse-ring 2s ease-in-out infinite" }} />
      <div style={{ width: 56, height: 56, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", position: "relative" }}>
        <Icon name="whatsapp" size={28} color="white" />
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [lang, setLang] = useState("en");

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage setActivePage={setActivePage} />;
      case "services": return <><ServicesSection setActivePage={setActivePage} /><PricingSection setActivePage={setActivePage} /></>;
      case "portfolio": return <PortfolioSection />;
      case "about": return <AboutSection />;
      case "blog": return <BlogSection />;
      case "contact": return <ContactPage />;
      case "booking": return <BookingPage />;
      case "measurements": return <MeasurementForm />;
      case "tracking": return <OrderTracking />;
      case "dashboard": return <CustomerDashboard setActivePage={setActivePage} />;
      case "admin": return <AdminDashboard />;
      case "faq": return <FAQSection />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <Navbar activePage={activePage} setActivePage={setActivePage} lang={lang} setLang={setLang} />
      <main>{renderPage()}</main>
      {!["admin"].includes(activePage) && <Footer setActivePage={setActivePage} />}
      <WhatsAppFloat />
    </>
  );
}
