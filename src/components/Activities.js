import React from "react";
import { useState } from "react";
import { createActivity } from "../api";

const Activities = ({
  user,
  token,
  activities,
  setActivities,
  setDisplayMessage,
  setSuccess,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create a new activity
    const newActivity = await createActivity(token, name, description);

    if (newActivity.message) {
      setSuccess(false);
      setDisplayMessage(`Error: ${newActivity.message}`);
    } else {
      // display message to user
      setSuccess(true);
      setDisplayMessage(`Success: Activity ${newActivity.name} created.`);

      // update activities
      setActivities([...activities, newActivity]);

      // clear input fields
      setName("");
      setDescription("");
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="activities">
      <h1>Activities</h1>
      {token && (
        <div className="add-new-activity">
          <h2>Add New Activity</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name *"
              onChange={handleName}
              value={name}
              required
            />
            <input
              type="text"
              placeholder="Description *"
              onChange={handleDescription}
              value={description}
              required
            />
            <button>CREATE</button>
          </form>
        </div>
      )}
      <div className="activities-container">
        {activities.map((activity, idx) => {
          return (
            <div className="activity" key={idx}>
              <h3>Activity: {activity.name}</h3>
              <p>Description: {activity.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;
