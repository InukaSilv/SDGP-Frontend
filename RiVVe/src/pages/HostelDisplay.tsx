import GoogleMapComponent from "../components/googlemap/GoogleMapComponent";
import Navbar from "../components/navbar/navbar";
import AdDisplayer from "../components/ads/AdDisplayer";

function HostelDisplay() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between px-5 md:px-10 py-10 gap-10 mt-15">
        <div className="flex flex-col gap-8 w-full md:w-1/2 order-2 md:order-none">
          {[...Array(4)].map((_, index) => (
            <AdDisplayer key={index} />
          ))}
        </div>
        <div className="w-full md:w-1/2 md:fixed md:top-0 md:right-0 md:h-screen flex items-center justify-center p-5 mt-20">
          <div className="w-full h-80 md:h-full overflow-hidden rounded-xl shadow-lg">
            <GoogleMapComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default HostelDisplay;
