import { Routes, Route, NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Staff from "./Staff";
import Org from "./org";    
import Rules from "./rules";  
import Req from "./req";
import Others from "./others";
import Cal from "./calendar";
import { supabase2 } from "../../supabase2";
import Room from "./rooms";

// React icons
import { 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaRocket, 
  FaChalkboardTeacher 
} from "react-icons/fa";

export default function Bsa() {
  const BASE = "/bsa";

  const menuItems = [
    { title: "Бүрэлдэхүүн", path: "staff" },
    { title: "Бүтэц", path: "org" },
    { title: "Журам", path: "rules" },
    { title: "Хүсэлт гаргах", path: "req" },
    { title: "Бусад албаны чиг үүрэг", path: "others"},
    { title: "Чухал үйл явдал", path: "calendar"},
    { title: "Ангийн хуваарь", path: "rooms"},
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-10 mx-auto md:flex-row max-w-7xl">
      
      {/* Sidebar */}
      <aside className="md:w-64">
        <NavLink to={BASE} className="block group">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 transition group-hover:text-blue-700">
            БАКАЛАВРЫН СУРГАЛТЫН АЛБА
          </h1>
        </NavLink>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${BASE}/${item.path}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition
                 ${isActive
                   ? "bg-blue-600 text-white"
                   : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <Routes>
          {/* INTRO PAGE — WITH NEWS */}
          <Route index element={<BsaIntro />} />

          {/* OTHER PAGES — NO NEWS */}
          <Route path="staff" element={<Staff />} />  
          <Route path="org" element={<Org />} />
          <Route path="rules" element={<Rules />} />
          <Route path="req" element={<Req />} />
          <Route path="others" element={<Others />} />
          <Route path="calendar" element={<Cal />} />
          <Route path="rooms" element={<Room />} />
        </Routes>
      </main>
    </div>
  );
}

/* ================= INTRO PAGE ================= */

function BsaIntro() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, description, image_url, created_at")
        .eq("type", "БСА Зар")
        .order("created_at", { ascending: false })
        .limit(4);
      
      if (!error) setPosts(data || []);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto space-y-10">
      <div className="grid gap-10 lg:grid-cols-2">

        {/* LEFT — TEXT */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Бакалаврын сургалт, судалгааны алба
          </h1>

          <p className="leading-relaxed text-justify text-gray-600">
            Бакалаврын сургалт, судалгааны алба нь бакалаврын түвшний сургалтын
            бодлого, хэрэгжилт, оюутанд чиглэсэн дэмжлэг, академик үйлчилгээ,
            карьер хөгжил, элсэлт болон төгсөлтийн үйл ажиллагааг зохион байгуулж,
            чанартай боловсролын орчныг бүрдүүлэх үндсэн нэгж юм.
          </p>

          <InfoSection
            icon={<FaGraduationCap className="text-blue-600" />}
            title="Сургалтын үйл ажиллагаа"
            items={[
              "Модуль хичээлийн сургалтын зохион байгуулалт",
              "Цагийн хөтөлбөрийн сургалтын хэрэгжилт",
              "Ажлын байранд суурилсан сургалтын хөтөлбөр",
              "Сургалтын төлөвлөгөө, хэрэгжилтийн хяналт",
            ]}
          />

          <InfoSection
            icon={<FaMoneyBillWave className="text-green-600" />}
            title="Тэтгэлэг, санхүүгийн дэмжлэг"
            items={[
              "Ректорын нэрэмжит тэтгэлэг",
              "Буцалтгүй тусламж",
              "ОХЗээл, санхүүгийн дэмжлэг",
            ]}
          />

          <InfoSection
            icon={<FaRocket className="text-red-500" />}
            title="Карьер хөгжил, хөдөлмөр эрхлэлт"
            items={[
              "Оюутны карьер хөгжлийн зөвлөгөө",
              "Хөдөлмөр эрхлэлтийн дэмжлэг",
              "Сайн дурын ажил, нийгмийн дадлага",
            ]}
          />

          <InfoSection
            icon={<FaChalkboardTeacher className="text-yellow-500" />}
            title="Оюутанд чиглэсэн үйлчилгээ"
            items={[
              "Оюутны зөвлөх үйлчилгээ",
              "Санал, гомдол хүлээн авах",
              "Богино хугацааны сургалт",
            ]}
          />
        </div>

        {/* RIGHT — NEWS (INTRO ONLY) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Мэдээ</h2>
            <Link
              to="/newsbsa"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Бүгдийг харах
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {posts.map((post) => (
              <Link
                key={post.id}
                to={`/bsa/news/${post.id}`}
                className="relative flex gap-4 p-4 transition-all bg-white border border-gray-200 shadow-sm group rounded-xl hover:-translate-y-1 hover:shadow-lg hover:border-blue-300"
              >
                {/* IMAGE */}
                {post.image_url && (
                  <div className="relative flex-shrink-0 w-40 h-40 overflow-hidden rounded-lg">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Accent bar */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-600" />
                  </div>
                )}

                {/* CONTENT */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-gray-900 group-hover:text-blue-700">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 line-clamp-6">
                        {post.description}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-2 text-sm font-medium text-blue-600">
                    Дэлгэрэнгүй →
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function InfoSection({ icon, title, items }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 mb-3 text-xl font-semibold text-gray-800">
        {icon} {title}
      </h2>
      <ul className="space-y-1 text-gray-600 list-disc list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
