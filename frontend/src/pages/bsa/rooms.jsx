import { useEffect, useState, Fragment } from "react";
import { supabase } from "../../supabase";

// --- FLOOR SORT FUNCTION ---
function sortRoomsByFloor(rooms) {
  return rooms.sort((a, b) => {
    const specialRooms = ["БТЗаал"];
    if (specialRooms.includes(a)) return 1;
    if (specialRooms.includes(b)) return -1;

    const matchA = a.match(/^([A-Z]+)(\d+)$/i);
    const matchB = b.match(/^([A-Z]+)(\d+)$/i);

    if (!matchA || !matchB) return a.localeCompare(b);

    const [_, blockA, numA] = matchA;
    const [__, blockB, numB] = matchB;

    if (blockA !== blockB) return blockA.localeCompare(blockB);
    return parseInt(numA) - parseInt(numB);
  });
}

// --- TIME SLOTS ---
const TIME_SLOTS = [
  { start: "07:40", end: "08:30" },
  { start: "08:40", end: "09:30" },
  { start: "09:40", end: "10:30" },
  { start: "10:40", end: "11:30" },
  { start: "11:40", end: "12:30" },
  { start: "12:40", end: "13:30" },
  { start: "14:20", end: "15:10" },
  { start: "15:20", end: "16:10" },
  { start: "16:20", end: "17:10" },
  { start: "17:20", end: "18:10" },
  { start: "18:20", end: "19:10" },
  { start: "19:20", end: "20:10" }
];

const DAYS = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"];

export default function RoomAvailability() {
  const [day, setDay] = useState("Даваа");
  const [schedule, setSchedule] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchSchedule();
  }, [day]);

  // --- FETCH DATA ---
  async function fetchSchedule() {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("day", day)
      .order("room", { ascending: true }); // optional: pre-sort

    if (error) {
      console.error(error);
      return;
    }

    setSchedule(data);

    // extract unique rooms and sort by floor
    const uniqueRooms = [...new Set(data.map(r => r.room))];
    setRooms(sortRoomsByFloor(uniqueRooms));
  }

  // --- HELPER: check if slot is occupied ---
  const isOccupied = (room, slot) => {
    return schedule.some(s => {
      if (s.room !== room) return false;
      return s.start_time < slot.end && s.end_time > slot.start;
    });
  };

  return (
    <div className="p-4 overflow-x-auto">
      {/* DAY SELECTOR */}
      <div className="mb-4">
        <select
          value={day}
          onChange={e => setDay(e.target.value)}
          className="px-3 py-1 border rounded"
        >
          {DAYS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div
        className="grid border"
        style={{ gridTemplateColumns: `120px repeat(${rooms.length}, 120px)` }}
      >
        {/* HEADER */}
        <div className="p-2 font-bold border">Time</div>
        {rooms.map(room => (
          <div key={room} className="p-2 font-bold text-center border">{room}</div>
        ))}

        {/* TIME SLOTS */}
        {TIME_SLOTS.map((slot, index) => (
          <Fragment key={index}>
            {/* TIME LABEL */}
            <div className="p-1 text-sm border">{slot.start} - {slot.end}</div>

            {/* ROOM CELLS */}
            {rooms.map(room => {
              const occupied = isOccupied(room, slot);
              return (
                <div
                  key={room + index}
                  className={`border h-10 flex items-center justify-center text-xs font-semibold
                    ${occupied ? "bg-red-400 text-white" : "bg-green-200 text-black"}`}
                >
                  {occupied ? "Хичээлтэй" : "Чөлөөтэй"}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
