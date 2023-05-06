import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from '../shared/Cookies';

const useGetMyPageData = (currentBtn) => {
    const { data, refetch, isError } = useQuery({
        queryKey: [`${currentBtn}`],
        queryFn: async () => {
          const token = getCookie("token");
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?key=${currentBtn}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          return res?.data.data;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 5 * 60 * 1000
    })
    return { data, refetch, isError}
}

export default useGetMyPageData