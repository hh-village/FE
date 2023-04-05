import React, { useState } from 'react'
import { MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import ConsumerRegister from '../components/detail/ConsumerRegister'

function Detail() {
  return (
    <>
      <HeaderNav/>
      <MaxWidthDiv>
        <ConsumerRegister/>
      </MaxWidthDiv>
    </>
  
  )
}

export default Detail