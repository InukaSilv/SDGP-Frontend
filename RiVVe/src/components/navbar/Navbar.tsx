import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Mail } from "lucide-react";

function Navbar() {
  const [mobileView, setMobileView] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [issPremium, setIsPremium] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeMobView = () => {
    setMobileView(!mobileView);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);

    if (authToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserRole(user?.role || null);
        setIsPremium(user?.isPremium || false);
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
    <nav className="w-full h-20 fixed top-0 flex items-center justify-between px-4 md:px-10 bg-[#2772A0] text-white shadow-lg z-50">
      <div className="flex items-center space-x-4 md:space-x-10">
        <h1 className="text-2xl md:text-4xl font-semibold hover:scale-105 transition-transform cursor-pointer">
          RiVVE
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-4 lg:space-x-8 text-base lg:text-lg font-medium">
          <li className="hover:text-gray-400 cursor-pointer transition">
            <Link to="/"> Home </Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            <Link to="/about"> About </Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            <Link to="/hostel">Hostels</Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer transition">
            <Link to="/contacts"> Contact</Link>
          </li>
          {isLoggedIn && userRole === "Landlord" && (
            <li className="hover:text-gray-400 cursor-pointer transition">
              <Link to="/MyAds">MyAds</Link>
            </li>
          )}
          {isLoggedIn && userRole === "Student" && (
            <li className="hover:text-gray-400 cursor-pointer transition">
              <Link to="/student-review">Add Review</Link>
            </li>
          )}
          {isLoggedIn && userRole === "Student" && issPremium && (
            <li className="hover:text-gray-400 cursor-pointer transition">
              <Link to="/wishlist">WishList</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {mobileView && (
        <div className="fixed inset-0 top-20 bg-[#2772A0] z-40 md:hidden">
          <ul className="flex flex-col items-center space-y-6 pt-8 text-xl">
            <li className="hover:text-gray-400 cursor-pointer transition">
              <Link to="/" onClick={changeMobView}>
                {" "}
                Home{" "}
              </Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer transition">
              <Link to="/about" onClick={changeMobView}>
                {" "}
                About{" "}
              </Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer transition">
              <Link to="/hostel" onClick={changeMobView}>
                Hostels
              </Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer transition">
              <Link to="/contacts" onClick={changeMobView}>
                {" "}
                Contact
              </Link>
            </li>
            {isLoggedIn && userRole === "Landlord" && (
              <li className="hover:text-gray-400 cursor-pointer transition">
                <Link to="/MyAds" onClick={changeMobView}>
                  MyAds
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === "Student" && (
              <li className="hover:text-gray-400 cursor-pointer transition">
                <Link to="/student-review" onClick={changeMobView}>
                  Add Review
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === "Student" && issPremium && (
              <li className="hover:text-gray-400 cursor-pointer transition">
                <Link to="/wishlist" onClick={changeMobView}>
                  WishList
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="hover:text-gray-400 cursor-pointer transition">
                <Link to="/user" onClick={changeMobView}>
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Auth Buttons and Icons */}
      <div className="flex items-center space-x-2 md:space-x-6">
        {isLoggedIn ? (
          <div className="flex items-center space-x-3">
            {issPremium && (
              <Link to="/message" className="text-xl">
                <Mail />
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="hidden lg:block text-gray-300">Already a member?</p>
            <button className="text-sm md:text-base w-16 md:w-32 bg-gradient-to-r from-blue-600 to-blue-800 px-2 md:px-4 py-2 rounded-full text-white font-medium hover:scale-105 transition">
              <Link to="/login">Login</Link>
            </button>
            <button className="text-sm md:text-base w-16 md:w-32 bg-gradient-to-r from-green-500 to-green-700 px-2 md:px-4 py-2 rounded-full text-white font-medium hover:scale-105 transition">
              <Link to="/Signup1">Signup</Link>
            </button>
          </>
        )}

        {/* Profile Icon */}
        <div className="relative hidden sm:block">
          <div
            className="p-2 text-4xl md:text-5xl bg-[#2772A0] rounded-full hover:bg-gray-600 transition cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoPersonCircleOutline />
          </div>
          {isOpen && isLoggedIn && (
            <div className="absolute mt-1 right-0 w-48 bg-gray-700 text-white rounded-lg shadow-lg">
              <ul className="flex flex-col text-lg text-center">
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer transition">
                  <Link to="/user">Profile</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer transition"
                  onClick={Logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-3xl">
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
      </div>
    </nav>
  );
}

export default Navbar;
