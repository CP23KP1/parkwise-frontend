import axios from "axios";
import { checkAuth } from "../helper/auth";
import { TopTenByTimeRangeReport } from "../types/data/report.response";

export const getReportByTopTenByTimeRange = async (
    start: string,
    end: string
): Promise<TopTenByTimeRangeReport | undefined> => {
    try {
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            const response = await axios.get<TopTenByTimeRangeReport>(
                process.env.NEXT_PUBLIC_API_HOST +
                    "/reports/top-ten-time-range",
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        timeStart: start,
                        timeEnd: end,
                    },
                }
            );
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getReportByDays = async () => {
    try {
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + "/reports/by-days",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};
