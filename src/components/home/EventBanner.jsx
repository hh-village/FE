import React from 'react'
import { Div } from '../global/globalStyle'

function EventBanner() {
  return (
    <Div>
        <span>빌리지에서 드리는 더 큰 혜택</span>
        <Div fDirection="row" width="100%" jc="space-between" gap="2rem">
            <Div>
                <img src="" alt="왼쪽 사각 큰 이미지" />
            </Div>
            <Div>
                <Div>
                    <img src="" alt="오른쪽 위 이미지" />
                </Div>
                <Div>
                    <img src="" alt="오른쪽 아래 이미지" />
                </Div>
            </Div>
        </Div>
    </Div>
  )
}

export default EventBanner