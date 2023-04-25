import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import SearchCards from '../components/search/SearchCards'
import Footer from '../components/global/Footer'
import { useSelector } from 'react-redux'

function Search() {
  const getStoreData = useSelector((state) => state.Search)
  const [searchData, setSearchData] = useState({
    productName: "",
    location: ""
  });

  const getSearchData = async(lastPostId, size) => {
    console.log(lastPostId);
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}&lastId=${lastPostId}&size=${size}`)
    const productList = res?.data.data.productList
    const nextLastPostId = productList[productList.length - 1]?.id
    const isLast = productList.length < size
    return {productList, nextLastPostId, isLast}
  }


  const {data, fetchNextPage, isFetchingNextPage, refetch} = useInfiniteQuery(
    ['searchData'],
    ({pageParam = 999999}) => getSearchData(pageParam, 8),
    {
      getNextPageParam: (lastPage) => 
        !lastPage.isLast ? lastPage.nextLastPostId : undefined
    }
  )

  // const { data, refetch } = useQuery({
  //   queryKey: ["GET_PRODUCTS"],
  //   queryFn: async () => {
  //     const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}`)
  //     return res.data.data;
  //   }
  // })

  useEffect(()=>{
    setSearchData(getStoreData);
  },[])

  useEffect(()=>{
    refetch()
  },[searchData]);

  return (
    <FlexDiv boxShadow="none">

      {/* components/global */}
      <HeaderNav />
      <MaxWidthDiv>
        
        {/* components/global */}
        <SearchInput
          searchData={searchData}
          setSearchData={setSearchData}
          rem={8}
        />

        {/* components/search */}
        <SearchCards
          data={data?.pages}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </MaxWidthDiv>

      {/* components/global */}
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}

export default Search