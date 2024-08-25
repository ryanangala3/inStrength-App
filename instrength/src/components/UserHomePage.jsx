import React from "react";
import Quotes from "../components/Quotes";
import WorkoutCalendar from "./Calendar";
import { useNavigate, useParams } from "react-router-dom";

function UserHomePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const navigateToWorkouts = () => {
    navigate(`/${id}/workouts`);
  };

  const navigateToAddWorkout = () => {
    navigate(`/${id}/add-workout`);
  };

  return (
    <div>
      <div className="border-white bg-customBlue shadow-lg mx-auto mt-4 px-4 py-4 border rounded-lg w-2/3 font-semibold text-3xl text-center text-white">
        <h1>Welcome TMNT!</h1>
      </div>
      <Quotes />
      <WorkoutCalendar />
      <button
        onClick={navigateToWorkouts}
        className="block border-customBlue custom-glass mx-auto mt-8 px-4 py-2 w-1/2 font-bold text-white text-xl"
      >
        Previous Workouts
      </button>
      <button
        onClick={navigateToAddWorkout}
        className="block border-white bg-customBlue shadow-md mx-auto mt-4 px-4 py-2 border rounded-md w-1/2 font-bold text-white text-xl"
      >
        Add Workout
      </button>
    </div>
  );
}

export default UserHomePage;
