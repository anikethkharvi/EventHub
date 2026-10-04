import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import events from "../data/events";

function Dashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load registrations from Express backend
  useEffect(() => {
    document.title = "Dashboard | EventHub";

    fetch("http://localhost:5000/api/registrations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch registrations");
        }

        return response.json();
      })
      .then((data) => {
        setRegistrations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Unable to load registrations:", error);
        setRegistrations([]);
        setLoading(false);
      });
  }, []);

  // Get unique event categories
  const categories = [
    ...new Set(events.map((event) => event.category)),
  ];

  // Show the five most recent registrations
  const recentRegistrations = [...registrations]
    .reverse()
    .slice(0, 5);

  // Count registrations for each category
  const getCategoryCount = (category) => {
    return registrations.filter((registration) => {
      return events.some(
        (event) =>
          event.id === Number(registration.eventId) &&
          event.category === category
      );
    }).length;
  };

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your EventHub overview.</p>
        </div>

        <Link to="/events" className="dashboard-add-btn">
          + Explore Events
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <span className="dashboard-icon blue">📅</span>
              <p>Total Events</p>
              <h2>{events.length}</h2>
            </div>

            <div className="dashboard-stat-card">
              <span className="dashboard-icon green">👥</span>
              <p>Total Registrations</p>
              <h2>{registrations.length}</h2>
            </div>

            <div className="dashboard-stat-card">
              <span className="dashboard-icon orange">🏷️</span>
              <p>Event Categories</p>
              <h2>{categories.length}</h2>
            </div>
          </div>

          {/* Registrations by Category */}
          <section className="dashboard-section">
            <h2>Registrations by Category</h2>

            <div className="dashboard-category-list">
              {categories.map((category) => (
                <div
                  className="dashboard-category-row"
                  key={category}
                >
                  <span>{category}</span>
                  <strong>{getCategoryCount(category)}</strong>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Registrations */}
          <section className="dashboard-section">
            <h2>Recent Registrations</h2>

            {recentRegistrations.length === 0 ? (
              <div className="dashboard-empty">
                <p>No registrations yet.</p>

                <Link to="/events">
                  Browse events to get started →
                </Link>
              </div>
            ) : (
              <div className="dashboard-recent-list">
                {recentRegistrations.map(
                  (registration, index) => (
                    <div
                      className="dashboard-recent-item"
                      key={`${registration.eventId}-${registration.email}-${index}`}
                    >
                      <div>
                        <h3>{registration.eventTitle}</h3>

                        <p>
                          {registration.name} ·{" "}
                          {registration.department}
                        </p>
                      </div>

                      <span className="dashboard-status">
                        Registered
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;