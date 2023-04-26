import { User } from "@/utils/Types";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [authTokens, setAuthTokens] = useState<string>("");
  const [user, setUser] = useState<User>();

  const loginUser = async (e: any) => {
    e.preventDefault();
    const resp = await fetch("http://127.0.0.1:8000/aisistant/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await resp.json();
    console.log("DATA:", data);
  };

  const contextData = {
    loginUser: loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
