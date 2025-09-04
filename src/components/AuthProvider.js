// src/context/AuthContext.jsx
import React, {createContext, useState, useContext, useEffect} from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token"));
console.log("refresh", refreshToken);
console.log("access", refreshToken);
  const login = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("access-token", newAccessToken);
    localStorage.setItem("refresh-token", newRefreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access-token");

    localStorage.removeItem("refresh-token");

    console.log("User has been logged out.");
  };

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) return false;

      const response = await fetch("https://brjobsedu.com/Nandagora/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access);
        localStorage.setItem("access-token", data.access);
        console.log("Access token Successfully refreshed.");
        return true;
      } else {
        console.error("Unable to refresh.");
        logout();
        return false;
      }
    } catch (error) {
      console.error("Error refreshing!", error);
      logout();
      return false;
    }
  };

 
  useEffect(() => {
    if (refreshToken) {
   
      refreshAccessToken();

 
      const interval = setInterval(refreshAccessToken, 1 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
