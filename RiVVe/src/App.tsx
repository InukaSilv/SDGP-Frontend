import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import HostelDisplay from "./pages/HostelDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/hostel" element={<HostelDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
