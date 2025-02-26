import React, { useState } from "react";
import { Slider } from "@mui/material";
import {
  Upload,
  MapPin,
  DollarSign,
  Phone,
  X,
  Users,
  Home,
  Bed,
} from "lucide-react";

const PostAdForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: [30000, 60000],
    location: "",
    contact: "",
    residents: "1",
    housingType: "",
    roomType: "",
    bedrooms: "",
    facilities: [] as string[],
    images: [] as File[],
  });

  const housingTypes = ["Hostel", "House", "Apartment"];
  const roomTypes = ["Single", "Shared"];
  const facilities = ["A/C", "CCTV", "Study Rooms", "WiFi", "Kitchen", "Food"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setFormData({ ...formData, price: newValue as number[] });
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Post Your Property Ad
          </h2>
          <button type="button" className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Ad Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-md border border-gray-400"
            placeholder="Enter property title"
          />
        </div>

        {/* Number of Residents */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 flex items-center">
            <Users size={18} className="mr-2" />
            Number of Residents
          </label>
          <select
            name="residents"
            value={formData.residents}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-md border border-gray-400"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 flex items-center">
            <DollarSign size={18} className="mr-2" />
            Price Range (LKR)
          </label>
          <Slider
            value={formData.price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
            step={5000}
            sx={{
              color: "#1f2937",
              height: 6,
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>LKR {formData.price[0].toLocaleString()}</span>
            <span>LKR {formData.price[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Housing Type and Room Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center">
              <Home size={18} className="mr-2" />
              Housing Type
            </label>
            <div className="flex flex-wrap gap-2">
              {housingTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, housingType: type })
                  }
                  className={`px-4 py-2 rounded-full transition-all ${
                    formData.housingType === type
                      ? "bg-blue-950 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center">
              <Bed size={18} className="mr-2" />
              Room Type
            </label>
            <div className="flex flex-wrap gap-2">
              {roomTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, roomType: type })}
                  className={`px-4 py-2 rounded-full transition-all ${
                    formData.roomType === type
                      ? "bg-blue-950 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Facilities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {facilities.map((facility) => (
              <div
                key={facility}
                onClick={() => handleFacilityToggle(facility)}
                className={`cursor-pointer p-3 rounded-lg text-center transition-all ${
                  formData.facilities.includes(facility)
                    ? "bg-blue-950 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {facility}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 bg-white rounded-md border border-gray-400"
            placeholder="Describe your property..."
          />
        </div>

        {/* Contact and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center">
              <Phone size={18} className="mr-2" />
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full p-2 bg-white rounded-md border border-gray-400"
              placeholder="+94 XX XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center">
              <MapPin size={18} className="mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 bg-white rounded-md border border-gray-400"
              placeholder="Enter property location"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 flex items-center">
            <Upload size={18} className="mr-2" />
            Property Images
          </label>
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="images" className="cursor-pointer block">
              <Upload className="mx-auto h-12 w-12 text-gray-600 mb-2" />
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
            </label>
          </div>

          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-950 text-white py-3 rounded-2xl hover:bg-blue-900 transition-colors"
        >
          Post Ad
        </button>
      </form>
    </div>
  );
};

export default PostAdForm;
