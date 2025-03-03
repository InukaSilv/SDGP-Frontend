import React from "react";
import Navbar from "../../components/navbar/navbar";
import PostAdNew from "../../components/forms/PostAdNew";

function Posting() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-6">
        <PostAdNew />
      </div>
    </>
  );
}

export default Posting;
