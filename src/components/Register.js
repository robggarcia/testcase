import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = ({ setToken, setDisplayMessage, setSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checkPass, setCheckPass] = useState(true);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setSuccess(false);
      setDisplayMessage("Error: password must be at least 8 characters long.");
    }
    const info = await registerUser(username, password);
    if (!info.token) {
      setSuccess(false);
      setDisplayMessage(
        "Error: username already exists or password invaled. please try again"
      );
    } else {
      // save the token in state
      setToken(info.token);
      // save the token in local storage
      localStorage.setItem("token", info.token);
      // display message to user
      setSuccess(true);
      setDisplayMessage("Success: successfully registered and logged in!");
      navigate("/");
    }
  };

  const handleUserInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePassInput = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirm Password *"
          value={confirm}
          onChange={handleConfirm}
          onBlur={() =>
            password === confirm ? setCheckPass(true) : setCheckPass(false)
          }
          required
        />
        {!checkPass && <p>Passwords must match</p>}
        <button type="submit">REGISTER</button>
      </form>
      <Link to="/login">Already have an account? Log In</Link>
    </div>
  );
};

export default Register;
