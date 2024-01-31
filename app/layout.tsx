"use client";
import "./globals.css";

import { NextUIProvider } from "@nextui-org/react";

import { Kanit } from "next/font/google";

const kanit = Kanit({
    weight: "200",
    preload: false,
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className={kanit.className}>
            <body>
                <NextUIProvider>{children}</NextUIProvider>
            </body>
        </html>
    );
}
