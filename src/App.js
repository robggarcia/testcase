import { Route, Routes } from "react-router-dom";
import {
  Activities,
  Home,
  Login,
  MyRoutines,
  Navbar,
  Register,
  Routines,
  Detail,
  Logout,
  Modal,
} from "./components";
import "./App.css";
import { useState } from "react";
import {
  fetchRoutines,
  fetchUser,
  fetchActivities,
  fetchRoutinesByUser,
} from "./api";
import { useEffect } from "react";

function App() {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [myRoutines, setMyRoutines] = useState({});
  const [displayMessage, setDisplayMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const getRoutines = async () => {
    const data = await fetchRoutines();
    console.log("getRoutines: ", data);
    setRoutines(data);
  };

  const getActivities = async () => {
    const data = await fetchActivities();
    console.log("getActivities: ", data);
    setActivities(data);
  };

  const getUser = async (token) => {
    // check local storage to see if a token is available
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"));

    if (!token) return;

    const info = await fetchUser(token);
    console.log("THE USER INFO: ", info);
    if (info.id) {
      setUser(info);
    }
  };

  useEffect(() => {
    getRoutines();
    getActivities();
    getUser(token);
  }, [token]);

  return (
    <div className="App">
      <Navbar user={user} token={token} />
      <Routes>
        <Route path="/" element={<Home user={user} token={token} />} />
        <Route path="/routines" element={<Routines routines={routines} />} />
        <Route
          path="/account/routines"
          element={
            <MyRoutines
              user={user}
              token={token}
              routines={routines}
              setRoutines={setRoutines}
              myRoutines={myRoutines}
              setMyRoutines={setMyRoutines}
              setDisplayMessage={setDisplayMessage}
              setSuccess={setSuccess}
            />
          }
        />
        <Route
          path="/activities"
          element={
            <Activities
              user={user}
              token={token}
              activities={activities}
              setActivities={setActivities}
              setDisplayMessage={setDisplayMessage}
              setSuccess={setSuccess}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setDisplayMessage={setDisplayMessage}
              setSuccess={setSuccess}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setToken={setToken}
              setDisplayMessage={setDisplayMessage}
              setSuccess={setSuccess}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout
              setToken={setToken}
              setUser={setUser}
              setDisplayMessage={setDisplayMessage}
              setSuccess={setSuccess}
            />
          }
        />
        <Route
          path="/routines/:routineId"
          element={
            <Detail
              token={token}
              user={user}
              routines={routines}
              setRoutines={setRoutines}
              myRoutines={myRoutines}
              setMyRoutines={setMyRoutines}
              activities={activities}
              setDisplayMessage={setDisplayMessage}
              setSuccess={setSuccess}
            />
          }
        />
      </Routes>
      <Modal displayMessage={displayMessage} success={success} />
    </div>
  );
}

export default App;
