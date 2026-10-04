import { useEffect, useState } from "react";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Registrations | EventHub";

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
        console.error("Error fetching registrations:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="registrations-page">
        <h1>My Registrations</h1>
        <p>Loading registrations...</p>
      </div>
    );
  }

  return (
    <div className="registrations-page">
      <h1>My Registrations</h1>

      {registrations.length === 0 ? (
        <div className="no-registrations">
          <h2>No Registrations Yet</h2>
          <p>You have not registered for any events yet.</p>
        </div>
      ) : (
        <div className="registrations-list">
          {registrations.map((registration, index) => (
            <div className="registration-item" key={index}>
              <span className="registration-status">
                Registered
              </span>

              <h2>{registration.eventTitle}</h2>

              <div className="registration-details">
                <p>
                  <strong>📅 Date:</strong>{" "}
                  {registration.eventDate}
                </p>

                <p>
                  <strong>📍 Location:</strong>{" "}
                  {registration.eventLocation}
                </p>

                <p>
                  <strong>👤 Name:</strong>{" "}
                  {registration.name}
                </p>

                <p>
                  <strong>🎓 Department:</strong>{" "}
                  {registration.department}
                </p>

                <p>
                  <strong>📚 Year:</strong>{" "}
                  {registration.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;