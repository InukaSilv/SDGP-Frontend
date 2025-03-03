import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }: { element: JSX.Element }) {
  return localStorage.getItem("authToken") ? (
    element
  ) : (
    <Navigate to={"/login"} />
  );
}
export default ProtectedRoute;
