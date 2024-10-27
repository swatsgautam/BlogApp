const express = require("express"); // Imports the Express library, which is used to create the web server and define routes.
const router = express.Router(); // Creates an instance of an Express Router to manage routes.
const Post = require("../models/Post"); // Imports the Post model, which represents the data structure for a blog post in the database.


// Get all posts
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find(); // Fetches all posts from the database
      res.json(posts); // Sends the retrieved posts as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sends a 500 error if there is an issue during retrieval
    } 
  });
  
  // Get a single post by ID
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id); // Fetches a post by its ID from the request parameters
      if (!post) {
        return res.status(404).json({ message: "Post not found" }); // If no post is found, respond with a 404 error
      }
      res.json(post); // Sends the found post as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sends a 500 error if there is an issue during retrieval
    }
  });
  
  // Create a new post
  router.post("/", async (req, res) => {
    const { title, content, author } = req.body; // Destructures title, content, and author from the request body
    const newPost = new Post({ title, content, author }); // Creates a new instance of the Post model with the provided data.
    try {
      await newPost.save(); // Saves the new post to the database
      res.status(201).json(newPost); // Sends a 201 response with the created post
    } catch (error) {
      res.status(400).json({ message: error.message }); // Sends a 400 error if there is an issue during creation
    }
  });
  
  // Update an existing post by ID
  router.put("/:id", async (req, res) => {
    const { title, content, author } = req.body; // Destructures title, content, and author from the request body
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id, // Finds the post by ID from request parameters
        { title, content, author }, // Updates the post with the new data
        { new: true } // ensures that the updated post is returned
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" }); // If no post is found, respond with a 404 error
      }
      res.json(updatedPost); // Sends the updated post as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sends a 500 error if there is an issue during the update
    }
  });
  
  // Delete a post by ID
  router.delete("/:id", async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id); // Deletes the post by ID
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" }); // If no post is found, respond with a 404 error
      }
      res.json({ message: "Post deleted successfully" }); // Sends a success message upon successful deletion
    } catch (error) {
      res.status(500).json({ message: error.message }); // Sends a 500 error if there is an issue during deletion
    }
  });
  
module.exports = router;
