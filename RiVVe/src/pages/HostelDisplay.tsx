import GoogleMapComponent from "../components/googlemap/GoogleMapComponent";
import Navbar from "../components/navbar/navbar";

function HostelDisplay() {
  return (
    <>
      <Navbar />
      <div className="justify-between flex">
        <div>
          <h2>for hosts</h2>
        </div>
        <GoogleMapComponent />
      </div>
    </>
  );
}

export default HostelDisplay;
