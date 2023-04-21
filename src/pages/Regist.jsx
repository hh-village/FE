import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import ImageBlock from '../components/regist/ImageBlock'
import { Div, FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import useInput from '../hooks/useInput'
import { getCookie } from '../shared/Cookies'
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistBtn, RegistTitle, TitleInput } from '../components/regist/RegistStyled'
import NaverMap from '../components/regist/Map'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/global/Footer'

function Regist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey:['mutate'],
    mutationFn: async(values)=>{
      const accessToken = getCookie('token')
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
    }
  })

  const { image, location } = useSelector(state => state.Post)
  const [imageURL, setImageURL] = useState(image)

  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: '',
    location:'',
    images : '',
  })


  const onSubmitHandler = (event) => {
    event.preventDefault();
    mutate({
      ...values,
      images:image,
      location:location
    })
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
            <NaverMap/>
            <RegistBtn> 등록하기 </RegistBtn>
            </form>
          </Div>
        </Div>
      </MaxWidthDiv>

      {/* components/global */}
      <Footer rem={6}/>
    </FlexDiv>
  )
}

export default Regist;