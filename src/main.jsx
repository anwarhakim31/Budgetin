import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login";

import "./scss/index.scss";
import NotFoundPage from "./pages/404";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DashboardPage from "./pages/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import DarkmodeProvider from "./context/Darkmode";
import { ManageFragment } from "./components/fragments/ManageFragment";
import { DashboardFragment } from "./components/fragments/DashboardFragment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <HomePage />, // Use HomePage as the main layout
    children: [
      {
        path: "dashboard",
        element: <DashboardFragment />, // Dashboard fragment
      },
      {
        path: "manage",
        element: <ManageFragment />, // Manage fragment
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="100063954341-ujtlj3h67lbv1u08bjng8b9e72b932p5.apps.googleusercontent.com">
      <DarkmodeProvider>
        <RouterProvider router={router} />
        <ToastContainer pauseOnFocusLoss={false} autoClose={1000} />
      </DarkmodeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
