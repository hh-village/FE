import { useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다
import ko from "date-fns/locale/ko"; // 달력을 한글 지원으로 바꾸는 용도
import { ReservationDateClick, SelectOption, SelectWrapper } from "./detailStyle";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {getCookie} from '../../shared/Cookies'
import { Div } from "../global/globalStyle";
import { queries } from "@testing-library/react";
import styled from "styled-components";

const ConsumerRegister = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const queryClient = useQueryClient();
    const CustomInput = ({ value, onClick }) => (
        <ReservationDateClick onClick={onClick}>
        {value}
        </ReservationDateClick>
    );
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const sDate = `${startDate.getFullYear()}-${String(startDate.getMonth()+1).padStart(2,'0')}-${String(startDate.getDate()).padStart(2,'0')}`
    const eDate = `${endDate?.getFullYear()}-${String(endDate?.getMonth()+1).padStart(2,'0')}-${String(endDate?.getDate()).padStart(2,'0')}`
    
    console.log(sDate, eDate)

    const accessToken = getCookie('token')

    const { mutate } = useMutation({
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
                    <Button bgColor="red" onClick={()=>{
                        DeleteReservation.mutate(item.id)
                    }}>삭제</Button>
                </SelectOption>
                )
            })}
          </SelectWrapper>
          <div>
                <div style={{display:'flex'}}>
                <DatePicker
                    locale={ko}
                    startDate={startDate}
                    showPopperArrow={false} // date 위에 화살표 모양 없애기    
                    endDate={endDate}
                    selected={startDate}
                    onChange={onChangeDate}
                    selectsRange
                    minDate={new Date()} 
                    dateFormat={"yyyy.MM.dd (eee)"}
                    monthsShown={2}
                    customInput={<CustomInput />}
                />
                <button
                    onClick={()=>{
                        mutate({
                            startDate : sDate,
                            endDate : eDate,
                        })
                    }}
                >등록하기</button>    
            </div>
        </div>
    </div>            
    )
}

export default ConsumerRegister;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    color: ${({color}) => color ? color : 'white'};
    border: none;
    border-radius: 5px;
    width: 5rem;
    height: 2.5rem;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
        background-color: #018786;
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`