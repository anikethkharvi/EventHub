import { Component } from "react";


class EventStats extends Component {
  render() {
    const { events } = this.props;

    const technical = events.filter(
      (event) => event.category === "Technical"
    ).length;

    const workshops = events.filter(
      (event) => event.category === "Workshop"
    ).length;

    const sports = events.filter(
      (event) => event.category === "Sports"
    ).length;

    const cultural = events.filter(
      (event) => event.category === "Cultural"
    ).length;

    return (
      <div className="event-stats">
        <h2>Event Statistics</h2>

        <p>Total Events: {events.length}</p>
        <p>Technical: {technical}</p>
        <p>Workshops: {workshops}</p>
        <p>Sports: {sports}</p>
        <p>Cultural: {cultural}</p>
      </div>
    );
  }
}

export default EventStats;