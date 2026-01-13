import { Link } from 'react-router-dom';

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
              <Link to="/news" className="text-gray-700 transition-colors hover:text-primary">
                Мэдээ
              </Link>
              <Link to="/programs" className="text-gray-700 transition-colors hover:text-primary">
                Хөтөлбөрүүд
              </Link>
              <Link to="/announcements" className="text-gray-700 transition-colors hover:text-primary">
                Зарууд
              </Link>
              <Link to="/staff" className="text-gray-700 transition-colors hover:text-primary">
                Бидний тухай
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
      <footer className="mt-auto text-white bg-gray-800">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-3 text-center">
            {/* Footer links */}
            <div className="flex space-x-6 text-sm">
              <Link
                to="/gpa-calculator"
                className="text-gray-300 transition hover:text-white"
              >
                GPA Calculator
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © 2026. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;