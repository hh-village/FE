import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "../shared/Cookies";

const useGetMainPageData = () => {
    const { data,  isError , isLoading } = useQuery({
        queryKey: ["GET_MAINPAGE"],
        queryFn: async () => {
          const token = getCookie("token");
          if(!token){
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`)
            return res.data.data;
          } else {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
            return res?.data.data;
          }
        }
    })
    return {
      data,
       isError,
       isLoading
    }
}

export default useGetMainPageData;