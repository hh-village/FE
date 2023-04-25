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

    console.log("data", data);

    useEffect(()=>{
        if(inView) fetchNextPage()
    }, [inView])

    return (
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
                            <Div width="100%" height="304px">
                                {item?.hot
                                    ? <Hot>인기대여</Hot>
                                    : null
                                }
                                <CardImg src={item?.image} alt="" style={{width:"100%", height:"100%", objectFit: "cover"}}/>
                            </Div>
                            <Div width="100%">
                                <Div fDirection="row" width="100%" jc="space-between" margin="0.5rem 0 0 0">
                                    <span style={{marginTop:"auto", marginBottom:"auto", fontWeight:"700"}}>{item?.title}</span>
                                    {token == null||undefined
                                        ? null
                                        : <img 
                                            src={item?.checkZzim ? "/images/fHeart.png" : "/images/eHeart.png"}
                                            alt="zzimStatus"
                                            style={{width:"28px", height: "28px"}}
                                        />
                                    }
                                </Div>
                                <Div margin="0 0 0.5rem 0">
                                    <span>위치 {item?.location}</span>
                                    <span>1일 기준 {item?.price}원</span>
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
  border-radius: 5px;
  overflow: hidden;
  gap: 10px;
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
  width: 210px;
  height: 210px;
`