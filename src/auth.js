const SESSION_KEY = "lb_auth_session";

/** Demo accounts — replace with API auth when backend is ready */
export const DEMO_ACCOUNTS = {
  customer: {
    email: "customer@lakshmis.com",
    password: "customer123",
    role: "customer",
    name: "Ananya Reddy",
  },
  admin: {
    email: "admin@lakshmis.com",
    password: "admin123",
    role: "admin",
    name: "Meghana Rao",
  },
};

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session?.role && session?.email) return session;
    return null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function authenticate(email, password, role) {
  const account = DEMO_ACCOUNTS[role];
  const normalized = email.trim().toLowerCase();
  if (
    !account ||
    normalized !== account.email ||
    password !== account.password
  ) {
    return { ok: false, error: "Invalid email or password for this account type." };
  }
  const session = {
    role: account.role,
    email: account.email,
    name: account.name,
  };
  saveSession(session);
  return { ok: true, session };
}

export function pageRequiresRole(page) {
  if (page === "dashboard") return "customer";
  if (page === "admin") return "admin";
  return null;
}
