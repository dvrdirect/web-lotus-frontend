export const ADMIN_EMAIL = "dvrdirect@gmail.com";

export const getUserRole = (user) => {
  const explicitRole = user?.role;
  if (explicitRole === "admin" || explicitRole === "staff") {
    return "admin";
  }

  const email = user?.email ? String(user.email).toLowerCase() : "";
  if (email && email === ADMIN_EMAIL) {
    return "admin";
  }

  return "user";
};
