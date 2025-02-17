import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";

function VerifyWaiting() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};

  useEffect(() => {
    if (!formData) {
      console.error("No form data found. Redirecting...");
      navigate("/");
      return;
    }

    const checkVerification = setInterval(async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        clearInterval(checkVerification);
        const idToken = await auth.currentUser?.getIdToken(true);
        if (!idToken) {
          console.error("No ID Token found. User may not be logged in.");
          return;
        }
        const requestData = {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          password: formData.password,
          registerType: "password",
          isPremium: formData.isPremium || false,
          idToken: idToken,
          role: formData.role || "student", // Default to student if not provided
        };
        try {
          await axios.post(
            "http://localhost:5001/api/auth/signup",
            requestData
          );
          console.log("User data sent to backend successfully");
          navigate("/login");
        } catch (error) {
          console.error(
            "Error saving to MongoDB:",
            error.response?.data || error
          );
        }
      }
    }, 3000);

    return () => clearInterval(checkVerification);
  }, [navigate, formData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Check Your Email for Verification
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          A verification email has been sent to:
        </p>
        <p className="text-lg font-semibold text-blue-600">
          {formData?.email || "No email provided"}
        </p>
        <p className="text-md text-gray-600 mt-4">
          Click on the link in the email. You will be redirected shortly.
        </p>
      </div>
    </div>
  );
}

export default VerifyWaiting;
