"use client";
import { Card, CardBody, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LOGIN_PAGE } from "../../common/data/meta.data";
import TextInput from "../../common/components/input/input";
import { checkAuth } from "../../helper/auth";
import { getPublicBasePath } from "../../helper/basePath";
import axios from "axios";

type Props = {};

const LoginPage = (props: Props) => {
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

        await axios
            .post(
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
            .then((response: any) => {
                localStorage.setItem(
                    "access_token",
                    response.data.access_token
                );
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
        <>
            <div className="login-bg min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-700">
                <Card className="w-full max-w-md bg-white p-4" shadow="md">
                    <CardBody>
                        <div className="text-center">
                            <img
                                src={getPublicBasePath(
                                    "/logo/transparent-logo.png"
                                )}
                                alt="KMUTT Logo"
                                className="w-64 mx-auto mb-12"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="relative">
                                <TextInput
                                    key="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setEmail(e.target.value as any);
                                    }}
                                    value={email}
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"></span>
                            </div>
                            <div className="relative">
                                <TextInput
                                    key="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
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
                                <Button
                                    color="primary"
                                    onClick={(e) => login(e)}
                                    variant="shadow"
                                    className="w-full md:w-72"
                                >
                                    เข้าสู่ระบบ
                                </Button>
                                {/* <button
                        type="submit"
                        className="w-full md:w-72 h-12 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                        onClick={(e) => login(e)}
                    >
                        เข้าสู่ระบบ
                    </button> */}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default LoginPage;
