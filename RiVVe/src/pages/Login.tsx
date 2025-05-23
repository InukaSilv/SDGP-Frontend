import { useState, ChangeEvent } from "react";
import Navbar from "../components/navbar/Navbar";
import { EyeOff, Eye, LogIn, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  auth,
  signInWithPopup,
  googleProvider,
  signInWithEmailAndPassword,
} from "../firebase";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [showpass, setShowPass] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string>("");

  const saveUserAuth = (userData: any, token: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userData._id || userData.id);
    localStorage.setItem("user", JSON.stringify(userData));
    // For chat app usage
    localStorage.setItem("chat-app-user", JSON.stringify(userData));
  };

  /**
   * Handle the input change
   */
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((record) => ({ ...record, [id]: value }));
  };

  /**
   * Handle the email login
   */
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLoginError("Please enter both email and password");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        idToken: token,
      });
      const data = response.data;
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/user");
      } else {
        alert(data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("loggin error");
      setLoginError("Email and password does not match");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle the google login
   */
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      console.log("Token from firebase", token);

      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        idToken: token,
      });

      const data = response.data;
      console.log("Backend response", data);
      if (data.success) {
        saveUserAuth(data.data, data.token);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/user");
      } else {
        setLoginError(
          "User dosent exist, please use other method or Signup if not registered yet"
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoginError(
        "User dosent exist, please use other method or Signup if not registered yet"
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] flex items-center justify-center p-4">
      <Navbar />
      <div className="w-full max-w-md">
        <div className="bg-[#1E293B]/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-[#334155]/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#60A5FA] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#8892B0]">Log in to continue your journey</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#60A5FA] h-5 w-5" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInput}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 bg-[#112240]/50 border border-[#233554] rounded-xl text-[#CCD6F6] placeholder-[#8892B0] focus:outline-none focus:ring-2 focus:ring-[#60A5FA]/50 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#60A5FA] h-5 w-5" />
              <input
                type={showpass ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInput}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 bg-[#112240]/50 border border-[#233554] rounded-xl text-[#CCD6F6] placeholder-[#8892B0] focus:outline-none focus:ring-2 focus:ring-[#60A5FA]/50 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showpass)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8892B0] hover:text-[#60A5FA] transition-colors"
              >
                {showpass ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {loginError && (
              <p className="text-red-400 text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/30 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 transform hover:bg-[#60A5FA]/20 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#60A5FA]/50"
              disabled={!formData.email || !formData.password || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-[#60A5FA] border-solid rounded-full animate-spin mr-2"></div>
                  loggin in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Log In</span>
                </>
              )}
            </button>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#233554]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-[#8892B0] bg-[#0A192F]">
                  Or continue with
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full bg-[#112240] text-[#CCD6F6] py-3 rounded-xl font-medium hover:bg-[#1E293B] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 border border-[#233554] disabled:opacity-70"
            >
              {isGoogleLoading ? (
                <>
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Login in with Google...
                </>
              ) : (
                <>
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span>Login in with Google</span>
                </>
              )}
            </button>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <Link
                to="/forgotpassword"
                className="text-[#8892B0] hover:text-[#60A5FA] transition-colors text-sm"
              >
                Forgot your password?
              </Link>
              <p className="text-[#8892B0] text-sm">
                Don't have an account?{" "}
                <Link
                  to="/Signup1"
                  className="text-[#60A5FA] hover:text-[#60A5FA]/80 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
