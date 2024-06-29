import { api } from "@/utils/api";

export async function getUsers() {
  const response = await api.get("/api/user/all");

  return response.data;
}

export async function getUser(id) {
  const response = await api.get(`/api/user/${id}`);

  return response.data;
}

export async function postUsers(payload) {
  const response = await api.post("/api/user/create", payload);

  return response.data;
}

export async function updateUsers(id, payload) {
  const response = await api.put(`/api/user/${id}`, payload);

  return response.data;
}

export async function deleteUsers(id) {
  const response = await api.delete(`/api/user/${id}`);

  return response.data;
}
