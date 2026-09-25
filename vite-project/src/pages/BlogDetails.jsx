import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Blog not found.");
          return;
        }

        setBlog(data);
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
        <div className="not-found-icon">?</div>
        <h2>{message || "Blog not found"}</h2>
        <p>
          The article you're looking for may have been removed or doesn't exist.
        </p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const isOwner = user && blog.authorId?.toString() === user.id?.toString();

  const wordCount = blog.body.trim().split(/\s+/).length;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="blog-details">
      <Link to="/" className="back-link">
        ← Back to blogs
      </Link>

      <div className="article-header">
        <span className="article-category">JOURNAL</span>

        <h1>{blog.title}</h1>

        <div className="article-meta">
          <span>
            By <strong>{blog.author}</strong>
          </span>

          {blog.createdAt && (
            <>
              <span className="meta-dot">•</span>

              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </>
          )}

          <span className="meta-dot">•</span>

          <span>{readingTime} min read</span>
        </div>
      </div>

      <div className="details-content">
        <p>{blog.body}</p>
      </div>

      {isOwner && (
        <div className="blog-actions">
          <Link to={`/blogs/${blog._id}/edit`} className="edit-btn">
            Edit this article
          </Link>
        </div>
      )}
    </article>
  );
};

export default BlogDetails;
