export default function Handbook() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-gray-600">
          Оюутны гарын авлага
        </p>

        <a
          href="/Handbook.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline whitespace-nowrap hover:text-blue-800"
        >
          PDF татах
        </a>
      </div>

      
      <iframe
        src="/Handbook.pdf"
        className="w-full h-[700px] border rounded"
        title="Оюутны гарын авлага PDF"
      />
      
    </div>
  );
}
