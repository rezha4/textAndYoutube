import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await axios.get("https://textandyoutube.adaptable.app/isAuth", {
        withCredentials: true,
      });
      console.log(res)
      console.log(session)
    };

    fetchSession();
  }, [session]);

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
