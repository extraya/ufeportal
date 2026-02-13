import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import NewsPage from './NewsPage';
import Announcements from './Announcements';
import PosterSwiper from './Poster';
import Vid from './vid';

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

// ── Intersection observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Stat item ─────────────────────────────────────────────────────────────
function StatItem({ value, suffix = '', label, inView }) {
  const count = useCountUp(value, 1600, inView);
  return (
    <div className="flex flex-col items-center">
      <span
        style={{
          fontSize: '2.8rem',
          fontWeight: 900,
          lineHeight: 1,
          color: '#f0a500',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.03em',
        }}
      >
        {count}{suffix}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.4rem' }}>
        {label}
      </span>
    </div>
  );
}

// ── Pillar card ───────────────────────────────────────────────────────────
function PillarCard({ num, accent, text, link, cta, delay }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '1.75rem',
        borderRadius: '2px',
        border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.07)'}`,
        background: hovered
          ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)`
          : 'transparent',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: hovered ? '48px' : '0px',
        height: '2px',
        background: accent,
        transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '2px',
        height: hovered ? '48px' : '0px',
        background: accent,
        transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.25rem',
      }}>
        <span style={{
          fontSize: '0.65rem',
          fontWeight: 900,
          letterSpacing: '0.25em',
          color: accent,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {num}
        </span>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
      </div>

      <p style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '0.875rem',
        lineHeight: 1.75,
        marginBottom: '1.5rem',
      }}>
        {text}
      </p>

      <Link
        to={link}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: hovered ? '#fff' : accent,
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
      >
        {cta}
        <svg style={{ width: '12px', height: '12px', transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
const HomePage = () => {
  const [statsRef, statsInView] = useInView(0.3);
  const [headRef, headInView] = useInView(0.1);

  const pillars = [
    {
      num: '01',
      accent: '#f0a500',
      text: 'Сургалтын үйл ажиллагаа, академик хөтөлбөр, зар мэдээ болон бүх үйлчилгээг нэг газраас харах боломжтой дижитал орчин.',
      link: '/bsa',
      cta: 'Сургалтын алба',
    },
    {
      num: '02',
      accent: '#6eaee7',
      text: 'Оюутан бүр суралцах үйл явцаа тодорхой, зохион байгуулалттай, үр дүнтэй удирдах боломжийг бүрдүүлэхэд зориулагдсан.',
      link: '/programs/degree/Үндсэн',
      cta: 'Хөтөлбөрүүд',
    },
    {
      num: '03',
      accent: '#a8d4a0',
      text: 'Зөвхөн мэдээллийн сан биш — таны академик замналын чиглүүлэгч, дэмжигч, итгэлтэй хөтөч.',
      link: '/services',
      cta: 'Оюутны хөгжил',
    },
  ];

  return (
    <div>
      <PosterSwiper />

      {/* ─── Hero Intro Section ────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '6rem 1.5rem 5rem',
          overflow: 'hidden',
          background: 'var(--color-primary, #0f2540)',
        }}
      >
        {/* ── Fine grid ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />

        {/* ── Radial glow top-left ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 0% 0%, rgba(240,165,0,0.08) 0%, transparent 70%)',
        }} />

        {/* ── Radial glow bottom-right ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 60% at 100% 100%, rgba(78,134,198,0.1) 0%, transparent 70%)',
        }} />

        {/* ── Diagonal gold slice ── */}
        <div style={{
          position: 'absolute', top: 0, left: '-4rem', height: '100%', width: '18rem',
          background: 'linear-gradient(135deg, rgba(240,165,0,0.06) 0%, transparent 60%)',
          transform: 'skewX(-8deg)',
          pointerEvents: 'none',
        }} />

        {/* ── Subtle scan lines ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
        }} />

        <div ref={headRef} style={{ position: 'relative', maxWidth: '64rem', margin: '0 auto' }}>

          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem',
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.6s ease',
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#f0a500' }} />
              <span style={{ display: 'block', width: '8px', height: '2px', background: 'rgba(240,165,0,0.4)' }} />
            </div>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#e8c96a',
            }}>
              Оюутны Платформ · UFE
            </span>
          </div>

          {/* ── Headline ── */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#fff',
              margin: 0,
              opacity: headInView ? 1 : 0,
              transform: headInView ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s',
            }}>
              Нэгдсэн
            </h2>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              WebkitTextStroke: '2px #f0a500',
              color: 'transparent',
              margin: 0,
              opacity: headInView ? 1 : 0,
              transform: headInView ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s',
            }}>
              Цахим Орчин
            </h2>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '3.5rem',
            opacity: headInView ? 1 : 0,
            transition: 'opacity 0.6s ease 0.35s',
          }}>
            <div style={{ flex: 1, maxWidth: '180px', height: '1px', background: 'linear-gradient(90deg, #f0a500, transparent)' }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#f0a500', boxShadow: '0 0 8px #f0a50080' }} />
          </div>

          {/* ── Pillar cards ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '4rem',
          }}>
            {pillars.map((p, i) => (
              <div key={p.num} style={{ background: '#0f2540' }}>
                <PillarCard {...p} delay={i * 120} />
              </div>
            ))}
          </div>

          {/* ── Stats strip ── */}
          <div
            ref={statsRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.5rem',
              justifyContent: 'space-around',
              padding: '2rem',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '4px',
              marginBottom: '3rem',
              backdropFilter: 'blur(4px)',
              opacity: headInView ? 1 : 0,
              transition: 'opacity 0.6s ease 0.5s',
            }}
          >
            <StatItem value={4200} suffix="+" label="Оюутан" inView={statsInView} />
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
            <StatItem value={60} suffix="+" label="Хөтөлбөр" inView={statsInView} />
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
            <StatItem value={98} suffix="%" label="Хариу өгөх" inView={statsInView} />
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
            <StatItem value={24} suffix="/7" label="Үйлчилгээ" inView={statsInView} />
          </div>

          {/* ── CTA row ── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            opacity: headInView ? 1 : 0,
            transition: 'opacity 0.6s ease 0.6s',
          }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/bsa/req"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: '#f0a500',
                  color: '#0f2540',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(240,165,0,0.35)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fdb62c'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(240,165,0,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f0a500'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(240,165,0,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Хүсэлт илгээх
                <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '2px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                Үйлчилгээнүүд
              </Link>
            </div>

            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>
              Мэдээлэл хайх · Шийдвэр гаргах · Боломжуудыг нээх
            </span>
          </div>

        </div>
      </section>
      {/* ─── End Intro Section ────────────────────────────────────────────── */}

      {/* ─── Divider band ──────────────────────────────────────────────────── */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #f0a500 30%, #6eaee7 60%, transparent)',
        opacity: 0.6,
      }} />

      {/* ─── News & Announcements ─────────────────────────────────────────── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
          padding: '1.5rem',
        }}
      >
        <div>
          <NewsPage />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Announcements />
          <Vid />
        </div>
      </section>
    </div>
  );
};

export default HomePage;