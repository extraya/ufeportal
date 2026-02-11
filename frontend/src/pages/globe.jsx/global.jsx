import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Globe from "react-globe.gl";
import { supabase2 } from "../../supabase2";
import { FaUniversity, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import * as THREE from "three";

// Mongolian -> English
const COUNTRY_NAME_MAP = {
  "Монгол": "Mongolia",
  "Монгол улс": "Mongolia",
  "ОХУ": "Russia",
  "Япон": "Japan",
  "БНСУ": "South Korea",
  "БНХАУ": "China",
  "АНУ": "United States",
  "Герман": "Germany",
  "Австрали": "Australia",
  "Канад улс": "Canada",
  "Япон улс": "Japan",
  "Финланд улс": "Finland",
  "Швейцар улс": "Switzerland",
  "Тайвань улс": "Taiwan",
};

const COUNTRY_COORDS = {
  Mongolia: { lat: 46.86, lng: 103.85 },
  Russia: { lat: 61.52, lng: 105.31 },
  Japan: { lat: 36.2, lng: 138.25 },
  "South Korea": { lat: 36.5, lng: 127.9 },
  China: { lat: 35.9, lng: 104.2 },
  "United States": { lat: 39.8, lng: -98.6 },
  Germany: { lat: 51.1, lng: 10.4 },
  Australia: { lat: -25.3, lng: 133.8 },
  Canada: { lat: 56.13, lng: -106.34 },
  Finland: { lat: 61.92, lng: 25.75 },
  Switzerland: { lat: 46.82, lng: 8.23 },
  Taiwan: { lat: 23.7, lng: 121.0 },
};

const FLAG_CODES = {
  Mongolia: "mn",
  Russia: "ru",
  Japan: "jp",
  "South Korea": "kr",
  China: "cn",
  "United States": "us",
  Germany: "de",
  Australia: "au",
  Canada: "ca",
  Finland: "fi",
  Switzerland: "ch",
  Taiwan: "tw",
};

const getFlagCode = (country) => FLAG_CODES[country] || "un";

// --- Cyberpunk Ring Builder ---
function buildCyberpunkRings(scene) {
  const ringConfigs = [
    {
      innerRadius: 115,
      outerRadius: 117,
      color: 0x00ffe5,   // cyan
      opacity: 0.55,
      rotX: Math.PI / 2,
      rotY: 0,
      rotZ: 0.18,
      dashSpacing: 0,
    },
    {
      innerRadius: 122,
      outerRadius: 123.5,
      color: 0xff00aa,   // magenta
      opacity: 0.45,
      rotX: Math.PI / 2,
      rotY: 0.5,
      rotZ: -0.22,
      dashSpacing: 0,
    },
    {
      innerRadius: 130,
      outerRadius: 131,
      color: 0x7b2fff,   // purple
      opacity: 0.35,
      rotX: 1.2,
      rotY: 0.3,
      rotZ: 0.4,
      dashSpacing: 0,
    },
    {
      innerRadius: 140,
      outerRadius: 140.8,
      color: 0x00ffe5,
      opacity: 0.18,
      rotX: 0.9,
      rotY: -0.4,
      rotZ: 0.55,
      dashSpacing: 0,
    },
  ];

  const rings = [];

  ringConfigs.forEach((cfg) => {
    const geo = new THREE.RingGeometry(cfg.innerRadius, cfg.outerRadius, 256);
    const mat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: cfg.opacity,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = cfg.rotX;
    mesh.rotation.y = cfg.rotY;
    mesh.rotation.z = cfg.rotZ;
    scene.add(mesh);
    rings.push(mesh);
  });

  // Glowing tick marks on the outermost ring
  const tickCount = 72;
  const tickRadius = 140;
  for (let i = 0; i < tickCount; i++) {
    const angle = (i / tickCount) * Math.PI * 2;
    const isLarge = i % 9 === 0;
    const tickGeo = new THREE.BoxGeometry(
      isLarge ? 1.8 : 0.7,
      isLarge ? 6 : 2.5,
      0.2
    );
    const tickMat = new THREE.MeshBasicMaterial({
      color: isLarge ? 0x00ffe5 : 0xff00aa,
      transparent: true,
      opacity: isLarge ? 0.9 : 0.5,
    });
    const tick = new THREE.Mesh(tickGeo, tickMat);
    tick.position.set(
      Math.cos(angle) * tickRadius,
      Math.sin(angle) * tickRadius,
      0
    );
    tick.rotation.z = angle;
    tick.rotation.x = 0.9;
    tick.rotation.y = -0.4;
    // Rotate around z together with ring
    scene.add(tick);
    rings.push(tick);
  }

  return rings;
}

export default function ProgramsGlobePage() {
  const globeRef = useRef();
  const ringsRef = useRef([]);
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("Mongolia");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase2.from("programs").select("*");
        if (error) throw error;
        setPrograms(data || []);
        const initialFiltered = (data || []).filter(
          (p) => COUNTRY_NAME_MAP[p.country] === "Mongolia"
        );
        setFilteredPrograms(initialFiltered);
        const countryCountMap = {};
        data.forEach((p) => {
          const country = COUNTRY_NAME_MAP[p.country];
          if (!country || !COUNTRY_COORDS[country]) return;
          countryCountMap[country] = (countryCountMap[country] || 0) + 1;
        });
        const points = Object.entries(countryCountMap).map(([country, count]) => ({
          country,
          lat: COUNTRY_COORDS[country].lat,
          lng: COUNTRY_COORDS[country].lng,
          count,
        }));
        setCountries(points);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = selectedCountry === "БҮГД" || selectedCountry === "Mongolia";
  }, [selectedCountry]);

  // Animate rings slowly
  useEffect(() => {
    let frameId;
    const animate = () => {
      ringsRef.current.forEach((mesh, i) => {
        if (mesh) {
          mesh.rotation.z += i % 2 === 0 ? 0.0008 : -0.0005;
        }
      });
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  const filterPrograms = (country) => {
    let filtered = [...programs];
    if (country && country !== "БҮГД") {
      filtered = filtered.filter((p) => COUNTRY_NAME_MAP[p.country] === country);
    }
    setFilteredPrograms(filtered);
  };

  const handleCountryClick = (p) => {
    setSelectedCountry(p.country);
    filterPrograms(p.country);
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: p.lat, lng: p.lng, altitude: 1.6 },
        700
      );
    }
  };

  const handleReset = () => {
    setSelectedCountry("БҮГД");
    filterPrograms("БҮГД");
  };

  if (loading)
    return (
      <p className="mt-20 text-center" style={{ color: "#00ffe5" }}>
        Ачааллаж байна...
      </p>
    );
  if (!countries.length)
    return (
      <p className="mt-20 text-center" style={{ color: "#00ffe5" }}>
        Одоогоор ямар ч улс алга.
      </p>
    );

  return (
    <div
      className="w-full px-4 sm:px-6 lg:px-8"
      style={{
        background: "black",
        minHeight: "100vh",
        fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
      }}
    >
      {/* Cyberpunk font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

        .cyber-select {
          background: rgba(0,255,229,0.07);
          border: 1px solid #00ffe5;
          color: #00ffe5;
          padding: 4px 12px;
          border-radius: 4px;
          font-family: 'Orbitron', monospace;
          font-size: 12px;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }
        .cyber-select option {
          background: #0a0a1a;
          color: #00ffe5;
        }
        .cyber-select:focus {
          box-shadow: 0 0 12px #00ffe5aa;
          border-color: #ff00aa;
        }

        .cyber-btn {
          background: transparent;
          border: 1px solid #ff00aa;
          color: #ff00aa;
          padding: 3px 14px;
          border-radius: 3px;
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.08em;
        }
        .cyber-btn:hover {
          background: rgba(255,0,170,0.15);
          box-shadow: 0 0 10px #ff00aaaa;
        }

        .program-card {
          background: rgba(0,255,229,0.04);
          border: 1px solid rgba(0,255,229,0.18);
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.25s;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 300px;
        }
        .program-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background: linear-gradient(135deg, rgba(0,255,229,0.06) 0%, rgba(123,47,255,0.06) 100%);
          opacity: 0;
          transition: opacity 0.25s;
          pointer-events: none;
        }
        .program-card:hover {
          border-color: #00ffe5;
          box-shadow: 0 0 20px rgba(0,255,229,0.25), 0 0 40px rgba(123,47,255,0.12);
          transform: translateY(-2px);
        }
        .program-card:hover::before {
          opacity: 1;
        }

        .program-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.6);
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .program-card:hover .program-overlay {
          opacity: 1;
        }

        .detail-btn {
          padding: 6px 18px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.1em;
          background: transparent;
          border: 1.5px solid #00ffe5;
          color: #00ffe5;
          border-radius: 3px;
          cursor: pointer;
          box-shadow: 0 0 16px rgba(0,255,229,0.4);
          transition: all 0.2s;
          text-decoration: none;
        }
        .detail-btn:hover {
          background: rgba(0,255,229,0.15);
          box-shadow: 0 0 24px rgba(0,255,229,0.6);
        }

        .scan-line {
          pointer-events: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,255,229,0.015) 2px,
            rgba(0,255,229,0.015) 4px
          );
          z-index: 9999;
        }

        .glow-text {
          text-shadow: 0 0 12px #00ffe5, 0 0 24px rgba(0,255,229,0.4);
        }
        .glow-magenta {
          text-shadow: 0 0 10px #ff00aa, 0 0 20px rgba(255,0,170,0.3);
        }
      `}</style>

      {/* Scanline overlay */}
      <div className="scan-line" />

      {/* Header */}
      <header className="pt-8 mb-8 text-center">
        <h1
          className="flex items-center justify-center gap-3 mb-4 text-3xl font-black tracking-widest uppercase glow-text"
          style={{ color: "#00ffe5", letterSpacing: "0.2em" }}
        >
          <FaGlobe style={{ color: "#00ffe5", filter: "drop-shadow(0 0 8px #00ffe5)" }} />
          <span>Хөтөлбөрүүд</span>
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <p style={{ color: "rgba(0,255,229,0.6)", fontSize: "13px", letterSpacing: "0.05em" }}>
            Дэлхийн газрын зураг дээрх тэмдэглэгээг товшоод тухайн улсын хөтөлбөрүүдийг үзнэ.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                style={{ color: "#ff00aa", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em" }}
                className="glow-magenta"
              >
                УЛС:
              </label>
              <select
                className="cyber-select"
                value={selectedCountry}
                onChange={(e) => {
                  const country = e.target.value;
                  setSelectedCountry(country);
                  filterPrograms(country);
                  if (country !== "БҮГД" && COUNTRY_COORDS[country] && globeRef.current) {
                    const coords = COUNTRY_COORDS[country];
                    globeRef.current.pointOfView(
                      { lat: coords.lat, lng: coords.lng, altitude: 1.6 },
                      700
                    );
                  }
                }}
              >
                <option value="БҮГД">БҮГД</option>
                {countries.map((c) => (
                  <option key={c.country} value={c.country}>
                    {c.country} ({c.count})
                  </option>
                ))}
              </select>
            </div>

            {selectedCountry !== "БҮГД" && (
              <button className="cyber-btn" onClick={handleReset}>
                ЦЭВЭРЛЭХ
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #00ffe5, #ff00aa, transparent)",
          marginBottom: "24px",
          opacity: 0.5,
        }}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Globe */}
        <div className="flex-[3] flex justify-center items-start min-h-[400px] lg:min-h-[700px]">
          <Globe
            ref={globeRef}
            width={
              typeof window !== "undefined"
                ? Math.min(window.innerWidth * 0.9, 700)
                : 700
            }
            height={
              typeof window !== "undefined"
                ? Math.min(window.innerWidth * 0.9, 700)
                : 700
            }
            backgroundColor="#000000"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            htmlElementsData={countries}
            htmlLat={(d) => d.lat}
            htmlLng={(d) => d.lng}
            htmlAltitude={() => 0.12}
            htmlElement={(d) => {
              const el = document.createElement("div");
              el.style.pointerEvents = "auto";
              el.style.transform = "translate(-50%, -50%)";
              el.style.zIndex = "5";

              // Glow ring around flag
              el.style.padding = "3px";
              el.style.borderRadius = "4px";
              el.style.boxShadow =
                d.country === selectedCountry
                  ? "0 0 10px #ff00aa, 0 0 20px rgba(255,0,170,0.5)"
                  : "0 0 6px #00ffe5aa";
              el.style.border =
                d.country === selectedCountry
                  ? "1px solid #ff00aa"
                  : "1px solid rgba(0,255,229,0.4)";
              el.style.background = "rgba(0,0,0,0.5)";
              el.style.backdropFilter = "blur(2px)";

              const img = document.createElement("img");
              img.src = `https://flagcdn.com/w40/${getFlagCode(d.country)}.png`;
              img.style.width = "28px";
              img.style.height = "20px";
              img.style.borderRadius = "2px";
              img.style.cursor = "pointer";
              img.style.display = "block";

              img.addEventListener("pointerdown", (e) => e.stopPropagation());
              img.addEventListener("click", () => handleCountryClick(d));
              el.appendChild(img);
              return el;
            }}
            cameraPosition={{ lat: 20, lng: 0, altitude: 2.0 }}
            onGlobeReady={() => {
              if (!globeRef.current) return;

              const controls = globeRef.current.controls();
              controls.enableZoom = true;
              controls.enableRotate = true;
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.8;

              // Inject cyberpunk rings into the Three.js scene
              const scene = globeRef.current.scene();
              const rings = buildCyberpunkRings(scene);
              ringsRef.current = rings;
            }}
          />
        </div>

        {/* Programs list */}
        <div
          className={`flex-1 grid gap-6 sm:grid-cols-1 ${
            filteredPrograms.length > 1 ? "auto-rows-fr" : "auto-rows-auto"
          }`}
        >
          {filteredPrograms.map((p) => (
            <Link
              key={p.id}
              to={`/programs/id/${p.id}`}
              className="program-card"
              style={{ textDecoration: "none" }}
            >
              {p.img_url && (
                <img
                  src={p.img_url}
                  alt={p.major}
                  className="object-cover w-full h-48"
                  style={{ borderBottom: "1px solid rgba(0,255,229,0.15)" }}
                />
              )}
              <div className="program-overlay">
                <span className="detail-btn">ДЭЛГЭРЭНГҮЙ</span>
              </div>
              <div className="flex-1 p-4" style={{ gap: "6px", display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    color: "#00ffe5",
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    marginBottom: "6px",
                    textShadow: "0 0 8px rgba(0,255,229,0.4)",
                  }}
                >
                  {p.major}
                </h3>
                {p.university && (
                  <p
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <FaUniversity style={{ color: "#7b2fff", flexShrink: 0 }} />
                    {p.university}
                  </p>
                )}
                <p
                  style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <FaMapMarkerAlt style={{ color: "#ff00aa", flexShrink: 0 }} />
                  {p.country}, {p.city}
                </p>
              </div>
            </Link>
          ))}

          {filteredPrograms.length === 0 && (
            <p style={{ color: "rgba(0,255,229,0.5)", marginTop: "16px", letterSpacing: "0.08em" }}>
              Сонгосон улсад хөтөлбөр алга байна.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}