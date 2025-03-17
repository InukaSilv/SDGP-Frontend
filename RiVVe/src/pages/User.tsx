import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  User2,
  UserRoundPen,
} from "lucide-react";
import { Power } from "lucide-react";
import { Save } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Zap } from "lucide-react";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import Footer from "../components/footer/Footer";

interface User {
  firstName: string;
  lastName: string;
  phone: number;
}

function User() {
  const storedUser = localStorage.getItem("user");
  const authToken = localStorage.getItem("authToken");
  const userdata = storedUser ? JSON.parse(storedUser) : null;
  const [isEditing, setIsEdit] = useState<boolean>(false);
  const [defaultpassword, setDefaultPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [Message, setMessage] = useState<string>("");
  const [formData, setFormData] = useState<User>({
    firstName: userdata?.firstName || "",
    lastName: userdata?.lastName || "",
    phone: userdata?.phone || "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!userdata) {
      return;
    }

    if (!defaultpassword && !newPassword) {
      try {
        const response = await axios.put(
          "http://localhost:5001/api/auth/update-user",
          {
            userId: userdata._id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setMessage("Profile updated successfully!");
        console.log(response.data);
      } catch (err) {
        console.error("Error updating profile:", err);
        setError("Failed to update profile");
      }
      return;
    }

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        userdata.email,
        defaultpassword
      );
      const user = credentials.user;
      const token = await user.getIdToken();
      await updatePassword(user, newPassword);
      setMessage("Password changed Successfully");
    } catch (error) {
      console.error("Error updating password", error.message);
      setError("Current password is wrong");
    }
  };

  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="ml-10 ">
        <h1 className="text-4xl font-bold text-[#2772A0] mt-22">
          Welcome {userdata ? userdata.firstName : " User "}
        </h1>
        <p className="mt-2 text-[#3a85b3]">
          Manage your account settings and preferences
        </p>
      </div>

      {/* main div */}
      <div className="flex flex-col md:flex-row mx-4 px-20 py-8 gap-8 ">
        {/* left div */}
        <div className="w-1/3">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e0ebf3] ">
            <div className="bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] px-6 py-14 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${userdata?.firstName} ${userdata?.lastName}&backgroundColor=#2772A0`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                {userdata?.firstName} {userdata?.lastName}
              </h2>
              <p className="text-[#e0ebf3] text-sm">{userdata?.role}</p>
            </div>

            <div className="flex flex-col mx-5 mt-3 gap-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#112240]" />
                <h1 className=" text-[#3a85b3]">{userdata.email} </h1>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#112240]" />
                <h1 className=" text-[#3a85b3]">{userdata.phone} </h1>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-3 text-[#112240]" />
                <h1 className=" text-[#3a85b3]">
                  Account Type : {userdata.registerType}{" "}
                </h1>
              </div>
            </div>

            <div className="mx-5 mt-4 flex flex-col gap-4 mb-3">
              {userdata.role === "Landlord" &&
                (userdata.isEmailVerified === false ||
                  userdata.isPhoneVerified === false ||
                  userdata.isIdVerified === false) && (
                  <>
                    <p className="font-semibold text-green-600">
                      Get Verified and get the Verified Landlord mark
                    </p>
                    <button
                      onClick={() =>
                        navigate("/landlord-verification", {
                          state: { userdata },
                        })
                      }
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#3a85b3] bg-[#b8e0b8] rounded-lg hover:bg-[#ccdde8] transition duration-200"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <p>Get Verified </p>
                    </button>
                  </>
                )}

              <button
                onClick={() => setIsEdit(!isEditing)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#3a85b3] bg-[#3a85b3]/30 rounded-lg hover:bg-[#ccdde8] transition duration-200"
              >
                <UserRoundPen className="w-4 h-4" />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
              <button
                onClick={Logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition duration-200"
              >
                <Power className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* right div */}
        <div
          className={` bg-white p-8 rounded-2xl shadow-md w-2/3 ${
            isEditing ? "h-[680px]" : "h-[450px]"
          }`}
        >
          <div>
            <h3 className="text-xl font-semibold text-[#2772A0] border-b border-secondary pb-2">
              Personal Information
            </h3>
          </div>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2772A0] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    isEditing
                      ? "border-[#2772A0] bg-white focus:ring-2 focus:ring-[#e0ebf3]"
                      : "border-[#e0ebf3] bg-[#e0ebf3]"
                  } transition duration-200`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2772A0] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    isEditing
                      ? "border-[#27720A] bg-white focus:ring-2 focus:ring-[#e0ebf3]"
                      : "border-[#e0ebf3] bg-[#e0ebf3]"
                  } transition duration-200`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className=" text-sm font-medium text-[#1e5f8a]">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone ? formData.phone : "Update phone number"}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-[#3a85b3] bg-white"
                    : "border-[#CCDDEA] bg-[#e0ebf3]"
                } focus:outline-none focus:ring-2 focus:ring-[#3a85b3] focus:border-transparent`}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="w-32 text-sm font-medium text-[#1e5f8a]">
                Email
              </label>
              <input
                type="text"
                name="firstName"
                value={userdata.email}
                disabled
                className={`flex-1 px-4 py-2 rounded-md border border-[#CCDDEA] bg-[#e0ebf3] "border-none outline-none`}
              />
            </div>
            {userdata.registerType === "google" && isEditing && (
              <button
                type="submit"
                className="bg-[#2772A0] p-3 flex rounded-md font-semibold text-white shadow-2xl gap-2 float-end"
              >
                <Save /> Save Changes
              </button>
            )}
            {Message && <h3 className="text-green-400">{Message}</h3>}
            {isEditing && userdata.registerType === "password" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#2772A0] border-b border-secondary pb-2">
                    Change Password
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="w-32 text-sm font-medium text-[rgb(30,95,138)]">
                    Current password
                  </label>
                  <input
                    type="password"
                    name="firstName"
                    disabled={!isEditing}
                    onChange={(e) => setDefaultPassword(e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-md border ${
                      isEditing
                        ? "border-[#3a85b3] bg-white"
                        : "border-[#CCDDEA] bg-[#e0ebf3]"
                    } focus:outline-none focus:ring-2 focus:ring-[#3a85b3] focus:border-transparent`}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label className="w-32 text-sm font-medium text-[#1e5f8a]">
                    New password
                  </label>
                  <input
                    type="password"
                    name="firstName"
                    disabled={!isEditing}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-md border ${
                      isEditing
                        ? "border-[#3a85b3] bg-white"
                        : "border-[#CCDDEA] bg-[#e0ebf3]"
                    } focus:outline-none focus:ring-2 focus:ring-[#3a85b3] focus:border-transparent`}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#2772A0] p-3 flex rounded-md font-semibold text-white shadow-2xl gap-2 float-end"
                >
                  <Save /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#2772A0] to-[#1e5f8a] rounded-2xl shadow-neon">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-yellow-300 h-6 w-6" />
                <span className="text-yellow-300 font-bold uppercase tracking-wider text-sm">
                  Premium Offer
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Join Premium and Experience the Power of RiVVE
              </h3>
              <p className="text-secondary/90 mb-6 max-w-xl">
                Unlock exclusive features, priority support, and advanced tools
                to take your experience to the next level. Upgrade today and see
                the difference!
              </p>
              <ul className="text-white space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Zap className="text-yellow-300 h-4 w-4" />
                  <span>Unlimited access to all premium features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="text-yellow-300 h-4 w-4" />
                  <span>Priority customer support 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="text-yellow-300 h-4 w-4" />
                  <span>Advanced analytics and reporting tools</span>
                </li>
              </ul>
            </div>

            {userdata.isPremium === "false" && (
              <div className="flex flex-col items-center md:items-end ">
                <div className="text-white text-center md:text-right mb-4">
                  <span className="text-secondary/80 text-sm line-through">
                    $XX.XX/month
                  </span>
                  <div className="text-3xl font-bold">
                    Rs.XXX<span className="text-sm font-normal">/month</span>
                  </div>
                  <p className="text-yellow-300 text-sm">
                    Limited time offer - 50% off!
                  </p>
                </div>
                <button className="group relative bg-white text-primary font-bold py-3 px-8 rounded-full overflow-hidden transition-all hover:shadow-lg hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Upgrade to Premium
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default User;
