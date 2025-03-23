import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";

function ForgotPasswordEmail() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/checkforforget`,
        { email }
      );

      console.log(data);
      if (data.exists !== true) {
        setError("Email does not exist, please use a valid email");
        return;
      }

      if (data.exists && data.isUsingPassword === false) {
        setError(
          "Email uses a different login method, try logging in using different email"
        );
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage("Check email and follow the steps");
      setTimeout(() => {
        navigate("/login");
      }, 10000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("Email does not exist, try entering correct email");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="jhon@gmail.com"
              value={email}
              onChange={handleEmail}
              className="w-full mt-1 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold shadow-md"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordEmail;
