function AdDisplayer() {
  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transform transition-all duration-300 hover:cursor-pointer">
      <div className="flex flex-col md:flex-row items-center space-x-6">
        <img
          src="https://via.placeholder.com/400x250"
          alt="Hostel Image"
          className="w-full md:w-1/2 h-56 rounded-xl object-cover border-2 border-blue-500 shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-extrabold text-blue-400 tracking-wide">
            Property
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Experience a spacious, high-tech hostel with modern facilities and
            smart automation.
          </p>
          <h3 className="text-lg font-semibold">
            Available slots
            <span className="bg-red-600 text-white rounded-full px-5 py-2 text-lg ml-2">
              3
            </span>
          </h3>
          <h2 className="text-3xl font-extrabold text-green-400 tracking-wider">
            Rs 15,000/Month
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AdDisplayer;
