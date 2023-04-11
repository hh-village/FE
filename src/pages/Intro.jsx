import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { nanoid } from 'nanoid'
import React, { useEffect } from 'react'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Div, FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'

function Intro() {
  const [doneReserve, setDoneReserve] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["GET_RESERVATIONS"],
    queryFn: async () => {
      const res = await axios.get("http://3.39.187.56/products/reservations")
      return res.data.data;
    }
  })

  console.log(data);
  
  useEffect(()=>{
    refetch()
  },[doneReserve]);

  const test = [
    "01님이 10님의 물건을 대여하였습니다",
    "02님이 20님의 물건을 대여하였습니다",
    "03님이 30님의 물건을 대여하였습니다",
    "04님이 40님의 물건을 대여하였습니다",
    "05님이 50님의 물건을 대여하였습니다",
    "06님이 60님의 물건을 대여하였습니다",
    "07님이 70님의 물건을 대여하였습니다",
    "08님이 80님의 물건을 대여하였습니다",
  ]
  
  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv fDirection="column" height="100vh">
        <div style={{marginTop: "8rem"}}>
          <span>
            주변의 모든 것을 빌려보세요!
            빌리지
          </span>
          <span>
            전체 상품 조회하기
          </span>
        </div>
        <div>
          <input type="text" />
          <button>둘러보기</button>
        </div>
        {/* <Div position="relative" width="100%" height="50vh" overflow="hidden">
          <Slide etc={styleOption}>
            <div>
              {data?.map((item) => <span key={nanoid()}>{item.customerNickname}님이 {item.ownerNickname}님의 물건을 대여하였습니다!</span>)}
            </div>
          </Slide>
        </Div> */}
        <Div width="100%" height="1rem" position="relative" overflow="hidden">
          <Slide>
            {data?.map((item) => <span key={nanoid()}>{item.customerNickname}님이 {item.ownerNickname}님의 물건을 대여하였습니다!</span>)}
          </Slide>
        </Div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Intro

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