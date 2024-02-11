"use client";
import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import TextInput from "@/app/components/input/input";

const Line = () => {
    const [profile, setProfile] = useState(Object);

    useEffect(() => {
        liff.init({
            liffId: process.env.NEXT_PUBLIC_LINE_LOGIN_API as string,
        }).then(() => {
            console.log("LIFF initialized");
            handleLogin();
        });
    }, []);

    const handleLogin = async () => {
        try {
            const userProfile = await liff.getProfile();
            const userID = await liff.getIDToken();
            setProfile(userProfile);
            console.log(userProfile);
            console.log(userID);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="login-bg h-screen">
                <div className="flex justify-center">
                    <div className="bg-white w-4/12 h-3/4 border-2 rounded-3xl shadow-lg p-8 mt-10">
                        {profile && (
                            <div className="">
                                <div className="flex justify-center rounded">
                                    <div className="w-3/4 h-3/4 md:w-2/6 md:h-2/6 ">
                                        <img
                                            src={profile.pictureUrl}
                                            className="rounded"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-72">
                                        <div className="flex justify-center gap-6 mt-4">
                                            <h1>ชื่อไลน์พนักงาน: </h1>
                                            <h1>{profile.displayName}</h1>
                                        </div>
                                        <div className="mt-4">
                                            <p>รหัสพนักงาน: </p>
                                            <TextInput
                                                type="text"
                                                placeHolder="Enter Text..."
                                            />
                                        </div>
                                        <div className="relative mt-10 text-center">
                                            <button className="group relative px-6 py-3 text-white bg-blue-500 border border-blue-500 rounded-md transition-transform transform scale-100 hover:scale-105 duration-500">
                                                สมัครรับบริการแจ้งเตือน
                                                <div className="hidden absolute w-64 h-64 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Line;
