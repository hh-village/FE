import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import SearchCards from '../components/search/SearchCards'
import Footer from '../components/global/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../shared/Cookies'
import { sendSearchData } from '../redux/modules/Search'

function Search() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const accessToken = getCookie('token')
  const {productName, location} = useSelector((state) => state.Search)
  const [searchData, setSearchData] = useState({
    productName: productName,
    location: location
  });

  const getSearchData = async(lastPostId, size) => {
    if(!accessToken){
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}&lastId=${lastPostId}&size=${size}`)
      const productList = res?.data.data.productList
      const nextLastPostId = productList[productList.length - 1]?.id
      const isLast = productList.length < size
      return {productList, nextLastPostId, isLast}
    }else{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}&lastId=${lastPostId}&size=${size}`,{
        headers : {
          Authorization : `Bearer ${accessToken}`
        }
      })
      const productList = res?.data.data.productList
      const nextLastPostId = productList[productList.length - 1]?.id
      const isLast = productList.length < size
      return {productList, nextLastPostId, isLast}
    }
  }

  const {data, fetchNextPage, isFetchingNextPage, refetch} = useInfiniteQuery(
    ['searchData'],
    ({pageParam = 999999}) => getSearchData(pageParam, 8),
    {
      getNextPageParam: (lastPage) => 
        !lastPage.isLast ? lastPage.nextLastPostId : undefined
    }
  )

  useEffect(()=>{
    return () => {
      queryClient.getQueryCache().clear();
      dispatch(sendSearchData({
        productName: "",
        location: ""
      }))
    }
  },[searchData])

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
          refetch={refetch}
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