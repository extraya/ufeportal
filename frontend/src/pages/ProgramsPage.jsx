import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchDegrees = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("degree")
        .eq("is_active", true)
        .not("degree", "is", null);

      if (!error && data.length > 0) {
        const uniqueDegrees = [...new Set(data.map((d) => d.degree))].sort();
        setDegrees(uniqueDegrees);
        setSelectedDegree(uniqueDegrees[0]); // default
      }
    };

    fetchDegrees();
  }, []);

  
  useEffect(() => {
    if (!selectedDegree) return;

    const fetchPrograms = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("programs")
        .select("id, name, description, duration, degree, image_url")
        .eq("is_active", true)
        .eq("degree", selectedDegree)
        .order("name");

      if (!error) setPrograms(data);
      setLoading(false);
    };

    fetchPrograms();
  }, [selectedDegree]);

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Хөтөлбөрүүд</h1>

      {/* Dropdown */}
      {degrees.length > 0 && (
        <div className="flex justify-center mb-8">
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="px-4 py-2 text-sm bg-white border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {degrees.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Ачааллаж байна...</p>
      ) : programs.length === 0 ? (
        <p className="text-center text-gray-500">
          Энэ түвшний хөтөлбөр олдсонгүй.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-lg dark:bg-gray-800"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="object-cover w-full h-48"
                />
              )}

              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{p.name}</h3>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                  {p.description}
                </p>

                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded dark:bg-gray-700">
                    {p.degree}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded dark:bg-gray-700">
                    {p.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
