import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext.jsx";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, auth, setUser } = useContext(AuthContext);
  const { darkMode } = useDarkMode();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("👋 Signed out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 relative ${
        darkMode
          ? "bg-gradient-to-br from-[#0a0f24] via-[#16233b] to-[#0c1224] text-white"
          : "bg-gradient-to-br from-purple-200 via-purple-300 to-purple-200 text-black"
      }`}
    >
      {/* Profile Card */}
      <div
        className={`shadow-xl rounded-3xl p-8 w-full max-w-lg text-center backdrop-blur-md transition-all duration-500 border ${
          darkMode
            ? "bg-white/10 border-white/20"
            : "bg-white/60 border-black/10"
        }`}
      >
        <img
          src={user?.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 shadow-lg object-cover"
        />

        <h2 className="text-3xl font-bold mt-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          {user?.displayName || "Guest User"}
        </h2>
        <p className="opacity-80 mt-1">{user?.email || "No email available"}</p>

        <div className="mt-6 flex justify-center gap-3">
          <Link to="/ProfileEdit">
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:scale-105 transition-transform">
              ✏️ Edit Profile
            </button>
          </Link>
          <button
            onClick={handleSignout}
            className="px-4 py-2 rounded-xl bg-red-500 text-white shadow-md hover:scale-105 transition-transform"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 text-sm opacity-70">
        Developed by <span className="font-bold">Red_Coders 💎</span>
      </div>
    </div>
  );
};

export default Profile;
