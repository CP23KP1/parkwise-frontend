"use client";
import React, { useEffect } from "react";
import liff from "@line/liff";

const Subscription = () => {
  useEffect(() => {
    lineInit();
  }, []);

  const lineInit = async () => {
    console.log("Initializing LIFF...");
    await liff
      .init({ liffId: "2001081274-LNKPDKOj" })
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
      <div className="bg-white w-4/12 h-3/4 border-2 rounded-3xl shadow-lg p-8">
        <div className="text-center">
          <img
            src="/logo/kmutt_logo.jpg"
            alt="KMUTT Logo"
            className="w-24 mx-auto mb-8"
          />
          <h2 className="text-2xl font-bold mb-4">
            สมัครรับบริการแจ้งเตือนที่จอดรถ
          </h2>
        </div>

        <div className="flex justify-center">
          <img src="/login/btn_login_base.png" onClick={handleLineLogin} />
        </div>

        <button onClick={handleLineLogin}>xxxx</button>
      </div>
    </div>
  );
};

export default Subscription;
