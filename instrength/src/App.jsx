import SignUp from "./components/SignUp";
import MainPage from "./pages/MainPage";
import UserHomePage from "./components/UserHomePage";
import UserWorkoutLog from "./pages/UserWorkoutLog";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import Example from "./pages/Example";
import UserWorkout from "./pages/UserWorkout";
import FooterAuth from "./components/FooterAuth";
import background from "./assets/abstract-blue-and-dark-gray-wave-on-black-background-3.png";

function App() {
  return (
    <div
      className="bg-cover pt-8 min-h-screen App"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mx-auto max-w-md">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:id" element={<UserHomePage />} />
            <Route path="/:id/workouts" element={<UserWorkoutLog />} />
            <Route path="/:id/workouts/:workoutId" element={<UserWorkout />} />
            <Route path="/:id/add-workout" element={<Example />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
