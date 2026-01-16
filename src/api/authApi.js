export async function loginWithGoogleIdToken(idToken) {
  const response = await fetch("/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || "No se pudo iniciar sesión con Google en el servidor."
    );
  }

  // Se espera que el backend devuelva { user, token }
  const data = await response.json();
  return data;
}
