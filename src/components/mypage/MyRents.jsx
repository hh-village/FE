import React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { Div } from '../global/globalStyle'

function MyRents({data}) {
  return (
    <Div fDirection="row" gap="1rem" width="100%">
      {data?.map((item) => 
      <CardDiv key={nanoid()}>
        <Img src={item?.imageUrl} alt="" />
        <Div fDirection="row" bgColor="#e6e6e6">
          <h3>{item?.title}</h3>
          <Div bgColor="#e6e6e6">
            <span>대여일 : {item?.startDate}</span>
            <span>반납일 : {item?.endDate}</span>
          </Div>
        </Div>
        {(()=>{
          switch(item?.status) {
            case "waiting" :
              return <button>승인대기중</button>
            case "accepted" :
              return <button>대여중</button>
            case "returned" :
              return <button>반납완료</button>
            case "rejected" :
              return <button>승인거절</button>
            default: 
              return null
          }
        })()}
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
  gap: 1rem;
  width: 100%;
  background-color: #e6e6e6;
  padding: 1rem;
  box-sizing: border-box;
  &:hover {
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`