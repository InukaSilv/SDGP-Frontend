import { Check, Verified } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

declare global {
  interface Window {
    recaptchaVerifier: any; // You can specify more detailed types, but `any` is a quick solution
  }
}

interface landveriProps {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [verifyingPhone, setverifyingPhone] = useState<boolean>(false);
  const handlePhoneVerification = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:5001/api/auth/verifyPhone",
        {
          params: { phone: formData.phone },
        }
      );
      console.log("Verification response:", response.data);
    } catch (error) {
      console.error("Error verifying phone:", error);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center content-center justify-center">
        <div className="w-[500px] h-[600px] bg-blue-300/30 shadow-2xl rounded-xl">
          <h1 className="p-4 text-2xl font-bold text-gray-500">
            Landlord Verificaiton
          </h1>
          <hr className="w-[98%] mx-1 text-gray-500/50 rounded-2xl" />
          <form className="mt-4 px-4">
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <label className="block text-gray-700 font-medium">Email</label>
                {user?.userdata?.isEmailVerified && (
                  <span
                    className={`px-2  text-sm rounded flex gap-1${
                      !user.userdata.isEmailVerified
                        ? "text-red-600  bg-red-600/10"
                        : " text-green-600  bg-green-600/10"
                    }`}
                  >
                    {user.userdata.isEmailVerified ? (
                      <>
                        <Check size={15} className="mt-1" />
                        Verified
                      </>
                    ) : (
                      "not verified"
                    )}
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
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="OTP"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                      Check
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default LandLordVerification;
