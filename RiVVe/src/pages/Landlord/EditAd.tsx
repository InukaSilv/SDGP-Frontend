import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Camera, Phone, Wind, ArrowLeft } from "lucide-react";
import { Shield } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Wifi } from "lucide-react";
import { ChefHat } from "lucide-react";
import { Coffee } from "lucide-react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";

interface RoomTypes {
  singleRoom: number;
  doubleRoom: number;
}

interface Ad {
  _id: string;
  title: string;
  description: string;
  roomTypes: RoomTypes;
  contact: number;
  facilities: string[];
  residents: number;
  price: string;
  images: string[];
  removeImages: string[];
}

function EditAd() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const ad = location.state?.ad as Ad;
  const [formData, setFormData] = useState({
    title: ad?.title || "",
    description: ad?.description || "",
    singleRoom: ad?.roomTypes?.singleRoom || 0,
    doubleRoom: ad?.roomTypes?.doubleRoom || 0,
    price: ad?.price || "",
    contact: ad?.contact || "",
    facilities: ad?.facilities || [],
    images: ad?.images || [],
    removeImages: [] as string[],
    newImages: [] as File[],
  });

  const facilitiess = [
    { name: "A/C", icon: <Wind size={20} /> },
    { name: "CCTV", icon: <Shield size={20} /> },
    { name: "Study Rooms", icon: <BookOpen size={20} /> },
    { name: "WiFi", icon: <Wifi size={20} /> },
    { name: "Kitchen", icon: <ChefHat size={20} /> },
    { name: "Food", icon: <Coffee size={20} /> },
  ];

  const [newPreview, setNewPreview] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFacilities = (fc: string) => {
    setFormData((prev) => {
      const updateFacility = prev.facilities.includes(fc)
        ? prev.facilities.filter((facility) => facility !== fc)
        : [...prev.facilities, fc];
      return {
        ...prev,
        facilities: updateFacility,
      };
    });
  };

  // adding an image
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const totalImages =
        formData.images.length +
        formData.newImages.length -
        formData.removeImages.length;

      if (totalImages + files.length > 6) {
        setImageError("You can upload a maximum of 6 images.");
        return;
      }

      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
          setImageError("Each file size should not exceed 5MB.");
          return;
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          setImageError("Only JPEG, PNG, or JPG images are allowed.");
          return;
        }
      }

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        newImages: [...prev.newImages, ...files],
      }));
      setNewPreview((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove an image
  const handleImageRemove = (img: string, isExisting: boolean) => {
    if (isExisting) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((image) => image !== img),
        removeImages: [...prev.removeImages, img],
      }));
    } else {
      const index = newPreview.indexOf(img);
      if (index !== -1) {
        URL.revokeObjectURL(img);
        setNewPreview((prev) => prev.filter((_, i) => i !== index));
        setFormData((prev) => ({
          ...prev,
          newImages: prev.newImages.filter((_, i) => i !== index),
        }));
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.log("Token not found please login");
    }
    const data = new FormData();
    data.append("propertyId", ad._id);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("singleRoom", formData.singleRoom.toString());
    data.append("doubleRoom", formData.doubleRoom.toString());
    data.append("price", formData.price.toString());
    data.append("contact", formData.contact.toString());
    formData.facilities.forEach((facility) => {
      data.append("facilities", facility);
    });
    // data.append("removeImages", JSON.stringify(formData.removeImages));
    formData.removeImages.forEach((removeing) => {
      data.append("removeImages", removeing);
    });
    formData.newImages.forEach((file) => {
      data.append(`images`, file);
    });

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/listing/update-listing`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("formData Submitted Successfully", response.data);
      navigate("/MyAds");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    try {
      const data = {
        propertyId: ad._id,
      };
      await axios.delete(`${API_BASE_URL}/api/listing/delete-post`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data,
      });
      console.log("deleted Successfully");
      navigate("/MyAds");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-200">
        <Navbar />
        <div className="container mx-auto py-8 px-4 mt-18">
          <div className="rounded-2xl">
            <Link
              to="/MyAds"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              Back to My Ads
            </Link>
            <div className="bg-[#1e5f8a] p-5 rounded-t-md">
              <h1 className="text-2xl md:text-3xl text-amber-50 font-semibold">
                Edit Post
              </h1>
              <h5 className="text-sm md:text-md text-white mt-1">
                Update your property listing details
              </h5>
            </div>

            <div className="w-full drop-shadow-2xl bg-white p-3 md:p-6 rounded-b-md">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/2 w-full">
                    <div className="flex flex-col gap-2">
                      <label className="text-md text-gray-600">Title</label>
                      <input
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={formData.title}
                        className="border border-gray-400 p-2 rounded-md w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <label className="text-md text-gray-600">
                        Description
                      </label>
                      <textarea
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        rows={4}
                        className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <div className="flex flex-col flex-1">
                        <label className="text-md text-gray-600">
                          Single room
                        </label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="singleRoom"
                          value={formData.singleRoom}
                          className="border border-gray-400 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="text-md text-gray-600">
                          Double room
                        </label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="doubleRoom"
                          value={formData.doubleRoom}
                          className="border border-gray-400 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="text-md text-gray-600">Price</label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="price"
                          min="0"
                          step="1000"
                          value={formData.price}
                          className="border border-gray-400 p-2 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <label className="text-md text-gray-600 flex items-center gap-2">
                        <Phone className="text-blue-400" />
                        Contact
                      </label>
                      <input
                        name="contact"
                        type="text"
                        maxLength={10}
                        pattern="\d{0,10}"
                        onChange={handleChange}
                        value={formData.contact}
                        className="border border-gray-400 p-2 rounded-md"
                      />
                    </div>

                    {/* facilities */}
                    <div className="flex flex-col gap-3">
                      <label className="text-md text-gray-600">
                        Facilities
                      </label>
                      <p className="text-sm text-gray-500">
                        Add or remove facilities that you want to change
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {facilitiess.map(({ name, icon }) => (
                          <div
                            key={name}
                            onClick={() => handleFacilities(name)}
                            className={`cursor-pointer bg-[#2772A0]/50 font-semibold text-white border-1 border-gray-700 p-3 sm:p-4 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center gap-1.5 sm:gap-2 hover:[bg-gray-700]/70 ${
                              formData.facilities.includes(name)
                                ? "bg-[#2772A0]/100 shadow-[0_0_20px_rgba(96,165,250,0.3)]"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-center">
                              {icon}
                            </div>
                            <h1 className="text-sm sm:text-base text-center">
                              {name}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* images */}
                    <div className="flex flex-col mt-6">
                      <label className="text-md text-gray-600 flex items-center gap-2 mb-2">
                        <Camera className="text-blue-400" /> Photos
                      </label>
                      <div className="border-2 border-dashed rounded-xl p-4 md:p-8 text-center">
                        {imageError && (
                          <p className="text-red-500 mb-2 text-sm">
                            {imageError}
                          </p>
                        )}
                        <input
                          type="file"
                          id="images"
                          multiple
                          accept="image/jpeg,image/png,image/jpg"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <label
                          htmlFor="images"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mb-4" />
                          <p className="text-gray-300 mb-2 text-sm md:text-base">
                            Drag & drop your images here or click to browse
                          </p>
                          <p className="text-xs md:text-sm text-gray-400">
                            Supported formats: JPG, PNG
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt="Image"
                            className="w-full h-[200px] object-cover rounded-lg transition-all duration-300 group-hover:brightness-95 group-hover:shadow-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transform transition-all duration-200 hover:scale-110"
                            onClick={() => handleImageRemove(img, true)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      {newPreview.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt="Image"
                            className="w-full h-[200px] object-cover rounded-lg transition-all duration-300 group-hover:brightness-95 group-hover:shadow-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transform transition-all duration-200 hover:scale-110"
                            onClick={() => handleImageRemove(preview, false)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-900 text-white rounded-md font-bold hover:bg-blue-800 transition-colors"
                  >
                    Update Post
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditAd;
