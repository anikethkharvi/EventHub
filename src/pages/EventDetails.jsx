import { useParams, Link } from "react-router-dom";
import events from "../data/events";

function EventDetails() {
  const { id } = useParams();

  const event = events.find((event) => event.id === Number(id));

  // If event doesn't exist
  if (!event) {
    return (
      <div className="event-not-found">
        <h1>Event Not Found</h1>

        <Link to="/events">← Back to Events</Link>
      </div>
    );
  }

  // If event exists
  return (
    <div className="event-details-page">
      <div className="event-details-card">
        <span className="event-category">{event.category}</span>

        <h1>{event.title}</h1>

        <div className="event-info">
          <p>
            <strong>📅 Date:</strong> {event.date}
          </p>

          <p>
            <strong>📍 Location:</strong> {event.location}
          </p>
        </div>

        <p className="event-details-description">
          {event.description}
        </p>

        <div className="event-details-actions">
          <Link
            to={`/events/${event.id}/register`}
            className="register-btn"
          >
            Register for this Event
          </Link>

          <Link to="/events" className="back-btn">
            ← Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;