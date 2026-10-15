"use client";

import { useActionState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction, type ActionResponse } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionResponse | null, FormData>(
    loginAction,
    null
  );

  // Immediately strip any query parameters from address bar on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState(null, "", "/admin/login");
    }
  }, []);

  // Fallback client navigation if server redirect did not fire
  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
      router.refresh();
    }
  }, [state, router]);

  const errorMessage = state?.success === false ? state.error : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--wh-warm-white)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--wh-bg-white)",
          borderRadius: "var(--wh-radius-lg)",
          boxShadow: "var(--wh-shadow-hover)",
          padding: "40px 30px",
          border: "1px solid var(--wh-pale-sky)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Image
            src="/images/Westhillcenterlogo.jpeg"
            alt="West Hill Community Centre"
            width={180}
            height={50}
            style={{ margin: "0 auto 15px", height: "48px", width: "auto", objectFit: "contain" }}
            priority
          />
          <h1
            style={{
              fontSize: "1.35rem",
              color: "var(--wh-navy)",
              fontFamily: "var(--wh-font-primary)",
              marginBottom: "4px",
              fontWeight: 700,
            }}
          >
            Staff CMS Portal
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--wh-text-muted)" }}>
            Authorized administration access only
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: "var(--wh-danger-bg)",
              border: "1px solid var(--wh-danger-border)",
              color: "var(--wh-danger)",
              borderRadius: "var(--wh-radius-sm)",
              padding: "12px",
              fontSize: "0.85rem",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fas fa-exclamation-circle"></i>
            <span>{errorMessage}</span>
          </div>
        )}

        <form action={formAction} method="POST">
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--wh-navy)",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="staff@westhillcommunitycentre.ca"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
                transition: "var(--wh-transition)",
                backgroundColor: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--wh-navy)",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "var(--wh-radius-sm)",
                border: "1.5px solid var(--wh-pale-sky)",
                fontSize: "0.92rem",
                outline: "none",
                transition: "var(--wh-transition)",
                backgroundColor: "white",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "0.95rem",
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {isPending ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-lock"></i> Sign In to CMS
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "28px",
            borderTop: "1px solid var(--wh-pale-sky)",
            paddingTop: "16px",
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "0.85rem",
              color: "var(--wh-navy)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 500,
            }}
          >
            <i className="fas fa-arrow-left"></i> Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
