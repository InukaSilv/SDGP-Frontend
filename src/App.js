import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './Pages/Homepage/Homepage';
import Signup1 from './Pages/Signup/Signup1'
import Browse from './Pages/Browse/Browse'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/browse" element={<Browse/>} />
      <Route path="/signup" element={<Signup1/>} />
    </Routes>
  </Router>
  );
}

export default App;
