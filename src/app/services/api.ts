const BASE_URL = "https://node-backend-sos-chuva.onrender.com/api/v1";

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("sos-chuva-token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Ocorreu um erro na requisição");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const api = {
  auth: {
    login: (credentials: any) =>
      fetchWithAuth("/users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    register: (userData: any) =>
      fetchWithAuth("/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
  },
  users: {
    getProfile: (id: string) => fetchWithAuth(`/users/${id}`),
    update: (id: string, data: any) =>
      fetchWithAuth(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },
  needs: {
    list: () => fetchWithAuth("/needs"),
    create: (data: any) =>
      fetchWithAuth("/needs", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchWithAuth(`/needs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    search: (query: string) => fetchWithAuth(`/needs/search?q=${query}`),
  },
  volunteers: {
    list: () => fetchWithAuth("/volunteers"),
    register: (data: any) =>
      fetchWithAuth("/volunteers", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  missingPersons: {
    list: () => fetchWithAuth("/missing-persons"),
    create: (data: any) =>
      fetchWithAuth("/missing-persons", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchWithAuth(`/missing-persons/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },
  helpRequests: {
    create: (data: any) =>
      fetchWithAuth("/help-requests", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
