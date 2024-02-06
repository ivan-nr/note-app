import { api } from "@/utils/api";

export async function login(payload) {
  const response = await api.post("/api/login", payload);

  return response.data;
}

export async function register(payload) {
  const response = await api.post("/api/register", payload);

  return response.data;
}

export async function logout() {
  const response = await api.post("/api/logout");

  return response.data;
}
