"use client"
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { checkAuth } from "../helper/auth";
import TextInput from "../components/input/input";
import { getPublicBasePath } from "../helper/basePath";

const Login = () => {
    useEffect(() => {
        if (checkAuth()) {
            window.location.href = getPublicBasePath("/dashboard");
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
        )
            .then((response) => {
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem(
                    "refresh_token",
                    response.data.refresh_token
                );
                console.log(response.data);
                window.location.href = getPublicBasePath("/dashboard");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "อีเมล์หรือรหัสผ่านไม่ถูกต้อง",
                });
            });
    };

    return (
        <div className="login-bg min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700">
            <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-lg">
                <div className="text-center">
                    <img
                        src={getPublicBasePath('/menu/car.png')}
                        alt="KMUTT Logo"
                        className="w-16 mx-auto mb-4"
                    />
                    <h2 className="text-xl font-bold mb-4">ParkWise</h2>
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
                            {/* ... (unchanged) */}
                        </span>
                    </div>
                    <div className="relative">
                        <TextInput
                            type="password"
                            placeHolder="Password"
                            onEnterPress={(e) => {
                                login(e);
                            }}
                            onChange={(e) => {
                                setPassword(e.target.value as any);
                            }}
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            {/* ... (unchanged) */}
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full md:w-72 h-12 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                            onClick={(e) => login(e)}
                        >
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
