import { User } from "@/utils/Types";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// const AuthContext = createContext<any>(null);

// export default AuthContext;

// export const AuthProvider = ({ children }: any) => {
//   const [auth, setAuth] = useState<string>("");
//   const router = useRouter();

//   const loginUser = async (e: any) => {
//     e.preventDefault();
//     const resp = await fetch("http://127.0.0.1:8000/aisistant/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: e.target.email.value,
//         password: e.target.password.value,
//       }),
//     });
//     const data = await resp.json();
//     const accessToken = data.token;
//     setAuth(accessToken);
//     sessionStorage.setItem("auth", accessToken);
//     router.push("/");
//   };

//   const contextData = {
//     loginUser: loginUser,
//     auth: auth,
//   };

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };

export const getAuth = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("auth") ?? "";
  }
  return "";
};

const AuthContext = createContext<any>(null);

export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<string>(getAuth());
  const router = useRouter();

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
    const accessToken = data.token;
    setAuth(accessToken);
    sessionStorage.setItem("auth", accessToken);
    router.push("/");
  };

  const contextData = {
    loginUser: loginUser,
    auth: auth,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};