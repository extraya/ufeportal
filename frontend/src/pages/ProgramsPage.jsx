import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Programs() {
  const { degree } = useParams();

  const [programs, setPrograms] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1️⃣ Fetch all unique degrees
  useEffect(() => {
    const fetchDegrees = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("degree")
        .not("degree", "is", null);

      if (!error && data?.length) {
        const unique = [...new Set(data.map(d => d.degree))].sort();
        setDegrees(unique);

        // set initial selectedDegree from URL or first degree
        if (degree && unique.includes(degree)) {
          setSelectedDegree(degree);
        } else {
          setSelectedDegree(unique[0]);
        }
      } else if (error) {
        console.error("Error fetching degrees:", error);
        setError("Degrees could not be loaded.");
      }
    };

    fetchDegrees();
  }, [degree]);

  // 2️⃣ Fetch programs by selected degree
  useEffect(() => {
    if (!selectedDegree) return;

    const fetchPrograms = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("programs")
          .select(`
            id,
            degree,
            major,
            university,
            country,
            city,
            cost,
            lang,
            transfer,
            admission,
            dorm,
            url,
            img_url
          `)
          // Use ilike to avoid Unicode mismatch issues
          .ilike("degree", selectedDegree)
          .order("major");

        if (error) throw error;

        setPrograms(data || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Programs could not be loaded.");
      }

      setLoading(false);
    };

    fetchPrograms();
  }, [selectedDegree]);

  if (loading) {
    return (
      <p className="mt-20 text-center text-gray-500">
        Ачааллаж байна...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-20 text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">
        {selectedDegree} хөтөлбөрүүд
      </h1>

      {programs.length === 0 ? (
        <p className="text-center text-gray-500">
          Энэ түвшний хөтөлбөр одоогоор алга байна.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map(p => (
            <div
              key={p.id}
              className="overflow-hidden transition-shadow bg-white rounded-lg shadow hover:shadow-lg"
            >
              {p.img_url && (
                <img
                  src={p.img_url}
                  alt={p.major}
                  className="object-cover w-full h-48"
                />
              )}

              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{p.major}</h3>

                <p className="mb-2 text-sm text-gray-600">
                  🏫 {p.university}
                </p>

                <p className="mb-2 text-sm text-gray-600">
                  📍 {p.country}, {p.city}
                </p>

                <p className="mb-2 text-sm text-gray-600">
                  💰 {p.cost}
                </p>

                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="px-2 py-1 bg-gray-100 rounded">{p.lang}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">{p.transfer}</span>
                </div>

                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-sm font-medium text-blue-600 hover:underline"
                  >
                    Дэлгэрэнгүй →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
