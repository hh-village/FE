import React from 'react'
import styled from 'styled-components'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import PagingTap from '../components/mypage/PagingTap'

function MyPage() {
  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv height="100vh" fDirection="row">
        <div style={{paddingTop:"7rem"}}>
          <h1>마이페이지</h1>
        </div>
        <Div marginTop="1rem" jc="space-between" alignItem="center" width="100%" bgColor="#e6e6e6">
          <Div bgColor="none" alignItem="center" gap="1rem" padding="1rem">
            <img src="" alt="userProfileImg" />
            <div>
              <Div bgColor="none" gap="0.5rem">
                <img src="" alt="" />
                <span>NICKNAME</span>
                <button>닉네임 변경</button>
              </Div>
              <span>USERID</span>
            </div>
          </Div>
          <Div bgColor="none" fDirection="row" gap="1rem" padding="1rem">
            <Button>대여물품 등록하기</Button>
            <Button>빌리지 채팅 관리</Button>
            <Button>예약 승인 / 확인 / 취소</Button>
          </Div>
        </Div>
        <PagingTap />
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default MyPage

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    border: none;
    border-radius: 5px;
    width: 20rem;
    height: 2.5rem;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`