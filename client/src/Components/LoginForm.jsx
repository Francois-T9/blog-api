import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/userContext.jsx";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUser, loginError, setCurrentError } = useUser();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    // get token from username and pwd
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token); // Store token
      navigate("/");
      // Optionally redirect or update UI here
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (userRequest.status == 200) {
      setCurrentUser(await userRequest.json());
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col grow">
        <form className="p-3 flex flex-col grow " action="/" method="post">
          <label htmlFor="username">Username</label>
          <input
            className="border border-gray-400 rounded px-2 py-1"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="border border-gray-400 rounded px-2 py-1"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError ? <p className="text-red-500">{loginError}</p> : ""}
          <button type="submit" onClick={handleLogin}>
            Log in
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
