import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { Container as MapDiv, NaverMap, useNavermaps, } from 'react-naver-maps'
import ImageBlock from '../components/DetailComponents/ImageBlock'
import useInput from '../hooks/useInput'
import { getCookie } from '../shared/Cookies'

function Detail() {
  const navermaps = useNavermaps()
  const {mutate, isLoading, isError, isSuccess} = useMutation({
    mutationKey:['mutate'],
    mutationFn: async(values)=>{
      const accessToken = getCookie('token')
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/products`,values,{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
    }
  })

  const [state, setState] = useState({
    address : '',
    lat : '',
    log : '',
  })

  const onChangeHandler = (event) =>{
    setState({
      address: event.target.value
    })
  }

  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: "",
    location: "",
    Image1: '',
    Image2: '',
    Image3: '',
  })
  const onSubmitHandler = (event) => {
    event.preventDefault();
    mutate(values)
  }

  return (
    <>
      <input type="text" onChange={onChangeHandler}/>
      <button>어쩌라고</button>
        <MapDiv style={{ width: '200px',height: '200px',}}>
          <NaverMap
          defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
          defaultZoom={15}
          />
        </MapDiv>
        <form onSubmit={onSubmitHandler}>
          <input
            name='title'
            placeholder='제목을 입력해주세요'
            value={values.title}
            onChange={onChange}
          />
          <input
            name='description'
            placeholder='상품설명을 해주세요'
            value={values.description}
            onChange={onChange}
          />
          <input
            name='price'
            placeholder='가격을 책정해주세요'
            value={values.price}
            onChange={onChange}
          />
          <input
            name='location'
            placeholder='위치를 찍어주세요'
            value={values.location}
            onChange={onChange}
          />
          <ImageBlock/>
          <button type='submit'> 등록하기 </button>
        </form>
    </>
    
  )
}

export default Detail