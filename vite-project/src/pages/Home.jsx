import { useState } from "react";
import BlogList from "../components/BlogList";

const Home = ({ blogs, deleteBlog }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="home">
      <section className="hero">
        <h1>Welcome to DailyDiary</h1>

        <p>A place to share your thoughts, experiences, and stories.</p>
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </section>

      <BlogList
        blogs={filteredBlogs}
        title={
          searchTerm ? `Search results for "${searchTerm}"` : "Latest Blogs"
        }
        deleteBlog={deleteBlog}
      />
    </main>
  );
};

export default Home;
