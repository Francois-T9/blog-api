import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/authContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const handleSubmit = async () => {
    const success = await logout();
    if (success) navigate("/");
  };

  return (
    <div className="bg-gray-300 p-3 flex justify-between">
      <div className="logo flex grow">
        <p className="font-bold text-4xl">
          Blog<span className="font-extralight">API</span>
        </p>
      </div>
      <div className="navbar flex grow justify-end items-center ">
        <nav>
          <ul className="flex justify-around grow gap-3">
            {user ? (
              <div>
                <li>
                  <NavLink onClick={handleSubmit} to="/logout">
                    Logout
                  </NavLink>
                </li>
              </div>
            ) : (
              <div className="flex justify-around grow gap-3">
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
