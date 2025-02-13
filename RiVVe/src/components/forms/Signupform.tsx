import { ChangeEvent, useState } from "react";
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

interface FormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  confirmpassword: string;
}

function Signupform({ role }: { role: string }) {
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
  });
  const [passwordMismatch, setpassWordMismatch] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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
  };

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
      await sendEmailVerification(user);

      navigate("/verifyWaiting", {
        state: { formData: { ...formData, role } },
      });
    } catch (error: any) {
      console.error("signup error", error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google User:", user);
      navigate("/user");
    } catch (error: any) {
      console.error("Google Sign-In Error", error.message);
    }
  };

  return (
    <div className="bg-white/80 p-8 rounded-2xl shadow-xl w-120">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
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
          />
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
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign Up
        </button>

        <div className="w-full">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Sign up with google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signupform;
