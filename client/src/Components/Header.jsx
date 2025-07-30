import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import themeImage from "../assets/theme-light-dark.svg";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const handleSubmit = async () => {
    const success = await logout();
    if (success) navigate("/");
  };

  return (
    <div className="header bg-gray-300  flex justify-between">
      <div className="logo flex grow p-3">
        <p className="font-bold text-4xl">
          Blog<span className="font-extralight">API</span>
        </p>
      </div>
      <div className=" navbar flex grow justify-end items-center gap-8 ">
        {/* <img className="w-10 cursor-pointer" src={themeImage} alt="" /> */}
        <nav className="h-full">
          <ul className="h-full flex justify-around grow gap-3 items-center">
            {user ? (
              <div className="h-full">
                <li className="h-full hover:bg-amber-400 flex items-center">
                  <NavLink onClick={handleSubmit} to="/logout">
                    Logout
                  </NavLink>
                </li>
              </div>
            ) : null}
          </ul>
        </nav>
      </div>
    </div>
  );
}
