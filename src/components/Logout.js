import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setToken, setUser, setDisplayMessage, setSuccess }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    setSuccess(true);
    setDisplayMessage("Success: successfully logged out.");
    navigate("/login");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
