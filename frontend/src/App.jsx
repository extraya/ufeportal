import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ProgramsPage from './pages/ProgramsPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          
          <Route 
            path="/announcements" 
            element={
              <div className="py-20 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-800">Announcements</h1>
                <p className="text-gray-600">Зар байхгүй байна</p>
              </div>
            } 
          />
          <Route 
            path="/about" 
            element={
              <div className="py-20 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-800">Бидний тухай</h1>
                <p className="text-gray-600">Coming Soon</p>
              </div>
            } 
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;