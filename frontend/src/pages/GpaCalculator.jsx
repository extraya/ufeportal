import { useState } from "react";

export default function GpaCalculator() {
  // University GPA formula
  const scoreToGpa = (score) => {
    if (score > 95) return 4.0;
    if (score > 89) return 3.7;
    if (score > 86) return 3.4;
    if (score > 82) return 3.0;
    if (score > 79) return 2.7;
    if (score > 76) return 2.3;
    if (score > 72) return 2.0;
    if (score > 69) return 1.7;
    if (score > 64) return 1.3;
    if (score > 59) return 1.0;
    return 0.5;
  };

  const [semesters, setSemesters] = useState([
    { name: "Семестр 1", courses: [{ name: "", credits: 3, score: 100 }] },
  ]);

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { name: `Семестр ${semesters.length + 1}`, courses: [] },
    ]);
  };

  const removeSemester = (index) => {
    setSemesters(semesters.filter((_, i) => i !== index));
  };

  const addCourse = (semesterIndex) => {
    const updated = [...semesters];
    updated[semesterIndex].courses.push({ name: "", credits: 3, score: 100 });
    setSemesters(updated);
  };

  const removeCourse = (semesterIndex, courseIndex) => {
    const updated = [...semesters];
    updated[semesterIndex].courses = updated[semesterIndex].courses.filter(
      (_, i) => i !== courseIndex
    );
    setSemesters(updated);
  };

  const updateCourse = (semesterIndex, courseIndex, field, value) => {
    const updated = [...semesters];
    updated[semesterIndex].courses[courseIndex][field] = value;
    setSemesters(updated);
  };

  const calculateSemesterGPA = (courses) => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(({ credits, score }) => {
      totalPoints += Number(credits) * scoreToGpa(Number(score));
      totalCredits += Number(credits);
    });

    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };

  const calculateCumulativeGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((semester) => {
      semester.courses.forEach(({ credits, score }) => {
        totalPoints += Number(credits) * scoreToGpa(Number(score));
        totalCredits += Number(credits);
      });
    });

    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Голч тооцох</h1>

      <div className="space-y-8">
        {semesters.map((semester, sIdx) => (
          <div
            key={sIdx}
            className="p-4 space-y-4 bg-gray-100 rounded-lg shadow"
          >
            {/* Semester Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{semester.name}</h2>
              <button
                onClick={() => removeSemester(sIdx)}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
>
                Семестр устгах
              </button>
            </div>

            {/* Courses */}
            <div className="space-y-3">
              {semester.courses.map((course, cIdx) => (
                <div
                  key={cIdx}
                  className="grid items-center grid-cols-1 gap-3 md:grid-cols-4"
                >
                  <input
                    type="text"
                    placeholder="Хичээлийн нэр"
                    value={course.name}
                    onChange={(e) =>
                      updateCourse(sIdx, cIdx, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Кредит"
                    value={course.credits}
                    onChange={(e) =>
                      updateCourse(sIdx, cIdx, "credits", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Дүн"
                    value={course.score}
                    onChange={(e) =>
                      updateCourse(sIdx, cIdx, "score", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                  <button
                    onClick={() => removeCourse(sIdx, cIdx)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Устгах
                  </button>
                </div>
              ))}
            </div>

            {/* Add Course & Semester GPA */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => addCourse(sIdx)}
                className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Хичээл нэмэх
              </button>
              <div className="text-lg font-semibold">
                Семестрийн голч дүн:{" "}
                <span className="text-blue-600">
                  {calculateSemesterGPA(semester.courses)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Semester & Cumulative GPA */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={addSemester}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Семестр нэмэх
        </button>
        <div className="text-xl font-bold">
          Хуримтлагдсан голч дүн:{" "}
          <span className="text-blue-600">{calculateCumulativeGPA()}</span>
        </div>
      </div>
    </div>
  );
}
