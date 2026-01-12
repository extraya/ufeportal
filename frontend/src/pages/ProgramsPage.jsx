import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("id, name, description, duration, degree, image_url")
        .eq("is_active", true)
        .order("name");

      if (!error) setPrograms(data);
    };

    fetchPrograms();
  }, []);

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Хөтөлбөрүүд</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow dark:bg-gray-800 hover:shadow-lg"
          >
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                className="object-cover w-full h-48 sm:h-40 md:h-48"
              />
            )}
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{p.name}</h3>
              <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-gray-500">
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
    </div>
  );
}
