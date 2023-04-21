import axios from 'axios';
import React, { useState } from 'react'
import { Container as MapDiv, useNavermaps, NaverMap, Marker } from 'react-naver-maps'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { storeLocation } from '../../redux/modules/Post';
import { getCookie } from '../../shared/Cookies';
import { MapSearch, SearchButton, Searchdiv } from './RegistStyled';
import { useLocation } from 'react-router-dom';
import { Div } from '../global/globalStyle';
import { useQuery } from '@tanstack/react-query';


function Map() {
  const accessToken = getCookie('token')
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState('')
  const dispatch = useDispatch();
  const pageLocation = useLocation();
  const [location, setLocation] = useState('')
  const {values, onChange} = useInput({
    address : ''
  })

  const Geocode = useQuery({
    queryKey:['GET_GEOCODE'],
    queryFn: async()=>{
      return await axios.get(`${process.env.REACT_APP_SERVER_URL}/maps/geocode?address=${values.address}`,
      {
        headers:{
            Authorization: `Bearer ${accessToken}`
          }
      })
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
          }
        }
      }catch{
        window.alert('다시 입력해주세요.')
      }
    },
    enabled:false
  })

  
  const onClickMarker = async(event) => {
    setCenter({
      locX : event.coord.x, 
      locY : event.coord.y
    })
    const accessToken = getCookie('token')
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
    <div style={{ marginTop:"1rem" }}>
      <MapDiv style={{ width: '567px', height: '238px' }}>
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.5816, 126.88839)}
          defaultZoom={15}
          ref={setMap}
          onClick={onClickMarker}
        >
        <Marker position={new navermaps.LatLng(center.locY, center.locX)}/>
        </NaverMap>
      </MapDiv>
      {
        pageLocation.pathname === "/detail/*"
        ? null
        : <>
            <Searchdiv>
              <MapSearch 
                name='address'
                value={values.address}
                onChange={onChange}
                />
              <SearchButton onClick={(event)=>{
                event.preventDefault();
                Geocode.refetch();
              }}>
                위치
              </SearchButton>
            </Searchdiv>
            <Div>
              <span style={{marginTop:"1rem"}}>거래 위치: {location}</span>
            </Div>
          </>
      }
    </div>
  )
}

export default Map;