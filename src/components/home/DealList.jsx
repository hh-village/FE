import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { Div } from '../global/globalStyle';

function DealList({data}) {
  const [count, setCount] = useState(0);

  setTimeout(()=>{
    setCount(count+1);
    if(count === (data?.dealList.length)-1){
      setCount(0)
    }
  }, 3000)

  const option = `
  transition: all 0.5s ease-in-out;
  transform: translateY(-${(count)*1}rem);
  `

  return (
    <>
      <span>실시간 체결내역</span>
      <Div width="45%" height="1.5rem" position="relative" overflow="hidden" border="1px solid black">
        <Slide etc={option}>
          {data?.dealList.map((item) => <Span key={nanoid()}>{item?.customerNickname}님이 {item?.ownerNickname}님의 물건을 대여하였습니다!</Span>)}
        </Slide>
      </Div>
    </>
  )
}

export default DealList

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  white-space: nowrap;
  position: absolute;
  ${({etc}) => etc};
`

const Span = styled.span`
  margin-top: auto;
  margin-bottom: auto;
`