// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react'
// import { getCookie } from '../../shared/Cookies';

// const useRegist = async (props) => {
//     const accessToken = getCookie('token')
//     return useQuery({
//         queryKey:['RegistProduct'],
//         queryFn : async()=>{
//             await axios.post(`${process.env.REACT_APP_SERVER_URL}`,{pros},{
//                 headers:{
//                     Authorization : `Bearer ${accessToken}`
//                 }
//             })
//         }
//     })
// }

// export default useRegist;