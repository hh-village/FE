import React from 'react'
import styled from 'styled-components'
import { Div } from '../global/globalStyle'

function EventBanner() {
  return (
    <Div width="100%" marginTop="5rem">
        <Span>빌리지에서 드리는 더 큰 혜택</Span>
        <Div fDirection="row" width="100%" height="500px" jc="space-between" gap="1.5rem">
            <Div width="100%" height="100%">
                <Img src="/images/lb.png" alt="왼쪽 사각 큰 이미지" />
            </Div>
            <Div width="100%" height="100%" jc="space-between" gap="1.5rem">
                <img src="/images/rt.png" alt="오른쪽 위 이미지" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                <img src="/images/rb.png" alt="오른쪽 아래 이미지" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
            </Div>
        </Div>
    </Div>
  )
}

export default EventBanner

const Img = styled.img`
    width: 100%;
    height: 100%;
`
const Span = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
`