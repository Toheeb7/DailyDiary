import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BlogList = ({ blogs, title, deleteBlog }) => {
  const { user } = useAuth();
  return (
    <section className="blog-list">
      <h2>{title}</h2>

      {blogs.length === 0 && <p>No blogs found.</p>}

      {blogs.map((blog) => (
        <article className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h3>{blog.title}</h3>
          </Link>

          <p className="author">
            Written by {blog.author}
            {blog.createdAt && (
              <> • {new Date(blog.createdAt).toLocaleDateString()}</>
            )}
          </p>

          <p>{blog.body.substring(0, 100)}...</p>

          <p className="reading-time">
            {Math.max(1, Math.ceil(blog.body.trim().split(/\s+/).length / 200))}{" "}
            min read
          </p>

          {user && blog.authorId === user.id && (
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this blog?",
                );

                if (confirmed) {
                  deleteBlog(blog.id);
                }
              }}
            >
              Delete
            </button>
          )}
        </article>
      ))}
    </section>
  );
};

export default BlogList;
