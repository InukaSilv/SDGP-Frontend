import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Edit, Wifi, Coffee, Utensils, Clock } from 'lucide-react';
import { SAMPLE_HOSTELS } from '../data/data';

export function HostelDetails() {
  const { id } = useParams();
  const hostel = SAMPLE_HOSTELS.find(h => h.id === Number(id));

  if (!hostel) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Hostel not found</h2>
          <Link to="/" className="mt-4 text-indigo-600 hover:text-indigo-500">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={hostel.image}
            alt={hostel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link
              to={`/hostel/${hostel.id}/edit`}
              className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{hostel.name}</h1>
            <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-lg">
              <Star className="w-5 h-5 text-indigo-600 fill-current" />
              <span className="ml-1 font-semibold text-indigo-600">{hostel.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{hostel.location} • {hostel.distance}km from center</span>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About this hostel</h2>
            <p className="text-gray-600 mb-6">{hostel.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hostel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">${hostel.price}</span>
                <span className="text-gray-600">/night</span>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function getAmenityIcon(amenity: string) {
  switch (amenity.toLowerCase()) {
    case 'free wifi':
      return <Wifi className="w-5 h-5" />;
    case 'free breakfast':
      return <Coffee className="w-5 h-5" />;
    case 'shared kitchen':
      return <Utensils className="w-5 h-5" />;
    case '24/7 reception':
      return <Clock className="w-5 h-5" />;
    default:
      return <div className="w-5 h-5" />;
  }
}