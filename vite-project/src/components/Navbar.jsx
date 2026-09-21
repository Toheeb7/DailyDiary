import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          DailyDiary
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create Blog</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
