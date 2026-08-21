import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "westhill_admin_session";
const SESSION_EXPIRY = "7d";

function getJwtSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET || "westhill-super-secure-session-secret-key-2026";
  return new TextEncoder().encode(secret);
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRY)
    .sign(getJwtSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getJwtSecret());
    if (!payload || !payload.id) return null;

    return {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      role: (payload.role as "ADMIN" | "EDITOR") || "ADMIN",
    };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
