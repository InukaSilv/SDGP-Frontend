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
      <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] mt-20 flex items-center justify-center">
        <div className="max-w-9xl mx-auto px-8 py-12 bg-[#3a85b3]/30 backdrop-blur-lg rounded-3xl shadow-2xl my-5">
          <h1 className="text-6xl font-extrabold text-[#60A5FA] mb-8 text-center tracking-wide">
            Welcome, {role}!
          </h1>
          <p className="text-xl text-[#3a85b3] text-center mb-8">
            Join our platform to unlock amazing features and find the best
            accommodations or tenants.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <Signupform role={role} />
            <div className="bg-[#e0ebf3]/50 p-8 rounded-r-2xl shadow-xl text-[#1e5f8a]">
              <h2 className="text-4xl font-bold text-[#2772A0] mb-6 text-center">
                Unlock Premium Features
              </h2>
              <ul className="space-y-5 text-lg">
                <li className="flex items-center">
                  <span className="mr-3 text-[#2772A0] text-2xl">✔</span>
                  {id === 1 ? "Access to Exclusive Chat Forum" : "Ads boost"}
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-[#2772A0] text-2xl">✔</span>
                  {id === 1
                    ? "Get Notified Based on Availability"
                    : "Exclusive insights and reports"}
                </li>
                {id === 1 && (
                  <li className="flex items-center">
                    <span className="mr-3 text-[#2772A0] text-2xl">✔</span>
                    Save Listings for Later
                  </li>
                )}
              </ul>
              <div className="mt-8 space-y-6">
                <div className="bg-[#1e5f8a] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                    Monthly Plan
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#e0ebf3] text-lg">Rs.XXX/month</span>
                    <button className="bg-[#2772A0] text-white px-6 py-2 rounded-xl hover:bg-[#3a85b3] transition-all">
                      Choose Plan
                    </button>
                  </div>
                </div>
                <div className="bg-[#3a85b3] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                    Annual Plan
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#e0ebf3] text-lg">
                      Rs.XXX/month (Rs.XXXX total)
                    </span>
                    <button className="bg-[#1e5f8a] text-white px-6 py-2 rounded-xl hover:bg-[#2772A0] transition-all">
                      Choose Plan
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#b8cfe1] mt-6 text-center">
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
