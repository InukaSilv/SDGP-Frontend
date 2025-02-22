import { useEffect, useState } from "react";
import GoogleMapComponent from "../components/googlemap/GoogleMapComponent";
import Navbar from "../components/navbar/navbar";
import AdDisplayer from "../components/ads/AdDisplayer";
import { Filter, Map } from "lucide-react";
import { motion } from "framer-motion";
import FilterContent from "../components/filter/FilterContent";
import SearchBar from "../components/googlemap/SearchBar"; // Import SearchBar
import { APIProvider } from "@vis.gl/react-google-maps";
import RadiusSlider from "../components/Slider/RadiusSlider";
import { useLocation } from "react-router-dom";

const HostelDisplay: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 6.9271,
    lng: 79.8612,
  });
  const [radius, setRadius] = useState<number>(5);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.place?.lat && location.state?.place?.lng) {
      const place = location.state.place;
      setMapCenter({
        lat: place.lat,
        lng: place.lng,
      });
    }
  }, [location.state]);

  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place?.geometry?.location) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const showFilter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('src/assets/map.png')" }}
      ></div> */}
      <Navbar />
      {/* Main */}
      <div className="flex justify-center items-center mt-20 w-full fixed bg-white/10 mb-4 shadow-lg py-2 backdrop-blur-md">
        <div
          className="flex items-center gap-6 backdrop-blur-xl bg-white border border-white/30 shadow-2xl p-2 rounded-3xl 
                  transition-all duration-300 hover:shadow-blue-500/50"
        >
          {/* Search Bar and Button */}
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="flex items-center gap-3">
              <SearchBar onPlaceSelect={onPlaceSelect} />
              <button
                className="bg-blue-950 text-white font-semibold py-2 px-6 rounded-full 
                   hover:scale-110 hover:shadow-[0px_0px_15px_#6366f1] transition-all duration-300 hover:cursor-pointer"
                type="submit"
              >
                Search
              </button>
            </div>
          </APIProvider>

          {/* Filter Icon */}
          <div
            className="bg-white/10 p-2 rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-all 
                    cursor-pointer hover:scale-110 hover:shadow-[0px_0px_15px_#94a3b8]"
            onClick={showFilter}
          >
            <Filter size={30} className="text-black" />
          </div>
        </div>
      </div>
      {/* Dark overlay when filter is expanded */}
      {isExpanded && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-20 pointer-events-none"></div>
      )}
      {/* Filter content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center h-screen mt-2 "
        >
          <div className="bg-gray-400 w-[600px] h-[700px] z-30 flex items-center justify-center rounded-xl shadow-lg">
            <FilterContent
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </div>
        </motion.div>
      )}

      {/* map and and ads */}
      <div className="flex flex-row pt-40">
        <div className="w-1/2 m-0 p-3 mt-3 flex flex-wrap gap-5">
          {[...Array(10)].map(() => (
            <div>
              <AdDisplayer />
            </div>
          ))}
        </div>
        <div>
          <div className=" w-1/2 md:h-full overflow-hidden rounded-xl shadow-lg mt-3 fixed">
            <GoogleMapComponent mapCenter={mapCenter} radius={radius} />
            <button type="submit"></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelDisplay;
