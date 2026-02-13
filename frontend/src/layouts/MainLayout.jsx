import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Dropdown from "./Dropdown";

const MainLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => { setMenuOpen(false); setOpenDropdowns({}); };
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "Нүүр Хуудас", link: "/" },
    {
      label: "Хөтөлбөрүүд",
      items: [
        { name: "Үндсэн", link: "/programs/degree/Үндсэн" },
        { name: "Хамтарсан", link: "/programs/degree/Хамтарсан" },
        { name: "BTEC", link: "/programs/degree/BTEC" },
        { name: "Rotation", link: "/programs/degree/Rotation" },
        { name: "Интерактив", link: "/programs/degree/Интерактив" },
        { name: "Globe view", link: "/globe" },
      ],
    },
    { label: "Сургалтын Алба", link: "/bsa" },
    { label: "Эрдэм Шинжилгээ", link: "/research" },
    { label: "Оюутны хөгжил", link: "/services" },
    { label: "Volunteer", link: "/volunteer" },
  ];

  const toggleDropdown = (label) =>
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#f8f7f4" }}>

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: "var(--color-primary, #1a3a5c)",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
        }}
      >
        {/* thin accent stripe at very top */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #f0a500 0%, #e8c96a 50%, #f0a500 100%)" }} />

        <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className="flex items-center justify-center overflow-hidden rounded-lg w-9 h-9"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <img src="/logo-white.png" alt="Logo" className="object-contain w-7 h-7" />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-baseline gap-2">
                  <span
                    className="hidden sm:block text-m tracking-wider uppercase font-bold"
                    style={{ color: "#e8c96a", fontFamily: "'DM Mono', monospace" }}
                  >
                    Бакалаврын Сургалтын Алба
                  </span>
                </div>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="items-center hidden gap-1 md:flex">
              {navItems.map((nav) =>
                nav.items ? (
                  <Dropdown key={nav.label} label={nav.label} items={nav.items} />
                ) : (
                  <Link
                    key={nav.label}
                    to={nav.link}
                    className="relative px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {nav.label}
                    <span
                      className="absolute bottom-0 h-px transition-transform duration-200 origin-left scale-x-0 left-3 right-3 group-hover:scale-x-100"
                      style={{ background: "#e8c96a" }}
                    />
                  </Link>
                )
              )}

              {/* Quick-access CTA */}
              <Link
                to="/bsa/req"
                className="ml-4 px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 hover:shadow-lg"
                style={{
                  background: "#f0a500",
                  color: "#1a3a5c",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.05em",
                  boxShadow: "0 2px 8px rgba(240,165,0,0.25)",
                }}
              >
                Хүсэлт →
              </Link>
            </div>

            {/* MOBILE BURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className="block h-0.5 w-6 bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }}
              />
              <span
                className="block h-0.5 w-6 bg-white transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-6 bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }}
              />
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className="fixed inset-0 z-40 transition-all duration-300 md:hidden"
          style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div
            className="absolute left-4 right-4 top-[72px] overflow-hidden rounded-2xl"
            style={{
              background: "var(--color-primary, #1a3a5c)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
              transition: "transform 0.3s ease",
            }}
          >
            {/* Gold accent line */}
            <div style={{ height: 2, background: "linear-gradient(90deg, #f0a500, #e8c96a, #f0a500)" }} />

            <nav className="flex flex-col py-2">
              {navItems.map((nav, i) =>
                nav.items ? (
                  <div key={nav.label}>
                    <button
                      onClick={() => toggleDropdown(nav.label)}
                      className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/5 transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {nav.label}
                      <span
                        className="text-xs transition-transform duration-200"
                        style={{
                          color: "#e8c96a",
                          transform: openDropdowns[nav.label] ? "rotate(45deg)" : "none",
                        }}
                      >
                        +
                      </span>
                    </button>
                    {openDropdowns[nav.label] && (
                      <div style={{ background: "rgba(0,0,0,0.2)" }}>
                        {nav.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.link}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 px-8 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#e8c96a", flexShrink: 0 }} />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={nav.label}
                    to={nav.link}
                    onClick={() => setMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {nav.label}
                  </Link>
                )
              )}

              {/* Mobile CTA */}
              <div className="px-5 py-4 mt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <Link
                  to="/bsa/req"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2.5 px-4 rounded-xl text-sm font-bold transition-all"
                  style={{ background: "#f0a500", color: "#1a3a5c", fontFamily: "'DM Mono', monospace" }}
                >
                  Хүсэлт илгээх →
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 w-full px-0 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--color-primary, #1a3a5c)", color: "white" }}>

        {/* Gold top border */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #f0a500 0%, #e8c96a 50%, #f0a500 100%)" }} />

        <div className="px-6 pb-8 mx-auto pt-14 max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo-white.png" alt="UFE Logo" className="object-contain w-10 h-10" />
                <span
                  className="text-2xl font-black tracking-widest text-white"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  UFE
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Бакалаврын Сургалтын Алба
              </p>
              <div className="space-y-1.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                <p>БЗД 3-р хороо, Энхтайвны өргөн чөлөө-5</p>
                <p style={{ color: "#e8c96a" }}>77771100, 77737777</p>
                <p>info@ufe.edu.mn</p>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3
                className="mb-5 text-xs font-bold tracking-widest uppercase"
                style={{ color: "#e8c96a", fontFamily: "'DM Mono', monospace" }}
              >
                Чухал холбоос
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Голч тооцоолуур", to: "/gpa-calculator" },
                  { label: "Элсэлт", to: "https://admission.ufe.edu.mn/" },
                  { label: "Infosys", to: "https://infosys.ufe.edu.mn/" },
                  { label: "online.ufe.edu.mn", to: "https://online.ufe.edu.mn/" },
                  { label: "Eoffice", to: "https://eoffice.ufe.edu.mn/" },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm transition-all duration-200 hover:pl-1"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#e8c96a"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requests */}
            <div>
              <h3
                className="mb-5 text-xs font-bold tracking-widest uppercase"
                style={{ color: "#e8c96a", fontFamily: "'DM Mono', monospace" }}
              >
                Санал хүсэлт
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Оюутны хүсэлтийн маягтууд", to: "/bsa/req" },
                  { label: "Ажиллавар татах", to: "https://ufenu.sharepoint.com/sites/UFE-files/DocLib/pdf%20bolgoson/ajillavar-ufe-2020.pdf?CT=1769401252899&OR=ItemsView", external: true },
                  { label: "Календар", to: "/calendar" },
                  { label: "Анги танхимын хуваарь", to: "/bsa/rooms" },
                ].map(({ label, to, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-all duration-200 hover:pl-1"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#e8c96a"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={to}
                        className="text-sm transition-all duration-200 hover:pl-1"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#e8c96a"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social + programs quick-nav */}
            <div>
              <h3
                className="mb-5 text-xs font-bold tracking-widest uppercase"
                style={{ color: "#e8c96a", fontFamily: "'DM Mono', monospace" }}
              >
                Хөтөлбөрүүд
              </h3>
              <ul className="space-y-2.5 mb-8">
                {["Үндсэн", "Хамтарсан", "BTEC", "Rotation", "Интерактив"].map((name) => (
                  <li key={name}>
                    <Link
                      to={`/programs/degree/${name}`}
                      className="text-sm transition-all duration-200 hover:pl-1"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#e8c96a"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social icons */}
              <div className="flex gap-3">
                {[
                  { Icon: FaFacebookF, href: "https://www.facebook.com/ufe.edu.mn" },
                  { Icon: FaInstagram, href: "https://www.instagram.com/ufe.edu.mn/" },
                  { Icon: FaTwitter, href: "https://twitter.com/ufe_edu_mn" },
                  { Icon: FaYoutube, href: "https://www.youtube.com/@ufemedia" },
                  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/school/ufemongolia/" },
                ].map(({ Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f0a500"; e.currentTarget.style.color = "#1a3a5c"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col items-center justify-between gap-3 pt-6 mt-12 text-xs sm:flex-row"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace" }}>
              © 2026 Бакалаврын Сургалтын Алба — UFE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;