import { api } from "@/utils/api";

export async function login(payload) {
  const response = await api.post("/auth/login", payload);

  return response.data;
}

export async function register(payload) {
  const response = await api.post("/auth/register", payload);

  return response.data;
}

export async function logout() {
  const response = await api.post("/api/logout");

  return response.data;
}
