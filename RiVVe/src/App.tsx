import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import HostelDisplay from "./pages/HostelDisplay"; // Keep this if needed
import Signup1 from "./pages/Signup1";
import Signup2 from "./pages/Signup2";
import User from "./pages/User";
import Login from "./pages/Login";
import VerifyWaiting from "./pages/VerifyWaiting";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import MyAds from "./pages/Landlord/MyAds";
import EditAd from "./pages/Landlord/EditAd";
import AdDisplayer from "./components/ads/AdDisplayer";
import TargetPage from "./pages/TargetPage";
import { HostelDetails } from "./pages/HostelDetails";
import Posting from "./pages/Landlord/Posting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/hostel" element={<HostelDisplay />} /> {/* If needed */}
        <Route path="/Signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyWaiting" element={<VerifyWaiting />} />
        <Route path="/forgotpassword" element={<ForgotPasswordEmail />} />
        <Route path="/user" element={<ProtectedRoute element={<User />} />} />
        <Route path="/MyAds" element={<ProtectedRoute element={<MyAds />} />} />
        <Route path="/target-page" element={<TargetPage />} />
        <Route path="/testd" element={<HostelDetails />} />
        <Route path="/posting" element={<Posting />} />
        <Route
          path="/edit-ad"
          element={<ProtectedRoute element={<EditAd />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
