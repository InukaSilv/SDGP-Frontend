import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Star, Trash2 } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  averageRating: number;
  images: string[];
}

function PremiumWishList() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const user = localStorage.getItem("user");
  const juser = user ? JSON.parse(user) : null;
  const authToken = localStorage.getItem("authToken");

  /**
   * Get the wishlist items for the user
   */
  const getWishList = async () => {
    if (!juser || !juser._id) {
      console.error("User not found or ID missing");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/wishlist/getWishList`,
        {
          params: { id: juser._id },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setWishlistItems(response.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    if (juser) {
      getWishList();
    }
  }, [juser]);

  /**
   * Delete an item and call the getwishlist again for refresh
   */
  const toggleWishlist = async (adId: string) => {
    try {
      console.log(adId);
      await axios.delete(`${API_BASE_URL}/api/wishlist/deletewishlist`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: { userId: juser._id, adId },
      });

      getWishList();
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {/* If the wishlist is empty */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((ad) => (
              <Link to="/listing2" state={{ ad }}>
                <div
                  key={ad._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <div className="relative h-48">
                    <img
                      src={ad.images[0]}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleWishlist(ad._id);
                      }}
                      className="absolute z-100 top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {ad.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-gray-700">
                          {ad.averageRating}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-gray-900">
                        Rs.{ad.price}
                        <span className="text-sm text-gray-500">/month</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PremiumWishList;
