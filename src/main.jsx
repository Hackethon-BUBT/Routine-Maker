import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom"; // ✅ FIXED import path
import { router } from "./routes/routes.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import "react-toastify/dist/ReactToastify.css"; // ⚡ Recommended to include here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DarkModeProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={3000} /> {/* Optional styling */}
      </DarkModeProvider>
    </AuthProvider>
  </StrictMode>
);
