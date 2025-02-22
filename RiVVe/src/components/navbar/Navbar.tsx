import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function Navbar() {
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeMobView = () => {
    setMobileView(!mobileView);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (authToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserRole(user?.role || null);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
        setUserRole(null);
        localStorage.removeItem("user");
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const Logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserRole(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="w-full h-20 fixed top-0 flex items-center justify-between md:px-10 bg-gray-700 text-white shadow-lg z-999">
      <div className="flex items-center space-x-10">
        <h1 className="text-4xl ml-3 sm:text-3xl font-semibold hover:scale-105 transition-transform cursor-pointer">
          RiVVE
        </h1>
        <ul
          className={
            mobileView
              ? "flex-col h-full w-full bg-gray-700 fixed top-20 items-center justify-items-center space-y-10 text-2xl"
              : "hidden md:flex space-x-8 text-lg font-medium"
          }
        >
          <li
            className={
              mobileView
                ? "mt-9"
                : "hover:text-gray-400 cursor-pointer transition"
            }
          >
            <Link to="/"> Home </Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            <Link to="/about"> About </Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            Hostels
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            Contact
          </li>
          {isLoggedIn && userRole === "Landlord" && (
            <li className="hover:text-gray-400 cursor-pointer transition">
              MyAds
            </li>
          )}
        </ul>
      </div>

      <div className="flex items-center space-x-3 sm:ml-7 md:space-x-6">
        {isLoggedIn ? (
          <></>
        ) : (
          <>
            <p className="hidden md:block text-gray-300">Already a member?</p>
            <button className="w-20 sm:w-32 md:w-36 bg-gradient-to-r from-blue-600 to-blue-800 px-4 md:py-2 sm:px-5 py-2 rounded-full text-white font-medium hover:scale-105 cursor-pointer transition">
              <Link to="/login"> Login </Link>
            </button>
            <button className="w-20 sm:w-32 md:w-36 bg-gradient-to-r from-green-500 to-green-700 px-4 md:py-2 sm:px-5 py-2 rounded-full text-white font-medium hover:scale-105 cursor-pointer transition">
              <Link to="/Signup1"> Signup </Link>
            </button>
          </>
        )}

        <div className="relative">
          <div
            className="hidden sm:block p-2 text-5xl bg-gray-700 rounded-full hover:bg-gray-600 transition cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoPersonCircleOutline />
          </div>
          {isOpen && isLoggedIn && (
            <div className="absolute mt-1 right-0 w-48 bg-gray-700 border-none text-white rounded-lg shadow-lg border">
              <ul className="flex flex-col text-lg text-center">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/user">Profile </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={Logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden block text-4xl mr-1 z-50">
        {!mobileView ? (
          <IoMenu
            onClick={changeMobView}
            className="text-white cursor-pointer"
          />
        ) : (
          <IoCloseSharp
            onClick={changeMobView}
            className="text-white cursor-pointer"
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
