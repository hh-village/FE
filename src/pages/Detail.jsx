import HeaderNav from '../components/global/HeaderNav'
import Footer from '../components/global/Footer'
import Loading from '../components/global/Loading'
import useInput from '../hooks/useInput'
import useGetDetail from '../hooks/useGetDetail'
import useUpdateDetail from '../hooks/useUpdateDetail'
import useDeleteDetail from '../hooks/useDeleteDetail'
import useDropdown from '../hooks/useDropdown'
import React, { lazy, Suspense, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import { ButtonWrapper, DescriptionDiv, DetailBtn, DetailTitle, LocationBox, LocationButton, ModalBackground, NotifiyIcon, PriceTitle, Registertext, ReserveDesc, Title} from '../components/detail/detailStyle'
import { PriceDiv, PriceInput, PriceSpan } from '../components/regist/RegistStyled'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getCookie } from '../shared/Cookies'
// import ImageSlider from '../components/detail/ImageSlider'
// import ImageBlock from '../components/regist/ImageBlock'
const MapComp = lazy(()=> import('../components/regist/Map'))
const ConsumerRegister = lazy(()=>import('../components/detail/ConsumerRegister'))
const RegisterReserve = lazy(()=>import('../components/detail/RegisterReserve'))
const ModalSeller = lazy(()=>import('../components/detail/ModalSeller'))
const ImageSlider = lazy(()=>import('../components/detail/ImageSlider'))
const ImageBlock = lazy(()=>import('../components/regist/ImageBlock'))
const PostInfo = lazy(()=>import('../components/detail/PostInfo'))
const Zzim = lazy(()=>import('../components/detail/Zzim'))
const SellorInfo = lazy(()=>import('../components/detail/SellorInfo'))

function Detail() { 
  const alwaysOpen = JSON.parse(localStorage.getItem('alwaysOpen'))
  const queryClient = useQueryClient();
  const { image:storeImage } = useSelector(state => state.Post)
  const { handleClose, isOpen } = useDropdown(true);
  const { handleToggle:modalControl, isOpen:modalOpen } = useDropdown();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDetail(id);
  const { UpdatePost } = useUpdateDetail(id);
  const { DeletePost } = useDeleteDetail(id);
  const {values, setValues, onChange} = useInput({
    title : '',
    price : '',
    description : '',
    images : [],
    location: ''
  });
  const onClickMap = () => {
      if(!getCookie('token')){
        return window.alert('로그인 후 빌리지를 이용해주세요')
      }else{
        modalControl();
      }
    }

  useEffect(()=>{
    window.scrollTo(0, 0)
    return () => {
      queryClient.getQueryCache().clear();
    }
  },[])

  useEffect(()=>{
    if(!values?.title){
      setValues({
        title : data?.title,
        price : data?.price,
        description : data?.description,
        images : data?.imageList,
        location : data?.location
      })
    }
  },[values])

  useEffect(()=>{
    if(storeImage){
      setValues({
        ...values,
        images:storeImage
      })
    }
  },[storeImage])
  

  if(isLoading || UpdatePost.isLoading || DeletePost.isLoading){
    return(
      <Loading/>
    )
  } 

  console.log(values)

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
              <Suspense>
                {data?.checkOwner
                ? <ImageBlock image={data?.imageList} id={data?.id}/>
                : <ImageSlider imageList={data?.imageList}/>
                }
              </Suspense>
                {/* {data?.checkOwner
                ? <ImageBlock image={data?.imageList} id={data?.id}/>
                : <ImageSlider imageList={data?.imageList}/>
                } */}
            </Div>
            <Div>
              <Suspense>
                {data?.checkOwner || (
                  <PostInfo reservationList={data?.reservationList} zzimCount = {data?.zzimCount} location ={data?.location}/>
                )}
              </Suspense>
            </Div>
            <Div width="100%" marginTop="2rem" style={{position:"relative"}}>
              <img style = {{width :'567px', height :'115px'}} src='/images/mapBG.webp' alt=''/>
              <LocationButton onClick={onClickMap}>
                <NotifiyIcon src='/images/location.png'/>
                거래위치 지도에서 보기
              </LocationButton>
              {modalOpen && (
              <>
                <ModalBackground theme={'regist'} onClick = {onClickMap}/>
                  <LocationBox>
                    <Suspense>
                      <MapComp baseloc = {data?.location}/>
                    </Suspense>
                  </LocationBox>
              </>
                
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
                <Suspense>
                  {data?.checkOwner ? (
                    <PriceDiv>
                      <PriceSpan>제목</PriceSpan>
                        <PriceInput
                          name='title'
                          onChange={onChange}
                          placeholder = {`${data.title}`}
                          maxLength={20}
                          defaultValue = {data?.title}
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
                </Suspense>
              </Div>
              <Div width = '100%'fDirection = 'row' alignItem = 'center' gap ='10px'>
                {data?.checkOwner ? (
                  <Div marginTop = '1rem'>
                    <PriceDiv>
                      <PriceSpan>가격</PriceSpan>
                      <PriceInput
                        name='price'
                        min={1}
                        type={'number'}
                        onChange={onChange}
                        placeholder = {`${data?.price}원`}
                        defaultValue = {data?.price}
                      />
                    </PriceDiv>
                  </Div>
                ) : (
                  <Suspense>
                    <PriceTitle> {data?.price}원 <span style ={{fontSize:'13px'}}>/ 1일 기준</span></PriceTitle>
                    <SellorInfo 
                    ownerNickname = {data?.ownerNickname}
                    ownerReturned = {data?.ownerReturned} 
                    ownerAccepted = {data?.ownerAccepted}
                    ownerWaiting = {data?.ownerWaiting}
                    />
                  </Suspense>
                )}
              </Div>
              
            </Div>
            <Div width="100%">
              {data?.checkOwner ? (
                <Registertext
                  name='description'
                  onChange={onChange}
                  placeholder={data?.description}
                  defaultValue={data?.description}
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
                    <DetailBtn theme = {'modify'} onClick={()=>{ UpdatePost.mutate(values)}}>수정하기</DetailBtn>
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
                <Suspense>
                  {data?.checkOwner
                  ? <RegisterReserve reservationList = {data?.reservationList} id = {data?.id}/>
                  : <ConsumerRegister reservationList = {data?.reservationList} id = {data?.id}/>
                  }
                </Suspense>
                
              </Div>
            </Div>
          </Div>
        </Div>
        <Suspense>
          {data?.checkOwner && isOpen && alwaysOpen &&(
            <ModalSeller handleClose = {handleClose} 
            word1 = {'해당 페이지를 통해 게시글의 요소들을'}
            word2 = {'간단히 수정하실 수 있습니다.'}/>
          )}
        </Suspense>
        
      </MaxWidthDiv>
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}
export default Detail;