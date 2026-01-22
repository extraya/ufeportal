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
          className="object-cover w-full h-64 rounded"
        />
      )}

      {/* Major / Title */}
      <h1 className="text-2xl font-bold text-gray-800">{program.major}</h1>

      {/* Program Info */}
      <div className="space-y-1 text-sm text-gray-600">
        {program.university && <p>🏫 {program.university}</p>}
        {program.degree && <p>🎓 {program.degree}</p>}
        {program.country && program.city && (
          <p>📍 {program.country}, {program.city}</p>
        )}
        {program.tuition && <p>💰 {program.tuition}</p>}
        {program.lang && <p>🗣 Хэл: {program.lang}</p>}
        {program.description && <p>📝 Eрөнхий мэдээлэл: {program.description}</p>}
        {program.duration && <p>⏱ Суралцах хугацаа: {program.duration}</p>}
      </div>


      {/* External URL */}
      {program.video_url && (
        <div className="mt-4">
          <iframe
            width="100%"
            height="300"
            src={program.video_url}
            title={program.major}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
