import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'
import Footer from '../components/global/Footer'
import { FlexDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import Loading from '../components/global/Loading'
const Foot = lazy(()=>import('../components/global/Footer'))

function team() {

  return (
    <FlexDiv>
      <HeaderNav />
      <ServiceImg src="/images/team.png" alt="" />
      <Suspense fallback={<Loading/>}>
         <Foot topRem={0} botRem={2}/>
      </Suspense>
    </FlexDiv>
  )
}

export default team

const ServiceImg = styled.img`
  margin-top: 4rem;
  width: 100%
`