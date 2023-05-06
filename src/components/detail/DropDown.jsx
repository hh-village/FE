import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useDropdown from "../../hooks/useDropdown";
import useSelectValue from "../../hooks/useSelectValue";
import { getCookie } from "../../shared/Cookies";
import { DropdownMenu, DropHeader, DropOption } from "./detailStyle";

const DropDown = ({status, id}) => {
    const { isOpen, handleToggle } = useDropdown();
    const { selectValue, setSelectValue } = useSelectValue(status)
    const accesToken = getCookie('token')
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationKey:['statusChanged'],
      mutationFn: async(status) => {
        return await axios.patch(`${process.env.REACT_APP_SERVER_URL}/products/reservation/${id}/status`,status,{
          headers : {
            Authorization : `Bearer ${accesToken}`
          }
        })
      },
      onSuccess : (response) => {
        window.alert(response.data.message)
        queryClient.invalidateQueries(['GET_DETAIL'])
      }
    })

    const onClickDropDown = (event) => {
        if(event.target.dataset.value == 'rejected'){
            setSelectValue('승인거절');
            handleToggle();
            mutate({
                status : event.target.dataset.value
                })
        }
        if(event.target.dataset.value == 'accepted'){
            setSelectValue('대여중');
            handleToggle();
            mutate({
                status : event.target.dataset.value
                })
        }
        if(event.target.dataset.value == 'returned'){
            setSelectValue('반납완료');
            handleToggle();
            mutate({
                status : event.target.dataset.value
                })
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

export default React.memo(DropDown);