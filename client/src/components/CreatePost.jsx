import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const CreatePost = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { createPost } = useContext(BlogContext); // Access context method to create a post

  // State for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title, content, author }); // Create a new post
    navigate("/"); // Redirect to the homepage after submission
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
