import React from "react";
import fitnessImg from "../images/fitness.jpeg";

const Home = ({ user, token }) => {
  return (
    <div className="home">
      <h1>Welcome {token && user ? user.username : "to Fitness Trackr"}!</h1>
      <img src={fitnessImg} alt="fitness" />
      <h3>Create Custom Routines And Activities</h3>
      <h3>Collaborate With Other User</h3>
      <h3>Make Gains</h3>
    </div>
  );
};

export default Home;
