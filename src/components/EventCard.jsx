import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-card-content">
        <span className="event-category">{event.category}</span>

        <h2>{event.title}</h2>

        <p>
          <strong>📅 Date:</strong> {event.date}
        </p>

        <p>
          <strong>📍 Location:</strong> {event.location}
        </p>

        <p className="event-description">{event.description}</p>

        <Link to={`/events/${event.id}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;