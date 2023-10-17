"use client";
import React from "react";

const Login = () => {
  return (
    <div className="login-bg h-full w-full flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700">
      <div className="bg-white w-4/12 h-3/4 border-2 rounded-3xl shadow-lg p-8">
        <div className="text-center">
          <img
            src="/logo/kmutt_logo.jpg"
            alt="KMUTT Logo"
            className="w-24 mx-auto mb-8"
          />
          <h2 className="text-2xl font-bold mb-4">ParkWise</h2>
        </div>
        <form className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-10 pl-3 pr-10 rounded border-2 border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.293 18.293a2 2 0 01-2.828 0L12 15.828l-2.464 2.465a2 2 0 01-2.828-2.828L9.172 13 6.707 10.536a2 2 0 112.828-2.828L12 10.172l2.464-2.464a2 2 0 112.828 2.828L14.828 13l2.465 2.465a2 2 0 010 2.828z"
                />
              </svg>
            </span>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 pl-3 pr-10 rounded border-2 border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.293 18.293a2 2 0 01-2.828 0L12 15.828l-2.464 2.465a2 2 0 01-2.828-2.828L9.172 13 6.707 10.536a2 2 0 112.828-2.828L12 10.172l2.464-2.464a2 2 0 112.828 2.828L14.828 13l2.465 2.465a2 2 0 010 2.828z"
                />
              </svg>
            </span>
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="w-72 h-12 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
          </div>
          <div className="flex justify-center">
          <img src="/login/msoathlogin.png" className="h-12 w-72"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
