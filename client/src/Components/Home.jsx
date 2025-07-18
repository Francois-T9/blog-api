import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../Context/authContext.jsx";
import { useUser } from "../Context/userContext.jsx";
import { useEffect } from "react";
export default function Home() {
  const { user } = useAuth();
  const { getAllUsers, allUsers, deleteUserbyId } = useUser();

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className=" w-full h-full  flex flex-col ">
      <Header />
      <div className="h-full p-3">
        <h1>HomePage</h1>
        {user ? (
          <div>
            <p>Hello, {user.username}!</p>
            {user.isAdmin ? (
              <div>
                <p>Welcome back!</p>

                <p>You are the admin</p>
                <h1>Admin panel</h1>
                <div className="flex flex-col gap-2.5">
                  {allUsers.map((user) => {
                    return (
                      <div className="list-none p-2 flex bg-amber-200 items-center justify-between rounded-2xl ">
                        <li key={user.id}>{user.email}</li>
                        {user.isAdmin ? (
                          <p>Admin</p>
                        ) : (
                          <button
                            onClick={() => deleteUserbyId(user.id)}
                            className="cursor-pointer rounded p-1 bg-amber-500"
                          >
                            X
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p>Welcome back!</p>
            )}
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
