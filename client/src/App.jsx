import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import SignupForm from "./Components/Forms/SignupForm";
import LoginForm from "./Components/Forms/LoginForm";
import { AuthProvider } from "./Context/authContext";
import { UserProvider } from "./Context/userContext";
import { PostsProvider } from "./Context/postsContext";
import { CommentsProvider } from "./Context/commentsContext";
import PostPage from "./Components/Posts/PostPage";
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
      path: "/post/:id",
      element: <PostPage />,
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
