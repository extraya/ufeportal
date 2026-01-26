import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { supabase2 } from "../supabase2";
import Dropdown from "./Dropdown";

const MainLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({}); // Track which mobile dropdowns are open
  const [degrees, setDegrees] = useState([]);

  // Fetch degrees for Programs dropdown
  useEffect(() => {
    const fetchDegrees = async () => {
      const { data, error } = await supabase2
        .from("programs")
        .select("degree")
        .not("degree", "is", null);

      if (!error && data) {
        setDegrees([...new Set(data.map((d) => d.degree))]);
        //console.log("Degrees from DB:", [...new Set(data.map(d => d.degree))]);
      }
    };

    fetchDegrees();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const closeMenu = () => {
      setMenuOpen(false);
      setOpenDropdowns({});
    };
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  // Desktop nav items
  const navItems = [
    { label: "Нүүр Хуудас", link: "/" },
    {
      label: "Хөтөлбөрүүд",
      items: degrees.map((deg) => ({ name: deg, link: `/programs/degree/${deg}` })),
    },
    { label: "Сургалтын Алба", link: "/bsa"},
    { label: "Эрдэм Шинжилгээ", link: "/research"},
    { label: "Оюутны хөгжил", link: "/services" },
    { label: "Volunteer", link: "/volunteer" },
  ];

  // Toggle mobile dropdown
  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo-ufe.png"
                alt="Logo"
                className="object-contain w-10 h-10"
              />
              <span className="text-lg font-bold text-primary sm:text-xl">
                БАКАЛАВРЫН СУРГАЛТЫН АЛБА
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="items-center hidden space-x-8 md:flex">
              {navItems.map((nav) =>
                nav.items ? (
                  <Dropdown key={nav.label} label={nav.label} items={nav.items} />
                ) : (
                  <Link
                    key={nav.label}
                    to={nav.link}
                    className="text-gray-700 hover:text-primary"
                  >
                    {nav.label}
                  </Link>
                )
              )}
            </div>

            {/* MOBILE BURGER */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-primary"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <div
            className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
              menuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMenuOpen(false)}
            ></div>

            {/* Menu panel */}
            <div className="absolute left-0 right-0 mx-3 overflow-hidden bg-white shadow-xl top-16 rounded-b-2xl">
              <nav className="flex flex-col divide-y">
                {navItems.map((nav) =>
                  nav.items ? (
                    <div key={nav.label}>
                      <button
                        onClick={() => toggleDropdown(nav.label)}
                        className="flex items-center justify-between w-full px-5 py-4 text-base font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {nav.label}
                        <span>{openDropdowns[nav.label] ? "−" : "+"}</span>
                      </button>
                      {openDropdowns[nav.label] && (
                        <div className="pl-6 bg-gray-50">
                          {nav.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.link}
                              onClick={() => setMenuOpen(false)}
                              className="block px-5 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            >
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
                      className="block px-5 py-4 text-base text-gray-700 hover:bg-gray-50"
                    >
                      {nav.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto text-white bg-primary">
        <div className="px-6 py-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="space-y-4 text-sm text-gray-300">
              <h2 className="text-2xl font-bold text-white">UFE</h2>
              <p>БЗД 3-р хороо, Энхтайвны өргөн чөлөө-5, 13381</p>
              <p>77771100, 77737777</p>
              <p>info@ufe.edu.mn</p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold">Чухал холбоос</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/gpa-calculator" className="hover:font-extrabold">
                    Голч тооцоолуур
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://admission.ufe.edu.mn/"
                    className="hover:font-extrabold"
                  >
                    Элсэлт
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://infosys.ufe.edu.mn/"
                    className="hover:font-extrabold"
                  >
                    Infosys
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://online.ufe.edu.mn/"
                    className="hover:font-extrabold"
                  >
                    online.ufe.edu.mn
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://eoffice.ufe.edu.mn/"
                    className="hover:font-extrabold"
                  >
                    Eoffice
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold">Санал хүсэлт</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="https://ufeforms.pages.dev/" target="_blank" rel="noopener noreferrer" className="hover:font-extrabold">
                    Оюутны хүсэлтийн маягтууд
                  </a>
                </li>
                <li>
                  <a href="https://ufenu.sharepoint.com/sites/UFE-files/DocLib/pdf%20bolgoson/ajillavar-ufe-2020.pdf?CT=1769401252899&OR=ItemsView" target="_blank" rel="noopener noreferrer" className="hover:font-extrabold">
                    Ажиллавар татах
                  </a>
                </li>
              </ul>
            </div>
            

            <div className="flex space-x-4 text-2xl">
              <a href="https://www.facebook.com/ufe.edu.mn" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/ufe.edu.mn/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/ufe_edu_mn" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.youtube.com/@ufemedia" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="https://www.linkedin.com/school/ufemongolia/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>

          </div>

          <p className="mt-10 text-sm text-center text-gray-400">
            © 2026 БАКАЛАВРЫН СУРГАЛТЫН АЛБА
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
