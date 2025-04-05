export function YourLearning() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
      <div className="grid grid-cols-2 gap-4">
        {["React Basics", "Python 101"].map((course) => (
          <div key={course} className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">{course}</h3>
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: "60%" }}
              >
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full bg-green-500 text-white py-2 rounded"
            >
              Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
