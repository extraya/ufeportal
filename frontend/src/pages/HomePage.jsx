import { Link } from 'react-router-dom';
import NewsPage from './NewsPage';
import Announcements from './Announcements';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="px-6 py-20 mb-12 text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-4 text-5xl font-bold">
            СЭЗИС БАКАЛАВРЫН СУРГАЛТЫН АЛБА
          </h1>
          <p className="mb-8 text-xl">
            Оюутны нэгдсэн мэдээлэл авах боломж
          </p>
        </div>
      </section>

      

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
