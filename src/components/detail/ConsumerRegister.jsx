import { useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다
import ko from "date-fns/locale/ko"; // 달력을 한글 지원으로 바꾸는 용도
import { ReservationDateClick, SelectOption, SelectWrapper } from "./detailStyle";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {getCookie} from '../../shared/Cookies'
import { Div } from "../global/globalStyle";

const ConsumerRegister = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
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

    const sDate = `${startDate.getFullYear()}-0${startDate.getMonth()+1}-0${startDate.getDate()}`
    const eDate = `${endDate?.getFullYear()}-0${endDate?.getMonth()+1}-${endDate?.getDate()}`
    const accessToken = getCookie('token')

    // const { data } = useQuery({
    //     queryKey:['reservationList'],
    //     queryFn : async()=> {
    //         await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/2`,{
    //             headers:{
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         })
    //     }
    // })
    const { mutate } = useMutation({
        mutationKey:['reservePost'],
        mutationFn: async(reserveDate) => {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/1/reserve`,reserveDate,
            { 
                headers: {
                    Authorization:`Bearer ${accessToken}`
                }
            },
            )
        },
        onSuccess : ()=>{
            alert('good')
        }
    })

    return (
        <Div width="100%" fDirection="row">
            <SelectWrapper>
                <SelectOption>
                    
                </SelectOption>
                <SelectOption>
                    
                </SelectOption>
                <SelectOption>
                    
                </SelectOption>
            </SelectWrapper>
            <Div>
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
            </Div>
        </Div>

    )
}

export default ConsumerRegister;