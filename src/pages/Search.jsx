import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie } from '../shared/Cookies'
import { FlexDiv, MaxWidthDiv, GridDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Search() {
  const navi = useNavigate();
  
  const [searchData, setSearchData] = useState({
    productName: "",
    location: ""
  });

  const { data } = useQuery({
    queryKey: ["GET_PRODUCTS"],
    queryFn: async () => {
      // const token = getCookie("token");
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}`)
      console.log(res);
      return res.data.data;
    }
  })

  // useEffect(()=>{
  //   refetch()
  // },[searchData]);

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv fDirection="column">
        <SearchInput
          searchData={searchData}
          setSearchData={setSearchData}
          rem={8}
        />
        <div style={{marginTop:"3rem"}}>
          <h2>내 근처에서 대여할 물품을 찾아보세요!</h2>
        </div>
        <GridDiv> {/* 메인 상품 카드 영역 */}
        {data?.map((item) => 
          <Cards
            key={nanoid()}
            height={data.length > 1 ? "100%" : null}
            onClick={()=>{navi(`/detail/${item.id}`)}}
          >
            <img src={item.image} alt="" style={{width:"100%", height:"100%"}}/>
            <div>
              <img src="" alt=""/>
              <span>{item?.title}</span>
            </div>
            <span style={{marginBottom:"10px"}}>{item?.location}</span>
          </Cards>
        )}
        </GridDiv>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Search

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({height}) => height};
  border-radius: 5px;
  overflow: hidden;
  gap: 10px;
  box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`