import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Payment2() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { email } = location.state || {};

  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        console.error("No email provided");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/user`, {
          params: { email },
        });

        if (response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const { paymentType } = data;

        const planType =
          paymentType === "monthly"
            ? "gold"
            : paymentType === "yearly"
            ? "platinum"
            : "none";

        navigate("/payment", {
          state: {
            planType,
            planDuration: paymentType,
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate, email]);

  // Show a professional loading screen in case there's any visible delay
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] flex items-center justify-center">
      <div className="bg-[#3a85b3]/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">
          Preparing Your Payment...
        </h2>
        <p className="text-white mb-6">
          Please wait while we prepare your checkout.
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#60A5FA]"></div>
        </div>
      </div>
    </div>
  );
}

export default Payment2;
