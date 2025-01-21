import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for University"
          className="search-input"
        />
      </div>
      <button className="search-button">Search</button>
    </div>
  );
}

export default SearchBar;
