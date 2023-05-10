import { useEffect, useState } from "react";

const useSelectValue = (status) => {
    const [ selectValue, setSelectValue ] = useState('대기중');

    useEffect(()=>{
        if(status === 'rejected'){
            return setSelectValue('승인거절');
        }
        if(status === 'returned'){
            return setSelectValue('반납완료');
        }
        if(status === 'accepted'){
            return setSelectValue('대여중');
        }
    },[status])

    return {
        selectValue, setSelectValue
    }
}

export default useSelectValue;