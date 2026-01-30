import { useEffect, useState } from "react";
import { supabase2 } from "../supabase2";

export default function Vid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, description, created_at")
        .eq("type", "Видео контент")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) console.error(error);
      else setPosts(data);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading news...</p>;

  const getEmbedUrl = (url) => {
    if (!url) return null;

    let videoId = null;
    if (url.includes("youtube.com/watch")) {
      const params = new URLSearchParams(new URL(url).search);
      videoId = params.get("v");
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Видео контент</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((post) => {
          const embedUrl = getEmbedUrl(post.description);

          return (
            <div
              key={post.id}
              className="flex flex-col h-full p-3 transition bg-white rounded shadow hover:shadow-md group"
            >
              {/* Image / Hover video */}
              {post.image_url && embedUrl && (
                <div className="relative w-full mb-2 overflow-hidden rounded h-36">
                  {/* Image */}
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="object-cover w-full transition-opacity duration-300 h-36 group-hover:opacity-0"
                  />

                  {/* Hover iframe */}
                  <iframe
                    src={embedUrl}
                    title={post.title}
                    className="absolute top-0 left-0 w-full transition-opacity duration-300 opacity-0 h-36 group-hover:opacity-100"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Image if no YouTube link */}
              {!post.image_url && embedUrl && (
                <div className="relative w-full mb-2 overflow-hidden rounded h-36">
                  <iframe
                    src={embedUrl}
                    title={post.title}
                    className="absolute top-0 left-0 w-full transition-opacity duration-300 h-36 "
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Title */}
              <p className="flex-1 text-base font-semibold line-clamp-3">{post.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
