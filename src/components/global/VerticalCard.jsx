import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie } from '../../shared/Cookies'
import { Div, GridDiv } from './globalStyle'

function VerticalCard({data}) {
    const navi = useNavigate();
    const [token, setToken] = useState("");

    useEffect(()=>{
        setToken(getCookie("token"));
    },[])

    return (
        <Div fDirection="row">
            <span>새로 등록된 대여 물품을 확인해보세요!</span>
            <GridDiv width="100%" gridTC="repeat(4, 1fr)">
                {data?.productList?.map((item) => 
                    <Cards
                    key={nanoid()}
                    fDirection="row"
                    width="100%"
                    height="100%"
                    onClick={()=>{navi(`/detail/${item?.id}`)}}
                    >
                        <Div fDirection="row" width="100%" height="304px">
                            {item?.hot
                            ? <Hot>인기대여</Hot>
                            : null
                            }
                            <CardImg src={item?.image} alt="" style={{width:"100%", height:"100%", objectFit: "contain"}}/>
                        </Div>
                        <Div width="100%" fDirection="row">
                            <Div width="100%" jc="space-between" margin="0.5rem 0 0 0">
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
                            <Div fDirection="row" margin="0 0 0.5rem 0">
                                <span>위치 {item?.location}</span>
                                <span>1일 기준 {item?.price}원</span>
                            </Div>
                        </Div>
                    </Cards>
                )}
            </GridDiv>
        </Div>
    )
}

export default VerticalCard

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({height}) => height};
  border-radius: 5px;
  overflow: hidden;
  gap: 10px;
  border: 1px solid black;
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