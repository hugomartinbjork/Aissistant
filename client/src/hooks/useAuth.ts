import { useState, useEffect } from "react";
import { getAuth, getAuthUser } from "@/context/AuthContext";

export const useAuth = () => {
  const [auth, setAuth] = useState<string>("");
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    setAuth(getAuth());
    setUser(getAuthUser());
  }, []);

  return { auth, user };
};
