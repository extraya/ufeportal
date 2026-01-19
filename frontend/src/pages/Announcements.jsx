import { useEffect, useState } from "react";
import { supabase2 } from "../supabase2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper-fix.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, description")
        .eq("type", "Зар")
        .order("created_at", { ascending: false });

      if (!error) {
        setAnnouncements(data || []);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative p-4 space-y-3 rounded">
      <h2 className="text-lg font-bold text-gray-800">Зар</h2>

      {announcements.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={announcements.length > 1}
          autoplay={
            announcements.length > 1
              ? { delay: 4000, disableOnInteraction: false }
              : false
          }
          pagination={announcements.length > 1 ? { clickable: true } : false}
          navigation={announcements.length > 1}
          className="h-[180px] pb-8"
          onSlideChange={(swiper) => setCurrent(swiper.realIndex + 1)}
        >
          {announcements.map((a) => (
            <SwiperSlide key={a.id}>
              <div className="flex flex-col justify-between h-full p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-md">
                
                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {a.title}
                  </h3>

                  {a.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {a.description}
                    </p>
                  )}
                </div>

                {/* Read more */}
                <div className="pt-3">
                  <button
                    onClick={() => navigate(`/news/${a.id}`)}
                    className="w-full px-4 py-2 mb-4 text-sm font-medium text-blue-700 transition-colors rounded-md bg-blue-50 hover:bg-blue-100 hover:text-blue-900"
                  >
                    Дэлгэрэнгүй →
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-400">
          Одоогоор зар байхгүй байна
        </p>
      )}

      {/* Counter */}
      {announcements.length > 1 && (
        <div className="text-sm text-center text-gray-500">
          {current} / {announcements.length}
        </div>
      )}
    </div>
  );
}
