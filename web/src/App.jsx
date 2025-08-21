import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import PatientDashboard from "./pages/PatientDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    return token ? { token, role, name } : null;
  });

   function handleLogin({ token, role, name }) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setAuth({ token, role, name });
  }

  function logout() {
    localStorage.clear();
    setAuth(null);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
         <div className="flex-1 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Clinic Booking</h1>
          </div>
          {auth && (
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 "
            >
              Logout
            </button>
          )}
        </nav>
          <div className="p-6">
          <Routes>
            {!auth && (
              <Route
                path="/*"
                element={<LoginRegister setAuth={handleLogin} />}
              />
            )}
            {auth?.role === "patient" && (
              <Route
                path="/*"
                element={<PatientDashboard auth={auth} />}
              />
            )}
            {auth?.role === "admin" && (
              <Route
                path="/*"
                element={<AdminDashboard auth={auth} />}
              />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}