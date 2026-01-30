import { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { supabase2 } from "../../supabase2";
import "./calendar.css";

export default function Cal() {
  const [events, setEvents] = useState([]);
  const [isMobileDayView, setIsMobileDayView] = useState(false);
  const calendarRef = useRef(null);

  const TYPE_COLORS = {
    "БСА-ны ажил" : "#0070c0",
    "Оюутны хөгжлийн төвийн ажил" : "#ed7d31",
    "Оюутны холбоо, Оюутны клуб" : "#70ad47",
    "Олон улсын хамтарсан хөтөлбөр": "#7030a0"
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase2.from("calendar").select("*");
    if (error) return console.error(error);

    const formattedEvents = data.map(e => ({
      title: e.title,
      date: e.date,
      backgroundColor: TYPE_COLORS[e.type] || "#9ca3af",
      borderColor: TYPE_COLORS[e.type] || "#9ca3af",
      textColor: "#ffffff",
      extendedProps: { type: e.type }
    }));

    setEvents(formattedEvents);
  };

  // Zoom to a day on mobile
  const zoomToDay = (date) => {
    //if (window.innerWidth <= 768) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView("dayGridDay", date);
      setIsMobileDayView(true);
    //}
  };

  // Clicking a day
  const handleDateClick = (arg) => {
    zoomToDay(arg.date);
  };

  // Clicking an event
  const handleEventClick = (arg) => {
    zoomToDay(arg.event.start);
  };

  // Back to month
  const handleBackToMonth = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("dayGridMonth");
    setIsMobileDayView(false);
  };

  return (
    <div className="p-2 overflow-x-auto bg-white shadow md:p-4 rounded-xl">
      
      {/* LEGEND */}
      <div className="flex flex-wrap justify-center gap-3 mb-2 text-xs md:justify-start md:text-sm">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full md:w-3 md:h-3"></span>
          БСА-ны ажил
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-500 rounded-full md:w-3 md:h-3"></span>
          Оюутны хөгжлийн төвийн ажил
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full md:w-3 md:h-3"></span>
          Оюутны холбоо, Оюутны клуб
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full md:w-3 md:h-3"></span>
          Олон улсын хамтарсан хөтөлбөр
        </span>
      </div>

      {/* Back button for mobile */}
      {isMobileDayView && (
        <button
          onClick={handleBackToMonth}
          className="px-3 py-1 mb-2 text-xs text-white bg-gray-700 rounded-md"
        >
          Сараар харах
        </button>
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dayMaxEventRows={true}
        height="auto"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
}
