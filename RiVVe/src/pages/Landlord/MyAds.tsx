import { Plus } from "lucide-react";
import Navbar from "../../components/navbar/navbar";
import { useState, useEffect } from "react";

import MyAdCard from "../../components/ads/MyAdCard";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [ads, setAds] = useState<Ad[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListing = async () => {
      const Token = localStorage.getItem("authToken");
      if (!Token) {
        navigate("/login");
      }
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/listing/profile-listing`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        setAds(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching listings", err);
      }
    };
    fetchListing();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 mt-20">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">My Listings</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate("/posting")}
          >
            <Plus size={20} /> Post a New Ad
          </button>
        </div>
        <p className="mt-[-25px] mb-5">Manage your property</p>

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
