import { useNavigate, useParams } from 'react-router-dom'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import ConsumerRegister from '../components/detail/ConsumerRegister'
import RegisterReserve from '../components/detail/RegisterReserve'
import { ButtonWrapper, DescriptionDiv, DetailBtn, DetailTitle, LocationBox, LocationButton, NotifiyIcon, PriceTitle, Registertext, ReserveDesc, SellerInfo, SellorInfoBox, Span, Title, UnderImage } from '../components/detail/detailStyle'
import { useSelector } from 'react-redux'
import ImageBlock from '../components/regist/ImageBlock'
import useInput from '../hooks/useInput'
import Footer from '../components/global/Footer'
import Zzim from '../components/detail/Zzim'
import ImageSlider from '../components/detail/ImageSlider'
import useGetDetail from '../hooks/useGetDetail'
import useUpdateDetail from '../hooks/useUpdateDetail'
import useDeleteDetail from '../hooks/useDeleteDetail'
import { lazy, Suspense, useEffect } from 'react'
import Loading from '../components/global/Loading'
import { useState } from 'react'
import useDropdown from '../hooks/useDropdown'
import ModalSeller from '../components/detail/ModalSeller'
import { PriceDiv, PriceInput, PriceSpan, TitleInput } from '../components/regist/RegistStyled'
import { useRef } from 'react'
const MapComp = lazy(()=> import('../components/regist/Map'))

function Detail() {
  const autofocus = useRef();
  const alwaysOpen = JSON.parse(localStorage.getItem('alwaysOpen'))
  const { handleClose, isOpen } = useDropdown(true);
  const { handleToggle:modalControl, isOpen:modalOpen } = useDropdown();
  const [hide, setHide] = useState();
  const { id } = useParams();
  const {image} = useSelector(state => state.Post);
  const { data, isLoading, isError } = useGetDetail(id);
  const { UpdatePost } = useUpdateDetail(id);
  const { DeletePost } = useDeleteDetail(id);
  const navigate = useNavigate();
  const {values,onChange} = useInput({
    title : '',
    price : '',
    description : '',
    image : [],
  });

  useEffect(()=>{
    window.scrollTo(0, 0)
    // try{
    //   {data?.checkOwner && autofocus.current !== undefined &&(
    //     autofocus.current.focus()
    //   )}
    // }catch{
    //   if(UpdatePost.isError||isLoading){
    //     console.log('1')
    //     setTimeout(()=>{
    //       window.alert('오류로 인해 홈으로 이동합니다.')
    //       navigate('/')
    //     },5000)
    //   }
    // }
  },[])

  if(isLoading || UpdatePost.isLoading || DeletePost.isLoading){
    return(
      <Loading/>
    )
  }

  if(isError){
    setTimeout(()=>{
      window.alert('오류로 인해 홈으로 이동합니다.');
      navigate('/');
      window.location.reload();
    },5000)
    return(
      <Loading/>
    )
  }

  const onClickMap = () => {
    modalControl();
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
          {/* 왼쪽 div 영역 */}
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
                거래위치 지도에서 보기
              </LocationButton>
              {modalOpen && (
                <LocationBox>
                  <Suspense>
                    <MapComp baseloc = {data.location}/>
                  </Suspense>
                </LocationBox>
              )}
            </Div>
          </Div>
          {/* 가운데 구분선 */}
          {data?.checkOwner
          ? <div style={{height:'760px', border:'0.5px solid #D7D7D7'}}></div>
          : <div style={{height:'730px', border:'0.5px solid #D7D7D7'}}></div>
          }
          {/* 오른쪽 div 영역 */}
          <Div width="100%" gap="1rem" style={{boxSizing:"border-box"}}>
            <Div width="100%">
              <Div fDirection="row" width="100%" jc="space-between" >
                {data.checkOwner ? (
                  <PriceDiv>
                    <PriceSpan>제목</PriceSpan>
                      <PriceInput
                        name='title'
                        onChange={onChange}
                        placeholder = {`${data.title}`}
                        maxLength={20}
                      />
                  </PriceDiv>
                ) : (
                  <>
                    <Title>{data?.title}</Title>
                    <Zzim 
                      zzim={data?.zzimStatus} 
                      zzimCount = {data?.zzimCount} 
                      id = {data?.id}/>
                  </>
                )}
              </Div>
              <Div width = '100%'fDirection = 'row' alignItem = 'center' gap ='10px'>
                {data?.checkOwner ? (
                  <Div marginTop = '1rem'>
                    <PriceDiv>
                      <PriceSpan>가격</PriceSpan>
                      <PriceInput
                        name='price'
                        type={'number'}
                        onChange={onChange}
                        placeholder = {`${data.price}원`}
                      />
                    </PriceDiv>
                  </Div>
                ) : (
                  <>
                    <PriceTitle> {data?.price}원 <span style ={{fontSize:'13px'}}>/ 1일 기준</span></PriceTitle>
                    <SellerInfo
                    onMouseOver={()=>setHide(true)}
                    onMouseLeave={()=>setHide(false)}
                    >판매자 정보
                    {/* </SellerInfo> */}
                    {hide && (
                      <SellorInfoBox>
                        <div style={{width : '100%', paddingLeft :'17px', fontSize : '20px'}}>
                        {data.ownerNickname}
                        </div>
                        <Div fDirection = 'row' jc = 'center' gap = '13px' >
                          <Div alignItem = 'center' fDirection = 'row' gap='7px'>
                            <NotifiyIcon src='/images/check.png'/>
                            <Span>대여완료 {data.ownerReturned}명</Span>
                          </Div>
                          <Div alignItem = 'center' fDirection = 'row' gap='7px'>
                            <NotifiyIcon src='/images/profile1.png'/>
                            <Span>대여진행중 {data.ownerAccepted}명</Span>
                          </Div>
                          <Div alignItem = 'center' fDirection = 'row' gap='7px'>
                            <NotifiyIcon src='/images/profile.png'/>
                            <Span>대기중 {data.ownerWaiting}명</Span>
                          </Div>
                        </Div>
                      </SellorInfoBox>
                  )}
                   </SellerInfo>
                  </>
                )}
              </Div>
              
            </Div>
            <Div width="100%">
              {data?.checkOwner ? (
                <Registertext
                  ref={autofocus}
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
                      title:  values.title,
                      price : values.price

                    })}}>수정하기</DetailBtn>
                    <DetailBtn theme = {'cancel'} onClick={()=>{
                      if(window.confirm('해당 게시글을 정말 삭제 하시겠습니까?')){
                        return DeletePost.mutate(id)}
                      }
                      }>삭제하기</DetailBtn>
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
        {data.checkOwner && isOpen && alwaysOpen &&(
          <ModalSeller handleClose = {handleClose}/>
        )}
      </MaxWidthDiv>
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}
export default Detail;