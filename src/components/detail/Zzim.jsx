import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { getCookie } from "../../shared/Cookies";

const Zzim = ({zzim, zzimCount,id}) => {
    const queryClient = useQueryClient();
    const token = getCookie('token')
    const MutateZzim = useMutation({
        mutationFn: async (payload) => {
          return await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/${id}/zzim`, payload, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        },
        onSuccess : (response) => {
          queryClient.invalidateQueries(['GET_DETAIL'])
        }
      });

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