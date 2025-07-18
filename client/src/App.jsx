import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import { AuthProvider } from "./Context/authContext";
import { UserProvider } from "./Context/userContext";

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
  ]);
  return (
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
