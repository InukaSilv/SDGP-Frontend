import { Check, Upload, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  if (!user || !user.userdata) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">User data not available.</p>
      </div>
    );
  }

  const [formData, setFormData] = useState<LandveriProps>({
    email: user?.userdata?.email || "",
    phone: user?.userdata?.phone || "",
    id: [],
  });

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

  const navigate = useNavigate();
  const handleUpload = async () => {
    if (formData.id.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    const formDataToUpload = new FormData();
    formData.id.forEach((file) => formDataToUpload.append("images", file));
    formDataToUpload.append("id", user.userdata._id);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/uploadId",
        formDataToUpload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload successful");
      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload();
      setError("");
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload images. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center content-center justify-center">
        <div className="w-[500px] h-[600px] bg-blue-300/30 shadow-2xl rounded-xl">
          <div className="flex">
            <Link to="/user" className="p-5 font-semibold">
              <h2>Back</h2>
            </Link>
            <h1 className="p-4 text-2xl font-bold text-gray-500 ml-5">
              Landlord Verification
            </h1>
          </div>

          <hr className="w-[98%] mx-1 text-gray-500/50 rounded-2xl" />
          <form className="mt-4 px-4" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <label className="block text-gray-700 font-medium">Email</label>
                {user?.userdata?.isEmailVerified && (
                  <span className="px-2 text-sm rounded flex gap-1 text-green-600 bg-green-600/10">
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

            <div className="mt-5">
              <div className="flex gap-2 mb-2">
                <label className="block text-gray-700 font-medium">Image</label>
                <span
                  className={`px-2 text-sm rounded flex items-center gap-1 ${
                    user?.userdata?.isIdVerified
                      ? "text-green-600 bg-green-600/10"
                      : "text-red-600 bg-red-600/10"
                  }`}
                >
                  {user?.userdata?.isIdVerified && (
                    <>
                      <Check size={15} />
                      Verified
                    </>
                  )}
                  {!user?.userdata?.isIdVerified && <>Not Verified </>}
                  {user?.userdata?.IdVerificationStatus === "Pending" && (
                    <>Pending</>
                  )}
                </span>
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
                </div>
              )}

              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

              {!user.userdata.isIdVerified && (
                <button
                  type="button"
                  onClick={handleUpload}
                  className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formData.id.length === 0}
                >
                  Upload ID
                </button>
              )}
            </div>
          </form>

          {user.userdata.role === "Landlord" &&
            user.userdata.isEmailVerified &&
            user.userdata.isIdVerified && (
              <div className="mt-6 px-4">
                <p className="text-green-600 text-xl font-semibold text-center">
                  Congratulations! You are a verified landlord. You can now post
                  your property listings.
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default LandLordVerification;
