import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleAuth = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login"; // Make sure this matches your backend route

    const payload = isRegister
      ? { name, email, password }
      : { email, password };

    try {
      const { data } = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setUser(data);
    } catch (error) {
      console.error("Error during authentication:", error.message);
      console.log(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleAuth}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {isRegister && (
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="font-medium mt-4 text-sky-500 dark:text-sky-400"
      >
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default Auth;
