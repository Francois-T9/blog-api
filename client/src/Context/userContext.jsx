import { createContext, useContext, useState } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [allUsers, setAllUsers] = useState([]);
  const getAllUsers = async () => {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    setAllUsers(data);
  };

  const deleteUserbyId = async (id) => {
    await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };

  const value = {
    getAllUsers,
    allUsers,
    deleteUserbyId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
