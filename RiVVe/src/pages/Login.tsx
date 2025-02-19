import { useState, ChangeEvent } from "react";
import Navbar from "../components/navbar/navbar";
import { EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  signInWithPopup,
  googleProvider,
  signInWithEmailAndPassword,
} from "../firebase";
import { getIdToken } from "firebase/auth";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [showpass, setShowPass] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((record) => ({ ...record, [id]: value }));
  };

  // normal email password handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLoginError("Please enter both email and password");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log("Token from firebase", token);

      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });
      const data = await response.json();
      console.log("Backend response", data);
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/user");
      } else {
        alert(data.message);
      }
      console.log(token);
    } catch (error) {
      console.log("loggin error");
      setLoginError("Email and password does not match");
    }
  };

  // google Login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      console.log("Token from firebase", token);

      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      const data = await response.json();
      console.log("Backend response", data);
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/user");
      } else {
        setLoginError(
          "User dosent exist, please use other method or Signup if not registered yet"
        );
      }
    } catch (error) {
      setLoginError(
        "User dosent exist, please use other method or Signup if not registered yet"
      );
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 border border-white/20 hover:scale-110 transition-transform">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Login
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleEmailLogin}>
            <input
              type="email"
              id="email"
              onChange={handleInput}
              placeholder="Email"
              className="border border-white/30 bg-transparent text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="relative">
              <input
                type={showpass ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInput}
                placeholder="Password"
                className="w-full border border-white/30 bg-transparent text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                onClick={() => setShowPass(!showpass)}
              >
                {showpass ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {loginError && <p className="text-red-500">{loginError}</p>}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all hover:shadow-blue-500/50 hover:shadow-lg ${
                !formData.email || !formData.password
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              Login
            </button>
            <p className="text-blue-400 hover:underline cursor-pointer text-center">
              <Link to="/forgotpassword">Forgot password </Link>
            </p>
          </form>
          <p className="text-gray-400 text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/Signup1" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-6 flex justify-center hover:scale-105">
            <button
              className="bg-white text-black py-2 px-6 rounded-lg font-semibold hover:bg-grey-200 transition-all"
              onClick={handleGoogleLogin}
            >
              Login with google
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
