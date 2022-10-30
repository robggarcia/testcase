import React, { useEffect, useState } from "react";
import { editRoutine, fetchRoutines } from "../api";

const EditRoutine = ({
  token,
  singleRoutine,
  setSingleRoutine,
  setRoutines,
  setEditRoutine,
  setDisplayMessage,
  setSuccess,
}) => {
  const [name, setName] = useState(singleRoutine.name);
  const [goal, setGoal] = useState(singleRoutine.goal);
  const [isPublic, setIsPublic] = useState(singleRoutine.isPublic);

  useEffect(() => {
    setName(singleRoutine.name);
    setGoal(singleRoutine.goal);
    setIsPublic(singleRoutine.isPublic);
  }, [singleRoutine]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // udpate the routine
    const updateRoutine = await editRoutine({
      token,
      routineId: singleRoutine.id,
      name,
      goal,
      isPublic,
    });

    if (updateRoutine.message) {
      setSuccess(false);
      setDisplayMessage(`Error: ${updateRoutine.message}`);
    } else {
      setSuccess(true);
      setDisplayMessage(`Success: Routine ${updateRoutine.name} updated.`);
      // update routines
      setSingleRoutine(updateRoutine);
      const allRoutines = await fetchRoutines();
      setRoutines(allRoutines);

      // hide edit form
      setEditRoutine(false);
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
    <div className="edit-routine">
      <h2>Edit Routine</h2>
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
            id="public"
            onChange={handlePublic}
            value={isPublic}
            checked={isPublic}
          />
          <label htmlFor="public"> Public</label>
        </div>
        <button>SAVE</button>
      </form>
    </div>
  );
};

export default EditRoutine;
