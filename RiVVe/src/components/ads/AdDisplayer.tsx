function AdDisplayer() {
  return (
    <div className="w-full shadow-lg bg-gradient-to-b from-blue-100 to-white-20 rounded-4xl justify-between flex">
      <div className="p-5">
        <h1 className="text-2xl font-medium">Property Topic</h1>
        <p className="text-gray-600 text-sm">
          Spacious modern hostels with 5 rooms
        </p>
        <h2>
          {" "}
          Available Slots{" "}
          <span className="bg-red-700 text-white p-3 rounded-3xl py-2">3</span>
        </h2>
        <h1 className="text-black font-bold mt-2 text-1xl">Rs 15,000/Month</h1>
      </div>
      <div className="w-1/2 p-5">
        <img
          src="src/assets/main-background.jpeg"
          alt="propertyimage"
          className="rounded-3xl"
        />
      </div>
    </div>
  );
}

export default AdDisplayer;
