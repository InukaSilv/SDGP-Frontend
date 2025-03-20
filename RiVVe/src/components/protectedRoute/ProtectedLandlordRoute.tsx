import { Navigate } from "react-router-dom";

function ProtectedLandlordRoute({ element }: { element: JSX.Element }) {
  const authToken = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!authToken || user?.role?.toLowerCase() !== "landlord") {
    return <Navigate to="/login" />;
  }
  return element;
}

export default ProtectedLandlordRoute;
