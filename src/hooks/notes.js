import { api } from "@/utils/api";

export async function getNotes() {
  const response = await api.get("/note/all");

  return response.data;
}

export async function getNote(id) {
  const response = await api.get(`/note/${id}`);

  return response.data;
}

export async function postNotes(payload) {
  const response = await api.post("/note/create", payload);

  return response.data;
}

export async function updateNotes(id, payload) {
  const response = await api.put(`/note/${id}`, payload);

  return response.data;
}

export async function deleteNotes(id) {
  const response = await api.delete(`/note/${id}`);

  return response.data;
}
