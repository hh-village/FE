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
            <Span>새로 등록된 대여 물품을 확인해보세요!</Span>
            <GridDiv width="100%" gridTC="repeat(4, 1fr)">
                {data?.productList?.map((item) => 
                    <Cards
                    key={nanoid()}
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
                            <Div fDirection="row" width="100%" jc="space-between">
                                <span style={{marginTop:"auto", marginBottom:"auto", fontWeight:"700"}}>{item?.title}</span>
                                <img
                                    src={item?.checkZzim ? "/images/fHeart.png" : "/images/eHeart.png"}
                                    alt="zzimStatus"
                                    style={{width:"28px", height: "28px"}}
                                    onClick={()=>{mutate("")}}
                                />
                            </Div>
                            <Div marginBottom="0.5rem" gap="0.5rem">
                                <span>{item?.location}</span>
                                <span>가격 {item?.price}원</span>
                            </Div>
                        </Div>
                    </Cards>
                )}
            </GridDiv>
        </Div>
    )
}

export default VerticalCard

const Span = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
`

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
  background-color: #644AFF;
`

const CardImg = styled.img`
  width: 210px;
  height: 210px;
`