export default function EBSCO() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">EBSCO</h2>
      <p className="mb-4 text-gray-600">
        EBSCO мэдээллийн сангийн холбогдол, хандалт.
      </p>

      <iframe
        src="https://www.ufe.edu.mn/pdf/2019/gariin-avlaga-EBSCO-1.pdf"
        className="w-full h-[700px] border rounded"
        title="EBSCO PDF"
      />
      <a
        href="https://www.ufe.edu.mn/pdf/2019/gariin-avlaga-EBSCO-1.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-4 text-blue-600 underline"
      >
        PDF татах
      </a>
    </div>
  );
}
