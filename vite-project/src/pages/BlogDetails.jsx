import { Link, useParams } from "react-router-dom";

const BlogDetails = ({ blogs }) => {
  const { id } = useParams();

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <div className="not-found">
        <h2>Blog not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <article className="blog-details">
      <Link to="/" className="back-link">
        ← Back to blogs
      </Link>

      <h1>{blog.title}</h1>

      <p className="details-author">Written by {blog.author}</p>

      <div className="details-content">
        <p>{blog.body}</p>
      </div>
    </article>
  );
};

export default BlogDetails;
