import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import BlogList from "./components/BlogList";
import CreatePost from "./components/CreatePost";
import BlogPost from "./components/BlogPost";
import Navbar from "./components/Navbar";
import EditPost from "./components/EditPost";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<BlogPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
