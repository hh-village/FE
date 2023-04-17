import { useState } from "react";
import ReactDatePicker from "react-datepicker"
import { Button, ReservationDateClick, Selections } from "./detailStyle";
import "react-datepicker/dist/react-datepicker.css"; // 이렇게 가져와야 기본 디자인이 설정된다
import ko from "date-fns/locale/ko"; // 달력을 한글 지원으로 바꾸는 용도
import { getCookie } from "../../shared/Cookies";

function Calander({ChatwithOwner,reservePost, id}){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const sDate = `${startDate.getFullYear()}-${String(startDate.getMonth()+1).padStart(2,'0')}-${String(startDate.getDate()).padStart(2,'0')}`
    const eDate = `${endDate?.getFullYear()}-${String(endDate?.getMonth()+1).padStart(2,'0')}-${String(endDate?.getDate()).padStart(2,'0')}`
    const nickname = getCookie('nickname')

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
    

    return (
        <Selections>
            <div style ={{position : 'relative'}}>
                <ReactDatePicker
                locale={ko}
                startDate={startDate}
                showPopperArrow={false} // date 위에 화살표 모양 없애기    
                endDate={endDate}
                selected={startDate}
                onChange={onChangeDate}
                selectsRange
                // showAnim={"slide"}
                minDate={new Date()} 
                dateFormat={"yyyy.MM.dd (eee)"}
                customInput={<CustomInput />}
                />
            </div>
            
            <Button 
            bgColor = 'gray'
            onClick={()=>ChatwithOwner.mutate(nickname)}>
                채팅하기
            </Button>
            <Button 
            bgColor = 'gray'
            onClick={()=>reservePost.mutate({
                startDate : sDate,
                endDate : eDate
            })}>
                등록하기
            </Button>
        </Selections>
        

    )
}

export default Calander;