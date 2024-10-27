import React, { useContext, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const { posts, fetchPosts } = useContext(BlogContext);

  
  useEffect(() => {
    
    fetchPosts(); // Fetch all posts when the component mounts
    // eslint-disable-next-line
  }, []);

  return (
    <div className="blog-list">
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id} className="blog-list-item">
            <Link to={`/posts/${post._id}`} className="post-link">
              <h2>{post.title}</h2>
              <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="post-author">By {post.author}</p>
              <p className="post-description">{post.content.slice(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
