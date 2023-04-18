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
import { ButtonWrapper, DetailBtn, DetailTitle, LocationButton, NotifiyIcon, PriceTitle, ReserveDesc, Title, UnderImage } from '../components/detail/detailStyle'

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

  const onClickMap = () => {
    alert('해당 기능은 준비 중입니다')
  }


  if(isLoading){
    return(
      <div>
        안녕하세요!
      </div>
    )
  }
 
  console.log(data.reservationList)

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
              <DetailTitle>제품 상세보기</DetailTitle>
              <Div position="relative" width="578px" height="508px" overflow = 'hidden' style={{marginTop:'15px'}}>
                <SlideBtn count={count} setFunc={setCount} total={data?.imageList.length}/>
                <Slide etc={styleOption}>
                  {data?.imageList.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
                </Slide>
              </Div>
              <Div>
                <div>
                  <UnderImage>
                    <div style={{display:'flex', alignItems:'center' ,gap:'4px'}}>
                      <NotifiyIcon src='/images/check.png'/>
                      <span>대여완료 {data?.reservationList.filter((item)=> item.status == 'returned').length}명 </span>
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
                  <div style={{position:"relative"}}>
                    <img style = {{width :'578px', height :'116px' ,marginTop:'60px'}} src='/images/Rectangle 215.png'/>
                    <LocationButton onClick={onClickMap}>
                      <NotifiyIcon src='/images/location 1.png'/>
                      내 근처에서 지도 찾기
                    </LocationButton>
                  </div>
                  
                </div>
                
              </Div>
            </Div>
            <div
            style={{height:'790px', marginTop:'100px' ,border:'0.5px solid #D7D7D7'}}
            ></div>
            {/* 여기부터 오른쪽 */}
            <Div width="100%" fDirection="row">
              <Div width="100%" fDirection="row">
                <Div width="560px" alignItem="center" jc="space-between" style={{marginTop : '100px'}}>
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
              <DescriptionDiv>
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error quaerat sed laudantium ipsa suscipit sunt placeat, rem facilis alias ullam nobis doloribus sequi earum consequatur. Harum voluptate neque facilis eos? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptates numquam ipsa voluptas assumenda nam, quo distinctio dignissimos! Harum, quaerat. Fuga dolorem perferendis delectus sunt deleniti labore quibusdam, necessitatibus facere. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, voluptatum architecto consectetur laudantium blanditiis harum maiores inventore dicta illum autem earum at deserunt atque quod enim pariatur tempora recusandae. Doloribus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque quaerat odio temporibus totam libero non itaque et, accusamus asperiores culpa aliquid vel tempora enim mollitia fugiat in aut dolor dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi rerum tempore delectus, unde nesciunt asperiores, dolore et quibusdam blanditiis aliquam aspernatur temporibus sapiente illum quam consequuntur ea omnis nulla laudantium.</span>
              </DescriptionDiv>
              <Div width="100%" gap="1rem" alignItem="center" style={{marginTop:'35px'}}>
                <ReserveDesc>예약현황</ReserveDesc>
                <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                  <NotifiyIcon src='/images/notification.png'/>
                  예약대기 {data?.reservationList.filter((item)=> item.status == 'waiting').length}명
                </span>
              </Div>
              {data?.checkOwner
              ? <RegisterReserve reservationList = {data?.reservationList} id = {data?.id}/>
              :  <ConsumerRegister reservationList = {data?.reservationList} id = {data?.id}/>
              }
              {data?.checkOwner
               && (<ButtonWrapper>
                    <DetailBtn theme = {'modify'} onClick={()=>{}}>수정하기</DetailBtn>
                    <DetailBtn theme = {'cancel'} onClick={()=>{DeletePost.mutate(id)}}>삭제하기</DetailBtn>
                  </ButtonWrapper>)
              }
            </Div>
        </Div>
      </MaxWidthDiv>
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
  color : #E1E1E1;
  border : 1px solid #E1E1E1;
  border-radius : 10px;
  padding : 16px;
  &::-webkit-scrollbar{
    display: none;
  }
`