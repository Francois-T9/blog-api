import { useState } from "react";
import { useAuth } from "../../Context/authContext.jsx";

import { useNavigate } from "react-router-dom";

export default function SignupForm({ isVisible, onClose }) {
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

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center 
    backdrop-blur-sm bg-black/30 z-50"
    >
      <div className="p-3 flex flex-col  gap-2  bg-gray-50 rounded-xl">
        <button
          onClick={() => onClose()}
          className="p-2 rounded self-end cursor-pointer hover:bg-gray-400"
        >
          X
        </button>
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
      </div>
    </div>
  );
}
