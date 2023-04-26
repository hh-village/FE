import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from '../shared/Cookies';

const useGetMyPageData = (currentBtn) => {
    const { data, refetch } = useQuery({
        queryKey: [`${currentBtn}`],
        queryFn: async () => {
          const token = getCookie("token");
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?key=${currentBtn}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          return res?.data.data;
        } 
    })
    return { data, refetch }
}

export default useGetMyPageData