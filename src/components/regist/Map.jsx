import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container as MapDiv, useNavermaps, NaverMap, Marker } from 'react-naver-maps'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { storeLocation } from '../../redux/modules/Post';
import { getCookie } from '../../shared/Cookies';
import { MapBox, MapSearch, SearchButton, Searchdiv } from './RegistStyled';
import { Div } from '../global/globalStyle';
import { useQuery } from '@tanstack/react-query';
import { NotifiyIcon } from '../detail/detailStyle';

function Map({theme, baseloc = ''}) {
  const accessToken = getCookie('token')
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({locX : 127.04433818317304, locY : 37.50236471726318})
  const dispatch = useDispatch();
  const [location, setLocation] = useState(baseloc)
  const {values, onChange} = useInput({
    address : '서울특별시 강남구 테헤란로44길 8 역삼 아이콘빌딩 팀 스파르타'
  })

  if(!accessToken){
    values.address = ''
  }

  useEffect(()=>{
    if(!accessToken){
      setLocation('로그인 후 이용해주세요')
    }
    if(!baseloc){
      setLocation('클릭으로 마커를 생성해주셔야 위치 정보가 입력 됩니다.')
    }
  },[accessToken])

  const Geocode = useQuery({
    queryKey:['GET_GEOCODE'],
    queryFn: async()=>{
      if(values.address){
        return await axios.get(`${process.env.REACT_APP_SERVER_URL}/maps/geocode?address=${values.address}`,
        {
          headers:{
              Authorization: `Bearer ${accessToken}`
            }
        })
      }else{
        return await axios.get(`${process.env.REACT_APP_SERVER_URL}/maps/geocode?address=서울특별시 강남구 테헤란로44길 8`,
        {
          headers:{
              Authorization: `Bearer ${accessToken}`
            }
        })
      }
    },
    onSuccess : (response) => {
      try{
        if(response.data.addresses.length === 0){
          window.alert('"시/구/동/읍/면" 과 같은 주소로 검색해주세요.')
        }
        else if(response.data.addresses.length !== 0){
          const xLoc = +response.data.addresses[0].x
          const yLoc = +response.data.addresses[0].y
          const place = new navermaps.LatLng(yLoc, xLoc)
          if(map) {
            map.panTo(place)
            setCenter({
              locX : xLoc,
              locY : yLoc
            })
          }
        }
      }catch{
        window.alert('다시 입력해주세요.')
      }
    },
    onError : (error) => {
      if(error.response.data.message === "Token Error"){
        alert('로그인 후 빌리지를 이용해주세요!')
      }else{
        alert('다시 시도 해주세요!')
      }
  }
  })

  
  const onClickMarker = async(event) => {
    if(!accessToken){
      return window.alert('로그인 후 빌리지를 이용해주세요!')
    }
    setCenter({
      locX : event.coord.x, 
      locY : event.coord.y
    })
  
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/maps/gc?coords=${event.coord.x},${event.coord.y}&output=json&orders=roadaddr`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    if(response.data === 'null null null null null'){
      window.alert('거래할 수 없는 지역입니다.')
    }
    else{
      setLocation(response.data)
      dispatch(storeLocation(response.data))
    }
  }

  
  return (
    <Div alignItem = 'center' style={{ marginTop:"0.5rem"}}>
      <Searchdiv>
          <MapSearch 
            name='address'
            defaultValue={values.address}
            onChange={onChange}
            placeholder = '시/구/동/읍/면" 과 같은 주소로 검색해주세요.'
            />
          <SearchButton onClick={(event)=>{
            event.preventDefault();
            if(!values.address){
              window.alert('다시 입력해주세요')
            }else{
              Geocode.refetch();
            }
          }}>
            <NotifiyIcon src='/images/location 2.png'/>
          </SearchButton>
        </Searchdiv>
      <MapBox theme={theme}>
        <MapDiv style={{ width: '100%', height: '100%',zIndex:9 }}>
          <NaverMap
            defaultCenter={new navermaps.LatLng(center.locY, center.locX)}
            defaultZoom={15}
            ref={setMap}
            onClick={onClickMarker}
          >
          <Marker position={new navermaps.LatLng(center.locY, center.locX)}/>
          </NaverMap>
        </MapDiv>
      </MapBox>
      <Div width = '100%' alignItem = 'start'>
        <span style={{margin:"0.8rem 0.5rem 0.8rem 0.5rem"}}>위치: {location}</span>
      </Div>
    </Div>
  )
}

export default React.memo(Map);