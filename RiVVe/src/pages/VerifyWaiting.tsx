import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, sendEmailVerification } from "../firebase";
import axios from "axios";

function VerifyWaiting() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const [resendCount, setResendCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);
  const [processing, setProessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessge] = useState<string>("");

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
          registerType: "password",
          isPremium: false,
          idToken: idToken,
          role: formData.role || "student",
          paymentType: formData.paymentType || "none",
        };
        console.log(formData);
        try {
          await axios.post(`${API_BASE_URL}/api/auth/signup`, requestData);
          console.log("User data sent to backend successfully");

          if (formData.paymentType !== "none") {
            navigate("/payment");
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error("Error saving to MongoDB:", error);
        }
      }
    }, 3000);

    return () => clearInterval(checkVerification);
  }, [navigate, formData]);

  const HandleResend = async () => {
    if (resendCount >= 2) {
      setErrorMessge("Limit exceeded, try again later");
      return;
    }

    setProessing(true);
    setErrorMessge("");
    setTimer(60);

    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setResendCount(resendCount + 1);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "auth/too-many-requests") {
        setErrorMessge("Too many requests, Please try again later");
      } else {
        setErrorMessge("Error sending link, try again later");
      }
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const timerr = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerr);
    } else {
      setProessing(false);
    }
  }, [timer]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
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
        <h4 className="text-md text-black font-bold mt-4">
          Didn't receive any mail ?{" "}
        </h4>
        {resendCount < 2 ? (
          <>
            <button
              className={`p-3 text-white font-semibold rounded-3xl px-7 mt-3 ${
                processing ? "bg-gray-400 cursor-not-allowed" : " bg-gray-800"
              }`}
              onClick={HandleResend}
              disabled={processing}
            >
              {processing ? `Resent in ${timer}s` : "Resend email"}
            </button>
          </>
        ) : (
          <p className="text-red-500">
            You have reached the limit, please try again later
          </p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default VerifyWaiting;
