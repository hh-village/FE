import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/global/Footer'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import PagingTap from '../components/mypage/PagingTap'
import UserCard from '../components/mypage/UserCard'
import useGetMyPageData from '../hooks/useGetMyPageData'
import { getCookie } from '../shared/Cookies'

function MyPage() {
  const navi = useNavigate();
  const token = getCookie("token");
  const [currentBtn, setCurrentBtn] = useState("products");
  const {data, refetch} = useGetMyPageData(currentBtn);
  
  const btnInfo = [
    { name: "products", title: "내가 작성한 글" },
    { name: "rents", title: "대여중인 항목"},
    { name: "zzims", title: "찜한 상품"}
  ]

  const buttonClickHandler = (e) => {
    setCurrentBtn(e.target.name);
  }

  const onNavigateChat = useMutation({
    mutationKey:['onNavigateChat'],
    mutationFn: async()=>{
      return await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room?`,{
        headers : {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess : (response) => {
      navi(`/chat/${response.data.data.roomList.filter(item => item.target === true)[0].roomId}`)
    }
  })

  useEffect(()=>{
    if(!token){
      navi('/login')
    }
  },[token])

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <div style={{marginTop:"10rem"}}>
          <h2>마이페이지</h2>
        </div>

        {/* components/mypage */}
        <UserCard 
          data={data}
          onNavigateChat={onNavigateChat}
          refetch={refetch}
        />

        {/* components/mypage */}
        <PagingTap
          data={data}
          btnInfo={btnInfo}
          currentBtn={currentBtn}
          buttonClickHandler={buttonClickHandler}
          />
      </MaxWidthDiv>
      <Footer topRem={3} botRem={2}/>
    </FlexDiv>
  )
}

export default MyPage