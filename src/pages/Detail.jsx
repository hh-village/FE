import React, { useState } from 'react'
import { MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import ConsumerRegister from '../components/detail/ConsumerRegister'
import RegisterReserve from '../components/detail/RegisterReserve'

function Detail() {
  return (
    <>
      <HeaderNav/>
      <MaxWidthDiv>
        <ConsumerRegister/>
        <RegisterReserve/>
      </MaxWidthDiv>
    </>
  
  )
}

export default Detail