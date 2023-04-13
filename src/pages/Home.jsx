import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie } from '../shared/Cookies'
import { FlexDiv, MaxWidthDiv, GridDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Home() {
  const navi = useNavigate();

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv fDirection="column">
        <Div 
          marginTop="8rem"
          onClick={()=>{navi("/search")}}>검색페이지</Div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Home

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({height}) => height};
  border-radius: 5px;
  overflow: hidden;
  gap: 10px;
  box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`