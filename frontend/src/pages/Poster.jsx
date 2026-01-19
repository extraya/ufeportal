import { useEffect, useState } from "react";

// Poster files in public/posters/
const posterFiles = [
  "poster1.png",
  "poster2.jpg",
  "poster3.png",
];

export default function PosterSwiper() {
  const posters = posterFiles.map((file) => `/posters/${file}`);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-cycle posters
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % posters.length);
        setFade(true);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, [posters.length]);

  // Manual navigation
  const changeSlide = (direction) => {
    setFade(false);
    setTimeout(() => {
      if (direction === "prev") {
        setCurrent((prev) => (prev - 1 + posters.length) % posters.length);
      } else {
        setCurrent((prev) => (prev + 1) % posters.length);
      }
      setFade(true);
    }, 500);
  };

  return (
    <div className="relative flex justify-center w-full py-32 bg-white md:py-40">
      {/* Poster Image */}
      <img
        src={posters[current]}
        alt={`Poster ${current + 1}`}
        className={`w-full max-w-5xl h:auto object-cover rounded-xl shadow-2xl transition-all duration-500 ease-in-out
          ${fade ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
      />

      {/* Left Arrow */}
      <button
        onClick={() => changeSlide("prev")}
        className="absolute p-2 text-3xl text-white transition transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/30 hover:bg-black/50"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => changeSlide("next")}
        className="absolute p-2 text-3xl text-white transition transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/30 hover:bg-black/50"
      >
        &#10095;
      </button>
    </div>
  );
}
