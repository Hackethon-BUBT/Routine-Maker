import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import { updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import app from "../firebase/firebase.config";

const storage = getStorage(app);

const ProfileEdit = () => {
  const { user, auth, setUser } = useContext(AuthContext);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState(user?.displayName || "");
  const [emailInput, setEmailInput] = useState(user?.email || "");
  const [photoInput, setPhotoInput] = useState(user?.photoURL || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoInput(reader.result); // preview
    };
    reader.readAsDataURL(selectedFile);
    setFile(selectedFile);
  };

  // Remove profile picture
  const handleRemovePhoto = () => {
    setPhotoInput("");
    setFile(null);
  };

  // Save profile changes
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      let photoURL = photoInput;

      // If user uploaded a new file, upload to Firebase Storage
      if (file) {
        const storageRef = ref(storage, `profile_pics/${auth.currentUser.uid}_${Date.now()}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update displayName and photoURL
      await updateProfile(auth.currentUser, {
        displayName: nameInput,
        photoURL: photoURL || null,
      });

      // Update email if changed
      if (emailInput !== user.email) {
        await updateEmail(auth.currentUser, emailInput);
      }

      // Update local user state
      setUser({
        ...user,
        displayName: nameInput,
        email: emailInput,
        photoURL: photoURL || null,
      });

      toast.success("🎉 Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f172a] via-[#1c2541] to-[#0f172a] text-white"
          : "bg-gradient-to-br from-[#fdfbfb] via-[#ede9fe] to-[#dfd1ff] text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-3xl shadow-2xl p-8 border backdrop-blur-xl transition-all duration-500 ${
          darkMode ? "bg-white/10 border-white/20" : "bg-white/70 border-black/10"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Edit Profile
        </h2>

        {/* Profile Preview */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={photoInput || "https://via.placeholder.com/150"}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full border-4 shadow-lg object-cover mb-3"
          />
          <div className="flex gap-2">
            <label className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {photoInput && (
              <button
                onClick={handleRemovePhoto}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Name Input */}
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="input input-bordered w-full my-2 text-center"
          placeholder="Enter Name"
        />

        {/* Email Input */}
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="input input-bordered w-full my-2 text-center"
          placeholder="Enter Email"
        />

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex-1 py-3 rounded-xl bg-gray-400 text-white font-semibold hover:opacity-80 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
