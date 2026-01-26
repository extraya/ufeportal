import { useState } from "react";

export default function Rules () {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-center">Бүтэц</h1>

      {/* Preview image */}
      <img
        src="/org_chart.jpg"
        alt="Бакалаврын сургалт судалгааны албаны бүтэц"
        onClick={() => setOpen(true)}
        className="w-full max-w-6xl mx-auto rounded-lg shadow-sm cursor-zoom-in"
      />

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute flex items-center justify-center w-8 h-8 text-black bg-white rounded-full shadow -top-4 -right-4 hover:bg-gray-100"
            >
              ✕
            </button>

            {/* Zoomed image */}
            <img
              src="/org_chart.jpg"
              alt="Бакалаврын сургалт судалгааны албаны бүтэц"
              className="
                max-w-full
                max-h-[90vh]
                rounded-lg
                cursor-zoom-out
              "
            />
          </div>
        </div>
      )}
    </div>
  );
}
