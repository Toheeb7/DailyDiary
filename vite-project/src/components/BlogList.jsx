import { Link } from "react-router-dom";

const BlogList = ({ blogs, title, deleteBlog }) => {
  return (
    <section className="blog-list">
      <h2>{title}</h2>

      {blogs.length === 0 && <p>No blogs found.</p>}

      {blogs.map((blog) => (
        <article className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h3>{blog.title}</h3>
          </Link>

          <p className="author">Written by {blog.author}</p>

          <p>{blog.body.substring(0, 100)}...</p>

          <button
            type="button"
            className="delete-btn"
            onClick={() => deleteBlog(blog.id)}
          >
            Delete
          </button>
        </article>
      ))}
    </section>
  );
};

export default BlogList;
