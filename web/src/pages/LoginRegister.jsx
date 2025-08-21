import { useState } from "react";
import { apiRequest } from "../api"; // <-- correct import

export default function LoginRegister({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isLogin) {
        // login
        const data = await apiRequest("/login", "POST", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        setAuth({ token: data.token, role: data.role, name: data.name });
      } else {
        // register as patient
        await apiRequest("/register", "POST", { name, email, password });
        alert("Registered! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message || "Error");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p
        onClick={() => setIsLogin(!isLogin)}
        className="text-center mt-4 text-blue-600 cursor-pointer hover:underline"
      >
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </p>
    </div>
  );
}
