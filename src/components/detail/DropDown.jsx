import { useState } from "react";
import useDropdown from "../../hooks/useDropdown";
import { DropdownMenu, DropHeader, DropOption } from "./detailStyle";

const DropDown = ({status}) => {
    const { isOpen, handleToggle } = useDropdown();
    const [ selectValue, setSelectValue ] = useState('대여중');

    // if(status == 'rejected'){
    //     return setSelectValue('승인거절');
    // }else if(status == 'returned'){
    //     return setSelectValue('반납완료');
    // }else{
    //     setSelectValue('대여중');
    // }

    const onClickDropDown = (event) => {
        if(event.target.dataset.value == 'rejected'){
            setSelectValue('승인거절');
            handleToggle();
        }else if(event.target.dataset.value == 'accepted'){
            setSelectValue('대여중');
            handleToggle();
        } else {
            setSelectValue('반납완료');
            handleToggle();
        }
    }
    return (
        <div style={{position:'relative', zIndex:'1'}}>
            <DropHeader onClick={handleToggle}>
            {selectValue}
            </DropHeader>
            {isOpen && (
                <DropdownMenu>
                    <DropOption 
                    data-value={'rejected'}
                    onClick={onClickDropDown}>
                    승인거절
                    </DropOption>
                    <DropOption
                    data-value={'accepted'}
                    onClick={onClickDropDown}
                    >
                    대여중
                    </DropOption>
                    <DropOption
                    data-value={'returned'}
                    onClick={onClickDropDown}
                    >
                    반납완료
                    </DropOption> 
                </DropdownMenu>
            )}      
        </div>
        
        
    )
}

export default DropDown;