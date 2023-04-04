import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function Redirect() {
  const { data, isLoading } = useQuery({
    queryKey: ["GET_KAKAO"],
    queryFn: async () => {
        const code = new URL(window.location.href).searchParams.get('code')
        const data = await axios.get(`http://3.39.187.56/users/login?code=${code}`)
        console.log("data", data)
        return data.data
    }
  })
  return ;
}

export default Redirect