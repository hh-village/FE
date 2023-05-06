import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../shared/Cookies";

const Zzim = ({zzim, zzimCount,id}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = getCookie('token')
    const MutateZzim = useMutation({
        mutationFn: async (payload) => {
          return await axios.post(`${process.env.REACT_APP_SERVER_URL}products/${id}/zzim`, payload, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        },
        onSuccess : (response) => {
          queryClient.invalidateQueries(['GET_DETAIL'])
        },
        onError : (error) => {
          if(error.response.data.message === "Token Error"){
            alert('로그인 후 빌리지를 이용해주세요!')
            navigate('/login')
          }else{
            alert('다시 시도 해주세요!')
          }
      }});

    return (
        <ZzimDiv onClick={()=>{MutateZzim.mutate("")}}>
            {!zzim
            ? <img src="/images/eHeart.png" alt="" style={{width:"28px", height:"28px"}}/>
            : <img src="/images/fHeart.png" alt="" style={{width:"28px", height:"28px"}}/>
            }
            <span style={{color:'#644AFF'}}>{zzimCount}</span>
        </ZzimDiv>
    )
}
export default Zzim;

const ZzimDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`