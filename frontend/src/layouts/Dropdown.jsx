import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";

export default function Dropdown({ label, items }) {
  return (
    <div className="relative group">

      {/* Trigger */}
      <button
        className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-200"
        style={{
          color: "rgba(255,255,255,0.80)",
          fontFamily: "'DM Sans', sans-serif",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {label}

        {/* Chevron */}
        <svg
          className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          style={{ color: "#e8c96a" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>

        {/* Underline */}
        <span
          className="absolute bottom-0 h-px transition-transform duration-200 origin-left scale-x-0 left-3 right-3 group-hover:scale-x-100"
          style={{ background: "#f0a500" }}
        />
      </button>

      {/* Panel */}
      <div
        className="absolute left-0 z-50 w-56 pt-2 transition-all duration-200 opacity-0 pointer-events-none top-full group-hover:opacity-100 group-hover:pointer-events-auto"
        style={{ transform: "translateY(-6px)" }}
      >
        <style>{`
          .dropdown-group:hover .dropdown-panel {
            transform: translateY(0) !important;
          }
          .group:hover .dropdown-panel-inner {
            transform: translateY(0px);
            opacity: 1;
          }
        `}</style>

        {/* Arrow notch */}
        <div
          className="w-3 h-3 ml-4 rotate-45"
          style={{
            background: "#0f2744",
            border: "1px solid rgba(240,165,0,0.3)",
            borderBottom: "none",
            borderRight: "none",
            marginBottom: "-6px",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Menu box */}
        <div
          style={{
            background: "#0f2744",
            border: "1px solid rgba(240,165,0,0.2)",
            borderRadius: "12px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Gold top accent */}
          <div style={{ height: 2, background: "linear-gradient(90deg, #f0a500, #e8c96a, transparent)" }} />

          <ul className="py-2">
            {items.map((item, i) => {
              const isGlobe = item.link === "/globe";

              return (
                <li key={item.name}>
                  {/* Divider before Globe */}
                  {isGlobe && (
                    <div className="mx-4 my-1" style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
                  )}

                  <Link
                    to={item.link}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150"
                    style={{
                      color: isGlobe ? "#e8c96a" : "rgba(255,255,255,0.70)",
                      fontFamily: "'DM Sans', sans-serif",
                      position: "relative",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = isGlobe ? "#ffd966" : "#ffffff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = isGlobe ? "#e8c96a" : "rgba(255,255,255,0.70)";
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.paddingLeft = "16px";
                    }}
                  >
                    {/* Index number or globe icon */}
                    {isGlobe ? (
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-full"
                        style={{ background: "rgba(240,165,0,0.15)", color: "#f0a500", flexShrink: 0 }}
                      >
                        <FaGlobe size={10} />
                      </span>
                    ) : (
                      <span
                        className="text-[10px] font-black tabular-nums"
                        style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", minWidth: 16 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}

                    <span className={isGlobe ? "font-bold" : "font-medium"}>
                      {item.name}
                    </span>

                    {/* Arrow on hover — rendered via CSS trick with an svg */}
                    <svg
                      className="w-3 h-3 ml-auto transition-all duration-150 -translate-x-1 opacity-0"
                      style={{ color: isGlobe ? "#f0a500" : "rgba(255,255,255,0.3)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      data-arrow
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Bottom label */}
          <div
            className="px-4 py-2.5 flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}
            >
              UFE · Хөтөлбөрүүд
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}