import { motion } from "framer-motion";
import Navbar from "../components/navbar/navbar";
import Homesearchbutton from "../components/homesearchbutton/Homesearchbutton";

function HomePage() {
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
            <Homesearchbutton />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
