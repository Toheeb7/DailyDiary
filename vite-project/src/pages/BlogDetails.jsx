import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BlogDetails = ({ blogs }) => {
  const { id } = useParams();
  const { user } = useAuth();

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <div className="not-found">
        <h2>Blog not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const isOwner = user && blog.authorId === user.id;

  return (
    <article className="blog-details">
      <Link to="/" className="back-link">
        ← Back to blogs
      </Link>

      <h1>{blog.title}</h1>

      <p className="details-author">
        Written by {blog.author}
        {blog.createdAt && (
          <> • {new Date(blog.createdAt).toLocaleDateString()}</>
        )}
      </p>

      <div className="details-content">
        <p>{blog.body}</p>

        <p className="reading-time">
          {Math.max(1, Math.ceil(blog.body.trim().split(/\s+/).length / 200))}{" "}
          min read
        </p>
      </div>

      {isOwner && (
        <div className="blog-actions">
          <Link to={`/blogs/${blog.id}/edit`} className="edit-btn">
            Edit Blog
          </Link>
        </div>
      )}
    </article>
  );
};

export default BlogDetails;
