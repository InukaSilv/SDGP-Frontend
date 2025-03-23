import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquareMore,
  ShieldCheck,
  LogOut,
} from "lucide-react";
function AdminNavbar() {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      localStorage.removeItem("adminToken");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <>
      <nav className="bg-white h-screen w-50 fixed left-0 top-0 shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#2772A0]">RiVVE Admin</h1>
        </div>
        <ul className="space-y-2 px-4">
          <li>
            <NavLink
              to={"/admin-main"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-[#2772A0]"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">DashBoard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin-users"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-[#2772A0]"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Users size={20} />
              <span className="font-medium">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin-ads"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-[#2772A0]"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <MessageSquareMore size={20} />
              <span className="font-medium">Ads</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin-verify"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-[#2772A0]"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <ShieldCheck size={20} />
              <span className="font-medium">Verifications</span>
            </NavLink>
          </li>
        </ul>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-full px-4 py-2"
            onClick={Logout}
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}
export default AdminNavbar;
