import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import { nanoid } from 'nanoid'
import styled from 'styled-components'

import DealList from '../components/home/DealList'
import VerticalCard from '../components/global/VerticalCard'
import HorizonCard from '../components/home/HorizonCard'
import HomeImgSlide from '../components/home/HomeImgSlide'

function Home() {
  
  const [searchData, setSearchData] = useState({
    productName: "",
    location: ""
  });

  const { data, refetch } = useQuery({
    queryKey: ["GET_MAINPAGE"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`)
      return res.data.data;
    }
  })

  useEffect(()=>{
    refetch()
  },[searchData]);

  return (
    <FlexDiv boxShadow="none" fDirection="row">

      {/* components/global */}
      <HeaderNav />
      <MaxWidthDiv fDirection="column">
        <Div marginTop="8rem" width="100%">

          {/* components/global */}
          <SearchInput 
            searchData={searchData}
            setSearchData={setSearchData}
          />

          {/* components/home */}
          <DealList data={data}/>
        </Div>

        {/* components/home */}
        <HomeImgSlide />

        <h2>새로 등록된 대여 물품을 확인해보세요!</h2>

        {/* components/global */}
        <VerticalCard data={data}/>

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

        <h2>오늘의 추천 상품을 확인해보세요</h2>

        {/* components/home */}
        <HorizonCard data={data}/>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Home