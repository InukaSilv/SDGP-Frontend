import React from "react";
import { Link, Star } from "lucide-react";

function SimilarHostelCard({ hostel }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48">
        <img
          src={hostel.images[0]}
          alt={hostel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold">{hostel.title}</h3>
          <p className="text-gray-200 text-sm">{hostel.address}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-100">{hostel.averageRating}</span>
            <span className="text-gray-400 text-sm ml-1">
              ({hostel.totalRatingCount})
            </span>
          </div>
          <p className="text-gray-100 font-semibold">Rs.{hostel.price}/mo</p>
        </div>
      </div>
    </div>
  );
}
export default SimilarHostelCard;
