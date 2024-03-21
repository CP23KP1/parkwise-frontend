import { checkAuth } from "@/app/helper/auth";
import axios from "axios";
import useSWR from "swr";

export const getLogs = (setData: any, page: number, limit: number) => {
    page ? page : (page = 1);
    limit ? limit : (limit = 10);

    const token = localStorage.getItem("access_token");
    const fetcher = (url: string) =>
        axios
            .get(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => res.data);

    const { data, error } = useSWR(
        process.env.NEXT_PUBLIC_API_HOST +
            `/license-plate?page=${page}&limit=${limit}`,
        fetcher,
        { refreshInterval: 1000 }
    );

    if (error) {
        console.error("Error fetching data:", error);
    }

    if (data) {
        console.log(data);
        setData(data);
    }
};

export const fetchZone = async (setZone: any, setSelectedZone: any) => {
    try {
        if (checkAuth()) {
            const token = localStorage.getItem("access_token");
            const { data } = await axios.get(
                process.env.NEXT_PUBLIC_API_HOST + "/zones",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setZone(data.data);
            setSelectedZone(data.data[0].id);
        }
    } catch (error) {
        console.log(error);
    }
};
