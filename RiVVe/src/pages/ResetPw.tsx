import { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import { Eye, EyeOff } from "lucide-react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPw() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showPass2, setShowPass2] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "confirmPassword") {
      if (formData.password !== value) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const URL = new URLSearchParams(window.location.search);
    const code = URL.get("oobCode");
    if (!code) {
      setError("Passwrod link expired");
      return;
    }

    await confirmPasswordReset(auth, code, formData.password);
    await axios.post("http://localhost:5001/api/auth/password-reset", {
      code,
      newPassword: formData.password,
    });
    console.log("password changed success");
    navigate("/login");
  };

  const disable =
    formData.password.trim() === "" || formData.confirmPassword.trim() === "";

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Enter Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInput}
                  placeholder="New Password"
                  className="w-full border border-gray-600 bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Re-enter Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPass2 ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInput}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-600 bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPass2(!showPass2)}
                >
                  {showPass2 ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all${
                disable
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPw;
