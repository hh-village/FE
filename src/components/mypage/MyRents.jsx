import React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { Div } from '../global/globalStyle'

function MyRents({data}) {
  return (
    <Div fDirection="row" gap="1rem" width="100%">
      {data?.myList.map((item) => 
      <CardDiv key={nanoid()}>
        <Div bgColor="#e6e6e6" gap="1rem">
          <Img src={item?.image} alt="" />
          <Div fDirection="row" bgColor="#e6e6e6">
            <h3>{item?.title}</h3>
            <Div bgColor="#e6e6e6" gap="3rem">
              <span>대여일 : {item?.startDate}</span>
              <span>반납일 : {item?.endDate}</span>
            </Div>
          </Div>
        </Div>
        <Div bgColor="#e6e6e6" jc="center" alignItem="center">
        {(()=>{
          switch(item?.status) {
            case "waiting" :
              return <StatusDiv bgColor="#404040">승인대기중</StatusDiv>
            case "accepted" :
              return <StatusDiv bgColor="purple">대여중</StatusDiv>
            case "returned" :
              return <StatusDiv>반납완료</StatusDiv>
            case "rejected" :
              return <StatusDiv>승인거절</StatusDiv>
            default: 
              return null
          }
        })()}
        </Div>
      </CardDiv>
      )}
    </Div>
  )
}

export default MyRents

const Img = styled.img`
  width: 100px;
  height: 100px;
`

const CardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  background-color: #e6e6e6;
  padding: 1rem;
  box-sizing: border-box;
  &:hover {
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`

const StatusDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  color: ${({color}) => color ? color : 'white'};
`