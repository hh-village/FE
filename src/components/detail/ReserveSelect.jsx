import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { getCookie } from '../../shared/Cookies';

function ReserveSelect() {
    const [selectedOption, setSelectedOption] = useState('');
    const accesToken = getCookie('token')
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const { mutate } = useMutation({
      mutationKey:['statusChanged'],
      mutationFn: async(status) => {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/products/reservation/1/status`,status,{
          headers : {
            Authorization : `Bearer ${accesToken}`
          }
        })
      }
    })

    const onClickValue = (event)=> {
      mutate({
        status : event.target.dataset.value
      })
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

  
  return (
    <div>
      <div onClick={toggleDropdown}>
        클릭하세요
      </div>
      {isOpen && (
        <ul>
          <div
            data-value={'waiting'}
            onClick={onClickValue}>항목 1</div>
          <div 
            data-value={'accepted'}
            onClick={onClickValue}>항목 2</div>
          <div 
            data-value={'rejected'}
            onClick={onClickValue}>항목 3</div>
        </ul>
      )}
    </div>
    // <select value={selectedOption} onChange={handleSelectChange}>
    //     <option 
    //     onTouchStart={onClickValue}
    //     value="waiting">대기</option>
    //     <option
    //     onTouchStart={onClickValue} 
    //     value="accepted">예약확정</option>
    //     <option 
    //     onTouchStart={onClickValue} 
    //     value="rejected">거절</option>
    // </select>
  )
}

export default ReserveSelect