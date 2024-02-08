import { api } from "@/utils/api";

export async function getUsers() {
  const response = await api.get("/api/users");

  return response.data;
}

export async function getUser(id) {
  const response = await api.get(`/api/users/${id}`);

  return response.data;
}

export async function postUsers(payload) {
  const response = await api.post("/api/users", payload);

  return response.data;
}

export async function updateUsers(id, payload) {
  const response = await api.put(`/api/users/${id}`, payload);

  return response.data;
}

export async function deleteUsers(id) {
  const response = await api.delete(`/api/users/${id}`);

  return response.data;
}
