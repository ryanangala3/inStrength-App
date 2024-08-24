import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //remove before launch
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulated loading duration
  }, []);

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      navigate(`/${userId}`);
    } catch (err) {
      console.log(err);
      setError("Failed to log in. Please check your email and password.");
    }
  };

  const navigateToSignUp = () => {
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="bg-slate-100 mx-auto mt-64 pt-4 rounded-md w-5/6 animate-pulse">
        <div className="bg-gray-300 mx-auto mt-5 rounded w-24 h-8"></div>
        <div className="flex flex-col justify-center items-center mx-auto mt-8 w-full">
          <div className="flex flex-col items-start mb-4 w-60">
            <div className="bg-gray-300 mb-2 rounded w-16 h-4"></div>
            <div className="bg-gray-300 rounded w-full h-9"></div>
          </div>
          <div className="flex flex-col items-start mb-6 w-60">
            <div className="bg-gray-300 mb-2 rounded w-20 h-4"></div>
            <div className="bg-gray-300 rounded w-full h-9"></div>
          </div>
          <div className="flex justify-between mx-24 pb-8 w-60">
            <div className="bg-gray-300 rounded w-24 h-9"></div>
            <div className="bg-gray-300 rounded w-24 h-9"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 mx-auto mt-56 rounded-md w-5/6">
      {" "}
      {/* Container */}
      {error && (
        <div className="alert" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <h1 className="pt-5 font-semibold text-2xl text-center">Log In</h1>
      <div className="flex flex-col justify-center items-center mx-auto mt-8 w-full">
        <div className="flex flex-col items-start">
          <label className="font-semibold">Email:</label>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            className="shadow-lg pl-2 border border-black rounded-md w-60 h-9"
          />
        </div>
        <div className="flex flex-col items-start mt-4">
          <label className="font-semibold">Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="shadow-lg pl-2 border border-black rounded-md w-60 h-9"
          />
        </div>
        <div className="flex justify-between mx-24 mt-6 pb-8 w-60">
          <button
            onClick={navigateToSignUp}
            className="bg-white shadow-lg px-5 py-1 rounded-md min-w-24 font-medium text-customBlue"
          >
            Sign Up
          </button>
          <button
            className="bg-customBlue shadow-lg px-5 py-1 rounded-md min-w-24 font-medium text-white"
            onClick={signIn}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
