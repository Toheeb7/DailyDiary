import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BlogList = ({ blogs, title }) => {
  const { user } = useAuth();

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete blog.");
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error("Delete blog error:", error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <section className="blog-list">
      <div className="blog-list-header">
        <h2>{title}</h2>

        {blogs.length > 0 && (
          <span className="blog-count">
            {blogs.length} {blogs.length === 1 ? "blog" : "blogs"}
          </span>
        )}
      </div>

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <div className="no-blogs-icon">✦</div>

          <h3>No blogs found</h3>

          <p>
            Try searching for something else or be the first to create a blog.
          </p>
        </div>
      ) : (
        blogs.map((blog) => {
          const isOwner =
            user && blog.authorId?.toString() === user.id?.toString();

          const readingTime = Math.max(
            1,
            Math.ceil(blog.body.trim().split(/\s+/).length / 200),
          );

          return (
            <article className="blog-preview" key={blog._id}>
              <div className="blog-card-top">
                <span className="blog-category">JOURNAL</span>

                <span className="reading-time">{readingTime} min read</span>
              </div>

              <Link to={`/blogs/${blog._id}`}>
                <h3>{blog.title}</h3>
              </Link>

              <p className="author">
                Written by <strong>{blog.author}</strong>
                {blog.createdAt && (
                  <> • {new Date(blog.createdAt).toLocaleDateString()}</>
                )}
              </p>

              <p className="blog-excerpt">
                {blog.body.length > 150
                  ? `${blog.body.substring(0, 150)}...`
                  : blog.body}
              </p>

              <div className="blog-card-footer">
                <Link to={`/blogs/${blog._id}`} className="read-more">
                  Read article →
                </Link>

                {isOwner && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </article>
          );
        })
      )}
    </section>
  );
};

export default BlogList;
