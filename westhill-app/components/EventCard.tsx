import { EventItem } from "@/lib/data";

interface EventCardProps {
  event: EventItem;
  onViewDetails?: (event: EventItem) => void;
}

export default function EventCard({ event, onViewDetails }: EventCardProps) {
  return (
    <div className="event-pro-card active" style={{ opacity: 1, transform: "none" }}>
      <div className="event-pro-img">
        <span className="event-pro-badge">
          {event.day} <span>{event.month}</span>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt={event.title} loading="lazy" />
      </div>
      <div className="event-pro-body">
        <h3>{event.title}</h3>
        <div className="event-pro-meta">
          <span>
            <i className="fas fa-clock"></i> {event.time}
          </span>
          <br />
          <span>
            <i className="fas fa-map-marker-alt"></i> {event.location}
          </span>
        </div>
        <p>{event.description}</p>
        <button
          className="btn btn-secondary"
          style={{ padding: "10px 22px", fontSize: "0.85rem" }}
          onClick={() => onViewDetails && onViewDetails(event)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
