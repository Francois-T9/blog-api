//
import { createContext, useContext, useState } from "react";
const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);
  const [postError, setPostError] = useState([]);

  const getAllPosts = async () => {
    const response = await fetch(`http://localhost:3000/api/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    setAllPosts(data.posts);
  };

  const getPostById = async (id) => {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    return data;
  };

  const createPost = async (title, userId) => {
    const response = await fetch(`http://localhost:3000/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ userId, title }),
    });
    const data = await response.json();
    if (data.errors) {
      setPostError(data.errors);
    } else {
      setPostError("");

      setAllPosts((prevPosts) => [...prevPosts, data]);
    }

    if (response.status !== 201) {
      return false;
    } else {
      return true;
    }
  };
  const deletePost = async (postId) => {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    if (response.status !== 201) {
      return false;
    } else {
      return true;
    }
  };

  const value = {
    getAllPosts,
    allPosts,
    createPost,
    deletePost,
    getPostById,
    postError,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
