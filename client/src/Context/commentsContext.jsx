//
import { createContext, useContext, useState } from "react";
const CommentsContext = createContext();

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const getPostComments = async (postId) => {
    const response = await fetch(
      `http://localhost:3000/api/posts/${postId}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    setComments(data);
    return data;
  };

  const createComment = async (content, authorId, postId) => {
    const response = await fetch(
      `http://localhost:3000/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ userId: authorId, content }),
      }
    );
    const data = await response.json();
    if (response.status !== 201) {
      setCommentError(data.errors);
      return false;
    } else {
      setComments((prevComments) => [...prevComments, data]);
      setCommentError("");
      return true;
    }
  };
  const deleteComment = async (postId, commentId) => {
    const response = await fetch(
      `http://localhost:3000/api/posts/${postId}/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
    if (response.status !== 201) {
      return false;
    } else {
      return true;
    }
  };

  const value = {
    getPostComments,
    createComment,
    comments,
    commentError,
    deleteComment,
  };

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
