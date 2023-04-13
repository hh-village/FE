import { useState } from "react";
import { ReservationDateClick, Selections, SelectOption, SelectWrapper, Button } from "./detailStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Calander from './Calander'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getCookie} from '../../shared/Cookies'
import { Div } from "../global/globalStyle";
import styled from "styled-components";

const ConsumerRegister = (props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const accessToken = getCookie('token')
    const reservePost = useMutation({
        mutationKey:['reservePost'],
        mutationFn: async(reserveDate) => {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/${props?.id}/reserve`,reserveDate,
            { 
                headers: {
                    Authorization:`Bearer ${accessToken}`
                }
            },
            )
        },
        onSuccess : ()=>{
            queryClient.invalidateQueries(['GET_DETAIL'])
        },
        onError : (error) => {
            alert(error.response.data.message)
        }
    })

    const DeleteReservation = useMutation({
        mutationKey:['DeleteReservation'],
        mutationFn: async(id)=>{
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/products/reservation/${id}`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(['GET_DETAIL'])
        },
        onError:(error)=>{
            alert(error.response.data.message)
        }
    })

    const ChatwithOwner = useMutation({
        mutationKey:['ChatwithOwner'],
        mutationFn: async(nickname) => {
            return await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/room/${props.id}/${nickname}`,null,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
        },
        onSuccess : (response)=>{
            navigate(`/chat/${response.data.data}`)
        }
    })
    return (
        <div style={{width: "100%", margin: "2rem 0 0 0", gap:"3rem"}}>
            <SelectWrapper>
                {props.reservationList.map((item)=>{
                    return(
                    <SelectOption>
                        <Div fDirection="row" gap="0.5rem">
                            <span>예약자 : {item.nickname}</span>
                            <span>예약일 : {item.startDate} ~ {item.endDate}</span>
                        </Div>
                        <Button bgColor="red" onClick={()=>DeleteReservation.mutate(item.id)}>삭제</Button>
                    </SelectOption>
                    )
                })}
            </SelectWrapper>
            <Calander ChatwithOwner = {ChatwithOwner} reservePost = {reservePost}/>
    </div>            
    )
}

export default ConsumerRegister;