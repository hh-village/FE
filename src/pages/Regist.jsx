import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState, lazy, Suspense} from 'react'
import ImageBlock from '../components/regist/ImageBlock'
import { Div, MaxWidthDiv } from '../components/global/globalStyle'
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
    <>
      <HeaderNav/>
      <MaxWidthDiv 
      fDirection='row'
      padding = '6rem 0 0 0'
      >
        <Div>
          <RegistTitle>대여물품 등록</RegistTitle>
          <TitleInput
            name='title'
            placeholder='제목 : 상품명이 드러나도록 제목을 적어주세요!'
            value={values.title}
            onChange={onChange}
            maxLength={20}
          />
          <ImageBlock setImageURL = {setImageURL} imageURL = {imageURL}/>
        </Div>
        <div
        style={{height:'750px', marginTop:'140px', marginLeft : '31px',border:'0.5px solid #D7D7D7'}}
        ></div>
        <Div>
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
      </MaxWidthDiv>
      <Footer rem={6}/>
    </>
  )
}

export default Regist;