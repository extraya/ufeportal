import { Routes, Route, NavLink } from "react-router-dom";

import  Staff from "./Staff";
import Org from "./org";
import Rules from "./rules";

export default function Bsa() {
  const BASE = "/bsa";

  const menuItems = [
    { title: "Бүрэлдэхүүн", path: "staff" },
    { title: "Бүтэц", path: "org" },
    { title: "Журам", path: "rules" },
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-10 mx-auto md:flex-row max-w-7xl">
      {/* Sidebar menu */}
      <aside className="md:w-64">
        <NavLink to={BASE} className="block group">
          <h1 className="mb-6 text-3xl font-bold tracking-wide text-gray-900 transition group-hover:text-blue-700">
            БАКАЛАВРЫН СУРГАЛТЫН АЛБА
          </h1>
        </NavLink>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${BASE}/${item.path}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors 
                 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-800"}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          <Route
            index
            element={
              <div className="max-w-5xl px-4 py-10 mx-auto space-y-8">
                
                <h1 className="text-3xl font-bold text-gray-800">
                  Бакалаврын сургалт, судалгааны алба
                </h1>

                <p className="leading-relaxed text-justify text-gray-600">
                  Бакалаврын сургалт, судалгааны алба нь бакалаврын түвшний сургалтын
                  бодлого, хэрэгжилт, оюутанд чиглэсэн дэмжлэг, академик үйлчилгээ,
                  карьер хөгжил, элсэлт болон төгсөлтийн үйл ажиллагааг зохион байгуулж,
                  чанартай боловсролын орчныг бүрдүүлэх үндсэн нэгж юм.
                </p>

                <section>
                  <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    🎓 Сургалтын үйл ажиллагаа
                  </h2>
                  <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    <li>Модуль хичээлийн сургалтын зохион байгуулалт</li>
                    <li>Цагийн хөтөлбөрийн сургалтын хэрэгжилт</li>
                    <li>Ажлын байранд суурилсан сургалтын хөтөлбөр</li>
                    <li>Сургалтын төлөвлөгөө, хэрэгжилтийн хяналт</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    💰 Тэтгэлэг, санхүүгийн дэмжлэг
                  </h2>
                  <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    <li>Ректорын нэрэмжит тэтгэлэг</li>
                    <li>Буцалтгүй тусламж</li>
                    <li>ОХЗээл, санхүүгийн дэмжлэг</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    🚀 Карьер хөгжил, хөдөлмөр эрхлэлт
                  </h2>
                  <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    <li>Оюутны карьер хөгжлийн зөвлөгөө</li>
                    <li>Хөдөлмөр эрхлэлтийн дэмжлэг</li>
                    <li>Сайн дурын ажил, нийгмийн дадлага</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    🧑‍🏫 Оюутанд чиглэсэн үйлчилгээ
                  </h2>
                  <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    <li>Оюутны зөвлөх үйлчилгээ</li>
                    <li>Санал, гомдол хүлээн авах</li>
                    <li>Богино хугацааны сургалт</li>
                  </ul>
                </section>

              </div>
            }
          />

          <Route path="staff" element={<Staff />} />  
          <Route path="org" element={<Org />} />
        </Routes>
      </main>
    </div>
  );
}
