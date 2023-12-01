import axios from "axios";

export const getLogs = async (setData: any) => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + "/license-plate");
    console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
