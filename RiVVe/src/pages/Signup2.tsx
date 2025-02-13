import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Signupform from "../components/forms/Signupform";

function Signup2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, id } = location.state || {};

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 mt-20 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-8 py-12 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl scale-90">
          <h1 className="text-6xl font-extrabold text-white mb-8 text-center tracking-wide">
            Welcome, {role}!
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8">
            Join our platform to unlock amazing features and find the best
            accommodations or tenants.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Signupform role={role} />
            <div className="bg-white/20 p-8 rounded-2xl shadow-xl text-white">
              <h2 className="text-4xl font-bold text-indigo-300 mb-6 text-center">
                Unlock Premium Features
              </h2>
              <ul className="space-y-5 text-lg">
                <li className="flex items-center">
                  <span className="mr-3 text-green-400 text-2xl">✔</span>
                  {id === 1 ? "Access to Exclusive Chat Forum" : "Ads boost"}
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-400 text-2xl">✔</span>
                  {id === 1
                    ? "Get Notified Based on Availability"
                    : "Exclusive insights and reports"}
                </li>
                {id === 1 ? (
                  <li className="flex items-center">
                    <span className="mr-3 text-green-400 text-2xl">✔</span>
                    Save Listings for Later
                  </li>
                ) : (
                  ""
                )}
              </ul>
              <div className="mt-8 space-y-6">
                <div className="bg-indigo-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                    Monthly Plan
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 text-lg">Rs.XXX/month</span>
                    <button className="bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition-all">
                      Choose Plan
                    </button>
                  </div>
                </div>
                <div className="bg-purple-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                    Annual Plan
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 text-lg">
                      Rs.XXX/month (Rs.XXXX total)
                    </span>
                    <button className="bg-purple-500 text-white px-6 py-2 rounded-xl hover:bg-purple-600 transition-all">
                      Choose Plan
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-6 text-center">
                Enjoy uninterrupted access to premium features and find your
                perfect hostel effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup2;
