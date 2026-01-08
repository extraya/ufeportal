import { Link } from 'react-router-dom';

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
          <Link
            to="/programs"
            className="inline-block px-8 py-3 font-semibold text-blue-600 transition-colors bg-white rounded-lg hover:bg-gray-100"
          >
            Хөтөлбөртэй танилцах
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
        <Link
          to="/news"
          className="p-8 text-center transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl group"
        >
          <div className="mb-4 text-5xl transition-transform group-hover:scale-110">📰</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Мэдээ</h3>
          <p className="text-gray-600">Мэдээлэлээс хоцрохгүй байх</p>
        </Link>

        <Link
          to="/programs"
          className="p-8 text-center transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl group"
        >
          <div className="mb-4 text-5xl transition-transform group-hover:scale-110">🎓</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">БАКАЛАВРЫН хөтөлбөрүүд</h3>
          <p className="text-gray-600">Мэргэжил амжилттай эзэмших</p>
        </Link>

        <Link
          to="/announcements"
          className="p-8 text-center transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl group"
        >
          <div className="mb-4 text-5xl transition-transform group-hover:scale-110">📢</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-800">Зар</h3>
          <p className="text-gray-600">Анхаарах бусад чухал зүйлс</p>
        </Link>
      </section>

      {/* Stats Section */}
      <section className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Бидний нөлөө</h2>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-4">
          <div>
            <div className="mb-2 text-4xl font-bold text-primary">5,000+</div>
            <div className="text-gray-600">Оюутнууд</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-primary">200+</div>
            <div className="text-gray-600">Багш, ажилчид</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-primary">50+</div>
            <div className="text-gray-600">Хөтөлбөрүүд</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-primary">95%</div>
            <div className="text-gray-600">Төгсөлтийн хувь</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;