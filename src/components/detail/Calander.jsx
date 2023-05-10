import React, { useState } from "react";
import ReactDatePicker from "react-datepicker"
import { Button, ReservationDateClick, Selections } from "./detailStyle";
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다
import ko from "date-fns/locale/ko"; // 달력을 한글 지원으로 바꾸는 용도
import { getCookie } from "../../shared/Cookies";

function Calander({ChatwithOwner,reservePost, id}){
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;
    const sDate = `${startDate?.getFullYear()}-${String(startDate?.getMonth()+1).padStart(2,'0')}-${String(startDate?.getDate()).padStart(2,'0')}`
    const eDate = `${endDate?.getFullYear()}-${String(endDate?.getMonth()+1).padStart(2,'0')}-${String(endDate?.getDate()).padStart(2,'0')}`
    const nickname = getCookie('nickname')

    const CustomInput = ({ value, onClick }) => (
        <ReservationDateClick onClick={onClick} defaultValue = '날짜를 선택해주세요'>
        {value}
        </ReservationDateClick>
    );
    const onChangeDate = (dates) => {
        setDateRange(dates);
    }
    
    return (
        <Selections>
            <div>
                <ReactDatePicker
                locale={ko}
                startDate={startDate}
                showPopperArrow={false} 
                endDate={endDate}
                selected={startDate}
                onChange={onChangeDate}
                selectsRange
                monthsShown={2}
                minDate={new Date()} 
                dateFormat={"yyyy.MM.dd (eee)"}
                shouldCloseOnSelect={true}
                // withPortal 모달창
                customInput={<CustomInput />}
                >
                <div style={{ color: "red"}}>하루단위 예약만 가능합니다!</div>
                </ReactDatePicker>
            </div>
            
            <Button 
            bgColor = '#644AFF'
            onClick={()=>ChatwithOwner.mutate(nickname)}
            style={{width:"6rem", height:"3rem"}}
            >
                채팅하기
            </Button>
            <Button 
            bgColor = 'gray'
            style={{width:"6rem", height:"3rem"}}
            onClick={()=>reservePost.mutate({
                startDate : sDate,
                endDate : eDate
            })}>
                대여하기
            </Button>
        </Selections>
        

    )
}

export default React.memo(Calander);