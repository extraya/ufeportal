import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, image_url")
        .order("published_date", { ascending: false })
        .limit(5);

      if (error) console.error(error);
      else setPosts(data);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading news...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Сүүлийн мэдээ</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/news/${post.id}`}   // ✅ navigate to page
            className="flex flex-col h-full p-3 transition bg-white rounded shadow hover:shadow-md"
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="object-cover w-full h-32 mb-2 rounded"
              />
            )}
            <p className="flex-1 text-base font-semibold line-clamp-3">
              {post.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
