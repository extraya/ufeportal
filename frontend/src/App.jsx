import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ProgramsPage from './pages/ProgramsPage';
import Announcements from './pages/Announcements';
import Staff from './pages/staff';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;