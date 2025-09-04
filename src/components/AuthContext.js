// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh-token") || "");

  console.log("Refresh token from localStorage.", refreshToken);

  const login = (newAccess, newRefresh) => {
    setAccessToken(newAccess);
    setRefreshToken(newRefresh);
    localStorage.setItem("access-token", newAccess);
    localStorage.setItem("refresh-token", newRefresh);
  };
  
  console.log("hii");

  const logout = () => {
    console.log("hii"); // <- debug
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access-token");

    localStorage.removeItem("refresh-token");

    console.log("User has been logged out.");
  };

  // Memoize refreshAccessToken to avoid recreating it on every render
  const refreshAccessToken = useCallback(async () => {
    try {
      if (!refreshToken) return false;

      console.log("Refreshing access token.");

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
      console.error("Error while refreshing.", error);
      logout();
      return false;
    }
  }, [refreshToken]);

  // Refresh every 15 minutes
  useEffect(() => {
    let intervalId;

    if (refreshToken) {
      // refresh immediately upon start
      refreshAccessToken();

      // then refresh every 15 minutes
     intervalId = setInterval(refreshAccessToken, 5 * 60 * 1000); // 30 minutes
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [refreshAccessToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
