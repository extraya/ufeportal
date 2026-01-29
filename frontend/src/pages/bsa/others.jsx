import { MapPin, Phone } from "lucide-react";

function Department({ title, children }) {
  return (
    <section className="p-6 space-y-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
      <header className="pb-3 border-b">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </header>
      {children}
    </section>
  );
}

export default function Others() {
  return (
    <div className="max-w-6xl px-4 py-10 mx-auto space-y-12">

      {/* Бүртгэл, чанарын алба */}
      <Department title="Бүртгэл, чанарын алба">
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Албаны зорилго</h3>
          <p className="leading-relaxed text-gray-700">
            Доктор, магистр, бакалаврын болон шаталсан сургалттай хөтөлбөрүүдийн
            элсэхийг хүсэгч, суралцагчийн шилжилт хөдөлгөөн, дүн, төлбөрийн
            бүртгэлийн мэдээллийн нэгдсэн санг үүсгэж зохих алба нэгжүүдийг
            хангаж ажиллах.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Албаны үндсэн чиг үүрэг</h3>
          <ul className="pl-5 space-y-1 text-gray-700 list-disc">
            <li>Элсэгчдийн мэдээллийг (анкетын асуулгаар) авах;</li>
            <li>Суралцагчдын мэдээллийн сан үүсгэх;</li>
            <li>Улирлын төгсгөлд суралцагчдын дүнг баталгаажуулах;</li>
            <li>Хичээл сонголтын үйл явцыг зохион байгуулах;</li>
            <li>Суралцагчдын шилжилт хөдөлгөөнийг бүртгэх;</li>
            <li>Цахим үнэмлэх хэвлэх, олгох;</li>
            <li>Дүнгийн тодорхойлолтоор үйлчлэх;</li>
            <li>Диплом, хавсралтыг хэвлэх, баталгаажуулах;</li>
            <li>Кредитийн мэдээллийг баталгаажуулах;</li>
            <li>Эцэг, эхэд сурлагын мэдээлэл хүргэх;</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Холбоо барих</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> С байрны 301 тоот</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 70008085-2030</span>
          </div>
        </section>
      </Department>

      {/* Мэдээллийн технологийн алба */}
      <Department title="Мэдээллийн технологийн алба">
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Албаны зорилго</h3>
          <p className="leading-relaxed text-gray-700">
            Сургуулийн үйл ажиллагааг дижитал технологиор дэмжиж,
            дижитал их сургууль болох стратегийг хэрэгжүүлэхэд чиглэнэ.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Албаны үндсэн чиг үүрэг</h3>
          <ul className="pl-5 space-y-1 text-gray-700 list-disc">
            <li>Мэдээллийн систем, дотоод платформуудыг хөгжүүлэх;</li>
            <li>Сургалтын болон захиргааны системийг дэмжих;</li>
            <li>Оюутны карьер хөгжлийг дижитал орчноор дэмжих;</li>
            <li>Мэдээллийн аюулгүй байдлыг хангах;</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Холбоо барих</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> B байрны 401 тоот</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 70158820</span>
          </div>
        </section>
      </Department>

      {/* Эдийн засаг, санхүүгийн алба */}
      <Department title="Эдийн засаг, санхүүгийн алба">
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Албаны зорилго</h3>
          <p className="leading-relaxed text-gray-700">
            Сургуулийн санхүү, төсөв, төлбөр тооцооны үйл ажиллагааг
            ил тод, үр ашигтай зохион байгуулах замаар сургалтын
            тогтвортой байдлыг хангана.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Албаны үндсэн чиг үүрэг</h3>
          <ul className="pl-5 space-y-1 text-gray-700 list-disc">
            <li>Сургалтын төлбөр, хураамжийн тооцоолол хийх;</li>
            <li>Оюутны төлбөрийн үлдэгдэл, тайлан гаргах;</li>
            <li>Төлбөртэй холбоотой лавлагаа, тодорхойлолтоор үйлчлэх;</li>
            <li>Тэтгэлэг, хөнгөлөлтийн санхүүгийн тооцоо хийх;</li>
            <li>Сургуулийн төсөв, санхүүгийн тайлан боловсруулах;</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-lg font-medium">Холбоо барих</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> C байр 302 тоот</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 77774400-2-1</span>
          </div>
        </section>
      </Department>

    </div>
  );
}
