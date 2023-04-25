import { useParams } from 'react-router-dom'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import ConsumerRegister from '../components/detail/ConsumerRegister'
import RegisterReserve from '../components/detail/RegisterReserve'
import { ButtonWrapper, DescriptionDiv, DetailBtn, DetailTitle, LocationButton, NotifiyIcon, PriceTitle, Registertext, ReserveDesc, Title, UnderImage } from '../components/detail/detailStyle'
import { useSelector } from 'react-redux'
import ImageBlock from '../components/regist/ImageBlock'
import useInput from '../hooks/useInput'
import Footer from '../components/global/Footer'
import Zzim from '../components/detail/Zzim'
import ImageSlider from '../components/detail/ImageSlider'
import useGetDetail from '../hooks/useGetDetail'
import useUpdateDetail from '../hooks/useUpdateDetail'
import useDeleteDetail from '../hooks/useDeleteDetail'
import { useEffect } from 'react'
import Loading from '../components/global/Loading'

function Detail() {
  const { id } = useParams();
  const {image} = useSelector(state => state.Post);
  const { data, isLoading } = useGetDetail(id);
  const { UpdatePost } = useUpdateDetail(id);
  const { DeletePost } = useDeleteDetail(id);
  const {values,onChange} = useInput({
    description : '',
    image : [],
  });

  useEffect(()=>{
    window.scrollTo(0, 0); 
  },[])

  if(isLoading || UpdatePost.isLoading || DeletePost.isLoading){
    return(
      <Loading/>
    )
  }
  const onClickMap = () => {
    alert('해당 기능은 준비 중입니다')
  }
  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <Div marginTop="10rem">
          {data?.checkOwner
            ? (
              <DetailTitle>내 물품 예약관리 / 내 글 수정</DetailTitle>
            ) : (
              <DetailTitle>제품 상세보기</DetailTitle>
          )}
        </Div>
        <Div width="100%" marginTop="2rem" fDirection="row" jc="space-between" gap="2rem">
          {/* 왼쪽 div 영역*/}
          <Div width="100%">
            <Div width="100%">
            {data?.checkOwner
            ? <ImageBlock image={data?.imageList} id={data?.id}/>
            : <ImageSlider imageList={data?.imageList}/>
            }
            </Div>
            <Div>
            {data?.checkOwner || (
              <div>
                <UnderImage>
                  <div style={{display:'flex', alignItems:'center',gap:'4px'}}>
                    <NotifiyIcon src='/images/check.png'/>
                    <span>대여완료 {data?.reservationList.filter((item)=> item.status === 'returned').length}명 </span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                    <NotifiyIcon src='/images/fHeart.png'/>
                    관심 {data?.zzimCount}명
                  </div>
                    
                  <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                    <NotifiyIcon src='/images/eye 1.png'/>
                    조회 xx회
                  </div>
                </UnderImage>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'4px'}}>
                  <NotifiyIcon src='/images/map.png'/>
                  <span>{data?.location}</span>
                </div>
              </div>
            )}
            </Div>
            <Div width="100%" marginTop="2rem" style={{position:"relative"}}>
              <img style = {{width :'567px', height :'115px'}} src='/images/mapBG.png' alt=''/>
              <LocationButton onClick={onClickMap}>
                <NotifiyIcon src='/images/location 1.png'/>
                내 근처에서 지도 찾기
              </LocationButton>
            </Div>
          </Div>
          {/* 가운데 구분선 */}
          {data?.checkOwner
          ? <div style={{height:'760px', border:'0.5px solid #D7D7D7'}}></div>
          : <div style={{height:'730px', border:'0.5px solid #D7D7D7'}}></div>
          }
          {/* 오른쪽 div 영역 */}
          <Div width="100%" gap="2rem" style={{boxSizing:"border-box"}}>
            <Div width="100%">
              <Div fDirection="row" width="100%" jc="space-between">
                <Title>{data?.title}</Title>
                <Zzim 
                  zzim={data?.zzimStatus} 
                  zzimCount = {data?.zzimCount} 
                  id = {data?.id}/>
              </Div>
              <PriceTitle> {data?.price}원 <span style ={{fontSize:'13px'}}>/ 1일 기준</span></PriceTitle>
            </Div>
            <Div width="100%">
              {data?.checkOwner ? (
                <Registertext
                  name='description'
                  onChange={onChange}
                  placeholder={data?.description}
                  defaultValue={values.description}
                  />
              ):(
                <DescriptionDiv>
                  {data?.description}
                </DescriptionDiv>
              )}
            </Div>
            <Div width="100%" gap="1rem">
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
              <Div fDirection="row" width="100%" gap="1rem" alignItem="center">
                <ReserveDesc>예약현황</ReserveDesc>
                <span style={{display:'flex', alignItems:'center', gap:'5px'}}>
                  <NotifiyIcon src='/images/notification.png'/>
                  예약대기 {data?.reservationList.filter((item)=> item.status === 'waiting').length}명
                </span>
              </Div>
              <Div width="100%">
                {data?.checkOwner
                ? <RegisterReserve reservationList = {data?.reservationList} id = {data?.id}/>
                : <ConsumerRegister reservationList = {data?.reservationList} id = {data?.id}/>
                }
              </Div>
            </Div>
          </Div>
        </Div>
      </MaxWidthDiv>
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}
export default Detail;