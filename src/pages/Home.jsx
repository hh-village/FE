import React from 'react'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'

function Home() {
  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv fDirection="column" height="100vh">
        <SearchInput />
        <div style={{marginTop:"3rem"}}>
          <h1>내 근처에서 대여할 물품을 찾아보세요!</h1>
        </div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Home