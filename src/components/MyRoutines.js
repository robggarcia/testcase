import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createRoutine, fetchRoutinesByUser } from "../api";
import Routines from "./Routines";

const MyRoutines = ({
  user,
  token,
  routines,
  setRoutines,
  myRoutines,
  setMyRoutines,
  setDisplayMessage,
  setSuccess,
}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  // on page load, fetch all routines by user
  const getRoutinesByUser = async (user, token) => {
    const data = await fetchRoutinesByUser(user, token);
    setMyRoutines(data);
  };

  useEffect(() => {
    getRoutinesByUser(user, token);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create a new routine
    const newRoutine = await createRoutine(token, name, goal, isPublic);

    if (newRoutine.message) {
      setSuccess(false);
      setDisplayMessage(`Error: ${newRoutine.message}`);
    } else {
      setSuccess(true);
      setDisplayMessage(`Succes: Routine ${newRoutine.name} created`);
      // update routines and display users routines
      setRoutines([...routines, newRoutine]);
      setMyRoutines(
        myRoutines.length > 0 ? [...myRoutines, newRoutine] : [newRoutine]
      );
      // clear input fields
      setName("");
      setGoal("");
      setIsPublic(false);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGoal = (e) => {
    setGoal(e.target.value);
  };

  const handlePublic = () => {
    setIsPublic(!isPublic);
  };

  return (
    <div className="my-routines">
      <h1>Routines for {user.username}</h1>
      <div className="routine-form">
        <h2>Add New Routine</h2>
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
            placeholder="Goal *"
            onChange={handleGoal}
            value={goal}
            required
          />
          <div className="checkbox">
            <input
              type="checkbox"
              name="public"
              onChange={handlePublic}
              value={isPublic}
            />
            <label htmlFor="deliver"> Public</label>
          </div>
          <button>CREATE</button>
        </form>
      </div>
      <div className="myroutines-container">
        {myRoutines.length > 0 ? (
          <div className="myroutines-routines-container">
            {myRoutines.map((routine, rout_i) => {
              return (
                <div className="routine" key={rout_i}>
                  <Link to={`/routines/${routine.id}`}>
                    <h2>{routine.name}</h2>
                    <p>Routine Id: {routine.id}</p>
                    <p>Goal: {routine.goal}</p>
                    <p>Creator: {routine.creatorName}</p>
                  </Link>

                  <div className="activities">
                    <h4>Activities:</h4>
                    {routine.activities &&
                      routine.activities.map((activity, act_i) => {
                        return (
                          <div className="activity" key={act_i}>
                            <h4>
                              {act_i + 1}) {activity.name}
                            </h4>
                            <p>Description: {activity.description}</p>
                            <p>Count: {activity.count}</p>
                            <p>Duration: {activity.duration}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyRoutines;
