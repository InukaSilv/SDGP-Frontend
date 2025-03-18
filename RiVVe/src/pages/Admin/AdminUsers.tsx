import { useState, useEffect } from "react";
import { Table } from "lucide-react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "Student" | "Landlord";
  registerType: "password" | "google";
  isPremium: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdVerified: boolean;
  createdAt: string;
}

function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const adminAuth = localStorage.getItem("adminToken");

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/get-User-Data",
        {
          headers: {
            Authorization: `Bearer ${adminAuth}`,
          },
        }
      );
      const data = response.data;
      setUsers(data.users || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemove = async (userId) => {
    try {
      await axios.delete("http://localhost:5001/api/admin/delete-user", {
        headers: {
          Authorization: `Bearer ${adminAuth}`,
        },
        data: { id: userId },
      });
      getUsers();
    } catch (error) {
      console.error("Error fetching users:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto scroll-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Table className="h-6 w-6 text-gray-600" />
            <h1 className="text-2xl font-semibold text-gray-900">
              Users Management
            </h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
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
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user._id}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.registerType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.isEmailVerified ? (
                            <span className="text-green-600">Verified</span>
                          ) : (
                            <span className="text-red-600">Unverified</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.phone}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.isPhoneVerified ? (
                            <span className="text-green-600">Verified</span>
                          ) : (
                            <span className="text-red-600">Unverified</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "Landlord"
                              ? "bg-purple-100 text-blue-500"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isPremium
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.isPremium ? "Premium" : "Standard"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="bg-red-400 p-2 rounded-sm text-white"
                          onClick={() => handleRemove(user._id)}
                        >
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
  );
}

export default AdminUsers;
