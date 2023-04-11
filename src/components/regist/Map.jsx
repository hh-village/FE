import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container as MapDiv, useNavermaps, NaverMap, Marker } from 'react-naver-maps'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { storeLocation } from '../../redux/modules/Post';
import { getCookie } from '../../shared/Cookies';
import { MapSearch, SearchButton, Searchdiv } from './RegistStyled';


function Map() {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState('')
  const dispatch = useDispatch();
  const [location, setLocation] = useState('')
  const {values, onChange} = useInput({
    address : ''
  })

  const onSearchHandler = async(event)=>{
    event.preventDefault();
    const accessToken = getCookie('token')
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/maps/geocode?address=${values.address}`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    const xLoc = +data.addresses[0].x
    const yLoc = +data.addresses[0].y
    const center = new navermaps.LatLng(yLoc, xLoc)
    if(map) {
      map.panTo(center)
    }}
  
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
    setLocation(response.data)
    dispatch(storeLocation(response.data))
  }

  
  return (
    <div>
      <MapDiv style={{ width: '505px',height: '238px', marginLeft:'20px'}}>
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.5816, 126.88839)}
          defaultZoom={15}
          ref={setMap}
          onClick={onClickMarker}
        >
        <Marker position={new navermaps.LatLng(center.locY, center.locX)}/>
        </NaverMap>
      </MapDiv>
      
      <Searchdiv>
        <MapSearch 
          name='address'
          value={values.address}
          onChange={onChange}
          />
        <SearchButton onClick={onSearchHandler}>
          위치
        </SearchButton>
      </Searchdiv>
        <span style={{marginLeft:'20px'}}>거래 위치: {location}</span>
    </div>
    
  )
}

export default Map;