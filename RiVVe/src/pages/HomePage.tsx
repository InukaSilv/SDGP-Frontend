import { motion } from "framer-motion";
import SearchBar from "../components/googlemap/SearchBar";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import About from "./About";
import { Search } from "lucide-react";
import { MapPin } from "lucide-react";
import { Building } from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    setSelectedPlace(place);
  };

  const handleSubmit = () => {
    if (selectedPlace) {
      const placeData = {
        name: selectedPlace.name,
        lat: selectedPlace.geometry?.location?.lat(),
        lng: selectedPlace.geometry?.location?.lng(),
      };
      navigate("/hostel", {
        state: { place: placeData },
      });
    } else {
      alert("Please select a university before submitting.");
    }
  };
  return (
    <>
      <section className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('src/assets/main-background.jpeg')] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#27729A]/70 via-[#27729A]/60 to-[#1e5f8a]/90 z-10"></div>
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black/50 text-center px-4 sm:25-6 md:px-8 py-8 sm:py-12 md:py-16">
          {/* Animate Heading */}
          <motion.h1
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 z-20"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e8f8fa] to-[#b8c6e1]">
              Welcome to RiVVE
            </span>
          </motion.h1>

          {/* Animate Subheading */}
          <motion.h2
            className="text-[#e8f8fa] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium max-w-2xl sm:max-w-3xl mx-auto leading-relaxed z-20 mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Your hostel search made easy — find trusted stays for every journey
          </motion.h2>

          {/* Animate Search Button */}
          <motion.div
            className="w-full max-w-2xl sm:max-w-3xl mx-auto z-20 px-2 sm:px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <div className="relative flex items-center bg-white/10 backdrop-blur-md p-1 sm:p-2 rounded-2xl border border-white/20 shadow-xl overflow-hidden group hover:bg-white/15 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3a8bb3] to-[#1e8f8a] opacity-30 blur-md group-hover:opacity-40 transition-opacity duration-300"></div>

                <div className="relative flex flex-col sm:flex-row w-full items-center justify-between bg-white rounded-xl p-2 md:p-3 gap-2 sm:gap-3">
                  <div className="flex items-center w-full flex-1">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#27729A] mr-2 flex-shrink-0" />
                    <SearchBar onPlaceSelect={onPlaceSelect} />
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!selectedPlace}
                    className="bg-gradient-to-r w-full sm:w-auto from-[#27729A] to-[#1e8f8a] text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#1e8f8a]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 text-sm sm:text-base"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </APIProvider>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto z-20 px-2 sm:px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            {[
              {
                icon: <Building className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "Verified Hostels",
                desc: "Quality accommodations verified by our team",
              },
              {
                icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "Prime Locations",
                desc: "Find hostels near your university",
              },
              {
                icon: <Search className="h-5 w-5 sm:h-6 sm:w-6" />,
                title: "See before go",
                desc: "Have a look at your satay before going physically",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/20 text-white"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#3a8bb3]/30 p-2 sm:p-3 rounded-full w-fit mb-2 sm:mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#e8f8fa]/80">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <About />
    </>
  );
}

export default HomePage;
