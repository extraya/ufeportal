import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Staff() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("id, full_name, position, department, bio, image_url, email")
        .eq("is_active", true);

      if (!error && data) {
        const positionOrder = ["Бакалаврын сургалтын албаны дарга", "Бакалаврын сургалтын албаны орлогч дарга", "Сургалтын менежер", "Ахлах мэргэжилтэн", "Мэргэжилтэн", "Зохицуулагч"];
        const sortedData = data.sort(
          (a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
        );

        setStaff(sortedData);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-center">Ажилтчид</h1>

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
                className="object-cover mx-auto mb-4 w-30 h-30"
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
