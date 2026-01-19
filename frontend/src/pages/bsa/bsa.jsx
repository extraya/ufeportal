import { Routes, Route, NavLink } from "react-router-dom";

import  Staff from "./Staff";
import Org from "./org";

export default function Bsa() {
  const BASE = "/bsa";

  const menuItems = [
    { title: "Ажилчид", path: "staff" },
    { title: "Бүтэц", path: "org" },
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
          <Route index element={<div className="text-gray-500">Бакалаврын сургалт судалгааны алба</div>} />
          <Route path="staff" element={<Staff />} />  
          <Route path="org" element={<Org />} />
        </Routes>
      </main>
    </div>
  );
}
