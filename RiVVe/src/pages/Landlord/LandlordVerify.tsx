import { Check, Upload, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";

interface LandveriProps {
  email: string;
  phone: string;
  id: File[];
}

function LandLordVerification() {
  const location = useLocation();
  const user = location.state;
  console.log(user);

  const [formData, setFormData] = useState<LandveriProps>({
    email: user?.userdata?.email || "",
    phone: user?.userdata?.phone || "",
    id: [],
  });

  const [verifyingPhone, setVerifyingPhone] = useState<boolean>(false);
  const [OTP, setOtp] = useState<string>(""); // OTP input value
  const [serverOtp, setServerOtp] = useState<string>(""); // OTP from server
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      const files = Array.from(e.target.files || []);
      if (files.length + formData.id.length > 2) {
        setError("Can upload only 2 images");
        return;
      }
      setFormData({
        ...formData,
        id: [...formData.id, ...files],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData({
      ...formData,
      id: formData.id.filter((_, i) => i !== index),
    });
  };

  const handlePhoneVerification = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setVerifyingPhone(true);
    try {
      const response = await axios.get(
        "http://localhost:5001/api/auth/verifyPhone",
        {
          params: { phone: formData.phone },
        }
      );
      console.log("Verification response:", response.data);
      setServerOtp(response.data.otp);
    } catch (error) {
      console.error("Error verifying phone:", error);
      setVerificationMessage("Failed to send OTP. Try again.");
    }
  };

  const handleOtpSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (OTP === serverOtp) {
      try {
        const response = await axios.put(
          "http://localhost:5001/api/auth/setPhoneVerified",
          {
            phone: formData.phone,
          }
        );
        console.log("Phone verified:", response.data);
        setVerificationMessage("Phone number successfully verified!");
      } catch (error) {
        console.error("Error verifying phone:", error);
        setVerificationMessage("Error verifying phone. Try again.");
      }
    } else {
      setVerificationMessage("Incorrect OTP. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center content-center justify-center">
        <div className="w-[500px] h-[600px] bg-blue-300/30 shadow-2xl rounded-xl">
          <h1 className="p-4 text-2xl font-bold text-gray-500">
            Landlord Verification
          </h1>
          <hr className="w-[98%] mx-1 text-gray-500/50 rounded-2xl" />
          <form className="mt-4 px-4">
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <label className="block text-gray-700 font-medium">Email</label>
                {user?.userdata?.isEmailVerified && (
                  <span
                    className={`px-2 text-sm rounded flex gap-1 ${
                      !user.userdata.isEmailVerified
                        ? "text-red-600 bg-red-600/10"
                        : "text-green-600 bg-green-600/10"
                    }`}
                  >
                    <Check size={15} className="mt-1" />
                    Verified
                  </span>
                )}
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={user.userdata.isEmailVerified}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <div className="flex gap-2 mb-2 items-center">
                <label className="text-gray-700 font-medium">Phone</label>
                <span
                  className={`px-2 text-sm rounded flex items-center gap-1 ${
                    user?.userdata?.isPhoneVerified
                      ? "text-green-600 bg-green-600/10"
                      : "text-red-600 bg-red-600/10"
                  }`}
                >
                  {user?.userdata?.isPhoneVerified ? (
                    <>
                      <Check size={15} />
                      Verified
                    </>
                  ) : (
                    "Not Verified"
                  )}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={user?.userdata?.isPhoneVerified}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {!user?.userdata?.isPhoneVerified && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      onClick={handlePhoneVerification}
                    >
                      Verify
                    </button>
                  )}
                </div>

                {verifyingPhone && (
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter OTP"
                      value={OTP}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      onClick={handleOtpSubmit}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {verificationMessage && (
                  <p className="text-sm text-gray-600 mt-2">
                    {verificationMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex gap-2 mb-2">
                <label className="block text-gray-700 font-medium">Image</label>
                {user?.userdata?.isIdVerified && (
                  <span
                    className={`px-2 text-sm rounded flex gap-1 ${
                      !user.userdata.isIdVerified
                        ? "text-red-600 bg-red-600/10"
                        : "text-green-600 bg-green-600/10"
                    }`}
                  >
                    <Check size={15} className="mt-1" />
                    Verified
                  </span>
                )}
              </div>

              <label className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer flex flex-col items-center gap-2 hover:bg-gray-100 transition">
                <input
                  type="file"
                  multiple
                  disabled={user.userdata.isIdVerified}
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
                <Upload className="w-6 h-6 text-gray-600" />
                <p className="text-gray-600">Upload images</p>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Upload 2 images of the front and back of your ID
              </p>

              {formData.id.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.id.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <span className="text-sm text-gray-600 truncate">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {error && <p className="text-red-500">{error}</p>}
                  <button className="p-2 bg-blue-400/30 rounded-sm font-semibold">
                    Upload
                  </button>
                </div>
              )}
            </div>
          </form>
          {user.role === "Landlord" &&
            user.isEmailVerified === true &&
            user.isPhoneVerified === true &&
            user.isIdVerified === true && (
              <>
                <p className="text-green-600 text-2xl font-semibold">
                  Congrats you are a verified user, Post your ad to find to
                  Students for your hostel
                </p>
              </>
            )}
        </div>
      </div>
    </>
  );
}

export default LandLordVerification;
