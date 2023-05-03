import { useState, useEffect } from "react";
import { getAuth } from "@/context/AuthContext";

export const useAuth = () => {
  const [auth, setAuth] = useState<string>("");

  useEffect(() => {
    setAuth(getAuth());
  }, []);

  return auth;
};
