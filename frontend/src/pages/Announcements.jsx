import { useEffect, useState } from "react";
import { supabase2 } from "../supabase2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper-fix.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase2
        .from("news")
        .select("id, title, description")
        .eq("type", "Зар")
        .order("created_at", { ascending: false });
      setAnnouncements(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="relative p-4 space-y-3 rounded">
      <h2 className="text-lg font-bold text-gray-800">Зар</h2>

      {announcements.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={announcements.length > 1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation={true} 
          className="h-[150px]"
          onSlideChange={(swiper) => setCurrent(swiper.realIndex + 1)}
        >
          {announcements.map((a) => (
            <SwiperSlide key={a.id}>
              <div
                className={`flex flex-col justify-center items-start p-4 h-full bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl text-center
                  ${
                    a.priority === "high"
                      ? "border-l-4 border-red-500 bg-red-50"
                      : a.priority === "normal"
                      ? "border-l-4 border-blue-500 bg-blue-50"
                      : "border-l-4 border-gray-300 bg-gray-50"
                  }`}
              >
                <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
                {a.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {a.description}
                  </p>
                )}
              </div>
            </SwiperSlide>

          ))}
        </Swiper>
      )}

      <div className="text-center text-gray-500 text-s">
        {current} / {announcements.length}
      </div>
    </div>
  );
}
