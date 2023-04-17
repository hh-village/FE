import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import SlideBtn from '../components/detail/SlideBtn'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import { getCookie } from '../shared/Cookies'
import ConsumerRegister from '../components/detail/ConsumerRegister'
import RegisterReserve from '../components/detail/RegisterReserve'
import Map from '../components/regist/Map'
import { useEffect } from 'react'
import { ButtonWrapper, DetailBtn } from '../components/detail/detailStyle'

function Detail() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [zzim, setZzim] = useState();
  const token = getCookie("token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data , isLoading, refetch} = useQuery({
    queryKey: ["GET_DETAIL"],
    queryFn: async () => {
      const token = getCookie("token");
      const res = await axios.get(`http://3.37.127.30/products/${parseInt(id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setZzim(res.data.data.zzimStatus);
      return res.data.data;
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/${id}/zzim`, payload, {
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

  const DeletePost = useMutation({
    mutationKey:['DeletePost'],
    mutationFn: async(id) => {
      return await axios.delete(`${process.env.REACT_APP_SERVER_URL}/products/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
    },
    onSuccess : () => {
      navigate('/search')
    }
  })


  if(isLoading){
    return(
      <div>
        안녕하세요!
      </div>
    )
  }

  const styleOption = `
    display: flex;
    width: fit-content; 
    height: 100%;
    flex-wrap: nowrap;
    transition: all 0.5s;
    flex: none;
    transform: translateX(-${(count-1)*(false? 585: 584)}px);
  `;

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv fDirection="column">
        <Div padding="8rem 0 2rem 0" jc="space-between" width="100%" height="100%" gap="3rem">
            <Div width="100%" fDirection="row" gap="1rem">
              <Div position="relative" width="100%" height="50vh" overflow="hidden">
                <SlideBtn count={count} setFunc={setCount} total={data?.imageList.length}/>
                <Slide etc={styleOption}>
                  {data?.imageList.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
                </Slide>
              </Div>
              <Div>
              {/* <Map /> */}
              </Div>
            </Div>
            <Div width="100%" fDirection="row" gap="1rem">
              <Div width="100%" fDirection="row">
                <Div width="100%" alignItem="center" jc="space-between">
                  <h2>{data?.title}</h2>
                  <ZzimDiv onClick={()=>{mutate("")}}>
                    {!zzim
                    ? <img src="/images/eHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                    : <img src="/images/fHeart.png" alt="" style={{width:"2rem", height:"2rem"}}/>
                    }
                    <span>찜 {data?.zzimCount} 개</span>
                  </ZzimDiv>
                </Div>
                <h3>1일 기준 대여료 : {data?.price} 원</h3>
                <h4>{data?.location}</h4>
              </Div>
              <DescriptionDiv border>
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error quaerat sed laudantium ipsa suscipit sunt placeat, rem facilis alias ullam nobis doloribus sequi earum consequatur. Harum voluptate neque facilis eos? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptates numquam ipsa voluptas assumenda nam, quo distinctio dignissimos! Harum, quaerat. Fuga dolorem perferendis delectus sunt deleniti labore quibusdam, necessitatibus facere. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, voluptatum architecto consectetur laudantium blanditiis harum maiores inventore dicta illum autem earum at deserunt atque quod enim pariatur tempora recusandae. Doloribus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque quaerat odio temporibus totam libero non itaque et, accusamus asperiores culpa aliquid vel tempora enim mollitia fugiat in aut dolor dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi rerum tempore delectus, unde nesciunt asperiores, dolore et quibusdam blanditiis aliquam aspernatur temporibus sapiente illum quam consequuntur ea omnis nulla laudantium.</span>
              </DescriptionDiv>
              <Div width="100%" gap="1rem" alignItem="center">
                <span>예약현황</span>
                <span>예약 수 : {data?.reservationList.length}</span>
              </Div>
              {data?.checkOwner
              ? <RegisterReserve reservationList = {data?.reservationList} id = {data?.id}/>
              :  <ConsumerRegister reservationList = {data?.reservationList} id = {data?.id}/>
              }
              {data?.checkOwner
               && (<ButtonWrapper>
                    <DetailBtn onClick={()=>{}}>수정하기</DetailBtn>
                    <DetailBtn onClick={()=>{DeletePost.mutate(id)}}>삭제하기</DetailBtn>
                  </ButtonWrapper>)
              }
            </Div>
        </Div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Detail

const Slide = styled.div`
  ${({etc}) => etc};
`

const ZzimDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
`

const Img = styled.img`
  width: 100%;
  object-fit: fill;
`

const DescriptionDiv = styled.div`
  width: 100%;
  height : 20vh;
  overflow : auto;
  &::-webkit-scrollbar{
    display: none;
  }
`