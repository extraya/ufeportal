import { Link } from 'react-router-dom';
import NewsPage from './NewsPage';
import Announcements from './Announcements';
import PosterSwiper from './Poster';
import Vid from './vid';

const HomePage = () => {
  return (
    <div>
      <PosterSwiper />

      {/* ─── Mid Intro Section ─── */}
      <section
        className="relative px-6 py-24 overflow-hidden"
        style={{ background: "var(--color-primary, #1a3a5c)" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Gold diagonal accent — left */}
        <div
          className="absolute top-0 h-full pointer-events-none -left-20 w-72 opacity-10"
          style={{
            background: 'linear-gradient(135deg, #f0a500 0%, transparent 55%)',
            transform: 'skewX(-10deg)',
          }}
        />

        {/* Subtle blue glow — right */}
        <div
          className="absolute bottom-0 h-full pointer-events-none -right-20 w-72 opacity-15"
          style={{
            background: 'radial-gradient(ellipse at right, #4f86c6 0%, transparent 65%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-10 h-px" style={{ background: "#f0a500" }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: "#e8c96a", fontFamily: "'DM Mono', 'Courier New', monospace" }}
            >
              Оюутны Платформ · UFE
            </span>
          </div>

          {/* Headline */}
          <div className="mb-10 space-y-1">
            <h2
              className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl"
              style={{ fontFamily: "'Oswald', 'Arial Narrow', sans-serif" }}
            >
              Нэгдсэн
            </h2>
            <h2
              className="text-5xl font-black leading-tight tracking-tight md:text-7xl"
              style={{
                fontFamily: "'Oswald', 'Arial Narrow', sans-serif",
                WebkitTextStroke: '2px #f0a500',
                color: 'transparent',
              }}
            >
              Цахим Орчин
            </h2>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #f0a500, transparent)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#f0a500" }} />
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            {[
              {
                num: "01",
                accent: "#f0a500",
                text: "Сургалтын үйл ажиллагаа, академик хөтөлбөр, зар мэдээ болон бүх үйлчилгээг нэг газраас харах боломжтой дижитал орчин.",
                link: "/bsa",
                cta: "Сургалтын алба",
              },
              {
                num: "02",
                accent: "#6eaee7",
                text: "Оюутан бүр суралцах үйл явцаа тодорхой, зохион байгуулалттай, үр дүнтэй удирдах боломжийг бүрдүүлэхэд зориулагдсан.",
                link: "/programs/degree/Үндсэн",
                cta: "Хөтөлбөрүүд",
              },
              {
                num: "03",
                accent: "#a8d4a0",
                text: "Зөвхөн мэдээллийн сан биш — таны академик замналын чиглүүлэгч, дэмжигч, итгэлтэй хөтөч.",
                link: "/services",
                cta: "Оюутны хөгжил",
              },
            ].map(({ num, accent, text, link, cta }) => (
              <div
                key={num}
                className="relative py-1 pl-6 group"
                style={{ borderLeft: `2px solid rgba(255,255,255,0.1)` }}
                onMouseEnter={e => e.currentTarget.style.borderLeftColor = accent}
                onMouseLeave={e => e.currentTarget.style.borderLeftColor = "rgba(255,255,255,0.1)"}
              >
                <span
                  className="block mb-3 text-xs font-black tracking-widest"
                  style={{ color: accent, fontFamily: "'DM Mono', monospace" }}
                >
                  {num}
                </span>
                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Lora', Georgia, serif" }}
                >
                  {text}
                </p>
                <Link
                  to={link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
                  style={{ color: accent, fontFamily: "'DM Mono', monospace" }}
                >
                  {cta}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div
            className="flex flex-col items-start justify-between gap-6 pt-8 mt-14 sm:flex-row sm:items-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Link
              to="/bsa/req"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-200 rounded-full"
              style={{
                background: "#f0a500",
                color: "#1a3a5c",
                fontFamily: "'DM Mono', monospace",
                boxShadow: "0 4px 16px rgba(240,165,0,0.3)",
              }}
            >
              Хүсэлт илгээх
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}
            >
              Мэдээлэл хайх · Шийдвэр гаргах · Боломжуудыг нээх
            </span>
          </div>

        </div>
      </section>
      {/* ─── End Mid Section ─── */}

      {/* News and Announcements */}
      <section className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        <div><NewsPage /></div>
        <div>
          <Announcements />
          <Vid />
        </div>
      </section>
    </div>
  );
};

export default HomePage;