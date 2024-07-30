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
    <div>
      <form onSubmit={handleAuth}>
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default Auth;
