import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie } from '../shared/Cookies'
import { FlexDiv, MaxWidthDiv, GridDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import VerticalCard from '../components/global/VerticalCard'

function Search() {
  const navi = useNavigate();
  const [token, setToken] = useState("");
  const [searchData, setSearchData] = useState({
    productName: "",
    location: ""
  });

  const { data, refetch } = useQuery({
    queryKey: ["GET_PRODUCTS"],
    queryFn: async () => {
      // const token = getCookie("token");
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}`)
      return res.data.data;
    }
  })

  console.log("sh", data);

  useEffect(()=>{
    refetch()
  },[searchData]);

  useEffect(()=>{
    setToken(getCookie("token"));
  },[])

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
        <VerticalCard data={data}/>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Search