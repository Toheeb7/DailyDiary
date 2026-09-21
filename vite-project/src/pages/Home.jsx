import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
  return (
    <section className="blog-list">
      <h2>{title}</h2>

      {blogs.map((blog) => (
        <article className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h3>{blog.title}</h3>
          </Link>

          <p className="author">Written by {blog.author}</p>

          <p>{blog.body.substring(0, 100)}...</p>
        </article>
      ))}
    </section>
  );
};

export default BlogList;
