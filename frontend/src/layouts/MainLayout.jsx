import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import NewsPage from "../pages/NewsPage";

const MainLayout = ({ children }) => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* NAV BAR ROW */}
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo-ufe.png"
                alt="Logo"
                className="object-contain w-10 h-10"
              />
              <span className="text-lg font-bold text-primary sm:text-2xl">
                БАКАЛАВРЫН СУРГАЛТЫН АЛБА
              </span>
            </Link>

            {/* DESKTOP MENU (VISIBLE md+) */}
            <div className="hidden space-x-8 md:flex">
              <Link to="/" className="text-gray-700 hover:text-primary">
                Нүүр Хуудас
              </Link>
              <Link to="/staff" className="text-gray-700 hover:text-primary">
                Сургалтын Алба
              </Link>
              <Link to="/research" className="text-gray-700 hover:text-primary">
                Эрдэм Шинжилгээ
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-primary">
                Оюутны үйлчилгээ
              </Link>
              <Link to="/volunteer" className="text-gray-700 hover:text-primary">
                Volunteer
              </Link>
            </div>

            {/* MOBILE BURGER BUTTON */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-primary focus:outline-none"
                aria-label="Toggle menu"
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
                        ? "M6 18L18 6M6 6l12 12" // ❌ close
                        : "M4 6h16M4 12h16M4 18h16" // ☰ burger
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE MENU PANEL (VISIBLE < md) */}
          <div
            className={`md:hidden fixed inset-x-0 top-16 z-40 transform transition-all duration-300 ${
              menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            <div className="mx-3 mt-3 overflow-hidden bg-white shadow-xl rounded-2xl">
              <nav className="divide-y">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-5 py-4 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Нүүр Хуудас
                </Link>
                <Link
                  to="/staff"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-5 py-4 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Сургалтын Алба
                </Link>
                <Link
                  to="/research"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-5 py-4 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Эрдэм Шинжилгээ
                </Link>
                <Link
                  to="/services"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-5 py-4 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Оюутны үйлчилгээ
                </Link>
                <Link
                  to="/volunteer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-5 py-4 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Volunteer
                </Link>
              </nav>
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>

      {/* FOOTER (UNCHANGED) */}
      <footer className="mt-auto text-white bg-primary">
        <div className="px-6 py-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="space-y-4 text-sm text-gray-300">
              <h2 className="text-2xl font-bold text-white">UFE</h2>
              <p>
                БЗД 3-р хороо, Энхтайвны өргөн чөлөө-5, 13381
              </p>
              <p>77771100, 77737777</p>
              <p>info@ufe.edu.mn</p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold">Чухал холбоос</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/gpa-calculator" className="hover:font-extrabold">Голч тооцоолуур</Link></li>
                <li><Link to="https://admission.ufe.edu.mn/" className="hover:font-extrabold">Элсэлт</Link></li>
                <li><Link to="https://infosys.ufe.edu.mn/" className="hover:font-extrabold">Infosys</Link></li>
                <li><Link to="https://online.ufe.edu.mn/" className="hover:font-extrabold">online.ufe.edu.mn</Link></li>
                <li><Link to="https://eoffice.ufe.edu.mn/" className="hover:font-extrabold">Eoffice</Link></li>
              </ul>
            </div>


            <div />
            <div className="flex space-x-4">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaYoutube />
              <FaLinkedinIn />
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
