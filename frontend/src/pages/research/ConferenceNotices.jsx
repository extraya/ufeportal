import { useEffect, useState } from "react";
import { supabase2 } from "../../supabase2";

export default function ConferenceNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, description, image_url, created_at")
        .eq("type", "Хурлын зар")
        .order("created_at", { ascending: false }); // newest first

      if (error) {
        console.error(error);
      } else {
        setNotices(data);
      }

      setLoading(false);
    };

    fetchNotices();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Уншиж байна...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-gray-800">
        📢 Хурлын зар
      </h2>
      <p className="text-gray-600">
        Болох хурлын зар, дэлгэрэнгүй мэдээлэл.
      </p>

      {notices.length === 0 && (
        <p className="text-gray-500">
          Одоогоор хурлын зар алга.
        </p>
      )}

      {notices.map((post, index) => (
        <article
          key={post.id}
          className={`p-6 bg-white border rounded-2xl shadow-sm ${
            index === 0 ? "ring-2 ring-blue-500" : ""
          }`}
        >
          {/* PIN badge */}
          {index === 0 && (
            <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              📌 Сүүлд нэмэгдсэн зар
            </div>
          )}

          {/* Image */}
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="object-cover w-full mb-4 rounded-xl"
            />
          )}

          {/* Title */}
          <h3 className="mb-2 text-2xl font-bold text-gray-800">
            {post.title}
          </h3>

          {/* Date */}
          {post.created_at && (
            <p className="mb-4 text-sm text-gray-500">
              Нийтэлсэн:{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          )}

          {/* Content */}
          <p className="leading-relaxed text-gray-700 whitespace-pre-line">
            {post.description}
          </p>
        </article>
      ))}
    </div>
  );
}
