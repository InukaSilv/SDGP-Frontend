import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import axios from "axios";

function Payment2({email}:{email:string}) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const idToken = await auth.currentUser?.getIdToken(true);
        if (!idToken) {
          console.error("No authentication token found");
          navigate("/login");
          return;
        }

        const response = await axios.get("/api/user",{
          headers: {
            Authorization: `Bearer ${idToken}`
          },email:email,
        });

        if (response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const { paymentType} = data;

        const planType = paymentType === "monthly" ? "gold" : 
                          paymentType === "yearly" ? "platinum" : "none";

        navigate("/payment", { 
          state: {
              planType, 
              planDuration:paymentType,
            } 
          });
      }catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login", { 
        });
      }
    };

    fetchUserData();
  }, [navigate]);

  // Show a professional loading screen in case there's any visible delay
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] flex items-center justify-center">
      <div className="bg-[#3a85b3]/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-[#60A5FA] mb-4">Preparing Your Payment...</h2>
        <p className="text-white mb-6">Please wait while we prepare your checkout.</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#60A5FA]"></div>
        </div>
      </div>
    </div>
  );
}

export default Payment2;

