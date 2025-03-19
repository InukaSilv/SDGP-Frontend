import { Navigate } from "react-router-dom";

function ProtectedStudentRoute({ element }: { element: JSX.Element }) {
  const authToken = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!authToken || user?.role?.toLowerCase() !== "student") {
    return <Navigate to="/login" />;
  }
  return element;
}

export default ProtectedStudentRoute;
