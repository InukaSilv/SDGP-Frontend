import React, { useState } from "react";
//import GoogleMapReact from "google-map-react";

const PostAdForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: string;
    location: string;
    contact: string;
    image: File | null;
  }>({
    title: "",
    description: "",
    price: "",
    location: "",
    contact: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "location") {
      // Example logic to fetch coordinates from a location (replace with actual geocoding API)
      if (value.toLowerCase() === "colombo") {
        setCoordinates({ lat: 6.9271, lng: 79.8612 });
      } else if (value.toLowerCase() === "kandy") {
        setCoordinates({ lat: 7.2906, lng: 80.6337 });
      } else {
        setCoordinates(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add logic to send data to the backend (e.g., API call)
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 grid grid-cols-3 gap-6">
      {/* Form Section */}
      <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Post Your Ad</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Ad Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a title for your ad"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Provide details about your property"
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium">
              Price (LKR)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the monthly rent"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the location of the property"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-gray-700 font-medium">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              accept="image/*"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit Ad
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="col-span-1 flex flex-col items-center space-y-4">
        {previewImage && (
          <div className="w-full">
            <h3 className="text-lg font-bold mb-2">Image Preview</h3>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border"
            />
          </div>
        )}

        {coordinates && (
          <div className="w-full h-64 border rounded-lg overflow-hidden">
           
          </div>
        )}
      </div>
    </div>
  );
};

export default PostAdForm;
