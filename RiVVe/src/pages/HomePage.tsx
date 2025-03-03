import { motion } from "framer-motion";
import Navbar from "../components/navbar/navbar";
import Homesearchbutton from "../components/buttons/Homesearchbutton";
import SearchBar from "../components/googlemap/SearchBar";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import About from "./About";


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
      <section className="h-screen bg-cover bg-center bg-no-repeat bg-[url('src/assets/main-background.jpeg')]">
        <Navbar />
        <div className="h-full w-full flex flex-col items-center justify-center bg-black/50 text-center px-4">
          {/* Animate Heading */}
          <motion.h1
            className="text-white text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome to RiVVE
          </motion.h1>

          {/* Animate Subheading */}
          <motion.h2
            className="text-white text-3xl font-medium max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Your hostel search made easy - find trusted stays for every journey
          </motion.h2>

          {/* Animate Search Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <div className="w-100 p-6 py-3.5 flex flex-row justify-between rounded-3xl h-15 text-1xl bg-white text-black border-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5 ">
                <SearchBar onPlaceSelect={onPlaceSelect} />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!selectedPlace}
                  className="bg-blue-950 text-white font-bold py-1 p-4 rounded-3xl m-0 hover:cursor-pointer hover:scale-105 transition"
                >
                  Search
                </button>
              </div>
            </APIProvider>
          </motion.div>
        </div>
        <About/>
      </section>
    </>
  );
}

export default HomePage;
