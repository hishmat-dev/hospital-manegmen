// Patient API Service Layer
const API_BASE = "/api/patients"

export const patientService = {
  // CRUD Operations
async getAll({ search, department, status, sortBy, page, limit }) {
  const query = new URLSearchParams();
  if (search) query.append("search", search);
  if (department) query.append("department", department);
  if (status) query.append("status", status);
  if (sortBy) query.append("sortBy", sortBy);
  query.append("page", page);
  query.append("limit", limit);
    const response = await fetch(`${API_BASE}?${query.toString()}`)
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    return response.json()
  },

  create: async (patientData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    return response.json()
  },

  update: async (id, patientData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })
    return response.json()
  },

  // Advanced Operations
  search: async (searchTerm) => {
    const response = await fetch(`${API_BASE}/search?q=${searchTerm}`)
    return response.json()
  },

  getByDepartment: async (department) => {
    const response = await fetch(`${API_BASE}/department/${department}`)
    return response.json()
  },
}
