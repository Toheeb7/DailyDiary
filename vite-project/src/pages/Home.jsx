import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load blogs.");
        return;
      }

      setBlogs(data);
    } catch (error) {
      console.error("Fetch blogs error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="home">
      <section className="hero">
        <span className="hero-label">YOUR SPACE TO WRITE</span>

        <h1>
          Write. Share.
          <br />
          <span>Remember.</span>
        </h1>

        <p>
          Welcome to DailyDiary — a simple place to share your thoughts,
          experiences, ideas, and stories.
        </p>
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search blogs"
        />
      </section>

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading blogs...</p>
        </div>
      )}

      {message && (
        <div className="empty-state">
          <h3>Something went wrong</h3>
          <p>{message}</p>
        </div>
      )}

      {!loading && !message && (
        <BlogList
          blogs={filteredBlogs}
          title={searchTerm ? `Results for "${searchTerm}"` : "Latest Blogs"}
        />
      )}
    </main>
  );
};

export default Home;
