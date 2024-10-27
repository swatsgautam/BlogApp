import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; //useParams allows access to URL parameters
import { BlogContext } from "../context/BlogContext";

const BlogPost = () => {
  const { id } = useParams(); //Extracts the id parameter from the current URL 
  const { selectedPost, fetchPost, deletePost } = useContext(BlogContext);

  //this hook runs whenever the component mounts or when the id or fetchPost changes
  useEffect(() => {
    fetchPost(id); // Fetch the selected post based on the ID from URL params
  }, [id, fetchPost]);

  const handleDelete = async () => {
    await deletePost(id); // Delete the post by its ID
    window.location.href = "/"; // Redirect to the homepage after deletion
  };

  // Display a loading message while the post is being fetched
  if (!selectedPost) return <p>Loading...</p>;

  return (
    <div className="blog-post">
      <h2>{selectedPost.title}</h2>
      <p>By {selectedPost.author}</p>
      <p>
      {selectedPost.content.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <Link to={`/edit/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BlogPost;
