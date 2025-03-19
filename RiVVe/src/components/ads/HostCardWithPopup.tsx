import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Users,
  X,
  Star,
  MapPin,
} from "lucide-react";

const HostCardWithPopup = ({ host }) => {
  const authToken = localStorage.getItem("authToken");

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  if (!host) {
    return <div className="text-red-500">Host data is not available.</div>;
  }

  return (
    authToken && (
      <div className="bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <img
            src={
              host.profilePhoto
                ? host.profilePhoto
                : `https://api.dicebear.com/7.x/initials/svg?seed=${host?.firstName} ${host?.lastName}&backgroundColor=#2772A0`
            }
            alt={host.name}
            className="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <h3 className="font-medium text-gray-100">{host.firstName}</h3>
            <p className="text-gray-400">LandLord</p>
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
                <h2 className="text-2xl font-bold text-gray-100">
                  Landlord Details
                </h2>
                <button
                  onClick={toggleDetails}
                  className="p-1 rounded-full hover:bg-gray-700"
                >
                  <X className="h-6 w-6 text-gray-300" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <img
                  src={
                    host.profilePhoto
                      ? host.profilePhoto
                      : `https://api.dicebear.com/7.x/initials/svg?seed=${host?.firstName} ${host?.lastName}&backgroundColor=#2772A0`
                  }
                  alt={host.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {host.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    {host.isEmailVerified && host.isIdVerified && (
                      <span className="text-gray-400 ml-2">SuperLandlord</span>
                    )}
                  </div>
                  <p className="text-gray-300">
                    Hosting since{" "}
                    {new Date(host.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-300">{host.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-300">{host.email}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-3">
                  Verification
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {host.isEmailVerified && (
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-300">Email Verified</p>
                    </div>
                  )}

                  {host.isIdVerified && (
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-300">ID Verified</p>
                    </div>
                  )}

                  {host.isPhoneVerified && (
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-300">Phone Verified</p>
                    </div>
                  )}
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
    )
  );
};
export default HostCardWithPopup;
