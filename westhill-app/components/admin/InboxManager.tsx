"use client";

import { useState } from "react";
import {
  updateSubmissionStatusAction,
  deleteSubmissionAction,
} from "@/app/actions/submissions";

export interface ContactSubmissionItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  notes: string | null;
  createdAt: Date;
}

export interface VolunteerApplicationItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roles: string;
  availability: string;
  experience: string | null;
  interests: string | null;
  status: "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  notes: string | null;
  createdAt: Date;
}

export interface ProgramInquiryItem {
  id: string;
  programTitle: string;
  fullName: string;
  email: string;
  phone: string;
  participantAge: string | null;
  message: string | null;
  status: "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  createdAt: Date;
}

export interface PartnershipInquiryItem {
  id: string;
  organization: string;
  contactPerson: string;
  email: string;
  phone: string | null;
  tierInterest: string | null;
  proposalDetails: string;
  status: "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  createdAt: Date;
}

export interface EventRsvpItem {
  id: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string | null;
  attendeesCount: number;
  specialNotes: string | null;
  status: "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  createdAt: Date;
}

export interface NewsletterItem {
  id: string;
  email: string;
  isActive: boolean;
  source: string;
  createdAt: Date;
}

interface InboxManagerProps {
  contacts: ContactSubmissionItem[];
  volunteers: VolunteerApplicationItem[];
  programInquiries: ProgramInquiryItem[];
  partnerships: PartnershipInquiryItem[];
  rsvps: EventRsvpItem[];
  newsletters: NewsletterItem[];
}

type SubmissionCategory = "contacts" | "volunteers" | "programs" | "partnerships" | "rsvps" | "newsletters";

export default function InboxManager({
  contacts: initialContacts,
  volunteers: initialVolunteers,
  programInquiries: initialProgramInquiries,
  partnerships: initialPartnerships,
  rsvps: initialRsvps,
  newsletters: initialNewsletters,
}: InboxManagerProps) {
  const [tab, setTab] = useState<SubmissionCategory>("contacts");

  const [contacts, setContacts] = useState(initialContacts);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [programInquiries, setProgramInquiries] = useState(initialProgramInquiries);
  const [partnerships, setPartnerships] = useState(initialPartnerships);
  const [rsvps, setRsvps] = useState(initialRsvps);
  const [newsletters, setNewsletters] = useState(initialNewsletters);

  // Selected item for Human-Readable Detail View Modal
  const [activeDetail, setActiveDetail] = useState<{
    type: "contact" | "volunteer" | "program" | "partnership" | "rsvp" | "newsletter";
    title: string;
    data: unknown;
  } | null>(null);

  const [showRawJson, setShowRawJson] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const unreadContacts = contacts.filter((c) => c.status === "UNREAD").length;
  const unreadVolunteers = volunteers.filter((v) => v.status === "UNREAD").length;
  const unreadPrograms = programInquiries.filter((p) => p.status === "UNREAD").length;
  const unreadPartnerships = partnerships.filter((p) => p.status === "UNREAD").length;
  const unreadRsvps = rsvps.filter((r) => r.status === "UNREAD").length;

  const handleStatusChange = async (
    type: "contact" | "volunteer" | "program" | "partnership" | "rsvp",
    id: string,
    newStatus: "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED"
  ) => {
    setLoading(true);
    setActionNotice(null);
    const res = await updateSubmissionStatusAction(type, id, newStatus);
    if (res.success) {
      if (type === "contact") setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
      if (type === "volunteer") setVolunteers((prev) => prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v)));
      if (type === "program") setProgramInquiries((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      if (type === "partnership") setPartnerships((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      if (type === "rsvp") setRsvps((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));

      // If active modal item matches, update its status
      if (activeDetail && (activeDetail.data as { id: string }).id === id) {
        setActiveDetail((prev) => prev ? { ...prev, data: { ...prev.data as object, status: newStatus } } : null);
      }
      setActionNotice(`Status updated to ${newStatus}.`);
      setTimeout(() => setActionNotice(null), 3000);
    }
    setLoading(false);
  };

  const handleArchive = async (
    type: "contact" | "volunteer" | "program" | "partnership" | "rsvp",
    id: string
  ) => {
    await handleStatusChange(type, id, "ARCHIVED");
  };

  const handleDelete = async (
    type: "contact" | "volunteer" | "program" | "partnership" | "newsletter" | "rsvp",
    id: string
  ) => {
    if (!confirm("Are you sure you want to permanently delete this submission record? This action cannot be undone.")) {
      return;
    }
    setLoading(true);
    const res = await deleteSubmissionAction(type, id);
    if (res.success) {
      if (type === "contact") setContacts((prev) => prev.filter((c) => c.id !== id));
      if (type === "volunteer") setVolunteers((prev) => prev.filter((v) => v.id !== id));
      if (type === "program") setProgramInquiries((prev) => prev.filter((p) => p.id !== id));
      if (type === "partnership") setPartnerships((prev) => prev.filter((p) => p.id !== id));
      if (type === "newsletter") setNewsletters((prev) => prev.filter((n) => n.id !== id));
      if (type === "rsvp") setRsvps((prev) => prev.filter((r) => r.id !== id));
      setActiveDetail(null);
      setActionNotice("Submission permanently deleted.");
      setTimeout(() => setActionNotice(null), 3000);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "UNREAD":
        return { bg: "rgba(244, 175, 37, 0.15)", color: "#B45309", label: "Unread" };
      case "READ":
        return { bg: "rgba(101, 175, 218, 0.15)", color: "var(--wh-navy)", label: "Read" };
      case "IN_PROGRESS":
        return { bg: "rgba(95, 55, 144, 0.12)", color: "var(--wh-community-purple)", label: "In Progress" };
      case "RESOLVED":
      case "ACCEPTED":
        return { bg: "rgba(76, 115, 50, 0.12)", color: "var(--wh-community-green)", label: "Resolved" };
      case "ARCHIVED":
        return { bg: "rgba(98, 125, 152, 0.12)", color: "var(--wh-text-muted)", label: "Archived" };
      default:
        return { bg: "rgba(98, 125, 152, 0.12)", color: "var(--wh-text-muted)", label: status };
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", color: "var(--wh-navy)", margin: "0 0 4px", fontWeight: 700 }}>
          Submissions & Public Inboxes
        </h1>
        <p style={{ fontSize: "0.88rem", color: "var(--wh-text-muted)", margin: 0 }}>
          Manage messages, volunteer intake, program registrations, and partner proposals submitted through the public website.
        </p>
      </div>

      {actionNotice && (
        <div
          style={{
            padding: "12px 18px",
            backgroundColor: "rgba(76, 115, 50, 0.12)",
            border: "1px solid rgba(76, 115, 50, 0.3)",
            color: "var(--wh-community-green)",
            borderRadius: "var(--wh-radius-sm)",
            fontSize: "0.88rem",
            fontWeight: 600,
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-check-circle"></i>
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        <button
          onClick={() => setTab("contacts")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--wh-radius-full)",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            backgroundColor: tab === "contacts" ? "var(--wh-navy)" : "var(--wh-bg-white)",
            color: tab === "contacts" ? "white" : "var(--wh-navy)",
            boxShadow: "var(--wh-shadow-soft)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-envelope"></i> Contact Messages ({contacts.length})
          {unreadContacts > 0 && (
            <span style={{ backgroundColor: "var(--wh-sun-gold)", color: "#10263B", borderRadius: "10px", padding: "1px 6px", fontSize: "0.72rem", fontWeight: 700 }}>
              {unreadContacts}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("volunteers")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--wh-radius-full)",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            backgroundColor: tab === "volunteers" ? "var(--wh-navy)" : "var(--wh-bg-white)",
            color: tab === "volunteers" ? "white" : "var(--wh-navy)",
            boxShadow: "var(--wh-shadow-soft)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-hand-holding-heart"></i> Volunteer Applications ({volunteers.length})
          {unreadVolunteers > 0 && (
            <span style={{ backgroundColor: "var(--wh-sun-gold)", color: "#10263B", borderRadius: "10px", padding: "1px 6px", fontSize: "0.72rem", fontWeight: 700 }}>
              {unreadVolunteers}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("programs")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--wh-radius-full)",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            backgroundColor: tab === "programs" ? "var(--wh-navy)" : "var(--wh-bg-white)",
            color: tab === "programs" ? "white" : "var(--wh-navy)",
            boxShadow: "var(--wh-shadow-soft)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-hand-holding-hand"></i> Program Inquiries ({programInquiries.length})
          {unreadPrograms > 0 && (
            <span style={{ backgroundColor: "var(--wh-sun-gold)", color: "#10263B", borderRadius: "10px", padding: "1px 6px", fontSize: "0.72rem", fontWeight: 700 }}>
              {unreadPrograms}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("partnerships")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--wh-radius-full)",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            backgroundColor: tab === "partnerships" ? "var(--wh-navy)" : "var(--wh-bg-white)",
            color: tab === "partnerships" ? "white" : "var(--wh-navy)",
            boxShadow: "var(--wh-shadow-soft)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-handshake"></i> Partnerships ({partnerships.length})
          {unreadPartnerships > 0 && (
            <span style={{ backgroundColor: "var(--wh-sun-gold)", color: "#10263B", borderRadius: "10px", padding: "1px 6px", fontSize: "0.72rem", fontWeight: 700 }}>
              {unreadPartnerships}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("rsvps")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--wh-radius-full)",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            backgroundColor: tab === "rsvps" ? "var(--wh-navy)" : "var(--wh-bg-white)",
            color: tab === "rsvps" ? "white" : "var(--wh-navy)",
            boxShadow: "var(--wh-shadow-soft)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-calendar-check"></i> Event RSVPs ({rsvps.length})
          {unreadRsvps > 0 && (
            <span style={{ backgroundColor: "var(--wh-sun-gold)", color: "#10263B", borderRadius: "10px", padding: "1px 6px", fontSize: "0.72rem", fontWeight: 700 }}>
              {unreadRsvps}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("newsletters")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--wh-radius-full)",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            backgroundColor: tab === "newsletters" ? "var(--wh-navy)" : "var(--wh-bg-white)",
            color: tab === "newsletters" ? "white" : "var(--wh-navy)",
            boxShadow: "var(--wh-shadow-soft)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-newspaper"></i> Subscribers ({newsletters.length})
        </button>
      </div>

      {/* Main Content Table Card */}
      <div
        style={{
          backgroundColor: "var(--wh-bg-white)",
          borderRadius: "var(--wh-radius-md)",
          boxShadow: "var(--wh-shadow-soft)",
          border: "1px solid var(--wh-pale-sky)",
          overflow: "hidden",
        }}
      >
        {/* Tab 1: Contacts */}
        {tab === "contacts" && (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--wh-warm-white)", borderBottom: "1px solid var(--wh-pale-sky)" }}>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Sender</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Subject & Message</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Submitted</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                    No contact submissions received yet.
                  </td>
                </tr>
              ) : (
                contacts.map((c) => {
                  const badge = getStatusBadge(c.status);
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 600, color: "var(--wh-navy)" }}>{c.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>{c.email}</div>
                        {c.phone && <div style={{ fontSize: "0.75rem", color: "var(--wh-text-muted)" }}>{c.phone}</div>}
                      </td>
                      <td style={{ padding: "16px 20px", maxWidth: "340px" }}>
                        <div style={{ fontWeight: 600, color: "var(--wh-navy)", marginBottom: "4px" }}>{c.subject}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--wh-text-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {c.message}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>
                        {new Date(c.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <select
                          value={c.status}
                          disabled={loading}
                          onChange={(e) => handleStatusChange("contact", c.id, e.target.value as "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED")}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--wh-radius-full)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor: badge.bg,
                            color: badge.color,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="UNREAD">Unread</option>
                          <option value="READ">Read</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          onClick={() => setActiveDetail({ type: "contact", title: "Contact Message", data: c })}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-pale-sky)",
                            backgroundColor: "var(--wh-bg-white)",
                            color: "var(--wh-navy)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            marginRight: "6px",
                          }}
                        >
                          Open View
                        </button>
                        <button
                          onClick={() => handleArchive("contact", c.id)}
                          title="Archive Submission"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid rgba(98, 125, 152, 0.2)",
                            backgroundColor: "rgba(98, 125, 152, 0.08)",
                            color: "var(--wh-text-muted)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            marginRight: "6px",
                          }}
                        >
                          <i className="fas fa-box-archive"></i>
                        </button>
                        <button
                          onClick={() => handleDelete("contact", c.id)}
                          title="Delete Permanently"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-danger-border)",
                            backgroundColor: "var(--wh-danger-bg)",
                            color: "var(--wh-danger)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Tab 2: Volunteers */}
        {tab === "volunteers" && (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--wh-warm-white)", borderBottom: "1px solid var(--wh-pale-sky)" }}>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Applicant</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Role Interest</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Availability</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                    No volunteer applications received yet.
                  </td>
                </tr>
              ) : (
                volunteers.map((v) => {
                  const badge = getStatusBadge(v.status);
                  return (
                    <tr key={v.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 600, color: "var(--wh-navy)" }}>{v.fullName}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>{v.email} &bull; {v.phone}</div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{ backgroundColor: "var(--wh-pale-sky)", color: "var(--wh-navy)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600 }}>
                          {v.roles}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "0.82rem", color: "var(--wh-text-body)" }}>
                        {v.availability}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <select
                          value={v.status}
                          disabled={loading}
                          onChange={(e) => handleStatusChange("volunteer", v.id, e.target.value as "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED")}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--wh-radius-full)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor: badge.bg,
                            color: badge.color,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="UNREAD">Unread</option>
                          <option value="READ">Reviewed</option>
                          <option value="IN_PROGRESS">Interviewing</option>
                          <option value="RESOLVED">Accepted</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          onClick={() => setActiveDetail({ type: "volunteer", title: "Volunteer Application", data: v })}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-pale-sky)",
                            backgroundColor: "var(--wh-bg-white)",
                            color: "var(--wh-navy)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            marginRight: "6px",
                          }}
                        >
                          Open View
                        </button>
                        <button
                          onClick={() => handleArchive("volunteer", v.id)}
                          title="Archive Submission"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid rgba(98, 125, 152, 0.2)",
                            backgroundColor: "rgba(98, 125, 152, 0.08)",
                            color: "var(--wh-text-muted)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            marginRight: "6px",
                          }}
                        >
                          <i className="fas fa-box-archive"></i>
                        </button>
                        <button
                          onClick={() => handleDelete("volunteer", v.id)}
                          title="Delete Permanently"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-danger-border)",
                            backgroundColor: "var(--wh-danger-bg)",
                            color: "var(--wh-danger)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Tab 3: Program Inquiries */}
        {tab === "programs" && (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--wh-warm-white)", borderBottom: "1px solid var(--wh-pale-sky)" }}>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Program</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Participant / Contact</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Age / Notes</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                    No program inquiries registered yet.
                  </td>
                </tr>
              ) : (
                programInquiries.map((p) => {
                  const badge = getStatusBadge(p.status);
                  return (
                    <tr key={p.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--wh-navy)" }}>
                        {p.programTitle}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 600, color: "var(--wh-navy)" }}>{p.fullName}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>{p.email} &bull; {p.phone}</div>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "0.82rem", color: "var(--wh-text-body)" }}>
                        <div>{p.participantAge || "Not specified"}</div>
                        {p.message && <div style={{ fontSize: "0.75rem", color: "var(--wh-text-muted)" }}>{p.message}</div>}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <select
                          value={p.status}
                          disabled={loading}
                          onChange={(e) => handleStatusChange("program", p.id, e.target.value as "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED")}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--wh-radius-full)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor: badge.bg,
                            color: badge.color,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="UNREAD">Unread</option>
                          <option value="READ">Reviewed</option>
                          <option value="IN_PROGRESS">Intake Scheduled</option>
                          <option value="RESOLVED">Enrolled</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          onClick={() => setActiveDetail({ type: "program", title: "Program Inquiry", data: p })}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-pale-sky)",
                            backgroundColor: "var(--wh-bg-white)",
                            color: "var(--wh-navy)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            marginRight: "6px",
                          }}
                        >
                          Open View
                        </button>
                        <button
                          onClick={() => handleArchive("program", p.id)}
                          title="Archive Submission"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid rgba(98, 125, 152, 0.2)",
                            backgroundColor: "rgba(98, 125, 152, 0.08)",
                            color: "var(--wh-text-muted)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            marginRight: "6px",
                          }}
                        >
                          <i className="fas fa-box-archive"></i>
                        </button>
                        <button
                          onClick={() => handleDelete("program", p.id)}
                          title="Delete Permanently"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-danger-border)",
                            backgroundColor: "var(--wh-danger-bg)",
                            color: "var(--wh-danger)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Tab 4: Partnerships */}
        {tab === "partnerships" && (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--wh-warm-white)", borderBottom: "1px solid var(--wh-pale-sky)" }}>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Organization</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Contact Person</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Tier / Proposal</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partnerships.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                    No partnership proposals submitted yet.
                  </td>
                </tr>
              ) : (
                partnerships.map((p) => {
                  const badge = getStatusBadge(p.status);
                  return (
                    <tr key={p.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--wh-navy)" }}>
                        {p.organization}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 600, color: "var(--wh-navy)" }}>{p.contactPerson}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>{p.email} {p.phone ? `• ${p.phone}` : ""}</div>
                      </td>
                      <td style={{ padding: "16px 20px", maxWidth: "300px" }}>
                        {p.tierInterest && (
                          <span style={{ backgroundColor: "var(--wh-pale-sky)", color: "var(--wh-navy)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600, display: "inline-block", marginBottom: "4px" }}>
                            {p.tierInterest}
                          </span>
                        )}
                        <div style={{ fontSize: "0.78rem", color: "var(--wh-text-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.proposalDetails}
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <select
                          value={p.status}
                          disabled={loading}
                          onChange={(e) => handleStatusChange("partnership", p.id, e.target.value as "UNREAD" | "READ" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED")}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--wh-radius-full)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor: badge.bg,
                            color: badge.color,
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="UNREAD">Unread</option>
                          <option value="READ">In Review</option>
                          <option value="IN_PROGRESS">Meeting Scheduled</option>
                          <option value="RESOLVED">Partnered</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          onClick={() => setActiveDetail({ type: "partnership", title: "Partnership Proposal", data: p })}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-pale-sky)",
                            backgroundColor: "var(--wh-bg-white)",
                            color: "var(--wh-navy)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            marginRight: "6px",
                          }}
                        >
                          Open View
                        </button>
                        <button
                          onClick={() => handleArchive("partnership", p.id)}
                          title="Archive Submission"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid rgba(98, 125, 152, 0.2)",
                            backgroundColor: "rgba(98, 125, 152, 0.08)",
                            color: "var(--wh-text-muted)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            marginRight: "6px",
                          }}
                        >
                          <i className="fas fa-box-archive"></i>
                        </button>
                        <button
                          onClick={() => handleDelete("partnership", p.id)}
                          title="Delete Permanently"
                          style={{
                            padding: "6px 10px",
                            borderRadius: "var(--wh-radius-sm)",
                            border: "1px solid var(--wh-danger-border)",
                            backgroundColor: "var(--wh-danger-bg)",
                            color: "var(--wh-danger)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Tab 5: RSVPs */}
        {tab === "rsvps" && (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--wh-warm-white)", borderBottom: "1px solid var(--wh-pale-sky)" }}>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Event</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Guest Name</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Attendees</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Registered</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                    No event RSVPs submitted yet.
                  </td>
                </tr>
              ) : (
                rsvps.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--wh-navy)" }}>
                      {r.eventTitle}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ fontWeight: 600, color: "var(--wh-navy)" }}>{r.fullName}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>{r.email} {r.phone ? `• ${r.phone}` : ""}</div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ backgroundColor: "rgba(76, 115, 50, 0.12)", color: "var(--wh-community-green)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700 }}>
                        {r.attendeesCount} {r.attendeesCount === 1 ? "person" : "people"}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>
                      {new Date(r.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <button
                        onClick={() => setActiveDetail({ type: "rsvp", title: "Event RSVP", data: r })}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "var(--wh-radius-sm)",
                          border: "1px solid var(--wh-pale-sky)",
                          backgroundColor: "var(--wh-bg-white)",
                          color: "var(--wh-navy)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          marginRight: "6px",
                        }}
                      >
                        Open View
                      </button>
                      <button
                        onClick={() => handleArchive("rsvp", r.id)}
                        title="Archive Submission"
                        style={{
                          padding: "6px 10px",
                          borderRadius: "var(--wh-radius-sm)",
                          border: "1px solid rgba(98, 125, 152, 0.2)",
                          backgroundColor: "rgba(98, 125, 152, 0.08)",
                          color: "var(--wh-text-muted)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          marginRight: "6px",
                        }}
                      >
                        <i className="fas fa-box-archive"></i>
                      </button>
                      <button
                        onClick={() => handleDelete("rsvp", r.id)}
                        title="Delete Permanently"
                        style={{
                          padding: "6px 10px",
                          borderRadius: "var(--wh-radius-sm)",
                          border: "1px solid var(--wh-danger-border)",
                          backgroundColor: "var(--wh-danger-bg)",
                          color: "var(--wh-danger)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Tab 6: Newsletter Subscribers */}
        {tab === "newsletters" && (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--wh-warm-white)", borderBottom: "1px solid var(--wh-pale-sky)" }}>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Subscriber Email</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600 }}>Subscribed Date</th>
                <th style={{ padding: "14px 20px", color: "var(--wh-navy)", fontWeight: 600, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsletters.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "var(--wh-text-muted)" }}>
                    No newsletter subscribers registered yet.
                  </td>
                </tr>
              ) : (
                newsletters.map((n) => (
                  <tr key={n.id} style={{ borderBottom: "1px solid rgba(210, 234, 242, 0.6)" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--wh-navy)" }}>
                      {n.email}
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "0.82rem" }}>
                      <span
                        style={{
                          backgroundColor: n.isActive ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)",
                          color: n.isActive ? "var(--wh-community-green)" : "var(--wh-text-muted)",
                          padding: "3px 8px",
                          borderRadius: "var(--wh-radius-full)",
                          fontWeight: 600,
                          fontSize: "0.78rem",
                        }}
                      >
                        {n.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: "0.78rem", color: "var(--wh-text-muted)" }}>
                      {new Date(n.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <button
                        onClick={() => setActiveDetail({ type: "newsletter", title: "Newsletter Subscriber", data: n })}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "var(--wh-radius-sm)",
                          border: "1px solid var(--wh-pale-sky)",
                          backgroundColor: "var(--wh-bg-white)",
                          color: "var(--wh-navy)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          marginRight: "6px",
                        }}
                      >
                        Open View
                      </button>
                      <button
                        onClick={() => handleDelete("newsletter", n.id)}
                        title="Delete Permanently"
                        style={{
                          padding: "6px 10px",
                          borderRadius: "var(--wh-radius-sm)",
                          border: "1px solid var(--wh-danger-border)",
                          backgroundColor: "var(--wh-danger-bg)",
                          color: "var(--wh-danger)",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Human-Readable Detail View Modal */}
      {activeDetail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(19, 61, 95, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "var(--wh-radius-lg)",
              maxWidth: "640px",
              width: "100%",
              boxShadow: "var(--wh-shadow-hover)",
              border: "1px solid var(--wh-pale-sky)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 26px",
                borderBottom: "1px solid var(--wh-pale-sky)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "var(--wh-warm-white)",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--wh-navy)", fontWeight: 700 }}>
                  {activeDetail.title}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "var(--wh-text-muted)" }}>
                  Submitted on {new Date((activeDetail.data as { createdAt: Date }).createdAt).toLocaleString("en-CA", { dateStyle: "long", timeStyle: "short" })}
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveDetail(null);
                  setShowRawJson(false);
                }}
                style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--wh-text-muted)" }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body: Human-Readable Content */}
            <div style={{ padding: "26px", overflowY: "auto", flexGrow: 1 }}>
              {/* CONTACT VIEW */}
              {activeDetail.type === "contact" && (
                (() => {
                  const d = activeDetail.data as ContactSubmissionItem;
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Name</label>
                          <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--wh-navy)" }}>{d.name}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Email</label>
                          <div style={{ fontSize: "0.95rem" }}><a href={`mailto:${d.email}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>{d.email}</a></div>
                        </div>
                      </div>

                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Phone</label>
                          <div style={{ fontSize: "0.95rem", color: "var(--wh-navy)" }}>{d.phone || "Not provided"}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Current Status</label>
                          <div>
                            <span style={{ ...getStatusBadge(d.status), padding: "3px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 700 }}>
                              {getStatusBadge(d.status).label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Subject</label>
                        <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--wh-navy)" }}>{d.subject}</div>
                      </div>

                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Message</label>
                        <div
                          style={{
                            backgroundColor: "var(--wh-warm-white)",
                            padding: "16px",
                            borderRadius: "var(--wh-radius-sm)",
                            fontSize: "0.92rem",
                            lineHeight: 1.6,
                            color: "var(--wh-navy)",
                            border: "1px solid var(--wh-pale-sky)",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {d.message}
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* VOLUNTEER VIEW */}
              {activeDetail.type === "volunteer" && (
                (() => {
                  const d = activeDetail.data as VolunteerApplicationItem;
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Applicant Name</label>
                          <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--wh-navy)" }}>{d.fullName}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Email</label>
                          <div><a href={`mailto:${d.email}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>{d.email}</a></div>
                        </div>
                      </div>

                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Phone Number</label>
                          <div style={{ fontSize: "0.95rem", color: "var(--wh-navy)", fontWeight: 600 }}>{d.phone}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Area of Interest</label>
                          <div>
                            <span style={{ backgroundColor: "var(--wh-pale-sky)", color: "var(--wh-navy)", padding: "3px 8px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700 }}>
                              {d.roles}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Weekly Availability</label>
                        <div style={{ fontSize: "0.92rem", color: "var(--wh-navy)" }}>{d.availability}</div>
                      </div>

                      {d.experience && (
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Experience / Student Placement Info</label>
                          <div
                            style={{
                              backgroundColor: "var(--wh-warm-white)",
                              padding: "14px",
                              borderRadius: "var(--wh-radius-sm)",
                              fontSize: "0.9rem",
                              lineHeight: 1.5,
                              color: "var(--wh-navy)",
                              border: "1px solid var(--wh-pale-sky)",
                            }}
                          >
                            {d.experience}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}

              {/* PROGRAM INQUIRY VIEW */}
              {activeDetail.type === "program" && (
                (() => {
                  const d = activeDetail.data as ProgramInquiryItem;
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Program Title</label>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--wh-navy)" }}>{d.programTitle}</div>
                      </div>

                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Participant / Parent Name</label>
                          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--wh-navy)" }}>{d.fullName}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Email</label>
                          <div><a href={`mailto:${d.email}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>{d.email}</a></div>
                        </div>
                      </div>

                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Phone</label>
                          <div style={{ fontSize: "0.95rem", color: "var(--wh-navy)", fontWeight: 600 }}>{d.phone}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Participant Age / Grade</label>
                          <div style={{ fontSize: "0.95rem", color: "var(--wh-navy)" }}>{d.participantAge || "Not provided"}</div>
                        </div>
                      </div>

                      {d.message && (
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Questions / Support Needs</label>
                          <div
                            style={{
                              backgroundColor: "var(--wh-warm-white)",
                              padding: "14px",
                              borderRadius: "var(--wh-radius-sm)",
                              fontSize: "0.9rem",
                              lineHeight: 1.5,
                              color: "var(--wh-navy)",
                              border: "1px solid var(--wh-pale-sky)",
                            }}
                          >
                            {d.message}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}

              {/* PARTNERSHIP PROPOSAL VIEW */}
              {activeDetail.type === "partnership" && (
                (() => {
                  const d = activeDetail.data as PartnershipInquiryItem;
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Organization / Company</label>
                          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--wh-navy)" }}>{d.organization}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Contact Person</label>
                          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--wh-navy)" }}>{d.contactPerson}</div>
                        </div>
                      </div>

                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Contact Email</label>
                          <div><a href={`mailto:${d.email}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>{d.email}</a></div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Phone</label>
                          <div style={{ fontSize: "0.95rem", color: "var(--wh-navy)" }}>{d.phone || "Not provided"}</div>
                        </div>
                      </div>

                      {d.tierInterest && (
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Collaboration / Sponsorship Tier</label>
                          <div>
                            <span style={{ backgroundColor: "var(--wh-pale-sky)", color: "var(--wh-navy)", padding: "3px 10px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700 }}>
                              {d.tierInterest}
                            </span>
                          </div>
                        </div>
                      )}

                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Proposal Summary</label>
                        <div
                          style={{
                            backgroundColor: "var(--wh-warm-white)",
                            padding: "16px",
                            borderRadius: "var(--wh-radius-sm)",
                            fontSize: "0.92rem",
                            lineHeight: 1.6,
                            color: "var(--wh-navy)",
                            border: "1px solid var(--wh-pale-sky)",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {d.proposalDetails}
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* EVENT RSVP VIEW */}
              {activeDetail.type === "rsvp" && (
                (() => {
                  const d = activeDetail.data as EventRsvpItem;
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Event Title</label>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--wh-navy)" }}>{d.eventTitle}</div>
                      </div>

                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Attendee Name</label>
                          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--wh-navy)" }}>{d.fullName}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Email</label>
                          <div><a href={`mailto:${d.email}`} style={{ color: "var(--wh-navy)", fontWeight: 600 }}>{d.email}</a></div>
                        </div>
                      </div>

                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Phone Number</label>
                          <div style={{ fontSize: "0.95rem", color: "var(--wh-navy)" }}>{d.phone || "Not provided"}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Attendees Count</label>
                          <div>
                            <span style={{ backgroundColor: "rgba(76, 115, 50, 0.12)", color: "var(--wh-community-green)", padding: "3px 10px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700 }}>
                              {d.attendeesCount} {d.attendeesCount === 1 ? "Person" : "People"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {d.specialNotes && (
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Special Notes / Dietary Requirements</label>
                          <div
                            style={{
                              backgroundColor: "var(--wh-warm-white)",
                              padding: "14px",
                              borderRadius: "var(--wh-radius-sm)",
                              fontSize: "0.9rem",
                              lineHeight: 1.5,
                              color: "var(--wh-navy)",
                              border: "1px solid var(--wh-pale-sky)",
                            }}
                          >
                            {d.specialNotes}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}

              {/* NEWSLETTER VIEW */}
              {activeDetail.type === "newsletter" && (
                (() => {
                  const d = activeDetail.data as NewsletterItem;
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Subscriber Email</label>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--wh-navy)" }}>{d.email}</div>
                      </div>
                      <div className="grid-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Status</label>
                          <div>
                            <span style={{ backgroundColor: d.isActive ? "rgba(76, 115, 50, 0.12)" : "rgba(98, 125, 152, 0.12)", color: d.isActive ? "var(--wh-community-green)" : "var(--wh-text-muted)", padding: "3px 8px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700 }}>
                              {d.isActive ? "Active Subscriber" : "Inactive"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wh-text-muted)", textTransform: "uppercase" }}>Source</label>
                          <div style={{ fontSize: "0.95rem", color: "var(--wh-navy)" }}>{d.source}</div>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Secondary Raw JSON View toggle for developer diagnostics */}
              <div style={{ marginTop: "24px", borderTop: "1px solid var(--wh-pale-sky)", paddingTop: "14px" }}>
                <button
                  type="button"
                  onClick={() => setShowRawJson(!showRawJson)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "0.75rem",
                    color: "var(--wh-text-muted)",
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: 0,
                  }}
                >
                  {showRawJson ? "Hide Raw Diagnostic Payload" : "Show Raw Diagnostic Payload (Developer)"}
                </button>

                {showRawJson && (
                  <pre
                    style={{
                      backgroundColor: "var(--wh-bg-soft)",
                      padding: "12px",
                      borderRadius: "var(--wh-radius-sm)",
                      fontSize: "0.78rem",
                      color: "var(--wh-navy)",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.5,
                      marginTop: "10px",
                      border: "1px solid var(--wh-pale-sky)",
                    }}
                  >
                    {JSON.stringify(activeDetail.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* Modal Footer: Quick Staff Workflow Actions */}
            <div
              style={{
                padding: "16px 26px",
                borderTop: "1px solid var(--wh-pale-sky)",
                backgroundColor: "var(--wh-warm-white)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {/* Left Actions: Status Buttons */}
              {activeDetail.type !== "newsletter" && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    disabled={loading}
                    onClick={() => handleStatusChange(activeDetail.type as "contact" | "volunteer" | "program" | "partnership" | "rsvp", (activeDetail.data as { id: string }).id, "READ")}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                  >
                    <i className="fas fa-check" style={{ marginRight: "4px" }}></i> Mark Read
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleStatusChange(activeDetail.type as "contact" | "volunteer" | "program" | "partnership" | "rsvp", (activeDetail.data as { id: string }).id, "IN_PROGRESS")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                  >
                    <i className="fas fa-spinner" style={{ marginRight: "4px" }}></i> In Progress
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleStatusChange(activeDetail.type as "contact" | "volunteer" | "program" | "partnership" | "rsvp", (activeDetail.data as { id: string }).id, "RESOLVED")}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                  >
                    <i className="fas fa-circle-check" style={{ marginRight: "4px" }}></i> Resolve
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleArchive(activeDetail.type as "contact" | "volunteer" | "program" | "partnership" | "rsvp", (activeDetail.data as { id: string }).id)}
                    style={{
                      fontSize: "0.8rem",
                      padding: "6px 12px",
                      borderRadius: "var(--wh-radius-sm)",
                      border: "1px solid rgba(98, 125, 152, 0.2)",
                      backgroundColor: "rgba(98, 125, 152, 0.08)",
                      color: "var(--wh-text-muted)",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    <i className="fas fa-box-archive" style={{ marginRight: "4px" }}></i> Archive
                  </button>
                </div>
              )}

              {/* Right Action: Close */}
              <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
                <button
                  onClick={() => {
                    setActiveDetail(null);
                    setShowRawJson(false);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: "0.82rem", padding: "6px 14px" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
