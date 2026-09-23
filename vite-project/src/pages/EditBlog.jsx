import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EditBlog = ({ blogs, updateBlog }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id === id);

  const [title, setTitle] = useState(blog?.title || "");
  const [body, setBody] = useState(blog?.body || "");

  if (!blog) {
    return (
      <div className="not-found">
        <h2>Blog not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  if (blog.authorId !== user?.id) {
    return (
      <div className="not-found">
        <h2>Access Denied</h2>
        <p>You can only edit your own blogs.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = {
      ...blog,
      title,
      body,
    };

    updateBlog(updatedBlog);

    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div className="create-blog">
      <h1>Edit Blog</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Blog Title</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="body">Blog Content</label>

        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBlog;
