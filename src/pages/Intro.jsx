import React from 'react'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'

function Intro() {
  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv>
        <div>
          <span>
            주변의 모든 것을 빌려보세요!
            빌리지
          </span>
          <span>
            전체 상품 조회하기
          </span>
        </div>
        <div>
          <input type="text" />
          <button>둘러보기</button>
        </div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Intro