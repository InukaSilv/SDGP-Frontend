import { useState } from "react";
import GoogleMapComponent from "../components/googlemap/GoogleMapComponent";
import Navbar from "../components/navbar/navbar";
import AdDisplayer from "../components/ads/AdDisplayer";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";
import FilterContent from "../components/filter/FilterContent";

const HostelDisplay: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row px-5 md:px-10 py-10 gap-10 mt-15 relative">
        <div className="w-full md:w-2/5 flex flex-col gap-4 transition-all duration-500">
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

        {/* Map Section */}
        <div className="w-full md:w-3/5 md:fixed md:top-0 md:right-0 md:h-screen flex items-center justify-center p-5 mt-20 ">
          <div className="w-full md:h-full overflow-hidden rounded-xl shadow-lg">
            <GoogleMapComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default HostelDisplay;
