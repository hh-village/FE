import {  SelectOption, SelectWrapper, Button, Block } from "./detailStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Calander from './Calander'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getCookie} from '../../shared/Cookies'
import { Div } from "../global/globalStyle";
import StatusBlock from "./StatusBlock";

const ConsumerRegister = (props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const accessToken = getCookie('token')
    const nickname = getCookie('nickname')
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
                {props.reservationList?.map((item)=>{
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

export default ConsumerRegister;