import { useState, ChangeEvent } from "react";
import Navbar from "../components/navbar/navbar";
import { EyeOff, Eye } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();
  const [showpass, setShowPass] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((record) => ({ ...record, [id]: value }));
  };

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 border border-white/20 hover:scale-110 transition-transform">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Login
          </h1>
          <form className="flex flex-col gap-4">
            <input
              type="text"
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-blue-500/50 hover:shadow-lg hover:cursor-pointer"
            >
              Login
            </button>
            <p className="text-blue-400 hover:underline cursor-pointer text-center">
              Forgot password
            </p>
          </form>
          <p className="text-gray-400 text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/Signup1" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="mt-6 flex justify-center hover:scale-105">
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log("Credential Response:", credentialResponse);
                  if (credentialResponse.credential) {
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log("Decoded Token:", decoded);
                    navigate("/user");
                  } else {
                    console.error("No credential received");
                  }
                }}
                onError={() => console.log("Login failed")}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
