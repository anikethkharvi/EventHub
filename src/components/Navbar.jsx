import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          EventHub
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/registrations">My Registrations</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;