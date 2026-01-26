import { Routes, Route, NavLink } from "react-router-dom";
import About from "./About-us";
import MeritProgram from "./MeritProgram";
import Jobs from "./Jobs";
import ConnectCenter from "./ConnectCenter";
import StudentUnion from "./StudentUnion";
import Clubs from "./Clubs";
import Achievements from "./Achievements";
import Handbook from "./Handbook";
import StudentLife from "./StudentLife";

export default function StudentServices() {
  const BASE = "/services"; // absolute base path

  const menuItems = [
    { title: "Тухай", path: "about" },
    { title: "Тэмдэгтийн хөтөлбөр", path: "merit-program" },
    { title: "Ажлын байр", path: "jobs" },
    { title: "UFE Connect Center", path: "connect-center" },
    { title: "Оюутны холбоо", path: "student-union" },
    { title: "Клуб", path: "clubs" },
    { title: "Амжилтын бүртгэл", path: "achievements" },
    { title: "Оюутны гарын авлага", path: "handbook" },
    { title: "Оюутны амьдрал", path: "student-life" },
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-10 mx-auto md:flex-row max-w-7xl">
      
      {/* Sidebar menu */}
      <aside className="md:w-64">
        <NavLink to={BASE} className="block group">
          <h1 className="mb-6 text-3xl font-bold tracking-wide text-gray-900 transition group-hover:text-blue-700">Оюутны хөгжлийн төв</h1>
        </NavLink>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${BASE}/${item.path}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors 
                 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-800 bg-gray-100"}`
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
          <Route index element={<div className="text-gray-500">Оюутны хөгжилд чиглэсэн үйлчилгээ </div>} />
          <Route path="about" element={<About />} />
          <Route path="merit-program" element={<MeritProgram />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="connect-center" element={<ConnectCenter />} />
          <Route path="student-union" element={<StudentUnion />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="handbook" element={<Handbook />} />
          <Route path="student-life" element={<StudentLife />} />
        </Routes>
      </main>
    </div>
  );
}
