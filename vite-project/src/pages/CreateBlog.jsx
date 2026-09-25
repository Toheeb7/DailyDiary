import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            body,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create blog.");
        return;
      }

      setMessage("Blog published successfully!");

      setTitle("");
      setBody("");

      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (error) {
      console.error("Create blog error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-blog">
      <div className="form-heading">
        <span className="form-label">NEW JOURNAL</span>

        <h1>Create a New Blog</h1>

        <p>
          Share your thoughts, experiences, ideas, or anything worth
          remembering.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Blog Title</label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a title..."
            maxLength="120"
            required
          />

          <span className="character-count">{title.length}/120</span>
        </div>

        <div className="form-field">
          <label htmlFor="body">Blog Content</label>

          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Start writing your story..."
            rows="10"
            required
          />

          <span className="writing-hint">Take your time. Write freely.</span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Blog →"}
        </button>

        {message && <p className="auth-message form-message">{message}</p>}
      </form>
    </main>
  );
};

export default CreateBlog;
