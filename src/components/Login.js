import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = ({ setToken, setDisplayMessage, setSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const info = await loginUser(username, password);
    console.log("LOGIN SUCCESSFUL!: ", info);
    if (!info.token) {
      setSuccess(false);
      setDisplayMessage(
        "Error: username or password is incorrect. please try again"
      );
    } else {
      // save the token in state
      setToken(info.token);
      // save the token in local storage
      localStorage.setItem("token", info.token);
      // display message to user
      setSuccess(true);
      setDisplayMessage("Success: successfully logged in!");

      navigate("/");
    }
  };

  const handleUserInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePassInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username *"
          value={username}
          onChange={handleUserInput}
          required
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={handlePassInput}
          required
        />
        <button type="submit">LOG IN</button>
      </form>
      <Link to="/register">Don't have an account? Sign Up</Link>
    </div>
  );
};

export default Login;
