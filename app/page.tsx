"use client";
import React, { useEffect } from "react";
import { getPublicBasePath } from "./helper/basePath";
export default function Home() {
    useEffect(() => {
        window.location.href = getPublicBasePath("/login");
    }, []);
    return (
        <div>
            <h1 className="text-red-400 mt-8">Loading</h1>
        </div>
    );
}
