import React, { useState } from 'react'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import DealList from '../components/home/DealList'
import VerticalCard from '../components/home/VerticalCard'
import HorizonCard from '../components/home/HorizonCard'
import HomeImgSlide from '../components/home/HomeImgSlide'
import EventBanner from '../components/home/EventBanner'
import Footer from '../components/global/Footer'
import useGetMainPageData from '../hooks/useGetMainPageData'
import Loading from '../components/global/Loading'

function Home() {
  const { data, isError, isLoading } = useGetMainPageData();
  const [searchData, setSearchData] = useState({
    productName: "",
    location: ""
  });
  if(isError || isLoading){
    return <Loading/>
  }
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
        </Div>
      </MaxWidthDiv>

        {/* components/home */}
        <HomeImgSlide />
      <MaxWidthDiv>
        
        {/* components/home */}
        <DealList data={data}/>
        
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