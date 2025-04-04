import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import {
  Star,
  MapPin,
  Wifi,
  ChefHat,
  Car,
  Heart,
  Cctv,
  Users,
  BookOpen,
  AirVent,
  CookingPot,
  WashingMachine,
  User,
  House,
} from "lucide-react";
import Footer from "../components/footer/Footer";
import axios from "axios";
import SimilarHostelCard from "../components/ads/SimilarHostelCard";
import HostCardWithPopup from "../components/ads/HostCardWithPopup";

interface Review {
  _id: string;
  firstName: string;
  lastName: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface Property {
  _id: string;
  title: string;
  images: string[];
  description: string;
  address: string;
  housingType: string;
  price: number;
  averageRating: number;
  reviews: string[];
  roomTypes: {
    singleRoom: number;
    doubleRoom: number;
  };
  facilities: string[];
  location: {
    coordinates: [number, number];
  };
  starsCount: Record<number, number>;
}

interface OwnerDetail {
  _id: string;
  name: string;
  contact: string;
  email: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdVerified: boolean;
  isAddressVerified: boolean;
  joinedDate: string;
  createdAt: string;
  phone: string;
}

interface SimilarProperty {
  _id: string;
  title: string;
  price: number;
  images: string[];
  rating: number;
  address: string;
  averageRating: number;
  totalRatingCount: number;
}

function Listing2() {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarProperties, setSimilarProperties] = useState<SimilarProperty[]>(
    []
  );
  const [ownerDetail, setOwnerDetail] = useState<OwnerDetail | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const authToken = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("user");
  const requser = storedUser ? JSON.parse(storedUser) : null;
  const location = useLocation();
  const ad: Property = location.state?.ad;
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (ad.reviews && ad.reviews.length > 0) {
          const response = await axios.get(
            `${API_BASE_URL}/api/listing/get-reviews`,
            {
              params: { reviews: ad.reviews.join(","), id: ad._id },
            }
          );
          setReviews(response.data.reviews);
          setSimilarProperties(response.data.similarProperties);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    const fetchOwnerDetail = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/listing/getowner`,
          {
            params: { propertyId: ad._id },
          }
        );
        setOwnerDetail(data);
      } catch (error) {
        console.error("Failed to fetch owner details:", error);
      }
    };
    fetchReviews();
    fetchOwnerDetail();
  }, [ad.reviews]);

  // get the time where the user came to view the property and send to backend when the id is changed
  useEffect(() => {
    const startTime = Date.now();
    setStartTime(startTime);

    const sendTimeSpent = async () => {
      if (startTime) {
        const exitTime = Date.now();
        const timeSpent = (exitTime - startTime) / 1000;

        try {
          await axios.post(`${API_BASE_URL}/api/listing/track-view`, {
            listingId: ad._id,
            duration: timeSpent,
          });
        } catch (error) {
          console.error("Error sending time spent:", error);
        }
      }
    };
    return () => {
      sendTimeSpent();
    };
  }, [ad._id]);

  if (!ad) {
    return <div>Ad not found</div>;
  }

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const RatingBar = ({
    rating,
    count,
    total,
  }: {
    rating: number;
    count: number;
    total: number;
  }) => {
    const percentage = (count / total) * 100;
    return (
      <div className="flex items-center gap-2">
        <span className="w-12 text-sm text-gray-300">{rating} stars</span>
        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="w-12 text-sm text-gray-300">{count}</span>
      </div>
    );
  };
  const toggleWishlist = async (userId: string, adId: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/wishlist/adwishlist`,
        { userId, adId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        if (response.data.status) {
          setIsInWishlist(true);
        } else {
          setIsInWishlist(false);
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-20">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative h-[500px] rounded-xl overflow-hidden mb-4">
              <img
                src={ad.images[selectedImage]}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-3 overflow-x-auto overflow-hidden py-4">
              {ad.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-48 rounded-lg overflow-hidden flex-shrink-0 ${
                    selectedImage === index ? "ring-3 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${ad.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-100">
                      {ad.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">{ad.address}</span>
                    </div>

                    <div className="mt-2">
                      {ad.roomTypes.singleRoom !== 0 && (
                        <div className="flex items-center text-gray-300 mb-1">
                          <Users className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {ad.roomTypes.doubleRoom} Double rooms
                          </span>
                        </div>
                      )}

                      {ad.roomTypes.doubleRoom !== 0 && (
                        <div className="flex items-center text-gray-300 mb-4">
                          <User className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {ad.roomTypes.singleRoom} Single rooms
                          </span>
                        </div>
                      )}

                      <div className="flex items-center text-gray-300 gap-2">
                        {ad.housingType === "House" && <House />}
                        {ad.housingType}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-100">
                    Description
                  </h2>
                  <p className="text-gray-300">{ad.description}</p>
                </div>

                <div className="border-t border-gray-700 mt-4 pt-4">
                  <h2 className="text-xl font-semibold mb-4 text-gray-100">
                    Facilities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ad.facilities.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-center space-x-2"
                      >
                        {facility === "WiFi" && (
                          <Wifi className="h-5 w-5 text-gray-300" />
                        )}
                        {facility === "Kitchen" && (
                          <ChefHat className="h-5 w-5 text-gray-300" />
                        )}
                        {facility === "Parking" && (
                          <Car className="h-5 w-5 text-gray-300" />
                        )}
                        {facility === "A/C" && (
                          <AirVent className="h-5 w-5 text-gray-300" />
                        )}
                        {facility === "CCTV" && (
                          <Cctv className="h-5 w-5 text-gray-300" />
                        )}
                        {facility === "Study Rooms" && (
                          <BookOpen className="h-5 w-5 text-gray-300" />
                        )}
                        {facility === "Food" && (
                          <CookingPot className="h-5 w-5 text-gray-300" />
                        )}
                        {facility === "Laundry" && (
                          <WashingMachine className="h-5 w-5 text-gray-300" />
                        )}
                        <span className="text-gray-300">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">
                  Location
                </h2>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps?q=${ad.location.coordinates[1]},${ad.location.coordinates[0]}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-100">
                  Ratings & Reviews
                </h2>

                {/* Rating Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold text-gray-100 mb-2">
                      {ad.averageRating}
                    </div>
                    <StarRating rating={Math.round(ad.averageRating)} />
                    <div className="text-gray-400 mt-2">
                      {ad.reviews.length} reviews
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <RatingBar
                        key={rating}
                        rating={rating}
                        count={ad.starsCount[rating]}
                        total={ad.reviews.length}
                      />
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6  overflow-auto max-h-[450px]">
                  {reviews &&
                    reviews.map((rev) => (
                      <div
                        key={rev._id}
                        className="border-t border-gray-700 pt-6"
                      >
                        <div className="flex items-start">
                          <img
                            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            className="h-10 w-10 rounded-full mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-100">
                                {rev.firstName}
                                {rev.lastName}
                              </h3>
                              <span className="text-sm text-gray-400">
                                {new Date(rev.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <StarRating rating={rev.rating} />
                            <p className="mt-2 text-gray-300">{rev.review}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Similar Listings Section */}
              <div className="bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-100">
                  Similar Listings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map((similarHostel) => (
                    <SimilarHostelCard
                      key={similarHostel._id}
                      hostel={similarHostel}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Wishlist Card */}
                <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-100">
                        Rs.{ad.price}
                      </p>
                      <p className="text-gray-300">per month</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium text-gray-100">
                        {ad.averageRating}
                      </span>
                      <span className="ml-1 text-gray-400">
                        ({ad.reviews.length} reviews)
                      </span>
                    </div>
                  </div>

                  {authToken &&
                    requser &&
                    requser.isPremium &&
                    requser.role === "Student" && (
                      <button
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors mb-4"
                        onClick={() => toggleWishlist(requser._id, ad._id)}
                      >
                        <div className="flex items-center justify-center">
                          <Heart
                            className={`h-5 w-5 mr-2 ${
                              isInWishlist ? "fill-current" : ""
                            }`}
                          />
                          {isInWishlist
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                        </div>
                      </button>
                    )}

                  {!authToken && (
                    <Link to="/signup1">
                      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors mb-4">
                        create an account to find more information
                      </button>
                    </Link>
                  )}
                </div>

                {/* Host Card with Popup - Replaced the original Host Card */}
                {authToken && requser && ownerDetail && (
                  <HostCardWithPopup adId={ad._id} host={ownerDetail} />
                )}
              </div>
            </div>
          </div>
          {/* Right Sidebar or additional content can be added here if needed */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Listing2;
