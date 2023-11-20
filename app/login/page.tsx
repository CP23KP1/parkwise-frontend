"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { checkAuth } from "../helper/auth";
import TextInput from "../components/input/input";
import { BASE_PATH } from "@/app/utils/constants";

const Login = () => {
    useEffect(() => {
        if (checkAuth()) {
            window.location.href = "/dashboard";
        }
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e: any) => {
        e.preventDefault();
        Swal.fire({
            title: "ระบบกำลังประมวลผล",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            html: '<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><div class="custom-spinner"></div></div>',
        });

        await Axios.post(
            process.env.NEXT_PUBLIC_API_HOST + "/auth/login",
            {
                email: email,
                password: password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            console.log(response.data);
            window.location.href = "/dashboard";
        });
    };
    return (
        <div className="login-bg h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700">
            <div className="bg-white w-4/12 h-3/4 border-2 rounded-3xl shadow-lg p-8">
                <div className="text-center">
                    <img
                        src={`${BASE_PATH}/logo/kmutt_logo.jpg`}
                        alt="KMUTT Logo"
                        className="w-24 mx-auto mb-8"
                    />
                    <h2 className="text-2xl font-bold mb-4">ParkWise</h2>
                </div>
                <div className="space-y-4">
                    <div className="relative">
                        <TextInput
                            type="email"
                            placeHolder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value as any);
                            }}
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
                        <TextInput
                            type="password"
                            placeHolder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value as any);
                            }}
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
                            onClick={(e) => login(e)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
