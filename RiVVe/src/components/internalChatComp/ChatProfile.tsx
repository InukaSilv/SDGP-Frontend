function ChatProfile() {
  return (
    <div className="flex items-center gap-3 p-2 justify-between rounded-lg hover:bg-gray-200 cursor-pointer border-b-1 border-gray-500">
      <figure className="w-[60px] h-[60px] rounded-full overflow-hidden">
        <img
          src="src/assets/perosn.jpg"
          alt="person"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="mr-55">
        <h1 className="text-[18px] font-semibold text-gray-900">
          Knight rider
        </h1>
        <p className="text-gray-600 ">Hey there how is it going</p>
      </div>
      <div className="">
        <h2>12:34 PM</h2>
      </div>
    </div>
  );
}
export default ChatProfile;
