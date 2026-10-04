import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Event data
const events = [
  {
    id: 1,
    title: "Tech Hackathon",
    category: "Technical",
    date: "October 10, 2026",
    location: "Innovation Lab"
  },
  {
    id: 2,
    title: "Web Development Workshop",
    category: "Workshop",
    date: "October 15, 2026",
    location: "Computer Lab"
  },
  {
    id: 3,
    title: "Annual Sports Meet",
    category: "Sports",
    date: "October 20, 2026",
    location: "College Ground"
  },
  {
    id: 4,
    title: "Cultural Fest",
    category: "Cultural",
    date: "October 25, 2026",
    location: "Main Auditorium"
  }
];

// Temporary registration storage
const registrations = [];

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "EventHub backend server is running!"
  });
});

// Get all events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// Get a single event by ID
app.get("/api/events/:id", (req, res) => {
  const eventId = Number(req.params.id);

  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(404).json({
      message: "Event not found"
    });
  }

  res.json(event);
});

// Get all registrations
app.get("/api/registrations", (req, res) => {
  res.json(registrations);
});

// Add a new registration
app.post("/api/registrations", (req, res) => {
  const registration = req.body;

  if (
    !registration.name ||
    !registration.email ||
    !registration.eventId
  ) {
    return res.status(400).json({
      message: "Name, email and event ID are required."
    });
  }

  registrations.push(registration);

  res.status(201).json({
    message: "Registration successful!",
    registration
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `EventHub backend running on http://localhost:${PORT}`
  );
});