import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import initialBlogs from "./data/blogs";
import NotFound from "./pages/NotFound";
import EditBlog from "./pages/EditBlog";

function App() {
  const { user } = useAuth();
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
  const updateBlog = (updatedBlog) => {
    setBlogs((previousBlogs) => {
      return previousBlogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog;
        }

        return blog;
      });
    });
  };
  const deleteBlog = (id) => {
    if (!user) {
      return;
    }

    setBlogs((previousBlogs) => {
      return previousBlogs.filter((blog) => {
        if (blog.id === id) {
          return blog.authorId !== user.id;
        }

        return true;
      });
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

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog addBlog={addBlog} />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/blogs/:id/edit"
            element={
              <ProtectedRoute>
                <EditBlog blogs={blogs} updateBlog={updateBlog} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
