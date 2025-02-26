import React from "react";
import PostAdForm from "../components/postAdForm/PostAdForm";
import Navbar from "../components/navbar/Navbar";
import PostAdNew from "../components/postAdForm/PostAdNew";

const PostAdPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-6">
        {/* <PostAdForm /> */}
        <PostAdNew />
      </div>
    </>
  );
};

export default PostAdPage;
