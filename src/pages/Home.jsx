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
import SlideBtn from '../components/detail/SlideBtn'

function Home() {
  const navi = useNavigate();
  const [count, setCount] = useState(1);
  const [searchData, setSearchData] = useState({
    productName: "",
    location: ""
  });

  const styleOption = `
    margin: auto;
    display: flex;
    width: fit-content; 
    flex-wrap: nowrap;
    transition: all 0.5s;
    flex: none;
    transform: translateX(-${(count-1)*(false? 585: 600)}px);
  `;

  const test = [
    "/images/DSC02693.jpg",
    "/images/DSC01665.jpg",
    "/images/DSC01302.jpg",
    "/images/DSC02517.jpg",
    "/images/DSC01716.jpg"
  ]

  return (
    <FlexDiv boxShadow="none" fDirection="row">
      <HeaderNav />
      <MaxWidthDiv fDirection="column">
        <SearchInput 
          searchData={searchData}
          setSearchData={setSearchData}
          rem={8}
        />
        <Div bgColor="black" width="100%" marginTop="2rem">
          <Div position="relative" margin="auto" width="600px" overflow="hidden">
            <SlideBtn count={count} setFunc={setCount} total={test.length}/>
            <Slide etc={styleOption}>
              {test.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
            </Slide>
          </Div>
        </Div>
        <Div 
          marginTop="2rem"
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

const Slide = styled.div`
  ${({etc}) => etc};
`

const Img = styled.img`
  width: 100%;
  object-fit: fill;
`