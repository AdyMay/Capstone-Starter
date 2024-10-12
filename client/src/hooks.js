import { useState, useEffect } from "react";

export const useFetch = (url, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000${url}`);
        console.log("response", response);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export const useAuth = () => {
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    if (localToken) {
      attemptLoginWithToken(localToken);
    }
  }, []);

  const attemptLoginWithToken = async (token) => {
    try {
      const response = await fetch("../api/auth", {
        headers: { authorization: token },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
        setToken(token);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  };

  const authAction = async (credentials, mode) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        window.localStorage.setItem("token", json.token);
        setToken(json.token);
        setAuth(json);
      } else {
        throw new Error(json.message || "Authentication failed");
      }
    } catch (err) {
      console.log("Error");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    setToken(null);
  };

  return { auth, token, authAction, logout };
};
