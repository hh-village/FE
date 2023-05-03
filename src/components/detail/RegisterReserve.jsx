import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Div } from "../global/globalStyle";
import DropDown from "./DropDown";
import { ChatBtn, SelectOption, SelectWrapper } from "./detailStyle"
import { nanoid } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookies";
import React from "react";

const RegisterReserve = (props) => {
    const Mynick = getCookie('nickname') 
    const navigate = useNavigate();
    const getRoom = useMutation({
      mutationKey:['getRoomId'],
      mutationFn: async(nickname)=> {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/room/${props.id}/${nickname}`)
        },
        onSuccess : (response) => {
          localStorage.setItem('roomId',response.data.data)
          navigate(`/chat/${Mynick}`)
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
              <SelectOption 
              key={nanoid()}>
                <img src={item.profile} alt="" style={{width:'75px', height:'75px', borderRadius:'40px'}}/>
                <Div gap="0.5rem">
                  <span>{item.nickname}</span>
                  <span style={{color:'#313131'}}>예약일 : {item.startDate} ~ {item.endDate}</span>
                </Div>
                <div style={{display:'flex', flexDirection:'column', gap :'12px'}}>
                  <DropDown status = {item.status} id = {item.id}/>
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

export default React.memo(RegisterReserve); 