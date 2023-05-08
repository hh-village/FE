import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'
import Footer from '../components/global/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../shared/Cookies'
import { sendSearchData } from '../redux/modules/Search'
const SearchCards = lazy(()=>import('../components/search/SearchCards'))
const NullCard = lazy(()=>import('../components/search/NullCard'))

function Search() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const accessToken = getCookie('token')
  const {productName, location} = useSelector((state) => state.Search)
  const [searchData, setSearchData] = useState({
    productName: productName,
    location: location
  });

  // 3. useInfiniteQuery가 실행되면 첫 pageParam의 값은 lastPostId로, 8은 size로 들어감
  const getSearchData = async(lastPostId, size) => {
    if(!accessToken){
      //4. 제목, 지역, 마지막 post의 id값(lastPostId = pageParam), 전송 받을 데이터 갯수(size = 8)를 파라미터로 담아 데이터를 요청하고, 받은 데이터는 res에 담는다.
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}&lastId=${lastPostId}&size=${size}`)
      const productList = res?.data.data.productList
      console.log("pd", productList);
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

  // 1. 페이지가 마운트 되면 useInfiniteQuery가 실행된다.
  const {data, fetchNextPage, isFetchingNextPage, refetch} = useInfiniteQuery(
    ['searchData'],
    // 2. no-offset방식을 사용했기 때문에, 첫 요청의 lastPostId에 전달할 pageParam은 무작위의 큰 수를 입력하여 getSearchData함수의 인자 값으로 전달한다.
    ({pageParam = 999999}) => getSearchData(pageParam, 8),
    {
      getNextPageParam: (lastPage) => 
        !lastPage.isLast ? lastPage.nextLastPostId : undefined
        //
    },
  )

  console.log("data", data);

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
        {data?.pages[0].productList.length === 0
          ? 
            <Suspense>
              <NullCard />
            </Suspense>
          : 
            <Suspense>
              <SearchCards
                  data={data?.pages}
                  isFetchingNextPage={isFetchingNextPage}
                  fetchNextPage={fetchNextPage}
                />
            </Suspense>
        }
        
      </MaxWidthDiv>

      {/* components/global */}
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}

export default Search