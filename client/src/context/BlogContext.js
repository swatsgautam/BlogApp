import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    //State variable to hold an array of posts, initialized as an empty array & Function to update the posts state.
    const [posts, setPosts] = useState([]); 

    //State variable to hold the currently selected post (for editing), initialized as null
    const [selectedPost, setSelectedPost] = useState(null); 
  
    // Fetch all posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts"); //make a GET request to the API endpoint.
        setPosts(response.data.posts); // updates the posts state with the retrieved posts 
      } catch (error) {
        console.error("Error fetching posts:", error); //logs the error message to the console
      }
    };
  
    // Fetch a single post by ID
    const fetchPost = async (id) => {
      try {
        //Accepts id as a parameter and makes a GET request to fetch the specific post
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`); 
        setSelectedPost(response.data); //updates the selectedPost state with the retrieved post data
      } catch (error) {
        console.error("Error fetching post:", error); //logs the error message to the console
      }
    };
  
    // Create a new post
    const createPost = async (post) => {
      try {
        //Accepts a post object as a parameter and makes a POST request to the API endpoint with that data
        const response = await axios.post("http://localhost:5000/api/posts", post);

        //updates the posts state by adding the newly created post to the existing posts using the spread operator
        setPosts([...posts, response.data]);
      } catch (error) {
        console.error("Error creating post:", error); //logs the error message to the console
      }
    };
  
    // Update an existing post
    const updatePost = async (id, updatedPost) => {
      try {
        //Accepts id and updatedPost as parameters and makes a PUT request to the API endpoint
        const response = await axios.put(`http://localhost:5000/api/posts/${id}`, updatedPost);

        //updates the posts state by mapping over the existing posts and replacing the updated post based on its ID
        setPosts(posts.map(post => (post._id === id ? response.data : post)));
      } catch (error) {
        console.error("Error updating post:", error); //logs the error message to the console
      }
    };
  
    // Delete a post
    const deletePost = async (id) => {
      try {
        //Accepts id as a parameter and makes a DELETE request to the API endpoint
        await axios.delete(`http://localhost:5000/api/posts/${id}`);

        //updates the posts state by filtering out the deleted post
        setPosts(posts.filter(post => post._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error); //logs the error message to the console
      }
    };
  
    //This hook runs the fetchPosts function when the component mounts
    //ensures that the posts are fetched from the server when the provider is first rendered
    useEffect(() => {
      fetchPosts(); // 
    }, []);
  
    return (
      <BlogContext.Provider
        value={{
          posts,
          selectedPost,
          fetchPosts,
          fetchPost,
          createPost,
          updatePost,
          deletePost,
        }}
      >
        {children}
      </BlogContext.Provider>
    );
};
