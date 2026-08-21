"use client";

import { useState } from "react";
import { EventItem } from "@/lib/data";
import EventCard from "./EventCard";
import Modal from "./Modal";
import EventRsvpModal from "./forms/EventRsvpModal";

interface EventsGridProps {
  events: EventItem[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);
  const [rsvpEvent, setRsvpEvent] = useState<EventItem | null>(null);

  return (
    <>
      <div
        className="events-flex-grid"
        id="upcoming-events-cards-grid"
        style={{ marginBottom: "70px" }}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewDetails={(ev) => {
              setModalEvent(ev);
            }}
          />
        ))}
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={modalEvent !== null}
        onClose={() => setModalEvent(null)}
        title={modalEvent?.title || "Event Details"}
      >
        {modalEvent && (
          <div>
            <p>
              <strong>📅 Date:</strong> {modalEvent.month} {modalEvent.day}, 2026
            </p>
            <p>
              <strong>🕒 Time:</strong> {modalEvent.time}
            </p>
            <p>
              <strong>📍 Location:</strong> {modalEvent.location}
            </p>
            <p>
              <strong>📂 Category:</strong> {modalEvent.category}
            </p>
            <p
              style={{
                marginTop: "15px",
                borderTop: "1px solid var(--wh-pale-sky)",
                paddingTop: "15px",
                lineHeight: 1.6,
              }}
            >
              {modalEvent.description}
            </p>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  const ev = modalEvent;
                  setModalEvent(null);
                  setRsvpEvent(ev);
                }}
              >
                <i className="fas fa-calendar-check" style={{ marginRight: "6px" }}></i> Register Free RSVP
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setModalEvent(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Real RSVP Submission Modal */}
      {rsvpEvent && (
        <EventRsvpModal
          isOpen={rsvpEvent !== null}
          onClose={() => setRsvpEvent(null)}
          eventTitle={rsvpEvent.title}
          eventId={rsvpEvent.id}
        />
      )}
    </>
  );
}
