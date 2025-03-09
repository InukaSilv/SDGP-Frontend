import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Users } from "lucide-react";

function AdDisplayer() {
  return (
    <Link
      to="/target-page"
      className="block w-full transform transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Hostel"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
            Rs.76000/Month
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900">
              Gampaha Elite Hostel
            </h3>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-700">4.8</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">Colombo City Center, 2.5km away</span>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">4-6 shared rooms</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                WiFi
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                AC
              </span>
            </div>
            <button className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AdDisplayer;
