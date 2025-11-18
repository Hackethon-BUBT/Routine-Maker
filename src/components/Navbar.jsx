import { Link } from "react-router-dom";
import logo from "../Media/Logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { useDarkMode } from "../context/DarkModeContext.jsx";

const Navbar = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const { user, signoutUserFunc, loading, setUser } = useContext(AuthContext);

  const handleSignout = () => {
    signoutUserFunc()
      .then(() => {
        toast.success("Signout successful");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b backdrop-blur-md ${
          darkMode ? "bg-[#0f172a]/90 border-b-white/20 text-white" : "bg-white/90 border-b-gray-200 text-black"
        }`}
      >
        <MyContainer className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/">
            <img src={logo} className="w-[55px] md:w-[65px] hover:scale-105 transition-transform" alt="logo" />
          </Link>

          {/* Menu Links */}
          <ul className="flex items-center gap-4 md:gap-6 font-medium">
            <li>
              <MyLink to={"/"}>Home</MyLink>
            </li>
            <li>
              <MyLink to={"/about-us"}>About Us</MyLink>
            </li>
            {user && (
              <li>
                <MyLink to={"/profile"}>Profile</MyLink>
              </li>
            )}
          </ul>

          {/* Right Side: Dark Mode & Auth */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>

            {/* Auth Buttons */}
            {loading ? (
              <ClockLoader color="#e74c3c" size={25} />
            ) : user ? (
              <div className="relative group">
                <button className="btn btn-ghost p-0">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/88"}
                    className="h-[40px] w-[40px] rounded-full mx-auto border-2 border-purple-500"
                    alt=""
                  />
                </button>
                <div className="absolute right-0 mt-2 w-52 bg-white/90 dark:bg-[#0f172a]/90 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity p-4">
                  <h2 className="text-lg font-semibold text-black dark:text-white">{user?.displayName}</h2>
                  <p className="text-sm text-gray-600 dark:text-white/70">{user?.email}</p>
                  <button
                    onClick={handleSignout}
                    className="btn btn-sm btn-outline btn-error mt-2 w-full"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to={"/signin"}
                className="btn bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-semibold transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </MyContainer>
      </div>

      {/* Spacer to prevent content overlap */}
      <div className="h-[80px] md:h-[90px]"></div>
    </>
  );
};

export default Navbar;
