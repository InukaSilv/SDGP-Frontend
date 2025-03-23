import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  googleProvider,
} from "../../firebase";
import { getAdditionalUserInfo, updateProfile } from "firebase/auth";
import axios from "axios";

interface FormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  confirmpassword: string;
  paymentType: string;
  terms: boolean;
}

function Signupform({
  role,
  selectedPlan,
}: {
  role: string;
  selectedPlan: string;
}) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [showpass, setShowpass] = useState<boolean>(false);
  const [showpass2, setShowpass2] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmpassword: "",
    paymentType: selectedPlan,
    terms: false,
  });
  const [passwordMismatch, setpassWordMismatch] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [existingError, setExistingError] = useState<string>("");
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, paymentType: selectedPlan }));
  }, [selectedPlan]);

  // on input changes do the alterations
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((record) => ({ ...record, [id]: value }));
    if (id === "password") {
      const passpattern = /^[A-Za-z0-9@#$%^&+=*!()-_]*$/;
      if (!passpattern.test(value)) {
        setPasswordError(
          "Password can only contain letters, numbers, and special characters (@#$%^&+=*!()-_)"
        );
      } else {
        setPasswordError("");
      }
    }
    if (id === "confirmpassword") {
      if (formData.password !== value) {
        setpassWordMismatch("Passwords do not match");
      } else {
        setpassWordMismatch("");
      }
    }

    if (id === "phone") {
      const cleanedPhone = value.replace(/\D/g, "");
      setFormData((record) => ({ ...record, phone: cleanedPhone }));
      if (!/^0\d{9}$/.test(cleanedPhone)) {
        setPhoneError("Phone number should be in the correct format");
      } else {
        setPhoneError("");
      }
    }
  };

  // direct to verify waiting page
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordMismatch || passwordError) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${formData.fname} ${formData.lname}`,
      });
      await sendEmailVerification(user);

      navigate("/verifyWaiting", {
        state: { formData: { ...formData, role } },
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email already exists, try again with another email");
      } else {
        console.error("signup error", error.message);
      }
    }
  };

  // google signup
  const handleGoogleSignUp = async () => {
    if (!formData.terms) {
      setExistingError("Please accept the terms and conditions");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const additionalInfo = getAdditionalUserInfo(result);
      if (additionalInfo?.isNewUser === false) {
        setExistingError(
          "User already exists, use another account or login using existing account"
        );
        return;
      }
      const idToken = await user.getIdToken();
      const userData = {
        fname: user.displayName ? user.displayName.split(" ")[0] : "",
        lname: user.displayName
          ? user.displayName.split(" ").slice(1).join(" ")
          : "",
        email: user.email,
        phone: user.phoneNumber || "",
        dob: "",
        registerType: "google",
        isPremium: false,
        idToken: idToken,
        role: role || "Student",
        paymentType: selectedPlan || "none",
      };

      await axios.post(`${API_BASE_URL}/api/auth/signup`, userData);
      console.log("google signup success");
      if (userData.paymentType !== "none") {
        navigate("/payment");
      } else {
        navigate("/login");
      }
      navigate("/login");
    } catch (error: any) {
      console.error("Google Sign-In Error", error.message);
    }
  };

  return (
    <div className="bg-white/90 p-8 rounded-l-2xl shadow-xl w-full">
      <h2 className="text-3xl font-bold text-[#2772A0] mb-6">
        Create Your Account
      </h2>
      <form className="space-y-6" onSubmit={handleSignup}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="fname"
              type="text"
              placeholder="First Name"
              className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInput}
              value={formData.fname}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              placeholder="Last Name"
              className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInput}
              value={formData.lname}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            value={formData.email}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="0771234567"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            value={formData.phone}
            maxLength={10}
            minLength={10}
          />
          {phoneError && <p className="text-red-500">{phoneError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
            value={formData.dob}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={!showpass ? "password" : "text"}
              className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInput}
              value={formData.password}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowpass(!showpass)}
            >
              {showpass ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <p className="text-red-600 mt-1">{passwordError}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Re-Enter Password
          </label>
          <div className="relative">
            <input
              id="confirmpassword"
              type={!showpass2 ? "password" : "text"}
              className="w-full border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInput}
              value={formData.confirmpassword}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowpass2(!showpass2)}
            >
              {showpass2 ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {passwordMismatch && (
            <p className="text-red-600 text-sm mt-2">{passwordMismatch}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            required
            className="w-4 h-4 mr-2 rounded border-gray-300 focus:ring-blue-500"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                terms: e.target.checked,
              }))
            }
          />
          <p className="text-sm text-gray-700">
            I accept the{" "}
            <Link to="" className="text-blue-600 hover:underline">
              terms and conditions
            </Link>
          </p>
        </div>
        <p>
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        {existingError && <p className="text-red-500">{existingError}</p>}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign Up
        </button>

        <div className="w-full">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full bg-[#112240] text-[#CCD6F6] py-3 rounded-xl font-medium hover:bg-[#1E293B] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 border border-[#233554]"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Sign Up with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signupform;
