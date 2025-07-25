import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import { useState } from "react";
import { useAuth } from "../../Context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loginError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const success = await login(e, { username, password });
    if (success) navigate("/");
  };
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-3 flex flex-col grow gap-2">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col  gap-1.5 "
          action="/"
          method="post"
        >
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
          <button
            className="border cursor-pointer hover:bg-blue-200 p-1 rounded"
            type="submit"
          >
            Log in
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
