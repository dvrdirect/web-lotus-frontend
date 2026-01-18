import { authorizedFetch } from "./reservationsApi";

// PUT /api/user/me - actualiza datos básicos del perfil del usuario autenticado
export async function updateProfile({ name, phone, birthdate }) {
  return authorizedFetch("/user/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, phone, birthdate }),
  });
}
