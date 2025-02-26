import EditAd from "../components/editAd/EditAd";
import Navbar from "../components/navbar/navbar";

const Management = () => {
  const listingData = {
    title: "Spacious Modern Hostel",
    description: "A modern hostel with 5 rooms and great amenities.",
    availableSlots: 3,
    price: 15000,
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ],
  };

  return (
    <>
      <Navbar />
      <EditAd listing={listingData} />
    </>
  );
};

export default Management;
