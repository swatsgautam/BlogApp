import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Blogs App</h1> 
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
