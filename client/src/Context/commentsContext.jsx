//
import { createContext, useContext, useState } from "react";
const CommentsContext = createContext();

export function CommentsProvider({ children }) {
  const [allComments, setAllComments] = useState([]);
  const getAllComments = async (authorId, postId) => {
    const response = await fetch(
      `http://localhost:3000/api/users/${authorId}/posts/${postId}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setAllComments(data.content);
  };

  const value = { getAllComments, allComments };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
