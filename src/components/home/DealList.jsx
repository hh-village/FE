import { nanoid } from 'nanoid';
import React from 'react'
import styled, { keyframes } from 'styled-components';
import { Div } from '../global/globalStyle';

function DealList({data}) {

  return (
    <Div marginTop="2rem" fDirection="row" width="100%" gap="1rem">
      <Div width="100%" height="2rem" position="relative" overflow="hidden" borderBottom="1px solid #e6e6e6">
        <Slide>
          {data?.dealList?.map((item) => 
            <Span key={nanoid()}>
              <strong>{item?.customerNickname}</strong>님이 <strong>{item?.ownerNickname}</strong>님의 물건을 대여하였습니다!
            </Span>
          )}
          {data?.dealList?.map((item) => 
            <Span key={nanoid()}>
              <strong>{item?.customerNickname}</strong>님이 <strong>{item?.ownerNickname}</strong>님의 물건을 대여하였습니다!
            </Span>
          )}
        </Slide>
      </Div>
    </Div>
  )
}

export default DealList

const marquee = keyframes`
  0% {transform: translate3D(0.29%, 0, 0)}
  100% {transform: translate3D(-50%, 0, 0)}
`

const Slide = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  position: absolute;
  overflow: hidden;
  gap: 1rem;
  animation: ${marquee} 30s linear infinite;
  ${({etc}) => etc};
`

const Span = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  float: left;
  width: 50%;
`

