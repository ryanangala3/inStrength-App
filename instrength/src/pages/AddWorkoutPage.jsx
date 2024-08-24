import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from "../assets/arrow.svg";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";

function AddWorkoutPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initial state with one exercise containing one set, and collapsed property
  const [exercises, setExercises] = useState([
    { exerciseName: "", sets: [{ weight: "", reps: "" }], collapsed: false },
  ]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { exerciseName: "", sets: [{ weight: "", reps: "" }], collapsed: false },
    ]);
  };

  const handleAddFields = (exerciseIndex) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({ weight: "", reps: "" });
    setExercises(newExercises);
  };

  const handleInputChange = (exerciseIndex, setIndex, event) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex][event.target.name] =
      event.target.value;
    setExercises(newExercises);
  };

  const handleExerciseNameChange = (exerciseIndex, event) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].exerciseName = event.target.value;
    setExercises(newExercises);
  };

  const handleDeleteFields = (exerciseIndex, setIndex) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(newExercises);
  };

  const toggleCollapse = (exerciseIndex) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].collapsed =
      !newExercises[exerciseIndex].collapsed;
    setExercises(newExercises);
  };

  const navigateToHome = () => {
    navigate(`/${id}`);
  };

  return (
    <div>
      <img
        onClick={navigateToHome}
        src={arrowBack}
        alt="back icon"
        className="absolute mt-2 pl-2 w-16 cursor-pointer"
      />
      <div className="border-white bg-customBlue shadow-lg mx-auto mt-4 px-4 py-4 border rounded-lg w-2/3 font-semibold text-3xl text-white">
        <h1 text->Add Your Workout!</h1>
      </div>
      <input
        type="text"
        placeholder="Workout Name"
        className="border-gray-400 shadow-lg mx-auto mt-10 px-4 py-2 border rounded-md w-2/3 font-medium placeholder:text-xl"
      />
      {exercises.map((exercise, exerciseIndex) => (
        <div
          key={exerciseIndex}
          className="flex flex-col justify-center bg-gray-200 mx-auto mt-10 py-4 rounded-lg w-2/3 align-middle"
        >
          <div className="flex mx-4">
            <h1 className="bg-gray-400 shadow-md mx-auto px-4 py-2 border rounded-md w-3/5 text-center text-white">
              {exercise.collapsed
                ? ` ${exercise.exerciseName}`
                : `${exercise.exerciseName}`}
            </h1>
            <button
              onClick={() => toggleCollapse(exerciseIndex)}
              className="bg-gray-400 shadow-md mx-auto px-4 py-2 border rounded-md w-1/6 text-center text-white"
            >
              <img
                src={exercise.collapsed ? ` ${arrowDown}` : `${arrowUp}`}
                alt="collase/expand"
              />
            </button>
          </div>
          {!exercise.collapsed ? (
            <>
              <input
                type="text"
                placeholder="Exercise"
                value={exercise.exerciseName}
                onChange={(event) =>
                  handleExerciseNameChange(exerciseIndex, event)
                }
                className="border-gray-200 shadow-md mx-auto mt-4 px-4 py-2 border rounded-md w-4/5 text-center"
              />
              {exercise.sets.map((set, setIndex) => (
                <div
                  key={setIndex}
                  className="flex justify-between gap-2 mx-auto mt-4 w-4/5"
                >
                  <input
                    type="text"
                    placeholder="Weight"
                    name="weight"
                    value={set.weight}
                    onChange={(event) =>
                      handleInputChange(exerciseIndex, setIndex, event)
                    }
                    className="border-gray-300 shadow-md px-4 py-2 border rounded-lg w-1/2 text-center"
                  />
                  <input
                    type="text"
                    placeholder="Reps"
                    name="reps"
                    value={set.reps}
                    onChange={(event) =>
                      handleInputChange(exerciseIndex, setIndex, event)
                    }
                    className="border-gray-300 shadow-md px-4 py-2 border rounded-lg w-1/3 text-center"
                  />
                  <button
                    onClick={() => handleDeleteFields(exerciseIndex, setIndex)}
                    className="bg-deleteRed shadow-md px-2 py-2 border rounded-lg text-center text-white"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleAddFields(exerciseIndex)}
                  className="border-white bg-saveGreen shadow-md px-4 py-2 border rounded-lg w-2/5 text-center text-white"
                >
                  Add Set
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-lg">{""}</div>
          )}
        </div>
      ))}
      <button
        onClick={handleAddExercise}
        className="block border-customBlue shadow-md mx-auto mt-6 px-4 py-2 border rounded-lg w-2/3 font-medium text-customBlue text-xl"
      >
        Add An Exercise
      </button>
      <button className="block border-customBlue bg-customBlue shadow-md mx-auto mt-6 px-4 py-2 border rounded-lg w-2/3 font-medium text-white text-xl">
        Confirm Workout
      </button>
    </div>
  );
}

export default AddWorkoutPage;
