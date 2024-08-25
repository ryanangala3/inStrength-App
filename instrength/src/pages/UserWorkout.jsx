import React, { useEffect, useState, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import arrowBack from "../assets/arrow.svg";

function UserWorkout() {
  const { id, workoutId } = useParams();
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSelectedWorkout = useCallback(async () => {
    try {
      const docRef = doc(db, "userWorkouts", workoutId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSelectedWorkout(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error("Error fetching workout:", err);
    } finally {
      setLoading(false);
    }
  }, [workoutId]);

  useEffect(() => {
    getSelectedWorkout();
  }, [getSelectedWorkout]);

  const navigateToHome = () => {
    navigate(`/${id}/workouts`);
  };

  if (loading) {
    return (
      <div class="relative bg-gradient-to-br from-purple-500 to-cyan-400 shadow-[0_-5px_20px_0_rgb(186,66,255),0_5px_20px_0_rgb(0,225,255)] blur-sm mx-auto my-auto rounded-full w-24 h-24 animate-spin">
        <div class="absolute inset-0 bg-gray-900 blur-[10px] rounded-full w-full h-full"></div>
      </div>
    );
  }

  return (
    <>
      <img
        onClick={navigateToHome}
        src={arrowBack}
        alt="back icon"
        className="absolute mt-2 pl-2 w-16 cursor-pointer"
      />
      <div className="border-white bg-customBlue shadow-lg mx-auto mt-4 px-4 py-4 border rounded-lg w-2/3 font-semibold text-3xl text-center text-white">
        <h1 className="text-3xl">{selectedWorkout.workoutName}</h1>
        <h1 className="text-xl">{selectedWorkout.date}</h1>
      </div>
      <div className="flex flex-col justify-center bg-gray-200 custom-glass mx-auto mt-10 py-4 rounded-lg w-2/3 align-middle">
        <div className="mx-auto">
          {selectedWorkout.exercises.map((exercise, index) => (
            <div
              key={index}
              className="border-white bg-gray-400 mx-auto mt-4 py-2 border rounded-lg w-5/6 text-white"
            >
              <h2 className="text-2xl text-center">{exercise.exerciseName}</h2>
              <div>
                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className="flex justify-between mt-2 px-5 py-2 w-full"
                  >
                    <p>Weight: {set.weight}</p>
                    <p>Reps: {set.reps}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserWorkout;
