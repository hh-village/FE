import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { lazy, Suspense, useEffect} from 'react'
import ImageBlock from '../components/regist/ImageBlock'
import { Div, FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import useInput from '../hooks/useInput'
import { getCookie } from '../shared/Cookies'
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistBtn, RegistTitle, TitleInput } from '../components/regist/RegistStyled'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/global/Footer'
import Loading from '../components/global/Loading'
import { useRef } from 'react'
import ModalSeller from '../components/detail/ModalSeller'
import useDropdown from '../hooks/useDropdown'
const MapComp = lazy(()=> import('../components/regist/Map'))

function Regist() {
  const autofocus = useRef();
  const navigate = useNavigate();  
  const { image, location } = useSelector(state => state.Post)
  const accessToken = getCookie('token')
  const { handleClose, isOpen } = useDropdown(true);
  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: '',
    location:'',
    images : '',
  })
  const { mutate, isLoading } = useMutation({
    mutationKey:['mutate'],
    mutationFn: async(values)=>{
      console.log(values)
      if(values.location === ''){
        return window.alert('장소를 마커로 찍어주세요!')
      }else if(values.title === ''){
        return window.alert('제목을 기입해주세요!')
      }else if(values.description === ''){
        return window.alert('물건 상세정보를 작성해주세요!')
      }else if(!values.price){
        return window.alert('대여 금액을 작성해주세요!')
      }else if(!values.images){
        return window.alert('물품 이미지를 업로드 해주세요!')
      }else{
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}products`,values,{
        headers:{
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
          }
        })
      }
    },
    onSuccess : (response) => {
      window.alert(response.data.message);
      navigate('/search')
      window.location.reload();
    },
    onError : (error) => {
      window.alert(error.response.data.message)
    }
  })

  const onSubmitHandler = (event) => {
    event.preventDefault();
    mutate({
      ...values,
      images:image,
      location:location
    })
  }

  useEffect(()=>{
    window.scrollTo(0, 0); 
    autofocus.current.focus();
  },[])

  useEffect(()=>{
    if(!accessToken){
      navigate('/login')
    }
  },[accessToken])

  if(isLoading){
    return <Loading/>
  }

  return (
    <FlexDiv boxShadow="none">

      {/* components/global */}
      <HeaderNav />
      <MaxWidthDiv>
        <Div marginTop="10rem">
          <RegistTitle>대여물품 등록</RegistTitle>
        </Div>
        <Div width="100%" marginTop="2rem" fDirection="row" jc="space-between" gap="2rem">
          <Div gap="1rem">
            <TitleInput
              ref={autofocus}
              name='title'
              placeholder='제목 : 상품명이 드러나도록 제목을 적어주세요!'
              defaultValue={values.title}
              onChange={onChange}
              maxLength={20}
            />
            <ImageBlock/>
          </Div>
          <div style={{height:'685px', border:'1px solid #D7D7D7'}}></div>
          <Div width="100%">
            <form onSubmit={onSubmitHandler}>
              <PriceDiv>
                <PriceSpan>가격</PriceSpan>
                <PriceInput
                    min={1}
                    type={'number'}
                    name='price'
                    placeholder='가격을 책정해주세요'
                    defaultValue={values.price}
                    onChange={onChange}
                />
              </PriceDiv>
            <DescInput
              name='description'
              placeholder='해당 물품의 기종, 상태, 구매일자 등 상세하게 적어주세요!'
              defaultValue={values.description}
              onChange={onChange}
            />
            <Suspense>
              <MapComp theme = {'regist'}/>
            </Suspense>
            <RegistBtn> 등록하기 </RegistBtn>
            </form>
            <link as='image' rel='preload' href='check.png'/>
          </Div>
        </Div>
        {isOpen && <ModalSeller handleClose = {handleClose} word1 = {'이미지는 "한번에" 5장까지 첨부 가능합니다!'}/>}
      </MaxWidthDiv>
      {/* components/global */}
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}

export default Regist;