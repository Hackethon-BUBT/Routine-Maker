import { createBrowserRouter } from "react-router-dom"; // ✅ use react-router-dom
import MainLayout from "../layout/MainLayout.jsx";
import Homepage from "../pages/Homepage.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Profile from "../pages/Profile.jsx";
import ProfileEdit from "../pages/ProfileEdit.jsx"; // ✅ new edit page
import Signup from "../pages/Signup.jsx";
import Signin from "../pages/Signin.jsx";
import PrivateRoute from "../privateRoute/PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "ProfileEdit", // ✅ added route
        element: (
          <PrivateRoute>
            <ProfileEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
    ],
  },
]);
