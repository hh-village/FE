import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState, lazy, Suspense, useEffect} from 'react'
import ImageBlock from '../components/regist/ImageBlock'
import { Div, FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import useInput from '../hooks/useInput'
import { getCookie } from '../shared/Cookies'
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistBtn, RegistTitle, TitleInput } from '../components/regist/RegistStyled'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/global/Footer'
const MapComp = lazy(()=> import('../components/regist/Map'))

function Regist() {
  const navigate = useNavigate();  
  const { image, location } = useSelector(state => state.Post)
  const [imageURL, setImageURL] = useState(image)
  const accessToken = getCookie('token')
  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: '',
    location:'',
    images : '',
  })
  const { mutate } = useMutation({
    mutationKey:['mutate'],
    mutationFn: async(values)=>{
      return await axios.post(`${process.env.REACT_APP_SERVER_URL}/products`,values,{
        headers:{
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
    },
    onSuccess : (response) => {
      window.alert(response.data.message);
      navigate('/search')
    },
    onError : () => {
      window.alert('게시글에 필요한 내용들을 모두 입력해주세요.')
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
    if(!accessToken){
      navigate('/login')
    }
  },[accessToken])
  

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
              name='title'
              placeholder='제목 : 상품명이 드러나도록 제목을 적어주세요!'
              value={values.title}
              onChange={onChange}
              maxLength={20}
            />
            <ImageBlock setImageURL = {setImageURL} imageURL = {imageURL}/>
          </Div>
          <div style={{height:'685px', border:'1px solid #D7D7D7'}}></div>
          <Div width="100%">
            <form onSubmit={onSubmitHandler}>
              <PriceDiv>
                <PriceSpan>가격</PriceSpan>
                <PriceInput
                    type={'number'}
                    name='price'
                    placeholder='가격을 책정해주세요'
                    value={values.price}
                    onChange={onChange}
                />
              </PriceDiv>
            <DescInput
              name='description'
              placeholder='해당 물품의 기종, 상태, 구매일자 등 상세하게 적어주세요!'
              value={values.description}
              onChange={onChange}
            />
            <Suspense>
              <MapComp/>
            </Suspense>
            <RegistBtn> 등록하기 </RegistBtn>
            </form>
          </Div>
        </Div>
      </MaxWidthDiv>

      {/* components/global */}
      <Footer topRem={6} botRem={2}/>
    </FlexDiv>
  )
}

export default Regist;