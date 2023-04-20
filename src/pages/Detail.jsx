import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import { ButtonWrapper, DetailBtn, DetailTitle, LocationButton, NotifiyIcon, PriceTitle, Registertext, ReserveDesc, Title, UnderImage } from '../components/detail/detailStyle'
import { useDispatch, useSelector } from 'react-redux'
import ImageBlock from '../components/regist/ImageBlock'
import useInput from '../hooks/useInput'
import Footer from '../components/global/Footer'

function Detail() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [zzim, setZzim] = useState();
  const dispatch = useDispatch();
  const token = getCookie("token");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {image} = useSelector(state => state.Post)
  const {values,onChange} = useInput({
    description : '',
    image : [],
  });

  
  
  const { data , isLoading, refetch} = useQuery({
    queryKey: ["GET_DETAIL"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${parseInt(id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setZzim(res.data.data.zzimStatus);
      return res.data.data;
    }
  })

  if(!token){
      navigate('/login')
    }
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
    onSuccess : (response) => {
      window.alert(response.data.message)
      navigate('/search')
    }
  })

  const UpdatePost = useMutation({
    mutationKey : ['UpdatePost'],
    mutationFn : async(payload) => {
      return await axios.patch(`${process.env.REACT_APP_SERVER_URL}/products/${data.id}`,payload,{
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
    },
    onSuccess:(response)=>{
      window.alert(response.data.message)
    },
    onError : (error)=> {
      alert('수정내역을 모두 작성해주세요.')
    }
  })
  
  if(isLoading){
    return(
      <div>
        안녕하세요!
      </div>
    )
  }
  const onClickMap = () => {
    alert('해당 기능은 준비 중입니다')
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
      <MaxWidthDiv>
        <Div fDirection="row" padding="5rem 0 2rem 0" jc="space-between" width="100%" height="100%" gap="3rem">
            <Div width="100%" gap="1rem">
              {data?.checkOwner
              ? (
                <DetailTitle> 내 물품 예약관리 / 내 글 수정</DetailTitle>
              ) : (
                <DetailTitle>제품 상세보기</DetailTitle>
                )}
              
              {data?.checkOwner ? (
                <ImageBlock image = {data.imageList} id = {data.id}/>
              ) : (
              <Div position="relative" width="578px" height="508px" overflow = 'hidden' style={{marginTop:'15px'}}>
                <SlideBtn count={count} setFunc={setCount} total={data?.imageList.length}/>
                <Slide etc={styleOption}>
                  {data?.imageList.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
                </Slide>
              </Div>)}
              <Div>
                {data?.checkOwner || (
                  <div>
                  <UnderImage>
                    <div style={{display:'flex', alignItems:'center' ,gap:'4px'}}>
                      <NotifiyIcon src='/images/check.png'/>
                      <span>대여완료 {data?.reservationList.filter((item)=> item.status === 'returned').length}명 </span>
                    </div>
                    <div style={{display:'flex', alignItems:'center' ,gap:'4px'}}>
                      <NotifiyIcon src='/images/favorite 1.png'/>
                      관심 {data?.zzimCount}명
                    </div>
                      
                    <div style={{display:'flex', alignItems:'center' ,gap:'4px'}}>
                      <NotifiyIcon src='/images/eye 1.png'/>
                      조회 0회
                    </div>
                  </UnderImage>
                  <div style={{display:'flex', justifyContent:'center' ,alignItems:'center',gap:'4px'}}>
                    <NotifiyIcon src='/images/map.png'/>
                    <span>{data?.location}</span>
                  </div>
                </div>
                )}
                <div style={{position:"relative"}}>
                  <img style = {{width :'590px', height :'116px' ,marginTop:'25px'}} src='/images/Rectangle 215.png' alt=''/>
                  <LocationButton onClick={onClickMap}>
                    <NotifiyIcon src='/images/location 1.png'/>
                    내 근처에서 지도 찾기
                  </LocationButton>
                </div>
              </Div>
            </Div>
            <div
            style={{height:'800px', marginTop:'140px' ,border:'0.5px solid #D7D7D7'}}
            ></div>
            {/* 여기부터 오른쪽 */}
            <Div width="100%">
              <Div width="100%">
                <Div fDirection="row" width="560px" alignItem="center" jc="space-between" style={{marginTop : '130px'}}>
                  <Title>{data?.title}</Title>
                  <ZzimDiv onClick={()=>{mutate("")}}>
                    {!zzim
                    ? <img src="/images/eHeart.png" alt="" style={{width:"28px", height:"28px"}}/>
                    : <img src="/images/fHeart.png" alt="" style={{width:"28px", height:"28px"}}/>
                    }
                    <span style={{color:'#644AFF'}}>{data?.zzimCount}</span>
                  </ZzimDiv>
                </Div>
                <PriceTitle> {data?.price}원 <span style ={{fontSize:'13px'}}>/ 1일 기준</span></PriceTitle>
              </Div>
              {data?.checkOwner ? (
                <Registertext
                  name='description'
                  onChange={onChange}
                  placeholder={data?.description}
                  defaultValue={values.description}
                  >
                </Registertext>
              ):(
                <DescriptionDiv >
                  {data?.description}
                </DescriptionDiv>
              )}
              {data?.checkOwner
               && (<ButtonWrapper>
                    <DetailBtn theme = {'modify'} onClick={()=>{ UpdatePost.mutate({
                      description : values.description,
                      images : image,
                      location : data?.location,
                      title:  data?.title,
                      price : data?.price

                    })}}>수정하기</DetailBtn>
                    <DetailBtn theme = {'cancel'} onClick={()=>{DeletePost.mutate(id)}}>삭제하기</DetailBtn>
                  </ButtonWrapper>)
              }
              <Div fDirection="row" width="100%" gap="1rem" alignItem="center" style={{marginTop:'35px'}}>
                <ReserveDesc>예약현황</ReserveDesc>
                <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                  <NotifiyIcon src='/images/notification.png'/>
                  예약대기 {data?.reservationList.filter((item)=> item.status == 'waiting').length}명
                </span>
              </Div>
              {data?.checkOwner
              ? <RegisterReserve reservationList = {data?.reservationList} id = {data?.id}/>
              : <ConsumerRegister reservationList = {data?.reservationList} id = {data?.id}/>
              }
            </Div>
        </Div>
      </MaxWidthDiv>
      <Footer rem={6}/>
    </FlexDiv>
  )
}

export default Detail;

const Slide = styled.div`
  ${({etc}) => etc};
`

const ZzimDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 0.11px;
  margin-top : 15px;
`

const Img = styled.img`
  height: 508px;
  width: 578px;
`

const DescriptionDiv = styled.div`
  margin-Top : 27px;
  width: 530px;
  height : 196px;
  overflow : auto;
  border : 1px solid #E1E1E1;
  border-radius : 10px;
  padding : 16px;
  &::-webkit-scrollbar{
    display: none;
  }
`