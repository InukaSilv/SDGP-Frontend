function Homesearchbutton() {
  return (
    <>
      <div className="w-auto justify-between bg-white opacity-80 rounded-3xl mt-3 transition-all focus-within:scale-105">
        <span className="p-4">🔎</span>
        <input
          type="text"
          placeholder="Search for University "
          className="border-0 outline-none bg-transparent flex-1 px-2"
        />
        <button className="bg-blue-950 m-4 p-2 text-1xl text-white rounded-3xl px-3">
          search
        </button>
      </div>
    </>
  );
}
export default Homesearchbutton;
