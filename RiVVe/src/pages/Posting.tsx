import React from 'react';
import PostAdForm from '../components/postAdForm/PostAdForm';


const PostAdPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <PostAdForm/>
    </div>
  );
};

export default PostAdPage;