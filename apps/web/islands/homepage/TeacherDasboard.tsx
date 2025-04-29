export function TeacherDashboard() {
  return (
    <div className="relative">
      <div className="p-4 opacity-25">
        <h2 className="text-xl font-bold mb-4">Teacher Dashboard</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">
              Courses Pending Your Review
            </h3>
            <p className="text-sm text-gray-500">
              You have 3 courses to review.
            </p>
            <button
              type="button"
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
              Review Now
            </button>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">Your Drafts</h3>
            <p className="text-sm text-gray-500">
              You have 2 courses in progress.
            </p>
            <button
              type="button"
              className="mt-4 w-full bg-yellow-500 text-white py-2 rounded"
            >
              Continue Editing
            </button>
          </div>
        </div>
      </div>

      <div class="absolute inset-0 bg-red-400 bg-opacity-50 cursor-not-allowed flex items-center justify-center z-10 rounded-xl">
        <span class="text-white text-2xl font-semibold">Work in Progress</span>
      </div>
    </div>
  );
}
