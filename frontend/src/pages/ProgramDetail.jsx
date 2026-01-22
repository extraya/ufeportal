import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function ProgramDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const getEmbedUrl = (url) => {
  if (!url) return null;

  if (url.includes("youtube.com/watch")) {
    const vid = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${vid}`;
  }

  if (url.includes("youtu.be")) {
    const vid = url.split("/").pop();
    return `https://www.youtube.com/embed/${vid}`;
  }

  return url; // fallback
};


  // Get degree for back button
  const degreeFromState = location.state?.degree || "";

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data, error } = await supabase
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
          .eq("id", Number(id)) // Works even if id is string
          .single();

        if (error) throw error;

        if (!data) {
          setError("Хөтөлбөр олдсонгүй.");
        } else {
          setProgram(data);
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
        setError("Хөтөлбөрийг авахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  if (loading)
    return (
      <p className="mt-20 text-center text-gray-500">Ачааллаж байна...</p>
    );

  if (error)
    return (
      <p className="mt-20 text-center text-red-500">{error}</p>
    );

  return (
    <div className="max-w-4xl p-4 mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() =>
          degreeFromState
            ? navigate(`/programs/degree/${degreeFromState}`)
            : navigate("/programs")
        }
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        ← Буцах
      </button>

      {/* Image */}
      {program.img_url && (
        <img
          src={program.img_url}
          alt={program.major}
          className="object-cover w-full rounded-xl max-h-[420px]"
        />
      )}

      {/* Major / Title */}
        <h1 className="mb-4 text-3xl font-semibold text-slate-900">
          {program.major}
        </h1>

        {/* Program Information */}
        <div className="p-5 border rounded-lg border-slate-200 bg-slate-50">
          <h2 className="mb-3 text-lg font-medium text-slate-800">
            Хөтөлбөрийн мэдээлэл
          </h2>

          <dl className="grid text-sm gap-y-2 text-slate-700">
            {program.university && (
              <div className="flex">
                <dt className="w-40 font-medium">Их сургууль:</dt>
                <dd>{program.university}</dd>
              </div>
            )}

            {program.degree && (
              <div className="flex">
                <dt className="w-40 font-medium">Хөтөлбөрийн төрөл:</dt>
                <dd>{program.degree}</dd>
              </div>
            )}

            {(program.country || program.city) && (
              <div className="flex">
                <dt className="w-40 font-medium">Байршил:</dt>
                <dd>
                  {[program.country, program.city].filter(Boolean).join(", ")}
                </dd>
              </div>
            )}

            {program.tuition && (
              <div className="flex">
                <dt className="w-40 font-medium">Сургалтын төлбөр:</dt>
                <dd>{program.tuition}</dd>
              </div>
            )}

            {program.lang && (
              <div className="flex">
                <dt className="w-40 font-medium">Суралцах хэл:</dt>
                <dd>{program.lang}</dd>
              </div>
            )}

            {program.duration && (
              <div className="flex">
                <dt className="w-40 font-medium">Суралцах хугацаа:</dt>
                <dd>{program.duration}</dd>
              </div>
            )}
          </dl>
        </div>

        {program.description && (
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-medium text-slate-800">
              Хөтөлбөрийн тайлбар
            </h3>
            <p className="leading-relaxed text-justify text-slate-700 ">
              {program.description}
            </p>
          </div>
      )}




      {program.video_url && (
        <div className="w-full overflow-hidden bg-black rounded-xl aspect-video">
          <iframe
            src={getEmbedUrl(program.video_url)}
            title="Program video"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}


    </div>
  );
}
