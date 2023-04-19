import React from 'react'
import { Div, MaxWidthDiv } from './globalStyle'

function Footer() {
  return (
    <Div width="100%" margin="6rem 0 2rem 0" style={{borderTop:"1px solid #e6e6e6"}}>
        <MaxWidthDiv marginTop="2rem" gap="2rem">
          <Div fDirection="row" gap="2rem">
            <div style={{paddingRight:"2rem", borderRight:"1px solid #767676", fontWeight:"700"}}>서비스소개</div>
            <div style={{paddingRight:"2rem", borderRight:"1px solid #767676", fontWeight:"700"}}>팀원소개</div>
            <div style={{paddingRight:"2rem", borderRight:"1px solid #767676", fontWeight:"700"}}>이용약관</div>
            <div style={{paddingRight:"2rem", borderRight:"1px solid #767676", fontWeight:"700"}}>운영정책</div>
          </Div>
          <Div gap="1rem">
            <span>고객센터</span>
            <h2>2023-0422</h2>
          </Div>
          <Div gap="1rem">
            <span style={{color:"#767676"}}>운영시간 9시-21시(일요일 제외 휴무 없음, 점심시간 자율, 1시간 반)</span>
            <Div fDirection="row" gap="2rem">
              <span style={{color:"#767676"}}>공지사항</span>
              <span style={{color:"#767676"}}>1:1 문의하기</span>
              <span style={{color:"#767676"}}>자주 묻는 질문</span>
            </Div>
          </Div>
        </MaxWidthDiv>
    </Div>
  )
}

export default Footer