export const API_URL = "http://localhost:5000/api" // Update if needed

export async function fetcher(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to fetch")
  return data
}
