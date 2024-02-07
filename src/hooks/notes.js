import { api } from "@/utils/api";

export async function getNotes() {
  const response = await api.get("/api/notes");

  return response.data;
}

export async function getNote(id) {
  const response = await api.get(`/api/notes/${id}`);

  return response.data;
}

export async function postNotes(payload) {
  const response = await api.post("/api/notes", payload);

  return response.data;
}

export async function updateNotes(id, payload) {
  const response = await api.put(`/api/notes/${id}`, payload);

  return response.data;
}

export async function deleteNotes(id) {
  const response = await api.delete(`/api/notes/${id}`);

  return response.data;
}
