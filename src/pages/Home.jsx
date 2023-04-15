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

  const { data, refetch } = useQuery({
    queryKey: ["GET_MAINPAGE"],
    queryFn: async () => {
      // const token = getCookie("token");
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`)
      console.log("res", res);
      return res.data.data;
    }
  })

  useEffect(()=>{
    refetch()
  },[searchData]);

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
        <button 
          onClick={()=>{navi("/search")}}>검색페이지 이동버튼! 누르세요!
        </button>

        {/* 대여 물품 8개 영역*/}
        <h2>새로 등록된 대여 물품을 확인해보세요!</h2>
        <GridDiv gridTC="repeat(4, 1fr)">
          {data?.productList?.map((item) => 
            <Div fDirection="row" onClick={()=>{navi(`/detail/${item?.id}`)}}>
              <CardImg src={item?.image} alt="" />
              <span>{item?.title}</span>
              <span>{item?.price}</span>
              <span>{item?.location}</span>
            </Div>
          )}
        </GridDiv>
        <hr />

        {/* 이벤트 및 쿠폰 이미지 3개 영역*/}
        <h2>빌리지에서 드리는 더 큰 혜택</h2>
        <Div width="100%" jc="space-between" gap="2rem">
          <Div>
            <img src="" alt="왼쪽 사각 큰 이미지" />
          </Div>
          <Div>
            <Div>
              <img src="" alt="오른쪽 위 이미지" />
            </Div>
            <Div>
              <img src="" alt="오른쪽 아래 이미지" />
            </Div>
          </Div>
        </Div>
        <hr />
        {/* 추천 물품 6개 영역*/}
        <h2>오늘의 추천 상품을 확인해보세요</h2>
        <GridDiv gridTC="repeat(2, 1fr)">
          {data?.randomProduct?.map((item) => 
            <Div gap="1rem" height="100%" border="1px solid #e6e6e6">
              <CardImg src={item?.image} alt="" />
              <Div fDirection="row" jc="space-between" width="100%" height="100%">
                <Div fDirection="row">
                  <span>{item?.title}</span>
                  <span>{item?.location}</span>
                </Div>
                <Div width="100%" jc="space-between">
                  <span>{item?.price}</span>
                  {!item?.checkZzim
                    ? <img src="/images/eHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                    : <img src="/images/fHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                  }
                </Div>
              </Div>
            </Div>
          )}
        </GridDiv>
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

const CardImg = styled.img`
  width: 100px;
  height: 100px;
`