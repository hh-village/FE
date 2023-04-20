import { nanoid } from 'nanoid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { Div } from '../global/globalStyle'

function MyZzims({data}) {
    const navi = useNavigate();

  return (
    <Div gap="1rem" width="100%">
      {data?.myList.map((item) => 
      <CardDiv
        key={nanoid()}
        width="100%"
        gap="1rem"
        border="1px solid black"
        onClick={()=>{navi(`/detail/${item?.id}`)}}
      >
        <Img src={item?.image} alt="" />
        <Div jc="center" bgColor="#e6e6e6" gap="1rem">
          <h3>{item?.productTitle}</h3>
        </Div>
      </CardDiv>
      )}
    </Div>
  )
}

export default MyZzims

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