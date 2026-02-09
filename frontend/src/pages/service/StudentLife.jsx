export default function StudentLife() {
  return (
    <section className="space-y-12">
      {/* HEADER */}
      <header className="p-8 text-white bg-indigo-700 shadow-lg rounded-3xl">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Оюутны амьдрал
        </h2>
        <p className="max-w-2xl mt-3 text-indigo-100">
          Дотуур байр, бүртгэл, суралцах зөвлөгөө – оюутанд хэрэгтэй бүх мэдээлэл.
        </p>
      </header>

      {/* PART 1 */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* ОЮУТНЫ БАЙР */}
        <div className="p-6 transition border border-blue-200 shadow-md rounded-3xl bg-blue-50 hover:shadow-xl">
          <h3 className="flex items-center gap-2 mb-4 text-2xl font-bold text-blue-800">
            🏠 Оюутны байр
          </h3>

          <ul className="space-y-3 text-gray-800">
            <li className="flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
              <span>Нийт багтаамж</span>
              <span className="font-semibold text-blue-700">280 оюутан</span>
            </li>
            <li className="flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
              <span>Уншлагын танхим</span>
              <span className="font-semibold text-blue-700">2</span>
            </li>
            <li className="flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
              <span>Интернэт танхим</span>
              <span className="font-semibold text-blue-700">20 компьютер</span>
            </li>
            <li className="flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
              <span>Интернэт</span>
              <span className="font-semibold text-green-600">Үнэгүй</span>
            </li>
          </ul>

          <div className="p-4 mt-5 text-sm text-blue-900 bg-blue-100 border border-blue-200 rounded-xl">
            📅 <strong>8 сарын 15–30</strong> хооронд өөрийн биеэр ирж гэрээ баталгаажуулна.
          </div>
        </div>

        {/* БҮРТГҮҮЛЭХ */}
        <div className="p-6 transition border shadow-md rounded-3xl border-emerald-200 bg-emerald-50 hover:shadow-xl">
          <h3 className="flex items-center gap-2 mb-4 text-2xl font-bold text-emerald-800">
            📄 Бүртгүүлэх бичиг баримт
          </h3>

          <ul className="space-y-3">
            {[
              "Оюутны үнэмлэх",
              "Төлбөр төлсөн баримт",
              "Сургуулийн тодорхойлолт",
              "Сургалтын албаны байрны зөвшөөрөл",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-xl"
              >
                <span className="text-emerald-600">✔</span>
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CONTACT */}
      <div className="p-8 text-white bg-gray-900 border border-gray-300 shadow-lg rounded-3xl">
        <h3 className="flex items-center gap-2 mb-4 text-2xl font-bold">
          📞 Холбоо барих мэдээлэл
        </h3>
        <p className="leading-relaxed text-gray-200">
          Монгол улс, Улаанбаатар хот, Баянзүрх дүүрэг, 6-р хороо,
          Арслантай гүүр, Оюутны А хотхон
        </p>
        <span className="inline-block px-5 py-2 mt-4 font-semibold text-gray-900 bg-white rounded-full">
          ☎ 99023220
        </span>
      </div>

      {/* PART 2 */}
      <div className="space-y-10">
        <h3 className="text-3xl font-bold text-gray-800">
          🎓 Зөвлөгөө, зөвлөмж
        </h3>

        {/* А ДҮН */}
        <div className="p-6 border border-purple-200 shadow-md rounded-3xl bg-purple-50">
          <h4 className="mb-4 text-xl font-bold text-purple-800">
            ⭐ А дүн авах арга
          </h4>

          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Хичээл эхлэхээс өмнө судлах",
              "Найзуудтайгаа зөвлөлдөх",
              "Идэвхтэй оролцох",
              "Багшийн зөвлөгөөг сонсох",
              "Хичээлээ давтах",
              "Анхаарлаа төвлөрүүлэх",
            ].map((tip) => (
              <li
                key={tip}
                className="p-4 bg-white shadow-sm rounded-xl"
              >
                🎯 {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* ШАЛГАЛТ */}
        <div className="p-6 border border-orange-200 shadow-md rounded-3xl bg-orange-50">
          <h4 className="mb-4 text-xl font-bold text-orange-800">
            📝 Шалгалтаа сайн өгөх арга
          </h4>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h5 className="mb-2 font-semibold text-orange-700">
                Улирал дундын шалгалт
              </h5>
              <ul className="space-y-2">
                <li>⏰ 2–3 хоногийн өмнөөс бэлтгэх</li>
                <li>📚 Агуулгыг тоймлон ойлгох</li>
                <li>🔤 Нэр томьёонд анхаарах</li>
              </ul>
            </div>

            <div className="p-5 bg-white shadow-sm rounded-2xl">
              <h5 className="mb-2 font-semibold text-orange-700">
                Улирал эцсийн шалгалт
              </h5>
              <ul className="space-y-2">
                <li>🧘 Тайван орчин бүрдүүлэх</li>
                <li>💤 Эрүүл мэнддээ анхаарах</li>
                <li>🙋 Багшаас асуух</li>
              </ul>
            </div>
          </div>
        </div>

        {/* БИЕ ДААЛТ */}
        <div className="p-6 border border-teal-200 shadow-md rounded-3xl bg-teal-50">
          <h4 className="mb-4 text-xl font-bold text-teal-800">
            📘 Бие даалт бичих арга
          </h4>

          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Нүүр хуудас хийх",
              "Сургалтын стандарт баримтлах",
              "Товч, тодорхой бичих",
              "Эх сурвалж зөв ашиглах",
              "Хугацаанд нь хураалгах",
              "Бүтэц, шаардлага хангах",
            ].map((item) => (
              <li
                key={item}
                className="p-4 bg-white shadow-sm rounded-xl"
              >
                📌 {item}
              </li>
            ))}
          </ul>

          <p className="p-4 mt-5 text-sm text-teal-900 bg-teal-100 border border-teal-200 rounded-xl">
            💡 Бие даалт нь хариуцлага, төлөвлөлт, бүтээлч сэтгэлгээ,
            багаар ажиллах чадварыг хөгжүүлдэг.
          </p>
        </div>
      </div>
    </section>
  );
}
