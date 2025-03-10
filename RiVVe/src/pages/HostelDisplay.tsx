import { useEffect, useState } from "react";
import GoogleMapComponent from "../components/googlemap/GoogleMapComponent";
import Navbar from "../components/navbar/navbar";
import AdDisplayer from "../components/ads/AdDisplayer";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";
import FilterContent from "../components/filter/FilterContent";
import SearchBar from "../components/googlemap/SearchBar";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useLocation } from "react-router-dom";
import { Map } from "lucide-react";
import RadiusSlider from "../components/Slider/RadiusSlider";
import { Radius } from "lucide-react";
import axios from "axios";

const HostelDisplay: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(5);
  const [showmap, setShowmap] = useState<boolean>(false);
  const [radiusControl, setRadiusControl] = useState<boolean>(false);
  const [radiusSmallControl, setRadiusSmallControl] = useState<boolean>(false);
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const [listing, setListing] = useState<AdDisplayer[]>([]);
  type Poi = { key: string; location: google.maps.LatLngLiteral };
  const [locations, setLocations] = useState<Poi[]>([]);

  // default checking if the location is searched or if the location is get by default
  useEffect(() => {
    if (location.state?.place?.lat && location.state?.place?.lng) {
      setMapPosition({
        lat: location.state.place.lat,
        lng: location.state.place.lng,
      });
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            setMapPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          (error) => setError(error.message)
        );
      }
    }
    setTimeout(() => setMapLoaded(true), 500);
  }, [location.state]);

  // fetching the ads
  useEffect(() => {
    console.log("triggered with radius chnage");
    const fetchLisiting = async () => {
      // asking for the ads based on the location from the backend

      try {
        const response = await axios.get(
          "http://localhost:5001/api/listing/get-listing",
          { params: { lat: mapPosition.lat, lng: mapPosition.lng, radius } }
        );
        setListing(response.data);
        console.log(response.data);
        console.log(listing.length);

        const locationMarkers = response.data.map((record) => ({
          key: record._id,
          location: {
            lat: record.location.coordinates[1],
            lng: record.location.coordinates[0],
          },
        }));
        setLocations(locationMarkers);
      } catch (error) {
        console.error("Error fetching Listing:", error);
      }
    };
    if (mapPosition.lat && mapPosition.lng) {
      fetchLisiting();
    }
  }, [mapPosition, radius]);

  useEffect(() => {
    console.log("Updated listings: ", listing.length);
    console.log("Updated locations: ", locations);
  }, [listing, locations]);

  // on select of an university the map will be updated with the center
  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place?.geometry?.location) {
      setMapPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const showmapToggle = () => {
    setShowmap(!showmap);
  };

  return (
    <>
      <Navbar />
      {/* top searchbar and filter */}
      <div className="flex gap-50 justify-center items-center mt-20 w-full fixed bg-white/10 shadow-lg py-2 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 md:gap-4 bg-white border border-white/30 shadow-2xl p-2 rounded-3xl transition-all duration-300 hover:shadow-blue-500/50 md:w-120">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="flex items-center gap-3 bg-none">
              <SearchBar onPlaceSelect={onPlaceSelect} />
              <button className="bg-blue-950 text-white font-semibold py-2 px-6 rounded-full hover:scale-110 hover:shadow-[0px_0px_15px_#6366f1] transition-all duration-300">
                Search
              </button>
            </div>
          </APIProvider>
          <div
            className="bg-white/10 p-2 rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-all cursor-pointer hover:scale-110 hover:shadow-[0px_0px_15px_#94a3b8]"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Filter size={30} className="text-black " />
          </div>
        </div>

        {/* radius with animation*/}
        {radiusControl && (
          <motion.div
            className="absolute right-30 w-90 flex p-2 bg-white shadow-lg rounded-lg gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h1>
              Radius <span className="text-2xl font-bold">{radius}Km</span>
            </h1>
            <RadiusSlider radius={radius} setRadius={setRadius} />
          </motion.div>
        )}

        {/* radius icon */}
        <div
          className={`hidden md:block fixed right-5 p-2 bg-gray-200 shadow-lg rounded-full border-white/20 hover:shadow-[0px_0px_15px_#94a3b8] hover:cursor-pointer`}
          onClick={() => setRadiusControl(!radiusControl)}
        >
          <Radius size={30} />
        </div>
      </div>

      {/* filteration */}
      {isExpanded && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto">
            <div className=" bg-gray-400 w-full h-full md:w-[600px] md:h-[700px] flex items-center justify-center rounded-xl shadow-lg overflow-auto">
              <FilterContent
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
              />
            </div>
          </div>
        </>
      )}

      {/* map and ads */}
      <div className="flex flex-col md:flex-row pt-40 px-4 gap-6 relative">
        <div
          className={`w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5 overflow-auto h-screen scrollbar-hidden${
            showmap ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {listing.map((listing) => (
            <div key={listing.id} className="flex justify-center">
              <AdDisplayer {...listing} />
            </div>
          ))}
        </div>

        <div
          className={`w-full md:w-1/2 pl-5 fixed right-0 top-[160px] bg-white shadow-lg transition-all duration-300 ${
            showmap ? "block md:block w-full h-screen" : "hidden md:block"
          }`}
        >
          <GoogleMapComponent
            radius={radius}
            mapPosition={mapPosition}
            setMapPosition={setMapPosition}
            mapLoaded={mapLoaded}
            setMapLoaded={setMapLoaded}
            error={error}
            locations={locations}
          />
        </div>

        {/* small screen map icon */}
        {showmap ? (
          <div
            className="fixed bottom-22 p-3 bg-white right-6 rounded-full shadow-lg "
            onClick={() => setRadiusSmallControl(!radiusSmallControl)}
          >
            <Radius size={25} />
          </div>
        ) : (
          ""
        )}

        {radiusSmallControl && (
          <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-center items-center z-50">
            <RadiusSlider radius={radius} setRadius={setRadius} />
          </div>
        )}
        <div
          className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-full shadow-lg md:hidden"
          onClick={showmapToggle}
        >
          <Map size={25} />
        </div>
      </div>
    </>
  );
};

export default HostelDisplay;
