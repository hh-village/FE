import { useState } from "react";
import useDropdown from "../../hooks/useDropdown";
import { DropdownMenu, DropHeader, DropOption } from "./detailStyle";

const DropDown = () => {
    const { isOpen, handleToggle } = useDropdown();
    const [ selectValue, setSelectValue ] = useState('대여상태');

    const onClickDropDown = (event) => {
        if(event.target.dataset.value == 'rejected'){
            setSelectValue('승인거절');
            handleToggle();
        }
        if(event.target.dataset.value == 'waiting'){
            setSelectValue('대기중');
            handleToggle();
        }
        if(event.target.dataset.value == 'accepted'){
            setSelectValue('대여중');
            handleToggle();
        }
        if(event.target.dataset.value == 'returned'){
            setSelectValue('반납완료');
            handleToggle();
        }
    }
    return (
        <div>
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
                    data-value={'waiting'}
                    onClick={onClickDropDown}
                    >
                    대기중
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