import axios from "axios";
import { useState } from "react";

function Testings() {
  const [formData, setFormData] = useState({
    name: "",
    images: [] as File[],
    image: [] as string[],
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    }
  };

  const uploadImageToS3 = async () => {
    const uploadedUrls: string[] = [];
    for (const image of formData.images) {
      const { data } = await axios.get(
        "http://localhost:5001/api/upload/get-presigned-url",
        {
          params: { fileName: image.name, fileType: image.type },
        }
      );
      await axios.put(data.uploadUrl, image, {
        headers: { "Content-Type": image.type },
      });

      uploadedUrls.push(data.fileUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload images to S3 first and get the URLs
      const imageUrls = await uploadImageToS3();
      console.log(imageUrls);

      // Send form data including image URLs to the backend
      //   await axios.post("http://localhost:5000/api/submit-form", {
      //     name: formData.name,
      //     imageUrls,
      //   });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <div className="mt-30">
        <label>Name : </label>
        <input
          type="text"
          placeholder="name"
          className="border-2"
          value={formData.name}
          onChange={handleNameChange}
        />
        <label>Image Upload</label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/jpeg,image/png,image/jpg"
          className="border-2"
          onChange={handleImageChange}
        />
        <button
          type="submit"
          className="p-3 bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default Testings;
