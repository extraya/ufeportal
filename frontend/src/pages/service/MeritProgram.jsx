export default function MeritProgram() {
  return (
    <section className="space-y-12">
      {/* HEADER */}
      <header className="p-8 text-white shadow-lg rounded-3xl bg-slate-800">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Тэмдэгтийн хөтөлбөр
        </h2>
        <p className="max-w-2xl mt-3 text-slate-300">
          Суралцах, ур чадвар хөгжүүлэх, манлайллыг дэмжих тэмдэгт хөтөлбөрүүд
        </p>
      </header>

      {/* CE BADGE */}
      <div className="p-6 border border-indigo-200 shadow-md rounded-3xl bg-indigo-50">
        <h3 className="mb-5 text-2xl font-bold text-indigo-800">
          🟦 CE Badge хөтөлбөр
        </h3>

        <ul className="grid gap-4 md:grid-cols-2">
          {[
            "СЭЗИС-ийн ёс зүйн дүрэм, кодекстэй танилцах",
            "СЭЗИС-ийн дүрэм, журамтай танилцах",
            "ЭКО СЭЗИС – хаягдал ангилан ялгах, ач холбогдол",
            "Ёс суртахуунлаг СЭЗИС – эерэг, хүндэтгэлтэй орчин бүрдүүлэх",
          ].map((item) => (
            <li
              key={item}
              className="p-4 text-gray-800 bg-white shadow-sm rounded-xl"
            >
              ✅ {item}
            </li>
          ))}
        </ul>

        <div className="p-4 mt-6 text-indigo-900 bg-indigo-100 border border-indigo-200 rounded-xl">
          📝 Дээрх 4 чиглэлээр шалгалт өгч, болзол ханговол
          <strong> “CE BADGE” цахим тэмдэг</strong> олгоно.
        </div>
      </div>

      {/* ART BADGE */}
      <div className="p-6 border shadow-md rounded-3xl border-emerald-200 bg-emerald-50">
        <h3 className="mb-5 text-2xl font-bold text-emerald-800">
          🎨 ART Badge хөтөлбөр
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["⏳ Үргэлжлэх хугацаа", "4 долоо хоног"],
            ["🕒 Хичээлийн хэлбэр", "7 хоногт 1 удаа, 3 цаг"],
            ["📚 Нийт сургалт", "12 цаг"],
            ["💰 Сургалтын төлбөр", "120,000₮"],
            ["💻 Хэлбэр", "Цахим / Танхим хосолсон"],
            ["♾️ Боломж", "Хүссэн бүх сургалтдаа суралцах"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="p-5 bg-white shadow-sm rounded-2xl"
            >
              <p className="text-sm text-gray-500">{title}</p>
              <p className="mt-1 font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 mt-6 md:grid-cols-2">
          <div className="p-4 bg-white shadow-sm rounded-xl">
            🧠 <strong>Зөөлөн ур чадвар</strong> хөгжүүлнэ<br />
            📄 CV баяжуулна<br />
            🧘 Сэтгэл зүйн эрүүл мэндэд эерэг
          </div>

          <div className="p-4 bg-white shadow-sm rounded-xl">
            🔗 Blockchain verified сертификат<br />
            🏅 1-р түвшин – Хүрэл<br />
            🥈 2-р түвшин – Мөнгөн<br />
            🥇 3-р түвшин – Алтан
          </div>
        </div>

        <div className="p-4 mt-5 border rounded-xl border-emerald-200 bg-emerald-100 text-emerald-900">
          👩‍🏫 <strong>ART Mentor оюутан:</strong> дадлагатай, цалинтай ажиллах
          боломжтой (ART Badge авсан байх шаардлагатай).
        </div>
      </div>
    </section>
  );
}
