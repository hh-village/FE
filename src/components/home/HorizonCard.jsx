import { nanoid } from 'nanoid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { Div, GridDiv } from '../global/globalStyle'

function HorizonCard({data}) {
    const navi = useNavigate();
  return (
    <Div width="100%" marginTop="5rem">
        <Span>새로 등록된 대여 물품을 확인해보세요!</Span>
        <GridDiv gridTC="repeat(2, 1fr)">
            {data?.latestProduct?.map((item) => 
                <Cards
                    key={nanoid()}
                    onClick={()=>{navi(`/detail/${item?.id}`)}}
                >
                    <Div bgColor="#e6e6e6">
                        <CardImg src={item?.image} alt="" loading='lazy'/>
                    </Div>
                    <Div jc="space-between" width="100%" height="100%" padding="1rem 1rem 1rem 0" style={{boxSizing: "border-box"}}>
                        <Div gap="1rem">
                            <PriceSpan style={{margin:"auto 0 auto 0"}}>{(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</PriceSpan>
                            <TitleSpan>{item?.title}</TitleSpan>
                            <LocationSpan>{item?.location}</LocationSpan>
                        </Div>
                        <Div fDirection="row" width="100%" jc="end">
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
    height: 210px;
    gap: 1rem;
    &:hover {
        cursor: pointer;
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`

const CardImg = styled.img`
  width: 210px;
  height: 210px;
  object-fit: contain;
`

const TitleSpan = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const LocationSpan = styled.span`
  font-size: 14px;
  width: 100%;
  color: #999999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const PriceSpan = styled.span`
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`