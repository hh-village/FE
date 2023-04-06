import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import useDropdown from '../../hooks/useDropdown';
import { getCookie } from '../../shared/Cookies';

function ReserveSelect(props) {
    const accesToken = getCookie('token')
   
    const { mutate } = useMutation({
      mutationKey:['statusChanged'],
      mutationFn: async(status) => {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/products/reservation/${props.id}/status`,status,{
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

  const {isOpen, handleToggle } = useDropdown();

  return (
    <div>
      <div onClick={handleToggle}>
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
  )
}

export default ReserveSelect