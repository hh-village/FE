import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import ImageBlock from '../components/regist/ImageBlock'
import { Div, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import useInput from '../hooks/useInput'
import { getCookie } from '../shared/Cookies'
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistTitle, TitleInput } from '../components/regist/RegistStyled'
import NaverMap from '../components/regist/Map'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { storeImage } from '../redux/modules/Post'

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
 
  console.log(image)

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
            placeholder='제목 : 카메라 대여하고 싶으신 분 찾아요!'
            value={values.title}
            onChange={onChange}
          />
          <ImageBlock setImageURL = {setImageURL} imageURL = {imageURL}/>
        </Div>
        <div
        style={{height:'750px', marginTop:'140px', marginLeft : '31px',border:'0.5px solid #D7D7D7'}}
        ></div>
        <Div>
          <form onSubmit={onSubmitHandler}>
          <DescInput
            name='description'
            placeholder='상세설명 :기종, 물품, 구매일자, 물품컨디션'
            value={values.description}
            onChange={onChange}
          />
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
          <NaverMap/>
          <button type='button'
          onClick={()=>{
            setImageURL([]);
          }}
          >사진 지우기</button>
          <button style={{marginTop:'10px'}}> 등록하기 </button>
          </form>
        </Div>
      </MaxWidthDiv>
    </>
  )
}

export default Regist;