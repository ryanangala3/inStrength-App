import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //remove before launch
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulated loading duration
  }, []);

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
      console.log(err);
    }
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
    <div className="bg-slate-100 mx-auto mt-64 rounded-md w-5/6">
      {" "}
      {/* Container */}
      <h1 className="pt-5 font-semibold text-2xl">Sign Up</h1>
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
          <Link
            to={"/login"}
            className="bg-white shadow-lg px-5 py-1 rounded-md min-w-24 font-medium text-customBlue"
          >
            Log In
          </Link>
          <button
            onClick={signUp}
            className="bg-customBlue shadow-lg px-5 py-1 rounded-md min-w-24 font-medium text-white"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
