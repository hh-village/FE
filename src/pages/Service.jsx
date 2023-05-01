import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/global/Footer'
import { FlexDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import Loading from '../components/global/Loading'
const Foot = lazy(()=>import('../components/global/Footer'))

function Service() {
  const [isUpdate, setIsUpdate] = useState(false);
  const LoadRef = useRef();

  useEffect(()=>{
   setIsUpdate(true)
   return () => {
    setIsUpdate(false)
   }
  },[LoadRef.current])

  console.log(isUpdate)
  return (
    <FlexDiv>
      <HeaderNav />
      {isUpdate ? (
        <>
        <Suspense fallback ={<Loading/>}>
          <ServiceImg 
            ref={LoadRef}
            src="/images/service.webp" alt="" />
            <Foot topRem={0} botRem={2}/>
          </Suspense>
        </>
      ):(
        <Loading/>
      )}
    </FlexDiv>
  )
}

export default Service

const ServiceImg = styled.img`
  width: 100%
`