import React from 'react'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'

function Home() {
  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv height="100vh">
        <SearchInput />
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Home