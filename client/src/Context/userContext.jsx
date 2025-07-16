import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const setCurrentUser = (user) => {
    setUser(user);
  };

  const setCurrentError = (error) => {
    setLoginError(error);
  };

  const value = { user, setCurrentUser, loginError, setCurrentError };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
