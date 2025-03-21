import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Signupform from "../components/forms/Signupform";

// Define features for each role and plan type
const ROLE_FEATURES = {
  student: {
    gold: [
      "Unlimited Property Searches & Filters ",
      "Ad-Free Experience ",
      "Priority Booking ",
      "Direct Chat with Landlords",
      "Early Access to New Listings ",
      "Tenant Rating System"
    ],
    platinum: [
      "Unlimited Property Searches & Filters",
      "Ad-Free Experience ",
      "Priority Booking ",
      "Direct Chat with Landlords",
      "Early Access to New Listings",
      "Tenant Rating System",
      "Exclusive Rent Discounts"
      
    ],
  },
  landlord: {
    gold: [
      "Unlimited Property Listings ",
      "Boosted Ads",
      "Direct Chat with Tenants ",
      "Verified Badge",
      "roperty Analytics ",
      "Featured Listing on Homepage",
            
    ],
    platinum: [
      "Unlimited Property Listings ",
      "Boosted Ads",
      "Direct Chat with Tenants ",
      "Verified Badge",
      "roperty Analytics ",
      "Featured Listing on Homepage",
      "Discounted Renewal "
    ],
  },
};

// Define plans for each role
const ROLE_PLANS = {
  student: {
    monthly: {
      name: "Gold Plan",
      price: "500",
      duration: "month",
      type: "gold",
    },
    yearly: {
      name: "Platinum Plan",
      price: "5000",
      duration: "year",
      type: "platinum",
    },
  },
  landlord: {
    monthly: {
      name: "Gold Plan",
      price: "800",
      duration: "month",
      type: "gold",
    },
    yearly: {
      name: "Platinum Plan",
      price: "8000",
      duration: "year",
      type: "platinum",
    },
  },
};

function Signup2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, id } = location.state || {};
  const [selectedPlan, setSelectedPlan] = useState("none");
  
  // Convert role to lowercase for object mapping
  const roleKey = role?.toLowerCase() || "student";
  
  // Determine which features to show based on role and selected plan
  const getPlanType = () => {
    if (selectedPlan === "monthly") return "gold";
    if (selectedPlan === "yearly") return "platinum";
    return "gold"; // Default to gold features when no plan is selected
  };

  // Get features for the current role and plan type
  const features = ROLE_FEATURES[roleKey][getPlanType()] || [];
  
  // Get monthly and yearly plan details for the current role
  const monthlyPlan = ROLE_PLANS[roleKey].monthly;
  const yearlyPlan = ROLE_PLANS[roleKey].yearly;

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
            {role?.toLowerCase() === "student" ? " accommodations" : " tenants"}.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <Signupform role={role} selectedPlan={selectedPlan} />
            <div className="bg-[#e0ebf3]/50 p-8 rounded-r-2xl shadow-xl text-[#1e5f8a]">
              <h2 className="text-4xl font-bold text-[#2772A0] mb-6 text-center">
                Unlock Premium Features
              </h2>
              <ul className="space-y-5 text-lg">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-3 text-[#2772A0] text-2xl">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-6">
                {/* Monthly Plan */}
                <div
                  className={`p-6 rounded-xl shadow-md transition duration-300 cursor-pointer ${
                    selectedPlan === "monthly"
                      ? "bg-[#1e5f8a] text-white shadow-lg"
                      : "bg-[#e0ebf3] text-[#1e5f8a] hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedPlan("monthly")}
                >
                  <h3 className="text-2xl font-semibold mb-4 text-center">
                    {monthlyPlan.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Rs.{monthlyPlan.price}/{monthlyPlan.duration}</span>
                    <button
                      className={`px-6 py-2 rounded-xl transition-all ${
                        selectedPlan === "monthly"
                          ? "bg-[#3a85b3]"
                          : "bg-[#2772A0] text-white hover:bg-[#3a85b3]"
                      }`}
                    >
                      {selectedPlan === "monthly" ? "Selected" : "Choose Plan"}
                    </button>
                  </div>
                </div>

                {/* Annual Plan */}
                <div
                  className={`p-6 rounded-xl shadow-md transition duration-300 cursor-pointer ${
                    selectedPlan === "yearly"
                      ? "bg-[#1e5f8a] text-white shadow-lg"
                      : "bg-[#3a85b3] text-white hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedPlan("yearly")}
                >
                  <h3 className="text-2xl font-semibold mb-4 text-center">
                    {yearlyPlan.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">
                      Rs.{yearlyPlan.price}/{yearlyPlan.duration}
                    </span>
                    <button
                      className={`px-6 py-2 rounded-xl transition-all ${
                        selectedPlan === "yearly"
                          ? "bg-[#2772A0]"
                          : "bg-[#1e5f8a] text-white hover:bg-[#2772A0]"
                      }`}
                    >
                      {selectedPlan === "yearly" ? "Selected" : "Choose Plan"}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#1e5f8a] mt-6 text-center">
                Enjoy uninterrupted access to premium features and 
                {roleKey === "student" 
                  ? " find your perfect hostel effortlessly." 
                  : " connect with quality tenants easily."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup2;