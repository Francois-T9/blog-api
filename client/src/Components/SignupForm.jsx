import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useState } from "react";
import { useAuth } from "../Context/authContext.jsx";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signupError, signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    const success = await signup(e, { email, name, username, password });
    if (success) navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-3 flex flex-col grow gap-2">
        <form
          onSubmit={handleSignup}
          className=" flex flex-col gap-1.5  "
          action="/"
          method="post"
        >
          <label htmlFor="email">Email</label>
          <input
            className="border border-gray-400 rounded px-2 py-1"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="name">Name</label>
          <input
            className="border border-gray-400 rounded px-2 py-1"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {signupError ? (
            <p className="text-red-500">{signupError.errors}</p>
          ) : (
            ""
          )}
          <button
            className="border cursor-pointer hover:bg-blue-200 p-1 rounded"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <NavLink to="/">
          <button className="hover:bg-gray-300 border p-1 cursor-pointer">
            Go back home
          </button>
        </NavLink>
      </div>
      <Footer />
    </div>
  );
}
