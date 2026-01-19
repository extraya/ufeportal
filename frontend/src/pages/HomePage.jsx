import { Link } from 'react-router-dom';
import NewsPage from './NewsPage';
import Announcements from './Announcements';
import PosterSwiper from './Poster';

const HomePage = () => {
  return (
    <div>
      <PosterSwiper />

      {/* News and Announcements Side by Side */}
      <section className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        <div>
          <NewsPage />
        </div>
        <div>
          <Announcements />
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
