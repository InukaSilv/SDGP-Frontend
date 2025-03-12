import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Wifi, ChefHat, Car, Phone, Mail, MessageCircle, Heart, Cctv, Users, BookOpen, X, AirVent, CookingPot, WashingMachine } from 'lucide-react';
import Footer from "../components/footer/Footer";

// This would normally come from an API
const SAMPLE_HOSTEL = {
  id: '1',
  name: 'Wallwatte Lauries Hostel',
  location: 'Wallawatte, Colombo',
  rating: 4.8,
  reviews: 128,
  price: 45000,
  images: [
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  ],
  host: {
    name: 'Lasal Rathnayake',
    image: 'https://storage.googleapis.com/rivve-web-trial/lasal',
    rating: 4.9
  },
  facilities: ['WiFi', 'Kitchen', 'Parking' ,'A/C','CCTV','Study Rooms','Food','Laundry'],
  description: 'Shape eke lagai iit, hdha dhhha sdashhhdahhdshadhashdhas dgsdhagsdbas dashdhbda dghasvdsvvagd gggdga dggggsahd saggggsah dsaggghsa dgasgggdaghs dsagggdgsha dgasgdggahs dasgdhasgdhas dghasgdhsa dghasdghsgd ashdgsahdg aghsd aghsdhasd ashdgahs ghdhas',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4373.743289021465!2d79.8568296432495!3d6.875503896416942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bb8451ec93f%3A0xd7510c0cc08d5c2a!2sGreen%20Palace%20Colombo!5e1!3m2!1sen!2slk!4v1739990677900!5m2!1sen!2slk',
  ratingBreakdown: {
    5: 80,
    4: 30,
    3: 10,
    2: 5,
    1: 3
  },
  similarHostels: [
    {
      id: '2',
      name: 'Green Palace Student Housing',
      location: 'Bambalapitiya, Colombo',
      rating: 4.6,
      reviews: 89,
      price: 42000,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: '3',
      name: 'Marina Student Lodge',
      location: 'Kollupitiya, Colombo',
      rating: 4.7,
      reviews: 156,
      price: 48000,
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ],
  reviewList: [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 5,
      comment: 'Amazing location and fantastic facilities! The host was incredibly helpful and made my stay memorable.',
      date: '2024-02-15'
    },
    {
      id: '2',
      user: {
        name: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 4,
      comment: 'Great value for money. The kitchen facilities were well-maintained and the WiFi was reliable.',
      date: '2024-02-10'
    },
    {
      id: '3',
      user: {
        name: 'Emma Wilson',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      rating: 5,
      comment: 'Perfect for long-term stays! The location is convenient and the community is very friendly.',
      date: '2024-02-01'
    }
  ]
};

interface Review {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: string;
}

const RatingBar = ({ rating, count, total }: { rating: number; count: number; total: number }) => {
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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};


const WishlistCard = ({ hostel }: { hostel: typeof SAMPLE_HOSTEL }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-bold text-gray-100">Rs.{hostel.price}</p>
          <p className="text-gray-300">per month</p>
        </div>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium text-gray-100">{hostel.rating}</span>
          <span className="ml-1 text-gray-400">({hostel.reviews} reviews)</span>
        </div>
      </div>
      
      <button 
        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors mb-4"
        onClick={toggleWishlist}
      >
        <div className="flex items-center justify-center">
          <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? "fill-current" : ""}`} />
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </div>
      </button>
      
      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors mb-4">
        Contact Host
      </button>
      
      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors mb-4">
        Checkout Now
      </button>
    </div>
  );
};

const HostCardWithPopup = ({ host }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center mb-4">
        <img
          src={host.image}
          alt={host.name}
          className="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-medium text-gray-100">{host.name}</h3>
          <p className="text-gray-400">Host</p>
        </div>
      </div>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span>Message Host</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 border border-gray-600 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
          <Phone className="h-5 w-5" />
          <span>Call Host</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 border border-gray-600 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
          <Mail className="h-5 w-5" />
          <span>Email Host</span>
        </button>
        
        {/* View More Button */}
        <button 
          onClick={toggleDetails}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          <Users className="h-5 w-5" />
          <span>View More Details</span>
        </button>
      </div>
      
      {/* Popup Thing test dulen 1 tr */}
      {showDetails && (
        <div className="fixed inset-0 bg-trasparent-300 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-xl p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-100">Host Details</h2>
              <button 
                onClick={toggleDetails}
                className="p-1 rounded-full hover:bg-gray-700"
              >
                <X className="h-6 w-6 text-gray-300" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <img
                src={host.image}
                alt={host.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{host.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-200">{host.rating}</span>
                  <span className="text-gray-400 ml-2">Superhost</span>
                </div>
                <p className="text-gray-300">Hosting since January 2022</p>
                <p className="text-gray-300 mt-2">Response rate: 98%</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">About</h3>
              <p className="text-gray-300">
                Hi, I'm {host.name}! I'm a passionate host dedicated to providing comfortable and affordable accommodations for students. I believe in creating a welcoming environment where students can focus on their studies while feeling at home.
              </p>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-300">+94 7X XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-300">contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-300">Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Verification</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-300">ID Verified</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-300">Email Verified</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-300">Phone Verified</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-gray-300">Background Check</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                onClick={toggleDetails}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-red-700">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SimilarHostelCard = ({ hostel }) => {
  return (
    <Link to={`/hostel/${hostel.id}`} className="block">
      <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-48">
          <img src={hostel.image} alt={hostel.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-semibold">{hostel.name}</h3>
            <p className="text-gray-200 text-sm">{hostel.location}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-100">{hostel.rating}</span>
              <span className="text-gray-400 text-sm ml-1">({hostel.reviews})</span>
            </div>
            <p className="text-gray-100 font-semibold">Rs.{hostel.price}/mo</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function HostelDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const hostel = SAMPLE_HOSTEL; // In real app, fetch based on id

  const totalReviews = Object.values(hostel.ratingBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[500px] rounded-xl overflow-hidden mb-4">
            <img
              src={hostel.images[selectedImage]}
              alt={hostel.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-3 overflow-x-20">
            {hostel.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-48 rounded-lg overflow-hidden flex-shrink-0 ${
                  selectedImage === index ? 'ring-3 ring-blue-500' : ''
                }`}
              >
                <img src={image} alt={`${hostel.name} ${index + 1}`} className="w-full h-full object-cover" />
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
                  <h1 className="text-3xl font-bold text-gray-100">{hostel.name}</h1>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-300">{hostel.location}</span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-700">
                  <Heart className="h-6 w-6 text-red-400" />
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-100">Description</h2>
                <p className="text-gray-300">{hostel.description}</p>
              </div>

              <div className="border-t border-gray-700 mt-4 pt-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hostel.facilities.map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      {facility === 'WiFi' && <Wifi className="h-5 w-5 text-gray-300" />}
                      {facility === 'Kitchen' && <ChefHat className="h-5 w-5 text-gray-300" />}
                      {facility === 'Parking' && <Car className="h-5 w-5 text-gray-300" />}
                      {facility === 'A/C' && <AirVent className="h-5 w-5 text-gray-300" />}
                      {facility === 'CCTV' && <Cctv className="h-5 w-5 text-gray-300" />}
                      {facility === 'Study Rooms' && <BookOpen className="h-5 w-5 text-gray-300" />}
                      {facility === 'Food' && <CookingPot className="h-5 w-5 text-gray-300" />}
                      {facility === 'Laundry' && <WashingMachine className="h-5 w-5 text-gray-300" />}
                      <span className="text-gray-300">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Location</h2>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src={hostel.mapUrl}
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
              <h2 className="text-xl font-semibold mb-6 text-gray-100">Ratings & Reviews</h2>
              
              {/* Rating Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-gray-100 mb-2">{hostel.rating}</div>
                  <StarRating rating={Math.round(hostel.rating)} />
                  <div className="text-gray-400 mt-2">{totalReviews} reviews</div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <RatingBar
                      key={rating}
                      rating={rating}
                      count={hostel.ratingBreakdown[rating]}
                      total={totalReviews}
                    />
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {hostel.reviewList.map((review) => (
                  <div key={review.id} className="border-t border-gray-700 pt-6">
                    <div className="flex items-start">
                      <img
                        src={review.user.image}
                        alt={review.user.name}
                        className="h-10 w-10 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-100">{review.user.name}</h3>
                          <span className="text-sm text-gray-400">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <StarRating rating={review.rating} />
                        <p className="mt-2 text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Listings Section */}
            <div className="bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-100">Similar Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hostel.similarHostels.map((similarHostel) => (
                  <SimilarHostelCard key={similarHostel.id} hostel={similarHostel} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Wishlist Card */}
              <WishlistCard hostel={hostel} />

              {/* Host Card with Popup - Replaced the original Host Card */}
              <HostCardWithPopup host={hostel.host} />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}