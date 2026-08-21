"use client";

import { useState } from "react";
import { EventItem } from "@/lib/data";
import Modal from "./Modal";
import EventRsvpModal from "./forms/EventRsvpModal";

interface EventCalendarProps {
  events: EventItem[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    if (events.length > 0) {
      const firstEventDate = new Date(events[0].date);
      if (!isNaN(firstEventDate.getTime())) {
        return new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1);
      }
    }
    return new Date();
  });

  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    if (events.length > 0) {
      return events[0].date;
    }
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });

  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);
  const [rsvpEvent, setRsvpEvent] = useState<EventItem | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectedEvents = events.filter((e) => e.date === selectedDateStr);

  const formatDayString = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="calendar-wrapper active" style={{ opacity: 1, transform: "none", border: "1px solid var(--wh-pale-sky)" }}>
        {/* Calendar Navigation */}
        <div className="calendar-header">
          <button
            onClick={handlePrevMonth}
            className="calendar-nav-btn"
            aria-label="Previous Month"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <h3 id="current-month-display" style={{ color: "var(--wh-navy)", fontWeight: 700 }}>
            {monthNames[month]} {year}
          </h3>

          <button
            onClick={handleNextMonth}
            className="calendar-nav-btn"
            aria-label="Next Month"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Days of week header */}
        <div className="calendar-grid-header">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid" id="calendar-days-grid">
          {/* Empty prefix slots */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayStr = formatDayString(dayNum);
            const hasEvent = events.some((e) => e.date === dayStr);
            const isSelected = dayStr === selectedDateStr;

            return (
              <div
                key={`day-${dayNum}`}
                className={`calendar-day ${hasEvent ? "has-event" : ""} ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedDateStr(dayStr)}
                role="button"
                tabIndex={0}
                aria-label={`Select date ${dayStr}`}
              >
                <span className="day-number">{dayNum}</span>
                {hasEvent && (
                  <span
                    className="event-dot"
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "var(--wh-community-green)",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginTop: "4px",
                    }}
                  ></span>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Date Events List */}
        <div className="calendar-details" style={{ borderTop: "1px solid var(--wh-pale-sky)" }}>
          <h4 style={{ color: "var(--wh-navy)", marginBottom: "15px", fontWeight: 700 }}>
            Events on{" "}
            <span style={{ color: "var(--wh-community-green)" }}>
              {selectedDateStr}
            </span>
          </h4>

          {selectedEvents.length === 0 ? (
            <p style={{ color: "var(--wh-text-muted)", fontStyle: "italic", fontSize: "0.9rem" }}>
              No scheduled events on this date. Click on any date with a green dot to view scheduled workshops and sessions.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    backgroundColor: "var(--wh-bg-white)",
                    borderRadius: "var(--wh-radius-sm)",
                    padding: "16px",
                    border: "1px solid var(--wh-pale-sky)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h5 style={{ margin: "0 0 6px", color: "var(--wh-navy)", fontSize: "1.05rem", fontWeight: 700 }}>
                      {event.title}
                    </h5>
                    <div style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)", display: "flex", gap: "15px", flexWrap: "wrap" }}>
                      <span>
                        <i className="fas fa-clock" style={{ marginRight: "5px", color: "var(--wh-community-green)" }}></i>
                        {event.time}
                      </span>
                      <span>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: "5px", color: "var(--wh-community-orange)" }}></i>
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setModalEvent(event)}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setRsvpEvent(event)}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                    >
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog for Event Details */}
      <Modal
        isOpen={modalEvent !== null}
        onClose={() => setModalEvent(null)}
        title={modalEvent?.title || "Event Details"}
      >
        {modalEvent && (
          <div>
            <p>
              <strong>📅 Date:</strong> {modalEvent.month} {modalEvent.day}, {year}
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
