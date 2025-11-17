import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/routes.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DarkModeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </DarkModeProvider>
    </AuthProvider>
  </StrictMode>
);
