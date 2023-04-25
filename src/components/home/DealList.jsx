import { nanoid } from 'nanoid';
import React, { useLayoutEffect, useState } from 'react'
import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Div } from '../global/globalStyle';

function DealList({data}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  console.log(count);

  // setTimeout(()=>{
  //   setCount(count+100);
  //   if(count === (width/2)){
  //     setCount(0)
  //   }
  // }, 1000)

  const option = `
  transition: all 0.5s ease-in-out;
  animation: 15s linear infinite;
  transform: translateX(-${count}px);
  `
  useLayoutEffect(()=>{
    setWidth(ref?.current?.offsetWidth);
  },[])

  return (
    <Div marginTop="2rem" fDirection="row" width="100%" gap="1rem">
      <span>실시간 체결내역{width}</span>
      <Div width="100%" height="18px" position="relative" overflow="hidden" border="1px solid black">
        <Slide etc={option}>
          {data?.dealList.map((item) => 
            <>
              <Span key={nanoid()} ref={ref}>{item?.customerNickname}님이 {item?.ownerNickname}님의 물건을 대여하였습니다!</Span>
              <Span key={nanoid()}>{item?.customerNickname}님이 {item?.ownerNickname}님의 물건을 대여하였습니다!</Span>
            </>
          )}
        </Slide>
      </Div>
    </Div>
  )
}

export default DealList

// const marquee = keyframes`
//   0% {left: 0}
//   100% {left: -100%}
// `

const Slide = styled.div`
  display: flex;
  flex-direction: row;
  height: 1.5rem;
  white-space: nowrap;
  position: absolute;
  overflow: hidden;
  /* animation: 15s linear infinite; */
  ${({etc}) => etc};
`

const Span = styled.span`
  margin-top: auto;
  margin-bottom: auto;
`

