import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context.jsx";
import api from "../axios/Axios.jsx";

export default function AuthProvider({ children }) {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  async function fetchUser() {
    const res = await api.get("/auth/profile");
    setUser(res.data.user)
  }
  useEffect(() => {
    async function loadUser() {
      await fetchUser();
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ User, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
