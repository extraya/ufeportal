import { Link } from "react-router-dom";

export default function Dropdown({ label, items }) {
  return (
    <div className="relative group">
      {/* Main nav item */}
      <span className="text-gray-700 cursor-pointer hover:text-primary">
        {label}
      </span>

      {/* Dropdown menu */}
      <div
        className="absolute left-0 z-50 w-64 text-white transition-all duration-300 transform scale-95 shadow-xl opacity-0 pointer-events-none bg-primary top-full group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
      >
        <ul className="py-3">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className="block px-6 py-3 text-sm transition hover:bg-blue-800"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
