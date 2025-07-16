import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Header() {
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
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
