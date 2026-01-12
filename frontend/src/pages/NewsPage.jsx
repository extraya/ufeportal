import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-lg text-center text-gray-500">Loading...</p>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Мэдээ</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow dark:bg-gray-800 hover:shadow-lg"
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="object-cover w-full h-48"
              />
            )}
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {post.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
