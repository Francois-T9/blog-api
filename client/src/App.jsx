import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import { AuthProvider } from "./Context/authContext";

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
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
