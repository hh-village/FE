import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { Div, MaxWidthDiv } from './globalStyle'

function Footer({topRem, botRem}) {
  const navi = useNavigate();

  return (
    <Div width="100%" margin={`${topRem}rem 0 ${botRem}rem 0`} style={{borderTop:"1px solid #e6e6e6"}}>
        <MaxWidthDiv marginTop="2rem" gap="2rem">
          <Div fDirection="row" gap="2rem">
            <FooterItems cursor="pointer" borderRight="1px solid #e6e6e6" onClick={()=>{navi("/service")}}>서비스소개</FooterItems>
            <FooterItems cursor="pointer" onClick={()=>{navi("/team")}}>팀원소개</FooterItems>
          </Div>
          <Div gap="0.5rem">
            <FooterSpan>고객센터</FooterSpan>
            <FooterSpan fontSize="20px" fontWeight="700">2023-0428</FooterSpan>
          </Div>
          <Div gap="0.5rem">
            <FooterSpan>운영시간 9시-21시(일요일 제외 휴무 없음, 점심시간 자율, 1시간 반)</FooterSpan>
          </Div>
        </MaxWidthDiv>
    </Div>
  )
}

export default Footer

const FooterItems = styled.div`
  padding-right: 2rem;
  border-right: ${({borderRight}) => borderRight};
  color: #767676;
  font-weight: 700;
  cursor: ${({cursor}) => cursor};
`

const FooterSpan = styled.span`
  color: #767676;
  font-size: ${({fontSize}) => fontSize};
  font-weight: ${({fontWeight}) => fontWeight};
`