import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get plan info from location state (passed from email verification)
  const { planType, planDuration } = location.state || {};
  useEffect(() => {
    // If no plan info, redirect to dashboard or home
    if (!planType || !planDuration) {
      navigate("/user");
      return;
    }
    // Automatically initiate checkout
    handlePayment(planType, planDuration);
  }, [planType, planDuration, navigate]);

  // Function to initiate payment process
  const handlePayment = async (planType: string, planDuration: string) => {
    try {
      setError(null);

      // Call backend endpoint
      const response = await axios.post(
        `${API_BASE_URL}/api/payments/create-checkout-session`,
        {
          planType,
          planDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include JWT token
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.url) {
        window.location.href = response.data.url; //Redirect to Stripe
      } else {
        console.error("No Payment URL received!");
        setError("No payment URL received. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Payment initialization failed");
    }
  };

  // Show loading state or error
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] flex items-center justify-center">
      <div className="bg-[#3a85b3]/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
        {error ? (
          <>
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Payment Error
            </h2>
            <p className="text-white mb-6">{error}</p>
            <button
              className="px-6 py-2 rounded-xl bg-[#2772A0] text-white hover:bg-[#3a85b3] transition-all"
              onClick={() => navigate("/user")}
            >
              Return to profile
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">
              Preparing Your Payment...
            </h2>
            <p className="text-white mb-6">
              Please wait while we redirect you to our secure payment page.
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#60A5FA]"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;
