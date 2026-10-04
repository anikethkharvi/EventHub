import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventStats from "../components/EventStats";

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from Express backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Unable to load events. Please try again.");
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="events-page">
      <h1>All Events</h1>

      <div className="event-filters">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Workshop">Workshop</option>
          <option value="Sports">Sports</option>
          <option value="Cultural">Cultural</option>
        </select>
      </div>

      {loading && <p>Loading events...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
  <>
    <div className="events-list">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>

    <EventStats events={events} />
  </>
)}
    </div>
  );
}

export default Events;