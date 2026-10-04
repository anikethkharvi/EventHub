function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to EventHub</h1>

          <p>
            Discover exciting events, explore event details, and register
            for the events you are interested in.
          </p>

          <a href="/events" className="hero-btn">
            Explore Events
          </a>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Use EventHub?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📅 Discover Events</h3>
            <p>
              Browse different events and find activities that interest you.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔍 Search & Filter</h3>
            <p>
              Quickly find events using search and category filters.
            </p>
          </div>

          <div className="feature-card">
            <h3>📝 Easy Registration</h3>
            <p>
              Register for events using a simple and user-friendly form.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;