import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Listing from "./pages/Listing";


function App() {
  return (
    <Router>
       <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing" element={<Listing/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
