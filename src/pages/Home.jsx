import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import SearchInput from '../components/global/SearchInput'

function Home() {

  const { data, refetch } = useQuery({
    queryKey: ["GET_PRODUCTS"],
    queryFn: async () => {
      const res = await axios.get("http://3.39.187.56/products")
      return res.data.data;
    }
  })

  console.log(data);

  useEffect(()=>{
    refetch()
  },[]);

  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv fDirection="column" height="100vh">
        <SearchInput />
        <div style={{marginTop:"3rem"}}>
          <h1>내 근처에서 대여할 물품을 찾아보세요!</h1>
        </div>
        <div> {/* 메인 상품 카드 영역 */}
          <div>
             <img src="" alt="productImg" />
             <div>
              <img src="" alt="userProfileImg" />
              <span>title</span>
             </div>
             <span>location</span>
          </div>
        </div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Home