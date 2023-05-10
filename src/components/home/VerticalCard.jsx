import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie } from '../../shared/Cookies'
import { Div, GridDiv } from '../global/globalStyle'

function VerticalCard({data}) {
    const navi = useNavigate();
    const [token, setToken] = useState("");
    const [zzim, setZzim] = useState();
    const queryClient = useQueryClient();

    useEffect(()=>{
        setToken(getCookie("token"));
    },[])

    const { mutate } = useMutation({
        mutationFn: async (payload) => {
          return await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/${payload}/zzim`, payload, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        },
        onSuccess : (response) => {
          setZzim(response.data.data)
          queryClient.invalidateQueries(['GET_DETAIL'])
        }
    });

    return (
        <Div marginTop="6rem">
            <NewRegistTitle>오늘의 추천 상품을 확인해보세요</NewRegistTitle>
            <GridDiv width="100%" gridTC="repeat(4, 1fr)">
                {data?.randomProduct?.map((item) => 
                    <Cards
                    key={nanoid()}
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
                          <img src={item?.image} width="282px" height="304px" alt="" style={{objectFit: "contain"}}/>
                        </Div>
                        <Div width="100%" padding="1rem" gap="1rem" style={{boxSizing: "border-box"}}>
                            <Div fDirection="row" width="100%" jc="space-between">
                                <CardTitle>{item?.title}</CardTitle>
                                <img
                                    src={item?.checkZzim ? "/images/fHeart.png" : "/images/eHeart.png"}
                                    alt="zzimStatus"
                                    style={{width:"1.5rem", height: "1.5rem"}}
                                    onClick={()=>{mutate("")}}
                                />
                            </Div>
                            <Div width="100%" gap="0.5rem">
                                <LocationSpan>{item?.location}</LocationSpan>
                                <PriceSpan>1일 기준 {(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</PriceSpan>
                            </Div>
                        </Div>
                    </Cards>
                )}
            </GridDiv>
        </Div>
    )
}

export default VerticalCard

const NewRegistTitle = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
`

const CardTitle = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  font-size: 18px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const LocationSpan = styled.span`
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
  background-color: #644AFF;
`