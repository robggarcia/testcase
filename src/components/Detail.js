import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  attachActivity,
  deleteRoutine,
  deleteRoutineActivity,
  fetchRoutines,
  fetchRoutinesByUser,
  updateRoutineActivity,
} from "../api";
import EditRoutine from "./EditRoutine";

const Detail = ({
  token,
  user,
  routines,
  setRoutines,
  myRoutines,
  setMyRoutines,
  activities,
  setDisplayMessage,
  setSuccess,
}) => {
  const { routineId } = useParams();
  console.log("routineId: ", routineId);

  const [singleRoutine, setSingleRoutine] = useState({});
  const [activityOption, setActivityOption] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [editRoutineActivityId, setEditRoutineActivityId] = useState(null);
  const [activityToEdit, setActivityToEdit] = useState({});
  const [singleActivities, setSingleActivities] = useState({});
  const [editRoutine, setEditRoutine] = useState(false);
  const [editActivity, setEditActivity] = useState(false);

  const navigate = useNavigate();

  const findSingleRoutine = async (routines, myRoutines) => {
    const fetchedRoutines = await fetchRoutines();
    let findRoutine = fetchedRoutines.filter(
      (routine) => routine.id === +routineId
    )[0];
    if (!findRoutine) {
      const grabMyRoutines = await fetchRoutinesByUser(user, token);
      findRoutine = grabMyRoutines.filter(
        (routine) => routine.id === +routineId
      )[0];
    }
    setSingleRoutine(findRoutine);
    setSingleActivities(findRoutine.activities);
  };

  useEffect(() => {
    findSingleRoutine(routines, myRoutines);
  }, [routines, myRoutines]);

  const handleDeleteRoutine = async () => {
    const id = +routineId;
    const info = await deleteRoutine(token, id);
    // if success, update routines array and navigate to /routines
    if (!info.error) {
      console.log("Delete Routine SUCCESSFUL");
      // const updateRoutines = routines.filter(routine)
      const updateRoutines = routines.filter((routine) => routine.id !== id);
      setRoutines(updateRoutines);
      const updateMyRoutines = myRoutines.filter(
        (routine) => routine.id !== id
      );
      setMyRoutines(updateMyRoutines);
      setSuccess(true);
      setDisplayMessage(`Success: Routine id ${id} deleted`);
      navigate("/account/routines");
    } else {
      setSuccess(false);
      setDisplayMessage(`Error: ${info.erro}`);
    }
  };

  const handleEditRoutine = () => {
    setEditRoutine(!editRoutine);
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();

    // grab the selected activity
    const activity = activities.filter(
      (activity) => activity.name === activityOption
    )[0];

    // attach activity to the routine
    const info = await attachActivity(
      token,
      singleRoutine.id,
      activity.id,
      count,
      duration
    );

    if (info.id) {
      const grabMyRoutines = await fetchRoutinesByUser(user, token);
      const findRoutine = grabMyRoutines.filter(
        (routine) => routine.id === +routineId
      )[0];

      setSingleRoutine(findRoutine);
      setSingleActivities(findRoutine.activities);
      setSuccess(true);
      setDisplayMessage(
        `Success: Activity ${info.activityId} added to Routine id ${info.routineId} with count: ${count} and duration: ${duration}`
      );
      setActivityOption("");
      setCount("");
      setDuration("");
    } else {
      setSuccess(false);
      setDisplayMessage(`Error: ${info.message}`);
    }
  };

  const handleActivityOption = (e) => {
    setActivityOption(e.target.value);
  };

  const handleCount = (e) => {
    setCount(e.target.value);
  };

  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleDeleteActivity = async (e) => {
    const routineActivityId = e.target.value;
    const info = await deleteRoutineActivity(token, routineActivityId);
    // if success, update routines array and navigate to /routines
    if (!info.error) {
      // const updateRoutines = routines.filter(routine)
      const updateActivities = singleActivities.filter(
        (activity) => activity.routineActivityId !== +routineActivityId
      );
      setSingleActivities(updateActivities);
      singleRoutine.activities = singleActivities;
      setSingleRoutine(singleRoutine);
      setSuccess(true);
      setDisplayMessage(
        `Success: Activity id ${info.activityId} removed from Routine id ${info.routineId}`
      );
    } else {
      setSuccess(false);
      setDisplayMessage(`Error: ${info.message}`);
    }
  };

  const handleEditActivitySubmit = async (e) => {
    e.preventDefault();

    const updatedActivity = await updateRoutineActivity(
      token,
      editRoutineActivityId,
      count,
      duration
    );

    if (updatedActivity.id) {
      const grabMyRoutines = await fetchRoutinesByUser(user, token);
      const findRoutine = grabMyRoutines.filter(
        (routine) => routine.id === +routineId
      )[0];
      setSingleRoutine(findRoutine);
      setSingleActivities(findRoutine.activities);
      setSuccess(true);
      setDisplayMessage(
        `Success: Activity id ${updatedActivity.activityId} updated with count: ${updatedActivity.count} and duration: ${updatedActivity.duration}`
      );
      setEditActivity(false);
      setCount("");
      setDuration("");
    } else {
      setSuccess(false);
      setDisplayMessage(`Error: ${updatedActivity.message}`);
    }
  };

  return (
    <div className="detail">
      {singleRoutine && (
        <div className="detail-container">
          <div className="routine-detail">
            <h1 className="routine-detail">{singleRoutine.name}</h1>
            {editRoutine && (
              <EditRoutine
                token={token}
                singleRoutine={singleRoutine}
                setSingleRoutine={setSingleRoutine}
                setRoutines={setRoutines}
                setEditRoutine={setEditRoutine}
                setSuccess={setSuccess}
                setDisplayMessage={setDisplayMessage}
              />
            )}
            <p className="routine-detail">Goal: {singleRoutine.goal}</p>
            <p className="routine-detail">
              Creator: {singleRoutine.creatorName}
              {/* {singleRoutine.creatorName
                ? singleRoutine.creatorName
                : user.username} */}
            </p>
            {user && singleRoutine.creatorId === user.id ? (
              <div className="user-buttons">
                <button className="delete-button" onClick={handleDeleteRoutine}>
                  DELETE
                </button>
                <button onClick={handleEditRoutine}>EDIT ROUTINE</button>
              </div>
            ) : null}
            <div className="activities-detail">
              <div className="activities">
                <h4>ACTIVITIES:</h4>
                {token && singleRoutine.creatorId === user.id ? (
                  <div className="add-activity">
                    <form
                      onSubmit={
                        editActivity
                          ? handleEditActivitySubmit
                          : handleActivitySubmit
                      }
                    >
                      <label htmlFor="activity-select">
                        {editActivity
                          ? `Edit Activity: ${activityToEdit.name}`
                          : "Add Activity"}
                      </label>
                      {!editActivity && (
                        <select
                          id="activity-select"
                          value={activityOption}
                          onChange={handleActivityOption}
                        >
                          <option value="">--Select Activity To Add--</option>
                          {activities.map((activity) => (
                            <option key={activity.id}>{activity.name}</option>
                          ))}
                        </select>
                      )}

                      <input
                        type="text"
                        placeholder="Count *"
                        onChange={handleCount}
                        value={count}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Duration *"
                        onChange={handleDuration}
                        value={duration}
                        required
                      />
                      <button>SUBMIT</button>
                    </form>
                  </div>
                ) : null}
                {singleActivities.length > 0
                  ? singleActivities.map((activity, act_i) => {
                      return (
                        <div className="activity" key={act_i}>
                          <h4>
                            {act_i + 1}) {activity.name}
                          </h4>
                          <p>Description: {activity.description}</p>
                          <p>Count: {activity.count}</p>
                          <p>Duration: {activity.duration}</p>
                          {token && singleRoutine.creatorId === user.id ? (
                            <div className="user-buttons">
                              <button
                                onClick={() => {
                                  setEditActivity(!editActivity);
                                  setCount(activity.count);
                                  setDuration(activity.duration);
                                  setEditRoutineActivityId(
                                    activity.routineActivityId
                                  );
                                  setActivityToEdit(activity);
                                }}
                              >
                                EDIT
                              </button>
                              <button
                                className="delete-button"
                                value={activity.routineActivityId}
                                onClick={handleDeleteActivity}
                              >
                                DELETE
                              </button>
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
