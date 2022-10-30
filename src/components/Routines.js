import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchRoutines } from "../api";

const Routines = ({ routines }) => {
  const [routinesToShow, setRoutinesToShow] = useState(routines);

  const getRoutines = async () => {
    const data = await fetchRoutines();
    console.log("getRoutines: ", data);
    setRoutinesToShow(data);
  };

  useEffect(() => {
    getRoutines();
  }, []);
  return (
    <div className="routines">
      <h1>Routines</h1>
      <div className="routines-container">
        {routinesToShow.map((routine, rout_i) => {
          return (
            <div className="single-routine">
              <div className="routine" key={rout_i}>
                <Link to={`/routines/${routine.id}`}>
                  <h2>{routine.name}</h2>
                  <p>Routine Id: {routine.id}</p>
                  <p>Goal: {routine.goal}</p>
                  <p>Creator: {routine.creatorName}</p>
                </Link>

                <div className="activities">
                  <h4>ACTIVITIES:</h4>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Routines;
