import React from 'react'
import styled from 'styled-components';
import { Div } from '../global/globalStyle'

function NullCard() {

    return (
        <Div width="100%" marginTop="4rem" gap="2rem">
            <h2>내 근처에서 대여할 물품을 찾아보세요!</h2>
            <Div width="100%" height="25vh" jc="center" alignItem="center" marginTop="4rem">
                <NullSpan>조건과 일치하는 상품이 없습니다</NullSpan>  
            </Div>
        </Div>
    )
}

export default NullCard;

const NullSpan = styled.span`
    width: 100%;
    text-align: center;
`