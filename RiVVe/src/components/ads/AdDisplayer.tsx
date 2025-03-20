import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Users, User } from "lucide-react";

interface roomTypes {
  doubleRoom: number;
  singleRoom: number;
}
interface AdDisplayer {
  id: string;
  title: string;
  price: number;
  images: [];
  address: string;
  roomTypes: roomTypes;
  facilities: [];
  averageRating: number;
}

interface AdDisplayerProps {
  ad: AdDisplayer;
}

function AdDisplayer({ ad }: AdDisplayerProps) {
  return (
    <Link
      to="/listing2"
      state={{ ad }}
      className="block h-100 w-full transform transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={ad.images[0]}
            alt="Hostel"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-lg font-bold text-blue-600">
            {ad.price}/Month
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900">{ad.title}</h3>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-700">{ad.averageRating}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{ad.address}</span>
          </div>

          {ad.roomTypes.singleRoom !== 0 && (
            <div className="flex items-center text-gray-600 mb-1">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {ad.roomTypes.doubleRoom} Double rooms
              </span>
            </div>
          )}

          {ad.roomTypes.doubleRoom !== 0 && (
            <div className="flex items-center text-gray-600 mb-4">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {ad.roomTypes.singleRoom} Single rooms
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {ad.facilities[0] ? (
                <>
                  {" "}
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {ad.facilities[0]}
                  </span>
                </>
              ) : (
                ""
              )}

              {ad.facilities[1] ? (
                <>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    {ad.facilities[1]}
                  </span>
                </>
              ) : (
                ""
              )}
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
