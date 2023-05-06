import {  SelectOption, SelectWrapper, Button, Block } from "./detailStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Calander from './Calander'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getCookie} from '../../shared/Cookies'
import { Div } from "../global/globalStyle";
import StatusBlock from "./StatusBlock";
import React from "react";

const ConsumerRegister = ({reservationList, id}) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const accessToken = getCookie('token')
    const nickname = getCookie('nickname')
    const reservePost = useMutation({
        mutationKey:['reservePost'],
        mutationFn: async(reserveDate) => {
            if(reserveDate.endDate === 'undefined-NaN-undefined'){
                return alert('날짜를 다시 입력해주세요')
            }else{
                return await axios.post(`${process.env.REACT_APP_SERVER_URL}products/${id}/reserve`,reserveDate,
                { 
                    headers: {
                        Authorization:`Bearer ${accessToken}`
                    }
                })
            }
            
        },
        onSuccess : (response)=>{
            if(!reservationList.filter(item => item.status === 'waiting').length){
                window.alert(`${response.data.message} 등록자 승인 후, 채팅을 통해 확인 메세지가 전송됩니다.`)
            }else{
                window.alert(`${response.data.message} ${reservationList.filter(item => item.status === 'waiting').length+1}번째 대기순서이므로, 순서가 되면 채팅을 통해 확인 메세지가 전송됩니다.`)
            }
            queryClient.invalidateQueries(['GET_DETAIL'])
        },
        onError : (error) => {
            if(error.response.data.message === 'Token Error'){
                window.alert('로그인이 필요한 서비스입니다.')
                navigate('/login')
            }else{
                window.alert(error.response.data.message)
            }
            
        }
    })

    const DeleteReservation = useMutation({
        mutationKey:['DeleteReservation'],
        mutationFn: async(id)=>{
            return await axios.delete(`${process.env.REACT_APP_SERVER_URL}products/reservation/${id}`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
        },
        onSuccess:(response)=>{
            window.alert(response.data.message)
            queryClient.invalidateQueries(['GET_DETAIL'])
        },
        onError:(error)=>{
            alert(error.response.data.message)
        }
    })

    const ChatwithOwner = useMutation({
        mutationKey:['ChatwithOwner'],
        mutationFn: async(nickname) => {
            return await axios.post(`${process.env.REACT_APP_SERVER_URL}chat/room/${id}/${nickname}`,null,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
        },
        onSuccess : (response)=>{
            localStorage.setItem('roomId',response.data.data)
            navigate(`/chat/${nickname}`)
        },
        onError : () => {
            window.alert('로그인이 필요한 서비스입니다.')
            navigate('/login')
        }
    })
    return (
        <Div width="100%" gap="1.5rem">
            <SelectWrapper>
                {reservationList?.reverse().map((item)=>{
                    return(
                    <SelectOption>
                        <StatusBlock status = {item.status}/>
                        <Div gap="0.5rem">
                            <span>예약자 : {item.nickname}</span>
                            <span>예약일 : {item.startDate} ~ {item.endDate}</span>
                        </Div>
                        {item.checkOwner ? (
                            <Button bgColor="red" onClick={()=>DeleteReservation.mutate(item.id)}>삭제</Button>
                        ):(
                            <Block disabled></Block>
                        )}
                    </SelectOption>
                    )
                })}
            </SelectWrapper>
            <Calander ChatwithOwner = {ChatwithOwner} reservePost = {reservePost}/>
        </Div>            
    )
}

export default React.memo(ConsumerRegister);