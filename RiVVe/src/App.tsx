import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import HostelDisplay from "./pages/HostelDisplay"; // Keep this if needed
import HostelReviewPage from './pages/FeedbackPage';
import Signup1 from "./pages/Signup1";
import Signup2 from "./pages/Signup2";
import User from "./pages/User";
import Login from "./pages/Login";
import VerifyWaiting from "./pages/VerifyWaiting";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import MyAds from "./pages/Landlord/MyAds";
import EditAd from "./pages/Landlord/EditAd";
import TargetPage from "./pages/TargetPage";
import { HostelDetails } from "./pages/HostelDetails";
import Posting from "./pages/Landlord/Posting";
import ProtectedLandlordRoute from "./components/protectedRoute/ProtectedLandlordRoute";

import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import Listing2 from "./pages/Listing2";
import StudentReview from "./pages/Student/StudentReview";
import FeedbackPage from "./pages/Student/FeedbackPage";
import LandLordVerify from "./pages/Landlord/LandlordVerify";
import Admin from "./pages/Admin/Admin";
import AdminMain from "./pages/Admin/AdminMain";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminVerification from "./pages/Admin/AdminVerification";
import Adminads from "./pages/Admin/Adminads";
import Payment from "./pages/Payment/Payment";
import ProtectedStudentRoute from "./components/protectedRoute/ProtectedStudentRoute";
import PremiumWishList from "./pages/Student/PremiumWishList";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import ProtectedNorm from "./components/protectedRoute/ProtectedNorm";
import ProtectedVerifies from "./components/protectedRoute/ProtectedVerifies";
import ProtectedStudentPremium from "./components/protectedRoute/ProtectedStudentPremium";
import TermsAndConditions from "./pages/Admin/TermsAndConditions";
import Payment2 from "./pages/Payment/Payment2";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing2" element={<Listing2 />} />
          <Route path="/hostel" element={<HostelDisplay />} />

          <Route
            path="/Signup1"
            element={<ProtectedNorm element={<Signup1 />} />}
          />
          <Route
            path="/signup2"
            element={<ProtectedNorm element={<Signup2 />} />}
          />
          <Route
            path="/login"
            element={<ProtectedNorm element={<Login />} />}
          />
          <Route path="/verifyWaiting" element={<VerifyWaiting />} />
          <Route path="/forgotpassword" element={<ForgotPasswordEmail />} />
          <Route path="/user" element={<ProtectedRoute element={<User />} />} />

          <Route
            path="/MyAds"
            element={<ProtectedLandlordRoute element={<MyAds />} />}
          />
          <Route path="/target-page" element={<TargetPage />} />

          <Route path="/testd" element={<HostelDetails />} />

          <Route
            path="/message"
            element={<ProtectedVerifies element={<Chat />} />}
          />

          <Route
            path="/posting"
            element={<ProtectedLandlordRoute element={<Posting />} />}
          />
          <Route
            path="/edit-ad"
            element={<ProtectedLandlordRoute element={<EditAd />} />}
          />
          <Route path="/contacts" element={<Contact />} />

          <Route
            path="/student-review"
            element={<ProtectedStudentRoute element={<StudentReview />} />}
          />

          <Route
            path="/feedback"
            element={<ProtectedStudentRoute element={<FeedbackPage />} />}
          />

          <Route
            path="/landlord-verification"
            element={<ProtectedLandlordRoute element={<LandLordVerify />} />}
          />

          <Route path="/Admin-login" element={<Admin />} />
          <Route path="/admin-main" element={<AdminMain />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-verify" element={<AdminVerification />} />
          <Route path="/admin-ads" element={<Adminads />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment2" element={<Payment2 />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<Navigate to="/user" />} />

          <Route
            path="/wishlist"
            element={<ProtectedStudentPremium element={<PremiumWishList />} />}
          />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
