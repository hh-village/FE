import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../shared/Cookies';
import jwtDecode from 'jwt-decode'

function Redirect() {
  const navi = useNavigate();

  const { res } = useQuery({
    queryKey: ["GET_KAKAO"],
    queryFn: async () => {
        const code = new URL(window.location.href).searchParams.get('code')
        const res = await axios.get(`http://3.39.187.56/users/login?code=${code}`)
        
        setCookie("token", res.headers.authorization.substring(7), {path:"/"});

        const decodeData = jwtDecode(res.headers.authorization);
        setCookie("userID", decodeData.auth, {path: "/"});
        setCookie("nickname", decodeData.sub, {path: "/"});
        alert(res.data.message);
        navi("/");
    }
  })

  return ;
}

export default Redirect