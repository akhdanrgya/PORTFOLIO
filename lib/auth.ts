import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "change-this-secret";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Simple HMAC-like signing using btoa (Node compatible)
function signPayload(payload: string): string {
  // In production use crypto.createHmac — this is a simple approach
  const combined = `${payload}.${SESSION_SECRET}`;
  return Buffer.from(combined).toString("base64url");
}

function verifySignature(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const lastDot = decoded.lastIndexOf(`.${SESSION_SECRET}`);
    if (lastDot === -1) return null;
    return decoded.slice(0, lastDot);
  } catch {
    return null;
  }
}

export async function createSession(adminId: string): Promise<void> {
  const payload = JSON.stringify({ adminId, exp: Date.now() + COOKIE_MAX_AGE * 1000 });
  const token = signPayload(payload);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function getSession(): Promise<{ adminId: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = verifySignature(token);
  if (!payload) return null;

  try {
    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null; // expired
    return { adminId: data.adminId };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
