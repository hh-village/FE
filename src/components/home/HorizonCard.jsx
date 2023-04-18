import { nanoid } from 'nanoid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { Div, GridDiv } from '../global/globalStyle'

function HorizonCard({data}) {
    const navi = useNavigate();
  return (
    <Div>
        <span>오늘의 추천 상품을 확인해보세요</span>
        <GridDiv gridTC="repeat(2, 1fr)">
            {data?.randomProduct?.map((item) => 
                <Div
                    key={nanoid()}
                    gap="1rem"
                    height="100%"
                    border="1px solid #e6e6e6"
                    fDirection="row"
                    onClick={()=>{navi(`/detail/${item?.id}`)}}
                >
                    <Div>
                        <CardImg src={item?.image} alt="" />
                    </Div>
                    <Div jc="space-between" width="100%" height="100%">
                        <Div gap="1rem">
                            <span>{item?.title}</span>
                            <span>위치 {item?.location}</span>
                        </Div>
                        <Div fDirection="row" width="100%" jc="space-between">
                            <span>1일 기준 {item?.price}원 </span>
                            {!item?.checkZzim
                            ? <img src="/images/eHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                            : <img src="/images/fHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                            }
                        </Div>
                    </Div>
                </Div>
            )}
        </GridDiv>
    </Div>
  )
}

export default HorizonCard

const CardImg = styled.img`
  width: 210px;
  height: 210px;
`