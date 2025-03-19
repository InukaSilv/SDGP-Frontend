import { Locate, MapPin, Pin, Star, StickyNote } from "lucide-react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { matchRoutes } from "react-router-dom";

interface Ads {
  _id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  housingType: "Hostel" | "House" | "Apartment";
  residents: number;
  currentResidents: number;
  averageRating: number;
  views: number;
  createdAt: string;
}

function Adminads() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [ads, setAds] = useState<Ads[]>([]);
  const adminAuth = localStorage.getItem("adminToken");

  const getAds = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/get-Ads-Data`,
        {
          headers: {
            Authorization: `Bearer ${adminAuth}`,
          },
        }
      );
      const data = response.data;
      setAds(data.Ads || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const filteredListing = ads.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "all") return matchesSearch;
    return matchesSearch && listing.housingType === filterType;
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto scroll-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <StickyNote className="h-6 w-6 text-gray-600" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Ads Management
              </h1>
            </div>
            <div className="relative flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search Ads by location or title"
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Types</option>
                <option value="Hostel">Hostel</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="bg-white md:w-[1400px] max-h-[800px] shadow-md rounded-lg overflow-y-auto">
              <div className="overflow-x-auto overflow-auto">
                <table className="min-w-full  divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Occupancy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredListing.map((ads, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {ads.title}
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 flex">
                            <MapPin size={20} className="text-blue-600" />{" "}
                            {ads.address}
                          </div>
                        </td>
                        <td className=" py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div
                              className={` p-1 w-25 text-center rounded-lg font-bold ${
                                ads.housingType === "Hostel" && "bg-amber-300"
                              } ${
                                ads.housingType === "House" && "bg-purple-300"
                              }
                              ${
                                ads.housingType === "Apartment" && "bg-blue-300"
                              }
                              `}
                            >
                              {ads.housingType}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {ads.price}
                          </div>
                        </td>

                        <td className=" py-4 whitespace-nowrap">
                          <div className="text-xs text-gray-500">
                            {ads.currentResidents}/{ads.residents}
                          </div>
                        </td>

                        <td className=" py-4 whitespace-nowrap">
                          <div className="text-xs text-gray-500 flex gap-2">
                            <Star className="text-yellow-500 mt-1" size={20} />
                            <p className="text-lg">{ads.averageRating}</p>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(ads.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="bg-red-400 p-2 rounded-sm text-white">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Adminads;
