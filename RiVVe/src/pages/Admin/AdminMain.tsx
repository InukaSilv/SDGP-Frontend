import axios from "axios";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/navbar/AdminNavbar";

interface dashboardDataProps {
  totalUsers: number;
  studentUsers: number;
  Landlords: number;
  ads: number;
  toReview: number;
}
function AdminMain() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<dashboardDataProps>();

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminToken");
    if (!adminAuth) {
      navigate("/login");
    }

    const getinitialData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/get-Data`, {
          headers: {
            Authorization: `Bearer ${adminAuth}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getinitialData();
  }, [navigate]);
  return (
    <>
      <AdminNavbar />
      {/* main div */}
      <div className="w-full">
        {/* left div */}
        <div className="flex flex-row">
          <ul>
            <li>Main</li>
          </ul>
        </div>

        <div className="ml-64 p-8">
          <div className="min-h-screen bg-gray-100 p-8 flex flex-col gap-2.5 ">
            <div className="w-[400px] mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Total Users : {dashboardData?.totalUsers}
                  </h3>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="w-[400px] mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Landlords : {dashboardData?.Landlords}
                  </h3>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="w-[400px] mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Students : {dashboardData?.studentUsers}
                  </h3>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="w-[400px] mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    ads : {dashboardData?.ads}
                  </h3>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="w-[400px] mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Landlords to Verify : {dashboardData?.toReview}
                  </h3>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminMain;
