import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const navigate = useNavigate;

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, username, password }),
    });

    console.log(await response.json());
    if (response.status !== 201) {
      console.log(response.statusText);
    } else {
      // navigate("/");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col grow">
        <form className="p-3 flex flex-col grow " action="/" method="post">
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
          <button type="submit" onClick={handleSignup}>
            Sign up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
