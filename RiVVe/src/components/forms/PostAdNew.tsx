import { UsersRound } from "lucide-react";
import TypeButton from "../buttons/TypeButton";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Wind } from "lucide-react";
import { Shield } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Wifi } from "lucide-react";
import { ChefHat } from "lucide-react";
import { Coffee } from "lucide-react";
import { Phone } from "lucide-react";
import { Camera } from "lucide-react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../footer/Footer";

function PostAdNew() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: 6.9271,
    lng: 80.8612,
  });
  const [Error, setError] = useState<string>("");
  const [markerRef, marker] = useAdvancedMarkerRef();
  const facilities = [
    { name: "A/C", icon: <Wind size={20} /> },
    { name: "CCTV", icon: <Shield size={20} /> },
    { name: "Study Rooms", icon: <BookOpen size={20} /> },
    { name: "WiFi", icon: <Wifi size={20} /> },
    { name: "Kitchen", icon: <ChefHat size={20} /> },
    { name: "Food", icon: <Coffee size={20} /> },
  ];
  const [formData, setFormData] = useState({
    title: "",
    residents: "1",
    price: "",
    housingType: "",
    roomType: [] as string[],
    singleRoom: 0,
    doubleRoom: 0,
    address: "",
    coordinates: { lat: 6.9271, lng: 80.8612 },
    description: "",
    contact: "",
    facilities: [] as string[],
    images: [] as File[],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleRoomType = (type: string) => {
    setFormData((prevType) => {
      const newRoomTypes = prevType.roomType.includes(type)
        ? prevType.roomType.filter((typ) => typ !== type)
        : [...prevType.roomType, type];

      // Reset room counts when room type is deselected
      return {
        ...prevType,
        roomType: newRoomTypes,
        singleRoom: newRoomTypes.includes("Single") ? prevType.singleRoom : 0,
        doubleRoom: newRoomTypes.includes("shared") ? prevType.doubleRoom : 0,
      };
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setMapPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => setError(error.message)
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // map drag
  const handleDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      setMapPosition({ lat: newLat, lng: newLng });
      setFormData((prevFormData) => ({
        ...prevFormData,
        coordinates: {
          lat: newLat,
          lng: newLng,
        },
      }));

      console.log(
        "New Position:",
        formData.coordinates.lat,
        formData.coordinates.lng
      );
    }
  };

  const geocodeAddress = (address: string) => {
    if (typeof google !== "undefined" && google.maps) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, function (results, status) {
        if (status === "OK") {
          const location = results[0].geometry.location;
          console.log(location);
          setMapPosition({
            lat: location.lat(),
            lng: location.lng(),
          });
          setFormData((prevFormData) => ({
            ...prevFormData,
            coordinates: {
              lat: location.lat(),
              lng: location.lng(),
            },
          }));
        } else {
          setError(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      });
    } else {
      setError("Google Maps API is not loaded.");
      console.log("Error");
    }
  };

  // getting the long and lat address
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setFormData((prev) => ({ ...prev, address: address }));
    geocodeAddress(address);
  };

  // asinging data to the formData
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlefacility = (fac: string) => {
    setFormData((prev) => {
      const uptfacility = prev.facilities.includes(fac)
        ? prev.facilities.filter((facililty) => facililty !== fac)
        : [...prev.facilities, fac];
      return {
        ...prev,
        facilities: uptfacility,
      };
    });
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.some((file) => file.size > MAX_FILE_SIZE)) {
        setImageError("Image size should be 5MB or less");
        return;
      }
      if (files.some((file) => !ALLOWED_FILE_TYPES.includes(file.type))) {
        setImageError("Only images can be uploaded");
        return;
      }

      if (previewImages.length > 5) {
        setImageError("You can only upload 6 images");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
      console.log(newPreviews);
      console.log(previewImages);
    }
  };

  const removeImage = (img: string) => {
    setPreviewImages((images) => images.filter((image) => image !== img));
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.some((file) => file.size > MAX_FILE_SIZE)) {
      setImageError("Image Size should be 5MB or less");
      return;
    }

    if (files.some((file) => !ALLOWED_FILE_TYPES.includes(file.type))) {
      setImageError("Only images cna be uploaded");
      return;
    }

    if (previewImages.length > 5) {
      setImageError("You can only upload upto 6 images");
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // when the post is submitted
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.log("Token not found, please login");
    }
    const data = new FormData();
    data.append("title", formData.title);
    data.append("residents", formData.residents);
    data.append("price", formData.price);
    data.append("housingType", formData.housingType);
    data.append(
      "singleRoom",
      formData.roomType.includes("Single")
        ? formData.singleRoom.toString()
        : "0"
    );
    data.append(
      "doubleRoom",
      formData.roomType.includes("shared")
        ? formData.doubleRoom.toString()
        : "0"
    );
    data.append("address", formData.address);
    data.append("description", formData.description);
    data.append("contact", formData.contact);
    data.append("roomType", JSON.stringify(formData.roomType));
    data.append("facilities", JSON.stringify(formData.facilities));
    data.append("lat", formData.coordinates.lat.toString());
    data.append("lng", formData.coordinates.lng.toString());
    formData.images.forEach((file) => {
      data.append(`images`, file);
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/listing/listing-all`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const updatedUser = response.data.updatedUser;
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      console.log("FormData Submitted Successfully", response.data);
      navigate("/MyAds");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-20 h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 items-center justify-center shadow-2xl p-8">
        <div className="w-full max-w-7xl">
          <Link
            to="/MyAds"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to My Ads
          </Link>
          {/* top post property */}
          <div className="flex flex-col text-center align-center justify-center p-4">
            <h1 className="text-4xl font-bold text-white text-center [text-shadow:0_0_20px_rgba(255,255,255,0.3)]">
              Post Your Property Ad
            </h1>
            <p className="text-blue-100 text-center mt-2 opacity-80">
              Fill in the details below to list your property
            </p>
          </div>

          {/* Form data */}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm">
              {/* left div of the form */}
              <div className="flex flex-col p-3 md:w-2/3 space-y-6">
                {/* title input */}
                <div className="mb-6 flex flex-col w-full">
                  <label className="block text-gray-100 font-medium mb-2">
                    Ad Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                    placeholder="e.g., Modern Apartment in Colombo 7"
                    required
                  />
                </div>

                {/* number of residents */}
                <div className="flex flex-col w-full">
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    <UsersRound className="mr-2 text-blue-500" /> Number of
                    Residents
                  </label>
                  <select
                    name="residents"
                    value={formData.residents}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                  >
                    {[...Array(100)].map((_, i) => (
                      <option key={i} value={i + 1} className="bg-gray-800">
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* price range */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    <h1 className="mr-2 text-blue-500">RS</h1>
                    Price Range (LKR)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                    placeholder="Enter price in LKR"
                    name="price"
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    required
                  />
                </div>

                {/* housing Type */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    Housing Type
                  </label>
                  <div className="flex gap-4 flex-wrap">
                    {["Hostel", "House", "Apartment"].map((type) => (
                      <TypeButton
                        key={type}
                        type={type}
                        isSelected={formData.housingType === type}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            housingType: prev.housingType === type ? "" : type,
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Room type */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    Room Types Available
                  </label>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1 flex-wrap">
                      {["Single", "shared"].map((type) => (
                        <TypeButton
                          key={type}
                          type={type}
                          isSelected={formData.roomType.includes(type)}
                          onClick={() => toggleRoomType(type)}
                        />
                      ))}
                    </div>

                    {formData.roomType.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        {formData.roomType.includes("Single") && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              Single Rooms
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                                placeholder="Number of Single rooms"
                                min="0"
                                name="singleRoom"
                                onChange={handleChange}
                                step="1"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-gray-400 text-sm">
                                  rooms
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {formData.roomType.includes("shared") && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              Shared Rooms
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                name="doubleRoom"
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                                placeholder="Number of shared rooms"
                                onChange={handleChange}
                                min="0"
                                step="1"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-gray-400 text-sm">
                                  rooms
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* location div */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    <MapPin className="mr-2 text-blue-500" /> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                    placeholder="eg: 28-k, Union Place, Colombo"
                    onChange={handleAddressChange}
                    required
                  />
                  <div className="w-full h-[300px] mt-4">
                    <APIProvider apiKey="AIzaSyDw8OkvUGpFHbkc-nbSTS4jMRJjmCplNh8">
                      <Map
                        defaultZoom={13}
                        center={mapPosition}
                        mapId="DEMO_MAP_ID"
                      >
                        <AdvancedMarker
                          ref={markerRef}
                          position={mapPosition}
                          draggable
                          onDragEnd={handleDragEnd}
                        />
                      </Map>
                    </APIProvider>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Click on the marker and, Drag the marker or click on the map
                    to adjust the location
                  </p>
                </div>

                {/* facilities */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    Available Facilities
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {facilities.map(({ name, icon }) => (
                      <div
                        key={name}
                        className={`cursor-pointer bg-gray-600/50 font-semibold text-white border-1 border-gray-700 p-4 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center gap-2 hover:bg-gray-700/70 ${
                          formData.facilities.includes(name)
                            ? "bg-gray-800 shadow-[0_0_20px_rgba(96,165,250,0.3)]"
                            : ""
                        }`}
                        onClick={() => handlefacility(name)}
                      >
                        <div>{icon}</div>
                        <h1>{name}</h1>
                      </div>
                    ))}
                  </div>
                </div>

                {/* description */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                    placeholder="Describe your property in detail..."
                    onChange={handleChange}
                  />
                </div>

                {/* contact */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    <Phone className="mr-2 text-blue-500" />
                    Contact
                  </label>
                  <input
                    type="tel"
                    onChange={handleChange}
                    name="contact"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>
              </div>

              {/* right div of the form */}
              <div className="md:w-1/3">
                <div
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={() => setIsDrag(true)}
                >
                  <label className="block text-gray-100 font-medium mb-2 flex">
                    <Camera className="mr-2 text-blue-500" />
                    Photos
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      isDrag ? "bg-blue-900/80" : ""
                    }`}
                  >
                    <input
                      type="file"
                      id="images"
                      multiple
                      accept="image/jpeg,image/png,image/jpg"
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                    {isDrag ? (
                      <>
                        <label
                          htmlFor="images"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="w-12 h-12 text-blue-400 mb-4" />
                          <p className="text-gray-300 mb-2">Drop your image</p>
                        </label>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg transition-opacity"
                          aria-label="Remove image"
                          onClick={() => removeImage(src)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {imageError && <p className="text-red-400">{imageError}</p>}
                </div>
              </div>
            </div>
            <div className="w-full p-6 flex justify-end">
              <button
                type="submit"
                className="w-150 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg py-3 px-10 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Post Property
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default PostAdNew;
