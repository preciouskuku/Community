// API abstraction layer
type RequestConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: unknown
  headers?: Record<string, string>
}

class APIClient {
  private baseUrl = "http://localhost:5000/api"

  private async request<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const token = localStorage.getItem('token')

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config?.headers,
    }

    const response = await fetch(url, {
      method: config?.method || 'GET',
      headers,
      body: config?.body ? JSON.stringify(config.body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: { email, password },
    })
  }

  async register(data: any) {
    return this.request("/auth/register", {
      method: "POST",
      body: data,
    })
  }

  async forgotPassword(email: string) {
    return this.request("/auth/forgot-password", {
      method: "POST",
      body: { email },
    })
  }

  // Posts endpoints
  async getPosts() {
    return this.request("/posts")
  }

  async createPost(data: any) {
    return this.request("/posts", {
      method: "POST",
      body: data,
    })
  }

  async updatePost(id: string, data: any) {
    return this.request(`/posts/${id}`, {
      method: "PUT",
      body: data,
    })
  }

  async deletePost(id: string) {
    return this.request(`/posts/${id}`, {
      method: "DELETE",
    })
  }

  // Events endpoints
  async getEvents() {
    return this.request("/events")
  }

  async createEvent(data: any) {
    return this.request("/events", {
      method: "POST",
      body: data,
    })
  }

  async registerEvent(eventId: string) {
    return this.request(`/events/${eventId}/register`, {
      method: "POST",
    })
  }
}

export const api = new APIClient()
