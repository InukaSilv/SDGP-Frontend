import { useEffect, useState } from "react";
import { StickyNote, X } from "lucide-react";
import axios from "axios";
import AdminNavbar from "../../components/navbar/AdminNavbar";

interface AdminVerify {
  _id: string;
  user: string;
  firstName: string;
  images: string[];
  createdAt: string;
}

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [verifies, setVerifies] = useState<AdminVerify[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const adminAuth = localStorage.getItem("adminToken");

  useEffect(() => {
    getVerify();
  }, []);

  const getVerify = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/getVerify`, {
        headers: {
          Authorization: `Bearer ${adminAuth}`,
        },
      });
      setVerifies(response.data.revs);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching verifications:", err);
      setIsLoading(false);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/verify`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${adminAuth}`,
          },
        }
      );
      getVerify();
    } catch (err) {
      console.error("Error fetching verifications:", err);
      setIsLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/reject`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${adminAuth}`,
          },
        }
      );
      getVerify();
    } catch (err) {
      console.error("Error fetching verifications:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6  py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <StickyNote className="h-6 w-6 text-gray-600" />
            <h1 className="text-2xl font-semibold text-gray-900">
              Verification Requests
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Images
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {verifies.map((review) => (
                    <tr key={review._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {review._id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {review.firstName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review ${index + 1}`}
                              className="h-16 w-16 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                              onClick={() => setSelectedImage(image)}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleVerify(review._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => handleReject(review._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
