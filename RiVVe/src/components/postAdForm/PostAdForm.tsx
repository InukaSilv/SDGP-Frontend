import React, { useState } from "react";

const PostAdForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: string;
    location: string;
    contact: string;
    image: File | null; // Fixed type here
  }>({
    title: "",
    description: "",
    price: "",
    location: "",
    contact: "",
    image: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] as File }); // Type assertion
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add logic to send data to the backend (e.g., API call)
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
  );
};

export default PostAdForm;
