import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Wind } from "lucide-react";
import { Shield } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Wifi } from "lucide-react";
import { ChefHat } from "lucide-react";
import { Coffee } from "lucide-react";

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
    price: ad?.price || 0,
    contact: ad?.contact || null,
    facilities: ad?.facilities || null,
  });

  const facilitiess = [
    { name: "A/C", icon: <Wind size={20} /> },
    { name: "CCTV", icon: <Shield size={20} /> },
    { name: "Study Rooms", icon: <BookOpen size={20} /> },
    { name: "WiFi", icon: <Wifi size={20} /> },
    { name: "Kitchen", icon: <ChefHat size={20} /> },
    { name: "Food", icon: <Coffee size={20} /> },
  ];
  return (
    <>
      <div className="min-h-screen bg-gray-200">
        <Navbar />
        <div className="container mx-auto py-8 px-4 mt-20">
          <div className="rounded-2xl p-5">
            <div className="bg-[#1e5f8a] p-5 rounded-t-md gap-2">
              <h1 className="text-3xl text-amber-50 font-semibold">
                Edit Advertisemet
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
                          name="singleRoom"
                          value={formData.doubleRooms}
                          className="border-1 border-gray-400 p-2 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col w-1/3">
                        <label className="text-md text-gray-600">Price</label>
                        <input
                          type="number"
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
                      <label className="text-md text-gray-600">Contact</label>
                      <input
                        name="contact"
                        type="tel"
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
                      <label className="text-md text-gray-600">Photos</label>
                      <div className="border-2 border-dashed rounded-xl p-8 text-center transition-all">
                        <input
                          type="file"
                          id="images"
                          multiple
                          accept="image/jepg, image/png,image/jpg"
                        />
                      </div>
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
