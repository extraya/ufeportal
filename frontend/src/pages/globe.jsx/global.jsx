import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Globe from "react-globe.gl";
import { supabase2 } from "../../supabase2";
import { FaUniversity, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

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

// Country coordinates
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

const COUNTRY_FLAGS = {
  Mongolia: "https://flagcdn.com/w40/mn.png",
  Russia: "https://flagcdn.com/w40/ru.png",
  Japan: "https://flagcdn.com/w40/jp.png",
  "South Korea": "https://flagcdn.com/w40/kr.png",
  China: "https://flagcdn.com/w40/cn.png",
  "United States": "https://flagcdn.com/w40/us.png",
  Germany: "https://flagcdn.com/w40/de.png",
  Australia: "https://flagcdn.com/w40/au.png",
  Canada: "https://flagcdn.com/w40/ca.png",
  Finland: "https://flagcdn.com/w40/fi.png",
  Switzerland: "https://flagcdn.com/w40/ch.png",
  Taiwan: "https://flagcdn.com/w40/tw.png",
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

export default function ProgramsGlobePage() {
  const globeRef = useRef();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState("БҮГД");
  const [isRotating, setIsRotating] = useState(true);

  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase2.from("programs").select("*");
        if (error) throw error;

        setPrograms(data || []);
        setFilteredPrograms(data || []);

        // Count programs per country
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

  // Auto-rotate globe continuously
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.autoRotate = isRotating;
  }, [isRotating]);


  const handleCountryClick = (p) => {
    const controls = globeRef.current.controls();

    controls.autoRotate = false; // pause only
    setIsRotating(false);

    setSelectedCountry(p.country);
    filterPrograms(selectedDegree, p.country);

    globeRef.current.pointOfView(
      { lat: p.lat, lng: p.lng, altitude: 1.6 },
      700
    );
  };



  const handleDegreeChange = (e) => {
    const degree = e.target.value;
    setSelectedDegree(degree);
    filterPrograms(degree, selectedCountry);
  };

  const handleReset = () => {
    const controls = globeRef.current.controls();

    controls.autoRotate = true;
    setIsRotating(true);

    setSelectedCountry(null);
    setFilteredPrograms(programs);
  };



  const filterPrograms = (degree, country) => {
    let filtered = [...programs];
    if (degree !== "БҮГД") filtered = filtered.filter((p) => p.degree === degree);
    if (country) filtered = filtered.filter((p) => COUNTRY_NAME_MAP[p.country] === country);
    setFilteredPrograms(filtered);
  };

  if (loading)
    return <p className="mt-20 text-center text-gray-500">Ачааллаж байна...</p>;
  if (!countries.length)
    return <p className="mt-20 text-center text-gray-500">Одоогоор ямар ч улс алга.</p>;

  const degrees = ["БҮГД", ...new Set(programs.map((p) => p.degree))];

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <header className="mb-8 text-center">
        <h1 className="flex items-center justify-center gap-2 mb-4 text-3xl font-bold">
          <FaGlobe className="text-blue-600" /> Хөтөлбөрүүд
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <p className="text-gray-600">
            Дэлхийн газрын зураг дээрх тэмдэглэгээг товшоод тухайн улсын хөтөлбөрүүдийг үзнэ.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Түвшин:</label>
              <select
                value={selectedDegree}
                onChange={handleDegreeChange}
                className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {degrees.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {selectedCountry && (
              <div className="flex items-center gap-2 text-gray-500">
                Сонгосон улс: <b>{selectedCountry}</b>
                <button
                  onClick={handleReset}
                  className="px-2 py-1 text-xs text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  Цэвэрлэх
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Globe */}
        <div className="flex-[3] flex justify-center items-start min-h-[700px]">
          <Globe
            ref={globeRef}
            width={700}
            height={700}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

            htmlElementsData={countries}
            htmlLat={(d) => d.lat}
            htmlLng={(d) => d.lng}
            htmlAltitude={() => 0.12}

            htmlElement={(d) => {
              const el = document.createElement("div");
              el.style.pointerEvents = "auto";
              el.style.transform = "translate(-50%, -50%)";
              el.style.zIndex = "5";

              const img = document.createElement("img");
              img.src = `https://flagcdn.com/w40/${getFlagCode(d.country)}.png`;
              img.style.width = "28px";
              img.style.height = "20px";
              img.style.borderRadius = "3px";
              img.style.cursor = "pointer";
              img.style.boxShadow = "0 2px 6px rgba(0,0,0,.4)";

              img.addEventListener("pointerdown", (e) => {
                e.stopPropagation(); // 🔴 reliable
              });

              img.addEventListener("click", () => {
                handleCountryClick(d);
              });

              el.appendChild(img);
              return el;
            }}

            cameraPosition={{ lat: 20, lng: 0, altitude: 2.0 }}
            animateIn
          />

        </div>

        {/* Programs */}
        <div
          className={`grid flex-1 gap-6 sm:grid-cols-1 ${
            filteredPrograms.length > 1 ? "auto-rows-fr" : "auto-rows-auto"
          } items-start`}
        >
          {filteredPrograms.map((p) => (
            <Link
              key={p.id}
              to={`/programs/id/${p.id}`}
              className="relative flex flex-col overflow-hidden transition-shadow bg-white rounded shadow hover:shadow-lg group min-h-[400px]"
            >
              {p.img_url && (
                <img src={p.img_url} alt={p.major} className="object-cover w-full h-48" />
              )}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded opacity-0 bg-opacity-40 group-hover:opacity-100">
                <button className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Дэлгэрэнгүй
                </button>
              </div>
              <div className="flex-1 p-4 space-y-1">
                <h3 className="mb-1 text-lg font-semibold">{p.major}</h3>
                {p.university && (
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUniversity className="text-blue-600" /> {p.university}
                  </p>
                )}
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-red-500" /> {p.country}, {p.city}
                </p>
              </div>
            </Link>
          ))}

          {filteredPrograms.length === 0 && (
            <p className="mt-4 text-gray-500">Сонгосон улсад хөтөлбөр алга байна.</p>
          )}
        </div>
      </div>
    </div>
  );
}
