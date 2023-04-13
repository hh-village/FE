import { nanoid } from 'nanoid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Div } from '../global/globalStyle'

function MyProducts({data}) {
  const navi = useNavigate();

  return (
    <Div fDirection="row" gap="1rem" width="100%">
      {data?.data.map((item) => 
      <Div
        key={nanoid()}
        width="100%"
        gap="1rem"
        border="1px solid black"
        onClick={()=>{navi(`/detail/${item?.id}`)}}
      >
        <Img src={item?.imageUrl} alt="" />
        <Div fDirection="row" jc="center">
          <h3>{item?.title}</h3>
          <span>작성일 : {item?.createdAt}</span>
        </Div>
      </Div>
      )}
    </Div>
  )
}

export default MyProducts

const Img = styled.img`
  width: 100px;
  height: 100px;
`