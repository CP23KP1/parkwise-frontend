"use client";
import React, { useEffect, useState } from "react";
import liff from "@line/liff";

const Line = () => {
  const [profile, setProfile] = useState(Object);

  useEffect(() => {
    liff.init({ liffId: "2001081274-LNKPDKOj" }).then(() => {
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
      console.log(userID)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="">
        
        {profile && (
          <div className="">
            <div className="flex justify-center rounded">
              <div className="w-1/4 h-1/4 md:w-1/6 md:h-1/6 ">
                <img src={profile.pictureUrl} className="rounded" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-72">
                <div className="grid grid-cols-2">
                  <h1>User ID:</h1>
                  <h1>{profile.userId}</h1>
                </div>
                <div className="grid grid-cols-2">
                  <h1>Display Name: </h1>
                  <h1>{profile.displayName}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Line;
