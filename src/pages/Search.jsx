import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getCookie } from '../shared/Cookies'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import { useNavigate } from 'react-router-dom'
import SearchCards from '../components/search/SearchCards'


function Search() {
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

  console.log("sh", data)

  useEffect(()=>{
    refetch()
  },[searchData]);

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <SearchInput
          searchData={searchData}
          setSearchData={setSearchData}
          rem={8}
        />
        <SearchCards data={data}/>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Search