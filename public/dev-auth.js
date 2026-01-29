(function () {
  // dev-auth.js
  // Usage: open http://localhost:5173/?devAuth=admin  OR ?devAuth=user OR ?devAuth=off
  try {
    const STORAGE_KEY = "lotus_auth";
    const params = new URLSearchParams(location.search);
    const mode = (params.get("devAuth") || "user").toLowerCase();

    function setSession(mode) {
      if (mode === "off") {
        localStorage.removeItem(STORAGE_KEY);
        console.info("[dev-auth] cleared session");
        return;
      }

      const adminEmail = "dvrdirect@gmail.com";
      const user =
        mode === "admin"
          ? { name: "Dev Admin", email: adminEmail, role: "admin" }
          : { name: "Dev User", email: "guest@example.com", role: "user" };

      const token = "dev-token";
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
      console.info("[dev-auth] set session:", user);
    }

    setSession(mode);
    // expose helper for toggling from console
    window.__devAuth = {
      set: (m) => setSession(String(m || "user")),
      clear: () => setSession("off"),
    };
  } catch (e) {
    console.warn("[dev-auth] failed to run", e);
  }
})();
