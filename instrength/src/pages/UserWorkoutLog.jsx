import React, { useEffect, useState, useCallback } from "react";
import arrow from "../assets/arrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function UserWorkoutLog() {
  const [workoutList, setWorkoutList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const workoutsCollectionsRef = collection(db, "userWorkouts");
  const [loading, setLoading] = useState(true);

  const navigateToHome = () => {
    navigate(`/${id}`);
  };

  const navigateToWorkoutId = (workoutId) => {
    navigate(`/${id}/workouts/${workoutId}`);
  };

  const getWorkoutList = useCallback(async () => {
    try {
      const data = await getDocs(workoutsCollectionsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setWorkoutList(filteredData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWorkoutList();
  }, [getWorkoutList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div class="relative bg-gradient-to-br from-purple-500 to-cyan-400 shadow-[0_-5px_20px_0_rgb(186,66,255),0_5px_20px_0_rgb(0,225,255)] blur-sm rounded-full w-24 h-24 animate-spin">
          <div class="absolute inset-0 bg-gray-900 blur-[10px] rounded-full w-full h-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <img
        onClick={navigateToHome}
        src={arrow}
        alt="back icon"
        className="absolute mt-2 pl-2 w-16 cursor-pointer"
      />
      <div className="border-white bg-customBlue shadow-lg mx-auto mt-8 px-4 py-4 border rounded-lg w-2/3 font-semibold text-3xl text-center text-white">
        <h1>Your Previous Workouts</h1>
      </div>
      <div className="flex flex-col justify-between gap-4 border-white bg-customBlue custom-glass mx-auto mt-16 py-4 border rounded-lg w-2/3 align-middle">
        {workoutList.map((workout) => (
          <div
            key={workout.id}
            className="bg-white mx-auto border rounded-lg w-5/6 text-center text-customBlue cursor-pointer"
            onClick={() => navigateToWorkoutId(workout.id, workout)}
          >
            <h1 className="text-2xl">{workout.workoutName}</h1>
            <h3>{workout.date}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserWorkoutLog;
