import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If no session (e.g. on /admin/login), render children directly without admin shell
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--wh-warm-white)" }}>
      <AdminSidebar userName={session.name} userEmail={session.email} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Admin Compact Header */}
        <header
          style={{
            height: "56px",
            backgroundColor: "var(--wh-bg-white)",
            borderBottom: "1px solid var(--wh-pale-sky)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: 700, color: "var(--wh-navy)", fontSize: "0.98rem" }}>
              West Hill Community Centre Administration
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{
                fontSize: "0.8rem",
                padding: "5px 12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="fas fa-arrow-up-right-from-square"></i> Open Live Website
            </a>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ flex: 1, padding: "28px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
