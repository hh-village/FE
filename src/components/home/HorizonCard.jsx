import { nanoid } from 'nanoid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { Div, GridDiv } from '../global/globalStyle'

function HorizonCard({data}) {
    const navi = useNavigate();
  return (
    <Div width="100%" marginTop="5rem">
        <Span>오늘의 추천 상품을 확인해보세요</Span>
        <GridDiv gridTC="repeat(2, 1fr)">
            {data?.randomProduct?.map((item) => 
                <Cards
                    key={nanoid()}
                    onClick={()=>{navi(`/detail/${item?.id}`)}}
                >
                    <Div width="210px" height="210px">
                        <CardImg src={item?.image} alt="" />
                    </Div>
                    <Div jc="space-between" width="100%" height="100%" padding="1rem 1rem 1rem 0" style={{boxSizing: "border-box"}}>
                        <Div gap="1rem">
                            <span style={{fontWeight:"700"}}>{item?.title}</span>
                            <span>{item?.location}</span>
                        </Div>
                        <Div fDirection="row" width="100%" jc="space-between">
                            <span style={{margin:"auto 0 auto 0"}}>1일 기준 {item?.price}원</span>
                            {!item?.checkZzim
                            ? <img src="/images/eHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                            : <img src="/images/fHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                            }
                        </Div>
                    </Div>
                </Cards>
            )}
        </GridDiv>
    </Div>
  )
}

export default HorizonCard

const Span = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
`
const Cards = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #e6e6e6;
    height: 100%;
    gap: 1rem;
    &:hover {
        cursor: pointer;
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`

const CardImg = styled.img`
  width: 210px;
  height: 210px;
`