import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import { useState } from "react";
import { useAuth } from "../../Context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function LoginForm({ isVisible, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loginError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const success = await login(e, { username, password });
    if (success) {
      navigate("/");
      onClose();
    }
  };
  // const navigate = useNavigate();
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
          onSubmit={handleSubmit}
          className=" flex flex-col  gap-1.5 "
          action="/"
          method="post"
        >
          {/* ########### */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError ? <p className="text-red-500">{loginError}</p> : ""}

            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>
          {/* ########### */}
        </form>
      </div>
    </div>
  );
}
