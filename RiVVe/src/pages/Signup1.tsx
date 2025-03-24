import { PiStudent } from "react-icons/pi";
import { LuHouse } from "react-icons/lu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function Signup1() {
  const navigate = useNavigate();

  const handleNavigate = (role: string, number: number) => {
    navigate("/signup2", { state: { role, id: number } });
  };

  return (
    <>
      <Navbar />
      <section className="mt-15 md:mt-0 min-h-screen px-4 py-8 md:py-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-gray-600 text-white">
        <div className="text-center w-full max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            Let's Get Started
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl font-medium max-w-xl mx-auto opacity-90 px-4"
            initial={{ opacity: 0.2, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            Choose your role to continue
          </motion.h2>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              className="w-full sm:w-72 h-64 sm:h-80 bg-white/10 border border-blue-400 rounded-3xl shadow-lg flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-blue-300 transition transform duration-300 cursor-pointer px-4"
              initial={{ opacity: 0.2, x: -1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              onClick={() => handleNavigate("Student", 1)}
            >
              <PiStudent className="text-5xl md:text-7xl text-blue-300 mb-4" />
              <h2 className="font-bold text-2xl md:text-3xl">Student</h2>
              <p className="text-sm md:text-md text-gray-200 mt-2 text-center">
                Find trusted hostels for your journey.
              </p>
            </motion.div>

            <motion.div
              className="w-full sm:w-72 h-64 sm:h-80 bg-white/10 border border-green-300 rounded-3xl shadow-lg flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-green-300 transition transform duration-300 cursor-pointer px-4"
              initial={{ opacity: 0.2, x: 1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              onClick={() => handleNavigate("Landlord", 2)}
            >
              <LuHouse className="text-5xl md:text-7xl text-green-300 mb-4" />
              <h2 className="font-bold text-2xl md:text-3xl">Landlord</h2>
              <p className="text-sm md:text-md text-gray-200 mt-2 text-center">
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
