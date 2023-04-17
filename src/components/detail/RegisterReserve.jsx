import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Div } from "../global/globalStyle";
import DropDown from "./\bDropDown";
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
               
                <span>{item.nickname}</span>
                <Div fDirection="row" gap="0.5rem">
                  <span>대여일 : {item.startDate}</span>
                  <span>반납일 : {item.endDate}</span>
                </Div>
                <div style={{display:'flex', flexDirection:'column', gap :'12px'}}>
                  <DropDown/>
                  <ChatBtn onClick={()=>onClickNavigate(item.nickname)}>채팅하기</ChatBtn>
                </div>
              </SelectOption>)
          })}
          </SelectWrapper>
        </Div>
    )
}

export default RegisterReserve; 