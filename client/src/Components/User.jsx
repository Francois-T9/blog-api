import { useAuth } from "../Context/authContext.jsx";
import { useUser } from "../Context/userContext.jsx";
import { usePosts } from "../Context/postsContext.jsx";
import { NavLink } from "react-router-dom";
import SignupForm from "./Forms/SignupForm.jsx";
import LoginForm from "./Forms/LoginForm.jsx";
import { useEffect, useState } from "react";
import Posts from "./Posts/Posts.jsx";
import PostForm from "./Forms/PostForm.jsx";
import imageTwo from "../assets/pexels-tony-schnagl-5586301.jpg";

function User() {
  const { user } = useAuth();
  const { getAllUsers, allUsers, deleteUserbyId } = useUser();
  const { getAllPosts } = usePosts();
  const [toggleSignupForm, setToggleSignupForm] = useState(false);
  const [toggleLoginForm, setToggleLoginForm] = useState(false);

  const displaySignupForm = () => {
    setToggleSignupForm(!toggleSignupForm);
  };
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
        <div className="w-full">
          <h1 className="font-bold text-3xl col-span-2 ">
            In this blog you can create posts and interact with others
          </h1>
          <div className="wrap flex">
            <div className="left w-[50%]">
              <p className="">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                magnam, consequatur enim veniam recusandae, molestias sequi
                voluptas nostrum provident soluta tempora reiciendis
                exercitationem inventore iste harum ipsam dolorem hic cupiditate
                maiores! Vitae ratione alias quibusdam atque quaerat, explicabo
                nihil provident quas ipsum facere in optio animi repellat,
                debitis impedit id accusamus aliquam? Sapiente, possimus
                suscipit quisquam iste temporibus a tempora expedita assumenda
                porro quaerat doloremque molestiae nisi asperiores voluptatibus
                facere, ullam quo eligendi dolorum adipisci. Repellendus esse
                expedita tempora necessitatibus tenetur, perspiciatis distinctio
                repudiandae dolore, exercitationem eveniet quod, sequi ipsum!
                Facilis autem odio neque iure sapiente. Aut dolores rerum
                voluptatem!
              </p>
              <img className=" rounded" src={imageTwo} alt="" />
            </div>
            <div className="right w-[50%] flex flex-col items-center justify-center gap-8">
              <button
                onClick={() => setToggleLoginForm(!toggleLoginForm)}
                className="border w-[50%] rounded-2xl  cursor-pointer p-2 bg-gray-500 hover:bg-gray-300"
              >
                Login
              </button>

              <button
                onClick={displaySignupForm}
                className="border w-[50%] cursor-pointer rounded-2xl p-2 bg-gray-500 hover:bg-gray-300"
              >
                Signup
              </button>
              {toggleSignupForm ? (
                <SignupForm isVisible onClose={setToggleSignupForm} />
              ) : null}
              {toggleLoginForm ? (
                <LoginForm isVisible onClose={setToggleLoginForm} />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
