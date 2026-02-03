import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

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

// --- FLOOR GROUPING ---
function getFloor(room) {
  room = room.replace(/С/g, "C");
  if (room === "БТЗаал") return "Спорт Заал";
  const match = room.match(/^([A-Z]+)(\d+)/i);
  if (!match) return "Other";
  const [_, block] = match;
  return block;
}

// --- GET FLOOR NUMBER (for C rooms) ---
function getFloorNumber(room) {
  const match = room.match(/^C(\d+)/i);
  if (!match) return null;
  return Math.floor(parseInt(match[1], 10) / 100); // 707 -> 7, 807 -> 8
}

// --- SORT ROOMS ---
function sortRooms(rooms) {
  const specialRooms = ["БТЗаал"];
  return rooms.sort((a, b) => {
    a = a.replace(/С/g, "C");
    b = b.replace(/С/g, "C");

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

// --- HELPER: overlap ---
function overlaps(classStart, classEnd, slotStart, slotEnd) {
  return classStart < slotEnd && classEnd > slotStart;
}

export default function RoomAvailability() {
  const [day, setDay] = useState("Даваа");
  const [schedule, setSchedule] = useState([]);
  const [floors, setFloors] = useState({}); // {section: [rooms]}

  useEffect(() => {
    fetchSchedule();
  }, [day]);

  async function fetchSchedule() {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("day", day);

    if (error) return console.error(error);

    setSchedule(data);

    const roomMap = { "1-7": [], "8-13": [], "Бусад": [] };

    const uniqueRooms = [...new Set(data.map(r => r.room))];
    uniqueRooms.forEach(room => {
      if (room === "БТЗаал") {
        roomMap["Бусад"].push(room);
        return;
      }
      if (room.startsWith("C")) {
        const floorNum = getFloorNumber(room);
        if (floorNum <= 7) roomMap["1-7"].push(room);
        else roomMap["8-13"].push(room);
      } else {
        roomMap["Бусад"].push(room);
      }
    });

    // Sort each section
    for (const sec in roomMap) {
      roomMap[sec] = sortRooms(roomMap[sec]);
    }

    setFloors(roomMap);
  }

  return (
    <div className="p-4 overflow-auto rounded-lg shadow bg-gray-50">
      {/* Day selector + legend */}
      <div className="flex items-center justify-start mb-4 space-x-6">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-3 py-1 text-sm bg-white border rounded-md hover:border-blue-400"
        >
          {["Даваа","Мягмар","Лхагва","Пүрэв","Баасан"].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-red-400 border rounded-sm"></div>
            <span>Хичээлтэй</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-green-200 border rounded-sm"></div>
            <span>Хичээлгүй</span>
          </div>
        </div>
      </div>

      {/* Timetable grid */}
      <div className="overflow-auto border rounded-lg">
        {Object.entries(floors).map(([section, rooms]) => {
          if (rooms.length === 0) return null;
          return (
            <div key={section} className="mb-6">
              <h2 className="sticky top-0 z-10 px-2 py-1 font-bold bg-gray-200 border-b">
                {section === "Other" ? "Бусад" : `C байр ${section}`}
              </h2>

              {/* Time header + room names */}
              <div className="sticky z-10 flex bg-gray-100 border-b top-6">
                <div className="w-20 py-1 font-semibold text-center border-r">Цаг</div>
                {rooms.map(room => (
                  <div
                    key={room}
                    className="flex-1 py-1 text-xs font-semibold text-center border-r bg-gray-50"
                  >
                    {room}
                  </div>
                ))}
              </div>

              {/* Grid */}
              {TIME_SLOTS.map((slot, idx) => (
                <div key={idx} className="flex border-b">
                  <div className="sticky left-0 w-20 py-1 text-xs font-medium text-center bg-gray-100 border-r z-5">
                    {slot.start}-{slot.end}
                  </div>
                  {rooms.map(room => {
                    const occupied = schedule.some(s =>
                      s.room === room && overlaps(s.start_time, s.end_time, slot.start, slot.end)
                    );
                    return (
                      <div
                        key={room + idx}
                        className={`flex-1 h-8 border-r ${occupied ? "bg-red-400" : "bg-green-200"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
