import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Signup1 from "./pages/Signup1";
import Signup2 from "./pages/Signup2";
import User from "./pages/User";
import Login from "./pages/Login";
import VerifyWaiting from "./pages/VerifyWaiting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/Signup1" element={<Signup1 />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyWaiting" element={<VerifyWaiting />} />
      </Routes>
    </Router>
  );
}

export default App;
