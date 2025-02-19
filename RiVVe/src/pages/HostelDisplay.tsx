import { useState } from "react";
import GoogleMapComponent from "../components/googlemap/GoogleMapComponent";
import Navbar from "../components/navbar/navbar";
import AdDisplayer from "../components/ads/AdDisplayer";
import { Filter, Map } from "lucide-react";
import { motion } from "framer-motion";
import FilterContent from "../components/filter/FilterContent";
import SearchBar from "../components/googlemap/SearchBar"; // Import SearchBar
import { APIProvider } from "@vis.gl/react-google-maps";

const HostelDisplay: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 6.9271,
    lng: 79.8612,
  });

  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place?.geometry?.location) {
      setMapCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <>
      <Navbar />
      {/* Move SearchBar to the top */}

      <div className="flex flex-col md:flex-row px-5 md:px-10 py-10 gap-10 mt-15 relative">
        <div className="w-full md:w-2/5 flex flex-col gap-4 transition-all duration-500">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="w-90 text-center mt-1">
              <SearchBar onPlaceSelect={onPlaceSelect} />
            </div>
          </APIProvider>
          <motion.div
            className="w-full bg-gray-400 text-white overflow-hidden shadow-lg rounded-3xl"
            initial={{ height: "40px" }}
            animate={{ height: isExpanded ? "50vh" : "40px" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div
              className="flex items-center justify-between cursor-pointer p-3 h-10 text-lg font-semibold bg-gray-800 rounded-3xl"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-3">
                <Filter size={24} />
                <span>Filters</span>
              </div>
              <span className="text-sm opacity-80">
                {isExpanded ? "Hide" : "Show"}
              </span>
            </div>
            {isExpanded && (
              <div className="p-5 h-[calc(50vh-40px)] overflow-auto">
                <FilterContent />
              </div>
            )}
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 transition-all duration-500"
            animate={{
              opacity: isExpanded ? 0.5 : 1,
              height: isExpanded ? "50%" : "auto",
            }}
          >
            {[...Array(4)].map((_, index) => (
              <AdDisplayer key={index} />
            ))}
          </motion.div>
        </div>

        {/* Map Toggle Button for Mobile */}
        <div className="md:hidden flex justify-center py-3">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-gray-700 transition"
            onClick={() => setShowMap(!showMap)}
          >
            <Map size={20} /> {showMap ? "Hide Map" : "Show Map"}
          </button>
        </div>

        {/* Map Section */}
        <div
          className={`w-full md:w-3/5 md:fixed md:top-20 md:right-0 md:h-screen flex items-center justify-center p-5 mt-2 transition-all duration-500 ${
            showMap ? "block" : "hidden md:flex"
          }`}
        >
          <div className="w-full md:h-full overflow-hidden rounded-xl shadow-lg">
            <GoogleMapComponent mapCenter={mapCenter} />
            <button type="submit"></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelDisplay;
