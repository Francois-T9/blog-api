import { createContext, useState, useContext } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState([]);

  const login = async (e, { username, password }) => {
    e.preventDefault();
    const userData = { username, password };

    // get token from username and pwd
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    });
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken); // Store token
      localStorage.setItem("refreshToken", data.refreshToken); // Store token
    }
    if (data.message) {
      setCurrentError(data.message);
    }

    // use token to get user
    const userRequest = await fetch(
      `http://localhost:3000/api/users/${data.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (userRequest.status == 200) {
      setUser(await userRequest.json());
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status == 200) {
      localStorage.setItem("accessToken", "null");
      localStorage.setItem("refreshToken", "null");
      setUser(null);
      return true;
    } else return false;
  };

  const signup = async (e, { email, name, username, password }) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, username, password }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      setCurrentSignupError(data);
      return false;
    } else {
      return true;
    }
  };

  const setCurrentError = (error) => {
    setLoginError(error);
  };

  const setCurrentSignupError = (error) => {
    setSignupError(error);
  };

  const value = {
    user,
    login,
    logout,
    signup,
    loginError,
    setCurrentError,
    signupError,
    setCurrentSignupError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
