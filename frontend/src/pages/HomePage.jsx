import { Link } from 'react-router-dom';
import NewsPage from './NewsPage';
import Announcements from './Announcements';
import PosterSwiper from './Poster';
import TestInsert from './test';

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
        <div className="container p-6 mx-auto">
          <h1 className="mb-6 text-3xl font-bold">Welcome to Homepage</h1>
          <TestInsert />
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;
