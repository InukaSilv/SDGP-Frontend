import { Plus } from "lucide-react";
import Navbar from "../../components/navbar/navbar";
import { useState, useEffect } from "react";

import MyAdCard from "../../components/ads/MyAdCard";

interface Ad {
  id: number;
  title: string;
  description: string;
  rooms: number;
  availableSlots: number;
  price: string;
  imageUrl: string;
}

function MyAds() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    setAds([
      {
        id: 1,
        title: "Cozy Apartment Near University",
        description: "Spacious modern hostel with 5 rooms",
        rooms: 5,
        availableSlots: 3,
        price: "RS 15,000/ Month",
        imageUrl: "src/assets/main-background.jpeg",
      },
      {
        id: 2,
        title: "Spacious Hostel Room",
        description: "Spacious modern hostel with 3 rooms",
        rooms: 3,
        availableSlots: 2,
        price: "RS 10,000/ Month",
        imageUrl: "src/assets/main-background.jpeg",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 mt-20">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">My Listings</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
            <Plus size={20} /> Post a New Ad
          </button>
        </div>

        {ads.length > 0 ? (
          <div className="flex flex-col gap-6">
            {ads.map((ad) => (
              <MyAdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No ads posted yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAds;
