import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie } from '../../shared/Cookies'
import { Div, GridDiv } from '../global/globalStyle'

function SearchCards({data, isFetchingNextPage, fetchNextPage}) {
    const navi = useNavigate();
    const {ref, inView} = useInView();
    const [token, setToken] = useState("");

    useEffect(()=>{
        setToken(getCookie("token"));
    },[])

    useEffect(()=>{
        if(inView) fetchNextPage()
    }, [inView])

    return (
        // (data[0]?.productList.length) === 0 ? 
        // <Div width="100%" marginTop="4rem" gap="2rem">
        //     <h2>내 근처에서 대여할 물품을 찾아보세요!</h2>
        //     <Div width="100%" height="20vh" jc="center" alignItem="center" marginTop="4rem">
        //         <NothingSpan>조건과 일치하는 상품이 없습니다</NothingSpan>    
        //     </Div>
        // </Div> :
        <Div marginTop="4rem" gap="2rem">
            <h2>내 근처에서 대여할 물품을 찾아보세요!</h2>

            <GridDiv width="100%" gridTC="repeat(4, 1fr)">
                {data?.map((item) => 
                    (item?.productList.map((item, index) => 
                        <Cards
                        key={index}
                        fDirection="row"
                        width="100%"
                        height="100%"
                        onClick={()=>{navi(`/detail/${item?.id}`)}}
                        >
                            <Div width="100%" height="304px" bgColor="#e6e6e6">
                                {item?.hot
                                    ? <Hot>인기대여</Hot>
                                    : null
                                }
                                <CardImg src={item?.image} alt="" loading='lazy'/>
                            </Div>
                            <Div width="100%" padding="1rem" gap="1rem" style={{boxSizing: "border-box"}}>
                                <Div fDirection="row" width="100%" jc="space-between" style={{textOverflow:"ellipsis"}}>
                                    <TitleSpan>{item?.title}</TitleSpan>
                                    {token == null||undefined
                                        ? null
                                        : <img 
                                            src={item?.checkZzim ? "/images/fHeart.png" : "/images/eHeart.png"}
                                            alt="zzimStatus"
                                            loading='lazy'
                                            style={{width:"28px", height: "28px"}}
                                        />
                                    }
                                </Div>
                                <Div width="100%" gap="0.5rem" style={{color:"#191919"}}>
                                    <LocationSpan>위치 {item?.location}</LocationSpan>
                                    <PriceSpan>1일 기준 {(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</PriceSpan>
                                </Div>
                            </Div>
                        </Cards>
                    ))
                )}
                {isFetchingNextPage ? '로딩중...' : <div ref={ref}></div>}
            </GridDiv>
        </Div>
    )
}

export default SearchCards;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({height}) => height};
  border: 1px solid #e6e6e6;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`

const Hot = styled.div`
  position: absolute;
  margin: 10px 0 0 10px;
  font-size: 16px;
  padding: 5px 8px 5px 8px;
  border-radius: 5px;
  color: white;
  background-color: blue;
`

const CardImg = styled.img`
  width: 282px;
  height: 304px;
  object-fit: contain;
`

const TitleSpan = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  font-weight: 700;
  font-size: 18px;
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
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const NothingSpan = styled.span`
    width: 100%;

`