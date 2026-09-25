import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data.message || "Blog not found."
          );
          return;
        }

        setBlog(data);
        setTitle(data.title);
        setBody(data.body);
      } catch (error) {
        console.error("Fetch blog error:", error);
        setMessage("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="not-found">
        <div className="loading-spinner"></div>
        <h2>Loading article...</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="not-found">
        <h2>{message || "Blog not found"}</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const isOwner =
    user &&
    blog.authorId?.toString() ===
      user.id?.toString();

  if (!isOwner) {
    return (
      <div className="not-found">
        <div className="not-found-icon">!</div>

        <h2>Access Denied</h2>

        <p>
          You can only edit articles that belong to
          your account.
        </p>

        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            body,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Failed to update blog."
        );
        return;
      }

      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error("Update blog error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="create-blog">
      <Link to={`/blogs/${id}`} className="back-link">
        ← Back to article
      </Link>

      <div className="form-heading">
        <span className="form-label">EDIT JOURNAL</span>

        <h1>Edit Your Blog</h1>

        <p>
          Update your story and save your changes when
          you're ready.
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
            maxLength="120"
            required
          />

          <span className="character-count">
            {title.length}/120
          </span>
        </div>

        <div className="form-field">
          <label htmlFor="body">Blog Content</label>

          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="12"
            required
          />

          <span className="writing-hint">
            Your changes will be saved to your account.
          </span>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes →"}
        </button>

        {message && (
          <p className="auth-message form-message">
            {message}
          </p>
        )}
      </form>
    </main>
  );
};

export default EditBlog;