import React, { lazy, Suspense, useState } from 'react'
import useGetMainPageData from '../hooks/useGetMainPageData'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import DealList from '../components/home/DealList'
import HomeImgSlide from '../components/home/HomeImgSlide'
import Footer from '../components/global/Footer'
import Loading from '../components/global/Loading'
import FloatingMenu from '../components/home/FloatingMenu'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
const VerticalCard = lazy(()=>import('../components/home/VerticalCard')) 
const HorizonCard = lazy(() => import('../components/home/HorizonCard'))
const EventBanner = lazy(()=>import('../components/home/EventBanner'))

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
    <>
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
        <MaxWidthDiv >
          {/* components/home */}
          <DealList data={data}/>

          {/* components/home */}
          <Suspense>
            <VerticalCard data={data}/>
          </Suspense>
          <Suspense>
            {/* components/home */}
            <EventBanner />
          </Suspense>
          <Suspense>
            {/* components/home */}
            <HorizonCard data={data}/>
          </Suspense>
            
          
          
        </MaxWidthDiv>
        <FloatingMenu data={data}/>

        {/* components/global */}
        <Footer topRem={6} botRem={2}/>
      </FlexDiv>
    </>
  )
}

export default Home