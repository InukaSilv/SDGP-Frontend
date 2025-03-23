import { Navigate } from "react-router-dom";

function ProtectedNorm({ element }: { element: JSX.Element }) {
  return localStorage.getItem("authToken") ? <Navigate to={"/"} /> : element;
}
export default ProtectedNorm;
