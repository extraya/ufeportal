import { useEffect, useState } from "react";
import { supabase2 } from "../supabase2"; // adjust your import

export default function PosterSwiper() {
  const [posters, setPosters] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Fetch posters from Supabase
  useEffect(() => {
    const fetchPosters = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, image_url") 
        .eq("type", "Пин постер");

      if (error) {
        console.error("Error fetching posters:", error);
        return;
      }

      // Map to just URLs
      setPosters(data.map((item) => item.image_url));
    };

    fetchPosters();
  }, []);

  // Auto-cycle posters
  useEffect(() => {
    if (!posters.length) return; // don't start interval if empty

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % posters.length);
        setFade(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [posters]);

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

  if (!posters.length) return null; // or a loading spinner

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
