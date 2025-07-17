import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../Context/authContext.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className=" w-full h-full  flex flex-col ">
      <Header />
      <div className="h-full p-3">
        <h1>HomePage</h1>
        {user ? (
          <div>
            <p>Hello, {user.username}!</p>
            <p>Welcome back!</p>
          </div>
        ) : (
          <p>Login to begin watching posts!</p>
        )}
        {/* if login say hello to username */}
      </div>
      <Footer />
    </div>
  );
}
