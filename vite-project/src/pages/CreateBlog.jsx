import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now().toString(),
      title,
      body,
      author,
      authorId: user.id,
      createdAt: new Date().toISOString(),
    };

    addBlog(newBlog);

    navigate("/");
  };

  return (
    <div className="create-blog">
      <h1>Create a New Blog</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Blog Title</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title"
          required
        />

        <label htmlFor="author">Author</label>

        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="body">Blog Content</label>

        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your blog..."
          rows="8"
          required
        />

        <button type="submit">Publish Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
