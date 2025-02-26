import { UsersRound } from "lucide-react";
import { DollarSign } from "lucide-react";
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

function PostAdNew() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string[]>([]);
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
    singleRoom: "0",
    doubleRoom: "0",
    address: "",
    coordinates: { lat: 6.9271, lng: 80.8612 },
    description: "",
    contact: "",
    facilities: [] as string[],
    images: [] as File[],
  });

  const toggleRoomType = (type: string) => {
    setFormData((prevType) => ({
      ...prevType,
      roomType: prevType.roomType.includes(type)
        ? prevType.roomType.filter((typ) => typ !== type)
        : [...prevType.roomType, type],
    }));
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

  useEffect(() => {
    if (marker) {
      marker.addListener("dragend", () => {
        const position = marker.position as google.maps.LatLng;
        setMapPosition({
          lat: position.lat(),
          lng: position.lng(),
        });
      });
    }
  }, [marker]);

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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setFormData((prev) => ({ ...prev, address: address }));
    geocodeAddress(address);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex flex-col mt-20 h-auto w-auto bg-blue-950 items-center justify-center rounded-3xl">
        {/* top post property */}
        <div className="flex flex-col text-center align-center justify-center p-4 ">
          <h1 className="text-4xl font-bold text-white text-center [text-shadow:0_0_20px_rgba(255,255,255,0.3)]">
            Post Your Property Ad
          </h1>
          <p className="text-blue-100 text-center mt-2 opacity-80">
            Fill in the details below to list your property
          </p>
        </div>

        {/* Form data */}
        <div className="w-full flex flex-row bg-gray-700 p-6">
          {/* left div of the form */}
          <div className="flex flex-col p-3 w-2/3 space-y-6">
            {/* title input  */}
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
            <div className=" flex flex-col w-full">
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
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1} className="bg-[#0B1120]">
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

            {/* housing Type  room type*/}
            <div>
              <label className="block text-gray-100 font-medium mb-2 flex">
                Housing Type
              </label>
              <div className="flex gap-1 flex-wrap">
                {["Hostel", "Houses", "Apartment"].map((type) => (
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
                Room Type
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

                {selectedRoomType.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                    {selectedRoomType.includes("Single") && (
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
                            <span className="text-gray-400 text-sm">rooms</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedRoomType.includes("shared") && (
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
                            <span className="text-gray-400 text-sm">rooms</span>
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
                    />
                  </Map>
                </APIProvider>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Click on the marker and, Drag the marker or click on the map to
                adjust the location
              </p>
            </div>

            <div>
              <label className="block text-gray-100 font-medium mb-2 flex">
                Available Facilities
              </label>
              <div className="grid grid-cols-3 gap-3">
                {facilities.map(({ name, icon }) => (
                  <div className="cursor-pointer bg-gray-600 font-semibold text-white border-1 border-gray-700 p-4 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center gap-2 bg-gradient-to-r hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                    <div>{icon}</div>
                    <h1>{name}</h1>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-100 font-medium mb-2 flex">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                placeholder="Describe your property in detail..."
              />
            </div>

            <div>
              <label className="block text-gray-100 font-medium mb-2 flex">
                <Phone className="mr-2 text-blue-500" />
                Contact
              </label>
              <input
                type="tel"
                name="contact"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
                placeholder="+94 XX XXX XXXX"
              />
            </div>
          </div>

          {/* right div of the form */}
          <div className="w-1/3">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <label className="block text-gray-100 font-medium mb-2 flex">
                <Camera className="mr-2 text-blue-500" />
                Photos
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all`}
              >
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="images/*"
                  className="hidden"
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
                    Supported formats: JPG, PNG, GIF
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PostAdNew;
