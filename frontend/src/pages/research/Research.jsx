import { Routes, Route, NavLink } from "react-router-dom";

import Recommendations from "./Recommendations";
import WritingStandards from "./WritingStandards";
import EBSCO from "./EBSCO";
import ConferenceNotices from "./ConferenceNotices";
import Achievements from "./Achievements";
import ConferenceProceedings from "./ConferenceProceedings";
import LibraryLinks from "./LibraryLinks";
import CustomResearch from "./CustomResearch";

export default function Research() {
  const BASE = "/research";

  const menuItems = [
    { title: "Зөвлөмж", path: "recommendations" },
    { title: "Бичилтийн стандарт", path: "writing-standards" },
    { title: "EBSCO", path: "ebsco" },
    { title: "Хурлын зар", path: "conference-notices" },
    { title: "Гаргасан амжилт", path: "achievements" },
    { title: "Хурлын эмхэтгэл", path: "conference-proceedings" },
    { title: "СЭЗИС-ийн бүтээлийн сангийн холбоос", path: "library-links" },
    { title: "Захиалгат судалгааны булан (Зар, бүртгэл)", path: "custom-research" },
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-10 mx-auto md:flex-row max-w-7xl">
      {/* Sidebar menu */}
      <aside className="md:w-64">
        <h1 className="mb-6 text-3xl font-bold">Эрдэм шинжилгээ</h1>
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
          <Route index element={<div className="text-gray-500">Эрдэм шинжилгээний ажилтай холбоотой зөвлөмжүүд</div>} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="writing-standards" element={<WritingStandards />} />
          <Route path="ebsco" element={<EBSCO />} />
          <Route path="conference-notices" element={<ConferenceNotices />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="conference-proceedings" element={<ConferenceProceedings />} />
          <Route path="library-links" element={<LibraryLinks />} />
          <Route path="custom-research" element={<CustomResearch />} />
        </Routes>
      </main>
    </div>
  );
}
