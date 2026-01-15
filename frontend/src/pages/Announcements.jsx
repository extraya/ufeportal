import { useEffect, useState } from "react";
import { supabase } from "../supabase";
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
      const { data } = await supabase
        .from("announcements")
        .select("id, title, priority")
        .eq("is_active", true)
        .order("priority", { ascending: false })
        .order("published_date", { ascending: false });
      setAnnouncements(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="relative p-4 space-y-3 bg-gray-200 rounded">
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
                className={`p-2 bg-white rounded shadow text-xl font-semibold h-full flex items-center justify-center text-center${
                  a.priority === "high"
                    ? "border-l-4 border-red-500 bg-red-50"
                    : a.priority === "normal"
                    ? "border-l-4 border-blue-500"
                    : "border-l-4 border-gray-300"
                }`}
              >
                {a.title}
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
