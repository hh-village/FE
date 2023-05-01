import React from 'react'
import styled from 'styled-components'
import Footer from '../components/global/Footer'
import { FlexDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'

function team() {
  return (
    <FlexDiv>
      <HeaderNav />
      <ServiceImg src="/images/team.webp" alt="" />
      <Footer topRem={0} botRem={2}/>
    </FlexDiv>
  )
}

export default team

const ServiceImg = styled.img`
  margin-top: 4rem;
  width: 100%
`