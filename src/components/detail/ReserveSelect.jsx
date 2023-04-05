import React, { useState } from 'react'

function ReserveSelect() {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    console.log(selectedOption)
  return (
    <select value={selectedOption} onChange={handleSelectChange}>
        <option value="Waiting">대기</option>
        <option value="Reserve">예약확정</option>
        <option value="ing">대여중</option>
        <option value="Rejected">거절</option>
    </select>
  )
}

export default ReserveSelect