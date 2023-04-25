import React from 'react';
import styled from 'styled-components';
import { FlexDiv } from './globalStyle';
import HeaderNav from './HeaderNav';

export default () => {
  return (
    <FlexDiv>
        <HeaderNav/>
        <Background>
            <LoadingText>작업을 완료하는 중입니다!</LoadingText>
            <img src= '/images/Ellipsis-3.6s-800px.gif' alt="로딩중" width="25%" />
        </Background>
    </FlexDiv>
    
  );
};

const Background = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.div`
    position: absolute;
    top: 43%;
    font: 1.7rem 'Pretendard';
    text-align: bottom;
`;