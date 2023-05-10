import React from 'react';
import styled from 'styled-components';
import { FlexDiv } from './globalStyle';
import HeaderNav from './HeaderNav';

export default () => {
  return (
    <FlexDiv>
        <HeaderNav/>
        <Background>
            <LoadingText>잠시만 기다려주세요</LoadingText>
            <img src= '/images/Ellipsis.gif' alt="로딩중" width="25%" />
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
    z-index: 90;
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