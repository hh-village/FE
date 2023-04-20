import { nanoid } from 'nanoid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Div } from '../global/globalStyle'

function MyProducts({data}) {
  const navi = useNavigate();

  return (
    <Div fDirection="row" gap="1rem" width="100%">
      {data?.myList.map((item) => 
      <CardDiv
        key={nanoid()}
        onClick={()=>{navi(`/detail/${item?.id}`)}}
      >
        <Img src={item?.image} alt="" />
        <Div jc="center" bgColor="#e6e6e6" gap="1rem">
          <h3>{item?.title}</h3>
          <span>작성일 : {item?.createdAt}</span>
        </Div>
      </CardDiv>
      )}
    </Div>
  )
}

export default MyProducts

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
  /* border-bottom: 1px solid red; */
  box-sizing: border-box;
  &:hover {
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`