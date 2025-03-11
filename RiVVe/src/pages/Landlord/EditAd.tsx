import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, Phone, Wind } from "lucide-react";
import { Shield } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Wifi } from "lucide-react";
import { ChefHat } from "lucide-react";
import { Coffee } from "lucide-react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";

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
  const location = useLocation();
  const navigate = useNavigate();
  const ad = location.state?.ad as Ad;
  const [formData, setFormData] = useState({
    title: ad?.title || "",
    description: ad?.description || "",
    singleRooms: ad?.roomTypes?.singleRoom || 0,
    doubleRooms: ad?.roomTypes?.doubleRoom || 0,
    price: ad?.price || "",
    contact: ad?.contact || "",
    facilities: ad?.facilities || [],
    images: ad?.images || [],
    removeImages: [],
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

  const [imageError, setImageError] = useState<string>("");
  const [newPreview, setNewPreview] = useState<string[]>([]);

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

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const totalImages =
        formData.images.length + files.length - formData.removeImages.length;
      if (totalImages > 6) {
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
        images: [...prev.images, ...newPreviews],
        newImages: [...prev.newImages, ...files],
      }));
      setImageError("");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-200">
        <Navbar />
        <div className="container mx-auto py-8 px-4 mt-20">
          <div className="rounded-2xl p-5">
            <div className="bg-[#1e5f8a] p-5 rounded-t-md gap-2">
              <h1 className="text-3xl text-amber-50 font-semibold">
                Edit Post
              </h1>
              <h5 className="text-md text-white mt-1">
                Update your property listing details
              </h5>
            </div>
            <div className="w-full drop-shadow-2xl bg-white p-3 rounded-b-md">
              <form>
                <div className="flex flex-row gap-3">
                  <div className="md:w-1/2">
                    {/* title */}
                    <div className="flex flex-col gap-2 ">
                      <label className="text-md text-gray-600">Title</label>
                      <input
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={formData.title}
                        className="border-1 border-gray-400 p-2 rounded-md"
                      />
                    </div>

                    {/* description */}
                    <div className="flex flex-col  gap-2 mt-4">
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

                    {/* single room and double room */}
                    <div className="flex  gap-1 mt-4">
                      <div className="flex flex-col w-1/3">
                        <label className="text-md text-gray-600">
                          Single room
                        </label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="singleRoom"
                          value={formData.singleRooms}
                          className="border-1 border-gray-400 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col w-1/3">
                        <label className="text-md text-gray-600">
                          Double room
                        </label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="singleRoom"
                          value={formData.doubleRooms}
                          className="border-1 border-gray-400 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col w-1/3">
                        <label className="text-md text-gray-600">Price</label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="singleRoom"
                          min="0"
                          step="1000"
                          value={formData.price}
                          className="border-1 border-gray-400 p-2 rounded-md"
                        />
                      </div>
                    </div>

                    {/* telephone */}
                    <div className="flex flex-col gap-2 mt-4">
                      <label className="text-md text-gray-600 flex gap-2">
                        {" "}
                        <Phone className=" text-blue-400" />
                        Contact
                      </label>
                      <input
                        name="contact"
                        type="tel"
                        onChange={handleChange}
                        value={formData.contact}
                        className="border-1 border-gray-400 p-2 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    {/* facilities */}
                    <div className="flex flex-col  gap-2">
                      <label className="text-md text-gray-600">
                        Facilities
                      </label>
                      <p className="text-sm">
                        Add or remove facilities that you want to change
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {facilitiess.map(({ name, icon }) => (
                          <div
                            key={name}
                            onClick={() => handleFacilities(name)}
                            className={`cursor-pointer bg-[#2772A0]/50 font-semibold text-white border-1 border-gray-700 p-4 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center gap-2 hover:[bg-gray-700]/70 ${
                              formData.facilities.includes(name)
                                ? "bg-[#2772A0]/100 shadow-[0_0_20px_rgba(96,165,250,0.3)]"
                                : ""
                            }`}
                          >
                            <div>{icon}</div>
                            <h1>{name}</h1>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* images */}
                    <div className="flex flex-col">
                      <label className="text-md text-gray-600 mt-4 flex gap-2">
                        <Camera className=" text-blue-400 mb-2" /> Photos
                      </label>
                      <div className="border-2 border-dashed rounded-xl p-8 text-center items-center transition-all flex flex-col">
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
                          <Upload className="w-12 h-12 text-blue-400 mb-4" />
                          <p className="text-gray-300 mb-2">
                            Drag & drop your images here or click to browse
                          </p>
                          <p className="text-sm text-gray-400">
                            Supported formats: JPG, PNG
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt="Image"
                            className="w-full h-[200px] object-cover rounded-lg transition-all duration-300 
                       group-hover:brightness-[0.95] group-hover:shadow-lg"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transform transition-all duration-200 hover:scale-110 hover:cursor-pointer"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
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
