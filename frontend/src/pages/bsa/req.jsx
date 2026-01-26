import { Link } from "react-router-dom";
import {
  FiFileText,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";

export default function Req() {
  const forms = [
    {
      title: "Сургуулиас чөлөөлөгдөх хүсэлт",
      code: "Маягт Б004д",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAApVoLE_wrRRL_o59hYd2L6AZDtCNFvO0fNC0D79bRtEWw?nav=Nzc0MWFkODctZTExZi00MmMwLThlOGEtYjNiMGQ2MjZkMjlm",
    },
    {
      title: "Хичээл нэмүүлэх хүсэлт",
      code: "Маягт Б001",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAA76glLW132Sr5htNaJW_lUAcTU7If2PA9Ch_2xTufpcXc?nav=ZmQ5MzQ2M2YtZTEwNi00YmNmLTk1ZWMtODllNDgxY2M4Y2M2",
    },
    {
      title: "Урт хугацааны чөлөө авах хүсэлт",
      code: "Маягт Б004а",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAB91bBvno3VTaYbobACpv1HAToSv1_KyXAfyTin4YYeyiA?nav=ZmJlYmZlMDEtOTA4OS00Njk0LWFjMDktZDM2YmJjYjU2OWNh",
    },
    {
      title: "Чөлөө дуусгавар болгох хүсэлт",
      code: "Маягт Б004б",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JADKgaIhBcvDTZOSI8j0G7NfAUWpp6Rq9B7snJ-bNhqdQbc?nav=ODZkMzQ3MTUtN2ZkOS00MGVjLWFjYjAtZjYzODJiNjZhMTVm",
    },
    {
      title: "Хөтөлбөр хооронд шилжих, мэргэжил солих хүсэлт",
      code: "Маягт Б003",
      url: "https://forms.office.com/r/9JUNy2Hhru",
    },
    {
      title: "Урт хугацааны чөлөөг сунгах хүсэлт",
      code: "Маягт Б004в",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAC4OESnKtzlSp9hx-gE64XvAecaEmtplZ7yQEa8ptPsgjA?nav=MzU5NDJmMTYtNTZlOC00YzI1LWI0ZjUtYWViNmQ3ZThkMGQ0",
    },
    {
      title: "Хичээл цуцлах хүсэлт",
      code: "Маягт Б001",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAASxZMoL9IDS4I9VFdibvpIAXCLiFNwq47Gz6SRMzOG9ZI?nav=MDAxMDVjZTMtMzgxOS00ZDk5LWFjOGMtOTZiZmM4ZTM4Y2Qy",
    },
  ];

  return (
    <div className="max-w-6xl px-4 py-12 mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Оюутны хүсэлтийн маягтууд
        </h1>
        <p className="text-gray-600">
          Хүсэлт гаргах маягтыг сонгоно уу.
        </p>
      </div>

      {/* Forms */}
      <div className="grid gap-6 sm:grid-cols-2">
        {forms.map((f, i) => (
          <a
            key={i}
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 transition bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 text-blue-600 rounded-lg bg-blue-50">
              <FiFileText size={20} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {f.code}
              </p>
            </div>

            {/* Action */}
            <FiExternalLink className="mt-1 text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
}
