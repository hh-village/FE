import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React from 'react'
import styled, { keyframes } from 'styled-components';
import { Div } from '../global/globalStyle';

function DealList() {

  const { data } = useQuery({
    queryKey: ["GET_RESERVATIONS"],
    queryFn: async () => {
      const res = await axios.get("http://3.37.127.30/products/reservations")
      return res.data.data;
    }
  })

  return (
    <Div width="100%" height="1rem" position="relative" overflow="hidden">
      <Slide>
        {data?.map((item) => <span key={nanoid()}>{item.customerNickname}님이 {item.ownerNickname}님의 물건을 대여하였습니다!</span>)}
      </Slide>
    </Div>
  )
}

export default DealList

const marquee = keyframes`
    0% {
      -webkit-tarnsform: translate3d(1%, 0, 0);
      transform: translate3d(1%, 0, 0);
    }
    100% {
      -webkit-tarnsform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  `

const Slide = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${marquee} 30s linear infinite;
  position: absolute;
  overflow: hidden;
  gap: 1rem;
`