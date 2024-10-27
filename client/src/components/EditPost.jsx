import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPost, fetchPost, updatePost } = useContext(BlogContext);

  // Local state to manage form input fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch post data on mount and populate form
  useEffect(() => {
    const loadPost = async () => {
      await fetchPost(id);
      setTitle(selectedPost?.title || "");
      setContent(selectedPost?.content || "");
      setAuthor(selectedPost?.author || "");
    };
    loadPost();
  }, [id, fetchPost, selectedPost]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, { title, content, author });
    navigate(`/posts/${id}`); // Redirect to the post page after updating
  };

  if (!selectedPost) return <p>Loading...</p>;

  return (
    <div className="edit-post">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
