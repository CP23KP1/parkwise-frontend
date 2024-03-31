import axios from "axios";
import { checkAuth } from "../helper/auth";

export const getProfile = async () => {
    if (checkAuth()) {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_HOST}/auth/me`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.status !== 200) {
            throw new Error("Failed to get profile");
        }

        return response.data;
    }
};
