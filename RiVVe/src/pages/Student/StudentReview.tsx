import { useEffect, useState } from "react";
import { Building2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { Star } from "lucide-react";

function StudentReview() {
  const navigate = useNavigate();
  interface Property {
    id: string;
    title: string;
    name: string;
    address: string;
    images: string[];
  }

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentReviews = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5001/api/listing/check-reviews",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data && response.data.properties) {
          setProperties(response.data.properties);
        }
      } catch (error) {
        console.error("Error fetching student reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentReviews();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Properties Available for Review
            </h1>
            <p className="text-lg text-gray-600">
              Share your experience with these properties to help other students
            </p>
          </div>

          {properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No Properties to Review Yet
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                You haven't interacted with any properties that are available
                for review. Once you do, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 hover:scale-105 transition-transform"
                >
                  <img
                    src={
                      property.images[0] ||
                      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80"
                    }
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{property.address}</p>
                    <div className="flex">
                      <Star className="h-5 w-5 text-yellow-400 fill-current mb-3" />
                      <h2></h2>
                    </div>

                    <button
                      onClick={() => navigate("/feedback", { state: property })}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 hover:cursor-pointer"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentReview;
