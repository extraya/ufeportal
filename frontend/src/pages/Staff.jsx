import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Staff() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("id, full_name, position, department, bio, image_url, email")
        .eq("is_active", true)
        .order("full_name");

      if (!error) setStaff(data);
    };

    fetchStaff();
  }, []);

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-center">Багш, Ажилтнууд</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {staff.map((s) => (
          <div
            key={s.id}
            className="p-6 text-center transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
          >
            {s.image_url && (
              <img
                src={s.image_url}
                alt={s.full_name}
                className="object-cover mx-auto mb-4 rounded-full w-28 h-28"
              />
            )}
            <h3 className="text-lg font-semibold">{s.full_name}</h3>
            <p className="font-bold text-gray-700">{s.position}</p>
            <p className="mb-2 text-sm text-gray-500">{s.department}</p>
            <p className="mb-2 text-sm text-gray-600">{s.bio}</p>
            {s.email && (
              <a
                href={`mailto:${s.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {s.email}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
