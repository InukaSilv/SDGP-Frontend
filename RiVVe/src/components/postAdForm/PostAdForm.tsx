import React, { useState } from "react";
//import GoogleMapReact from "google-map-react";

const PostAdForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: string;
    location: string;
    contact: string;
    images: File[];
  }>({
    title: "",
    description: "",
    price: "",
    location: "",
    contact: "",
    images: [],
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)], // Append new files
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add logic to send data to the backend (e.g., API call)
  };

  const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setFormData({ ...formData, location });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      }
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-2xl">
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Post Your Ad</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={handleLocationChange}
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
            <label htmlFor="images" className="block text-gray-700 font-medium">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              accept="image/*"
              multiple
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

      <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-6 flex flex-col items-center">
        {formData.images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Uploaded Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="w-32 h-32 object-cover rounded-lg border shadow-lg"
                />
              ))}
            </div>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default PostAdForm;
