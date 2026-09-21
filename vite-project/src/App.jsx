import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";

import initialBlogs from "./data/blogs";

function App() {
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("dailyDiaryBlogs");

    return savedBlogs ? JSON.parse(savedBlogs) : initialBlogs;
  });

  useEffect(() => {
    localStorage.setItem("dailyDiaryBlogs", JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (newBlog) => {
    setBlogs((previousBlogs) => {
      return [...previousBlogs, newBlog];
    });
  };
  const deleteBlog = (id) => {
    setBlogs((previousBlogs) => {
      return previousBlogs.filter((blog) => blog.id !== id);
    });
  };

  return (
    <Router>
      <Navbar />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home blogs={blogs} deleteBlog={deleteBlog} />}
          />

          <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />

          <Route path="/create" element={<CreateBlog addBlog={addBlog} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
