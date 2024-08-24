// src/components/WorkoutCalendar.js
import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const WorkoutCalendar = () => {
  const [workouts, setWorkouts] = useState({});

  const handleDayClick = (day) => {
    setWorkouts((prevWorkouts) => ({
      ...prevWorkouts,
      [day]: !prevWorkouts[day],
    }));
  };

  return (
    <div className="flex justify-center mt-10 p-4">
      <div className="gap-2 grid grid-cols-7">
        {daysOfWeek.map((day, index) => {
          const isWorkoutDay = workouts[day];
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-2 border rounded cursor-pointer ${
                isWorkoutDay ? "bg-green-500 text-white" : "bg-white"
              }`}
              onClick={() => handleDayClick(day)}
            >
              <span className="font-bold">{day}</span>
              <span className="text-sm">Day {index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutCalendar;
