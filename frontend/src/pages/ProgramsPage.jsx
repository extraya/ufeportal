import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase2 } from "../supabase2";
import { FaUniversity, FaMapMarkerAlt } from "react-icons/fa";

export default function ProgramsPage() {
  const { degree } = useParams(); // current selected degree
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const degreeFromState = location.state?.degree || "";
  
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase2
          .from("programs")
          .select(`
            id,
            major,
            university,
            degree,
            country,
            city,
            tuition,
            lang,
            description,
            video_url,
            img_url, 
            duration
          `)
          .eq("degree", degree)
          .order("major");

        if (error) throw error;
        setPrograms(data || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [degree]);

  if (loading) return <p className="mt-20 text-center text-gray-500">Ачааллаж байна...</p>;

  if (!programs.length)
    return <p className="mt-20 text-center text-gray-500">Энэ түвшний хөтөлбөр одоогоор алга байна.</p>;

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">{degree} хөтөлбөрүүд</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <Link
            key={p.id}
            to={`/programs/id/${p.id}`}
            state={{ degree: degree }} // pass degree for back button
            className="relative flex flex-col overflow-hidden transition-shadow bg-white rounded shadow hover:shadow-lg group"
          >
            {p.img_url && (
              <img
                src={p.img_url}
                alt={p.major}
                className="object-cover w-full h-48"
              />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded opacity-0 bg-opacity-40 group-hover:opacity-100">
              <button className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                Дэлгэрэнгүй
              </button>
            </div>

            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{p.major}</h3>

              {p.university && (
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaUniversity className="text-blue-600" /> {p.university}
                </p>
              )}

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-red-500" /> {p.country}, {p.city}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
