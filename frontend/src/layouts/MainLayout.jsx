import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";


const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo-ufe.png" 
                alt="Logo" 
                className="object-contain w-10 h-10"
              />
              <span className="text-2xl font-bold text-primary">
                БАКАЛАВРЫН СУРГАЛТЫН АЛБА
              </span>
            </Link>

            
            <div className="hidden space-x-8 md:flex">
              <Link to="/" className="text-gray-700 transition-colors hover:text-primary">
                Нүүр Хуудас
              </Link>
              <Link to="/staff" className="text-gray-700 transition-colors hover:text-primary">
                Сургалтын Алба
              </Link>
              <Link to="/research" className="text-gray-700 transition-colors hover:text-primary">
                Эрдэм Шинжилгээ
              </Link>
              <Link to="/services" className="text-gray-700 transition-colors hover:text-primary">
                Оюутны үйлчилгээ
              </Link>
              <Link to="/volunteer" className="text-gray-700 transition-colors hover:text-primary">
                Volunteer
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto text-white bg-[#071b4a]">
        <div className="px-6 py-12 mx-auto max-w-7xl">

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

            {/* Logo + contact */}
            <div className="space-y-4 text-sm text-gray-300">
              <h2 className="text-2xl font-bold text-white">UFE</h2>

              <p>
                БЗД 3-р хороо, Энхтайвны өргөн чөлөө-5, 13381<br />
                Ш/Х: Улаанбаатар-49
              </p>

              <p>
                77771100, 77737777<br />
                77774400, 77248888<br />
                77350000
              </p>

              <p>info@ufe.edu.mn</p>
            </div>

            {/* Links 1 */}
            <div>
              <h3 className="mb-4 text-2xl font-bold">Чухал холбоос</h3>
              <ul className="space-y-2 text-gray-300 text-l">
                <li><Link to="#" className="hover:text-blue">Элсэлт</Link></li>
                <li><Link to="https://infosys.ufe.edu.mn/" className="hover:text-blue">Infosys</Link></li>
                <li><Link to="#" className="hover:text-blue">online.ufe.edu.mn</Link></li>
                <li><Link to="#" className="hover:text-blue">Eoffice</Link></li>
                <li><Link to="#" className="hover:text-blue">G-mail</Link></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div className="pt-8 md:pt-0">
              <ul className="space-y-2 text-gray-300 text-l">
                <li><Link to="/gpa-calculator" className="hover:text-blue">Голч тооцоолуур</Link></li>
                <li><Link to="#" className="hover:text-blue">Номын сангийн систем</Link></li>
                <li><Link to="#" className="hover:text-blue">Бүтээлийн сан</Link></li>
              </ul>
            </div>

            {/* Links 3 */}
            <div className="pt-8 md:pt-0">
              <ul className="space-y-2 text-gray-300 text-l">
                <li><Link to="#" className="hover:text-blue">UFE 100 жил</Link></li>
                <li><Link to="#" className="hover:text-blue">UFE network</Link></li>
                <li><Link to="#" className="hover:text-blue">UFE store</Link></li>
                <li><Link to="#" className="hover:text-blue">UFE Tech</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between pt-8 mt-10 border-t border-blue-900 md:flex-row">

            {/* Social icons */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/ufe.edu.mn" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/ufe.edu.mn/" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/ufe_edu_mn" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <FaTwitter />
              </a>
              <a href="https://www.youtube.com/@ufemedia" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <FaYoutube />
              </a>
              <a href="https://www.linkedin.com/school/ufemongolia/" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <FaLinkedinIn />
              </a>
            </div>

            {/* Copyright */}
            <p className="mt-4 text-sm text-gray-400 md:mt-0">
              © 2026 UFE. All rights reserved.
            </p>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;