import React from "react";

const Subscription = () => {
  return (
    <div className="login-bg h-full w-full flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700">
      <div className="bg-white w-4/12 h-3/4 border-2 rounded-3xl shadow-lg p-8">
        <div className="text-center">
          <img
            src="/logo/kmutt_logo.jpg"
            alt="KMUTT Logo"
            className="w-24 mx-auto mb-8"
          />
          <h2 className="text-2xl font-bold mb-4">สมัครรับบริการแจ้งเตือนที่จอดรถ</h2>
        </div>
        
          <div className="flex justify-center">
          <img src="/login/btn_login_base.png" />
          </div>
      </div>
    </div>
  );
};

export default Subscription;
