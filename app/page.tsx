"use client";
import React, { useEffect } from "react";
export default function Home() {
    useEffect(() => {
        window.location.href = "/login";
    }, []);
    return (
        <div>
            <h1 className="text-red-400 mt-8">Loading</h1>
        </div>
    );
}
