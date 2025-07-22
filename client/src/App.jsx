import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import { AuthProvider } from "./Context/authContext";
import { UserProvider } from "./Context/userContext";
import { PostsProvider } from "./Context/postsContext";
import { CommentsProvider } from "./Context/commentsContext";
import Post from "./Components/Post";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/logout",
      element: <Home />,
    },
    {
      path: "/posts/id",
      element: <Post />,
    },
  ]);
  return (
    <AuthProvider>
      <UserProvider>
        <PostsProvider>
          <CommentsProvider>
            <RouterProvider router={router} />
          </CommentsProvider>
        </PostsProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
