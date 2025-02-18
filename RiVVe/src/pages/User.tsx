import { data } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

function User() {
  const storedUser = localStorage.getItem("user");
  const userdata = storedUser ? JSON.parse(storedUser) : null;

  return (
    <>
      <Navbar />
      <h1 className="mt-30">
        Welcome {userdata ? userdata.firstName : " User "}
      </h1>
    </>
  );
}
export default User;
