import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import DealList from '../components/home/DealList'
import VerticalCard from '../components/home/VerticalCard'
import HorizonCard from '../components/home/HorizonCard'
import HomeImgSlide from '../components/home/HomeImgSlide'
import EventBanner from '../components/home/EventBanner'
import Footer from '../components/global/Footer'
import { getCookie } from '../shared/Cookies'

function Home() {
  const [searchData, setSearchData] = useState({
    productName: "",
    location: ""
  });
  
  const { data } = useQuery({
    queryKey: ["GET_MAINPAGE"],
    queryFn: async () => {
      const token = getCookie("token");
      if(!token){
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`)
        return res.data.data;
      } else {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return res.data.data;
      }
      
    }
  })

  return (
    <FlexDiv boxShadow="none">

      {/* components/global */}
      <HeaderNav />
      <MaxWidthDiv>
        <Div marginTop="8rem" width="100%">

          {/* components/global */}
          <SearchInput 
            searchData={searchData}
            setSearchData={setSearchData}
          />

          {/* components/home */}
          {/* <DealList data={data}/> */}
        </Div>
      </MaxWidthDiv>
        {/* components/home */}
        <HomeImgSlide />
      <MaxWidthDiv>
        {/* components/home */}
        <VerticalCard data={data}/>

        {/* components/home */}
        <EventBanner />

        {/* components/home */}
        <HorizonCard data={data}/>
      </MaxWidthDiv>

      {/* components/global */}
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}

export default Home