import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "../shared/Cookies";

const useGetDetail = (id) => {
    const token = getCookie('token')

    const { data , isLoading, isError} = useQuery({
        queryKey: ["GET_DETAIL"],
        queryFn: async () => {
          if(!token){
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${parseInt(id)}`)
            return response.data.data;
          }
          else{
              const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${parseInt(id)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
            return response.data.data;
          }
        },
        keepPreviousData : false
      })
    return {
        data,
        isLoading,
        isError
    }
}
export default useGetDetail;