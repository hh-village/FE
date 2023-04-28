import React from 'react'
import styled from 'styled-components'
import Footer from '../components/global/Footer'
import { FlexDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'

function Service() {
  return (
    <FlexDiv>
      <HeaderNav />
      <ServiceImg src="/images/service.webp" alt="" />
      <Footer topRem={0} botRem={2}/>
    </FlexDiv>
  )
}

export default Service

const ServiceImg = styled.img`
  width: 100%
`