import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Div } from "../global/globalStyle";
import DropDown from "./DropDown";
import { ChatBtn, SelectOption, SelectWrapper } from "./detailStyle"

const RegisterReserve = (props) => {
    const navigate = useNavigate();
    const getRoom = useMutation({
      mutationKey:['getRoomId'],
      mutationFn: async(nickname)=> {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/room/${props.id}/${nickname}`)
        },
        onSuccess : (response) => {
          navigate(`/chat/${response.data.data}`)
        }
      }
    )

    const onClickNavigate = (nickname) => {
      getRoom.mutate(nickname)
    }

    return (
        <Div width="100%">
          <SelectWrapper>
          {props.reservationList.map((item)=>{
            return(
              <SelectOption>
                {/* <ReserveSelect id = {item.id}/> */}
               <img src={item.profile} style={{width:'75px', height:'75px', borderRadius:'40px', border : '1px solid gray', marginLeft:'20px'}}/>
                <Div  fDirection="row" gap="0.5rem">
                  <span>{item.nickname}</span>
                  <span>예약일 : {item.startDate} ~ {item.endDate}</span>
                </Div>
                <div style={{display:'flex', flexDirection:'column', gap :'12px'}}>
                  <DropDown status = {item.status}/>
                  <div>
                    <ChatBtn onClick={()=>onClickNavigate(item.nickname)}>채팅하기</ChatBtn>
                  </div>
                </div>
              </SelectOption>)
          })}
          </SelectWrapper>
        </Div>
    )
}

export default RegisterReserve; 