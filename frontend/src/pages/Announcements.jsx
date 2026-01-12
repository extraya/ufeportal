import { useEffect, useState } from "react";
import { supabase } from "../supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./swiper-fix.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false })
        .order("published_date", { ascending: false });

      setAnnouncements(data || []);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-3xl px-4 py-10 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">
        Announcements
      </h1>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        slidesPerView={1}
        loop={announcements.length > 1}
        autoHeight
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        onSlideChange={(swiper) =>
          setCurrent(swiper.realIndex + 1)
        }
        className="pb-12"
      >
        {announcements.map((a) => (
          <SwiperSlide key={a.id}>
            <div
              className={`rounded-xl p-6 shadow-md bg-white min-h-[180px]
                ${a.priority === "high" && "border-l-4 border-red-500 bg-red-50"}
                ${a.priority === "normal" && "border-l-4 border-blue-500"}
                ${a.priority === "low" && "border-l-4 border-gray-300"}
              `}
            >
              <h3 className="mb-2 text-lg font-semibold">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {a.content}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Numbering UNDER dots */}
      <div className="mt-2 text-sm text-center text-gray-500">
        {current} / {announcements.length}
      </div>
    </div>
  );
}
