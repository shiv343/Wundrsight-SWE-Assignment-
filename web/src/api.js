const API_URL = "http://localhost:8080/api"; // change to deployed backend later

export async function apiRequest(path, method = "GET", body, token) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err.error || { code: "SERVER_ERROR", message: "Something went wrong" };
  }

  return res.json();
}
