import { useAuth } from "../Context/authContext.jsx";
import { useUser } from "../Context/userContext.jsx";
import { usePosts } from "../Context/postsContext.jsx";

import { useEffect } from "react";
import Posts from "./Posts.jsx";
import PostForm from "./PostForm.jsx";

function User() {
  const { user } = useAuth();
  const { getAllUsers, allUsers, deleteUserbyId } = useUser();
  const { getAllPosts } = usePosts();

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    if (user) {
      getAllPosts(user.id);
    }
  }, []);
  return (
    <div className="home-main p-3 flex grow">
      {user ? (
        <div className="user-panel flex flex-col grow gap-2">
          <h1 className="home-title font-bold text-3xl">
            Welcome back {user.username}!
          </h1>
          <PostForm />

          {user.isAdmin ? (
            <div className="adminPanel bg-fuchsia-300 p-2 border rounded-2xl flex flex-col gap-2">
              <h1 className="home-title font-bold text-3xl">Admin panel</h1>
              <div className="flex flex-col gap-2.5">
                {allUsers.map((user) => (
                  <div
                    key={user.id} // Move key here!
                    className="border list-none p-2 flex bg-amber-50 items-center justify-between "
                  >
                    <li>{user.email}</li>
                    {user.isAdmin ? (
                      <p>Admin</p>
                    ) : (
                      <button
                        onClick={() => deleteUserbyId(user.id)}
                        className="border cursor-pointer rounded p-1 bg-red-500 hover:bg-red-300"
                      >
                        Delete user
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p></p>
          )}

          <Posts user={user} />
        </div>
      ) : (
        <p>Login to begin watching posts!</p>
      )}
    </div>
  );
}

export default User;
