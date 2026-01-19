import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Programs() {
  const { degree } = useParams();

  const [programs, setPrograms] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch degrees
  useEffect(() => {
    const fetchDegrees = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("degree")
        .eq("is_active", true)
        .not("degree", "is", null);

      if (!error && data?.length) {
        const unique = [...new Set(data.map(d => d.degree))].sort();
        setDegrees(unique);

        // URL-аас ирсэн degree valid эсэхийг шалгана
        if (degree && unique.includes(degree)) {
          setSelectedDegree(degree);
        } else {
          setSelectedDegree(unique[0]);
        }
      }
    };

    fetchDegrees();
  }, [degree]);

  // 2️⃣ Fetch programs by degree
  useEffect(() => {
    if (!selectedDegree) return;

    const fetchPrograms = async () => {
      setLoading(true);

      const { data } = await supabase
        .from("programs")
        .select("id, name, description, duration, degree, image_url")
        .eq("is_active", true)
        .eq("degree", selectedDegree)
        .order("name");

      setPrograms(data || []);
      setLoading(false);
    };

    fetchPrograms();
  }, [selectedDegree]);

  // 3️⃣ Loading state
  if (loading) {
    return (
      <p className="mt-20 text-center text-gray-500">
        Ачааллаж байна...
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
          {programs.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden transition-shadow bg-white rounded-lg shadow hover:shadow-lg"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="object-cover w-full h-48"
                />
              )}

              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">
                  {p.name}
                </h3>

                <p className="mb-3 text-sm text-gray-600">
                  {p.description}
                </p>

                <span className="inline-block px-2 py-1 text-sm bg-gray-100 rounded">
                  {p.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
