"use client";
import React, { useEffect } from "react";
import liff from "@line/liff";
import { getPublicBasePath } from "../helper/basePath";

const Subscription = () => {
  useEffect(() => {
    lineInit();
  }, []);

  const lineInit = async () => {
    console.log("Initializing LIFF...");
    await liff
      .init({ liffId: process.env.NEXT_PUBLIC_LINE_LOGIN_API as string })
      .then(() => {
        console.log("LIFF initialized");
      })
      .catch((error) => {
        console.error("LIFF initialization error", error);
      });
  };

  const handleLineLogin = () => {
    console.log("Login button clicked");
    try {
      liff.login();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-bg h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700">
      <div className="bg-white w-9/12 lg:w-4/12 h-3/4 border-2 rounded-3xl shadow-lg md:p-8">
        <div className="text-center mt-10">
          <img
            src={getPublicBasePath('/logo/kmutt_logo.jpg')}
            alt="KMUTT Logo"
            className="w-24 mx-auto mb-8"
          />
          <h2 className="text-2xl font-bold mb-4">
            สมัครบริการแจ้งเตือนที่จอดรถ
          </h2>
        </div>

        <div className="flex justify-center cursor-pointer">
          <img src={getPublicBasePath('/login/btn_login_base.png')} onClick={handleLineLogin} />
        </div>

      </div>
    </div>
  );
};

export default Subscription;
