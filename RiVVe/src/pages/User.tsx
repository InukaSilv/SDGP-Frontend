import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { UserRoundPen } from "lucide-react";
import { Power } from "lucide-react";
import { Save } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Zap } from "lucide-react";
import Navbar from "../components/navbar/Navbar";

interface User {
  firstName: string;
  lastName: string;
  phone: number;
}

function User() {
  const storedUser = localStorage.getItem("user");
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

  const handleSubmit = async () => {
    event?.preventDefault();
    if (!userdata) {
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
      <h1 className="mt-20 text-[#2772A0] text-center pt-10 text-4xl font-semibold">
        Welcome {userdata ? userdata.firstName : " User "}
      </h1>
      {/* main div */}
      <div className="flex flex-col md:flex-row mx-auto px-4 py-8 gap-8">
        {/* left div */}
        <div className="md:w-1/3 bg-gradient-to-br from-[#2772A0] to-[#1e5f8a] pt-10 flex flex-col items-center justify-star p-8 rounded-2xl shadow-neont">
          <div className="w-[250px] h-[250px] rounded-full overflow-hidden bg-white p-2 shadow-lg mb-6 relative">
            <figure className="w-full h-full rounded-full overflow-hidden bg-secondary flex items-center justify-center">
              <img
                src="src/assets/perosn.jpg"
                alt="person"
                className="w-full h-full rounded-full overflow-hidden bg-secondary flex items-center justify-center"
              />
            </figure>
          </div>

          <h1 className="mt-15 text-white font-bold text-3xl">
            {userdata.firstName}
          </h1>
          <h2 className="text-white/70 mt-3">{userdata.email}</h2>
          <h2 className="text-white/70 mt-2">{userdata.role}</h2>
          <button
            className="px-4 gap-2 py-2 text-[#2772A0] bg-white rounded-md mt-6 flex hover:scale-105 hover:cursor-pointer transition"
            onClick={() => setIsEdit(!isEditing)}
          >
            <UserRoundPen />
            Edit Profile
          </button>
          <button
            className="px-4 gap-2 py-2 text-[#2772A0] bg-white rounded-md mt-6 flex hover:scale-105 hover:cursor-pointer transition"
            onClick={Logout}
          >
            <Power /> LogOut
          </button>
        </div>

        {/* right div */}
        <div className="md:w-2/3 bg-white p-8 rounded-2xl shadow-md">
          <div>
            <h3 className="text-xl font-semibold text-[#2772A0] border-b border-secondary pb-2">
              Personal Information
            </h3>
          </div>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="w-32 text-sm font-medium text-[#1e5f8a]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userdata.firstName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-[#3a85b3] bg-white"
                    : "border-[#CCDDEA] bg-[#e0ebf3]"
                } focus:outline-none focus:ring-2 focus:ring-[#3a85b3] focus:border-transparent`}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="w-32 text-sm font-medium text-[#1e5f8a]">
                Last Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userdata.lastName}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-[#3a85b3] bg-white"
                    : "border-[#CCDDEA] bg-[#e0ebf3]"
                } focus:outline-none focus:ring-2 focus:ring-[#3a85b3] focus:border-transparent`}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="w-32 text-sm font-medium text-[#1e5f8a]">
                Phone
              </label>
              <input
                type="text"
                name="firstName"
                value={userdata.phone ? userdata.phone : "Update phone number"}
                disabled={!isEditing}
                onChange={handleInputChange}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  isEditing
                    ? "border-[#3a85b3] bg-white"
                    : "border-[#CCDDEA] bg-[#e0ebf3]"
                } focus:outline-none focus:ring-2 focus:ring-[#3a85b3] focus:border-transparent`}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
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
                  <label className="w-32 text-sm font-medium text-[#1e5f8a]">
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

            <div className="flex flex-col items-center md:items-end">
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
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
