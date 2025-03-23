import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authToken = queryParams.get("token");

  useEffect(() => {
    if(authToken && authToken ! == "{USER_TOKEN}"){
      localStorage.setItem("authToken",authToken);
    }
    const timer = setTimeout(() => {
      navigate("/user"); // Redirect to user profile after a delay
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate,authToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <div className="bg-gray-800 shadow-lg rounded-xl p-8">
        <CheckCircleIcon className="h-20 w-20 text-green-400 mx-auto" />
        <h1 className="text-3xl font-bold mt-4">Payment Successful</h1>
        <p className="text-lg text-gray-300 mt-2">Your premium plan is now activated.</p>
        <p className="text-gray-400 mt-4">Redirecting to your profile...</p>
      </div>
    </div>
  );
}

export default PaymentSuccess;
