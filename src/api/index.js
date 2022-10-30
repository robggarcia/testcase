const BASE_URL = "https://calm-taiga-74394.herokuapp.com/";

// if you wish to use the provided API
// const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/";

// USER
export const fetchUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};

// ROUTINES
export const fetchRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRoutinesByUser = async (user, token) => {
  try {
    console.log("fetchRoutinesByUser called: ", user);
    const response = await fetch(
      `${BASE_URL}api/users/${user.username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createRoutine = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${BASE_URL}api/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoutine = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}api/routines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editRoutine = async ({
  token,
  routineId,
  name,
  goal,
  isPublic,
}) => {
  try {
    const response = await fetch(`${BASE_URL}api/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ACTIVITIES
export const fetchActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createActivity = async (token, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const attachActivity = async (
  token,
  routineId,
  activityId,
  count,
  duration
) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId,
          count,
          duration,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ROUTINE_ACTIVITIES
export const deleteRoutineActivity = async (token, routineActivityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}api/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateRoutineActivity = async (
  token,
  routineActivityId,
  count,
  duration
) => {
  try {
    console.log("UPDATE ROUTINE ACTIVITY CALLED");
    const response = await fetch(
      `${BASE_URL}api/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
