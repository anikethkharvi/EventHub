import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Registration from "./pages/Registration";
import MyRegistrations from "./pages/MyRegistrations";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
          path="/events/:id/register"
          element={<Registration />}
        />
        <Route
          path="/registrations"
          element={<MyRegistrations />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;