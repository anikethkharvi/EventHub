import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import events from "../data/events";

function Registration() {
  const { id } = useParams();

  const event = events.find((event) => event.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRegistration = {
      ...formData,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location
    };

    try {
      setLoading(true);

      // Send registration to Express backend
      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newRegistration)
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      console.log("Backend response:", data);

      // Save registration in localStorage
      const existingRegistrations =
        JSON.parse(localStorage.getItem("registrations")) || [];

      const updatedRegistrations = [
        ...existingRegistrations,
        newRegistration
      ];

      localStorage.setItem(
        "registrations",
        JSON.stringify(updatedRegistrations)
      );

      alert(`Successfully registered for ${event.title}!`);

      setFormData({
        name: "",
        email: "",
        department: "",
        year: ""
      });
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        "Unable to complete registration. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="event-not-found">
        <h1>Event Not Found</h1>
        <Link to="/events">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <div className="registration-card">

        <h1>Register for {event.title}</h1>

        <p className="registration-subtitle">
          Fill in your details to register for this event.
        </p>

        <form
          onSubmit={handleSubmit}
          className="registration-form"
        >

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="Data Science">
                Data Science
              </option>
              <option value="AI & ML">
                AI & ML
              </option>
              <option value="Information Science">
                Information Science
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <button
            type="submit"
            className="register-submit-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register for Event"}
          </button>

        </form>

        <Link to="/events" className="registration-back">
          ← Back to Events
        </Link>

      </div>
    </div>
  );
}

export default Registration;