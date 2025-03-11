import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Wifi, Twitch as Kitchen, Car, Phone, Mail, MessageCircle, Heart } from 'lucide-react';

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
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  ],
  host: {
    name: 'Lasal Rathnayake',
    image: 'https://storage.googleapis.com/rivve-web-trial/lasal',
    rating: 4.9
  },
  facilities: ['WiFi', 'Kitchen', 'Laundry', 'Parking'],
  description: 'Shape eke lagai iit, hdha dhhha sdashhhdahhdshadhashdhas dgsdhagsdbas dashdhbda dghasvdsvvagd gggdga dggggsahd saggggsah dsaggghsa dgasgggdaghs dsagggdgsha dgasgdggahs dasgdhasgdhas dghasgdhsa dghasdghsgd ashdgsahdg aghsd aghsdhasd ashdgahs ghdhas',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4373.743289021465!2d79.8568296432495!3d6.875503896416942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bb8451ec93f%3A0xd7510c0cc08d5c2a!2sGreen%20Palace%20Colombo!5e1!3m2!1sen!2slk!4v1739990677900!5m2!1sen!2slk'
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
      
      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors mb-4">
        Contact Host
      </button>
      
      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors mb-4">
        Checkout Now
      </button>
    </div>
  );
};

export default function HostelDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const hostel = SAMPLE_HOSTEL; // In real app, fetch based on id

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-4">
            <img
              src={hostel.images[selectedImage]}
              alt={hostel.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {hostel.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-32 rounded-lg overflow-hidden flex-shrink-0 ${
                  selectedImage === index ? 'ring-2 ring-purple-500' : ''
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
                      {facility === 'Kitchen' && <Kitchen className="h-5 w-5 text-gray-300" />}
                      {facility === 'Parking' && <Car className="h-5 w-5 text-gray-300" />}
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Wishlist Card - Using the component */}
              <WishlistCard hostel={hostel} />

              {/* Host Card */}
              <div className="bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={hostel.host.image}
                    alt={hostel.host.name}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-100">{hostel.host.name}</h3>
                    <p className="text-gray-400">Host</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}