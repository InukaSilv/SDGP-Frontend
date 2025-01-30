import Navbar from "../components/navbar/navbar";
import { PiStudent } from "react-icons/pi";
import { LuHouse } from "react-icons/lu";
import { easeIn, motion } from "framer-motion";

function Signup1() {
  return (
    <>
      <Navbar />
      <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-gray-600 text-white">
        <div className="text-center">
          <motion.h1
            className="text-5xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            Let’s Get Started
          </motion.h1>
          <motion.h2
            className="text-2xl font-medium max-w-xl mx-auto opacity-90"
            initial={{ opacity: 0.2, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            Choose your role to continue
          </motion.h2>

          <div className="mt-10 flex flex-col sm:flex-row gap-6">
            <motion.div
              className="w-72 h-80 bg-white/10 border border-blue-400 rounded-3xl shadow-lg flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-blue-300 transition transform duration-300 cursor-pointer"
              initial={{ opacity: 0.2, x: -1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
            >
              <PiStudent className="text-7xl text-blue-300 mb-4" />
              <h2 className="font-bold text-3xl">Student</h2>
              <p className="text-md text-gray-200 mt-2 text-center px-5">
                Find trusted hostels for your journey.
              </p>
            </motion.div>

            <motion.div
              className="w-72 h-80 bg-white/10 border border-green-300 rounded-3xl shadow-lg flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-green-300 transition transform duration-300 cursor-pointer"
              initial={{ opacity: 0.2, x: 1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
            >
              <LuHouse className="text-7xl text-green-300 mb-4" />
              <h2 className="font-bold text-3xl">Landlord</h2>
              <p className="text-md text-gray-200 mt-2 text-center px-5">
                List your hostel and find the best tenants.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup1;
