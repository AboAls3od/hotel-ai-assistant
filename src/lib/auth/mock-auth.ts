const KEY = "aurelia:auth:v1";

export type MockUser = {
  email: string;
  name: string;
  loggedInAt: number;
};

export function getUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

export function signIn(email: string, name?: string): MockUser {
  const user: MockUser = {
    email,
    name: name || email.split("@")[0].replace(/[._-]/g, " ") || "Manager",
    loggedInAt: Date.now(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
