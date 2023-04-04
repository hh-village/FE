import axios from 'axios';
import React, { useState } from 'react'
import { Container as MapDiv, useNavermaps, NaverMap } from 'react-naver-maps'
import useInput from '../../hooks/useInput'


function Map() {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const {values, onChange} = useInput({
    address : ''
  })

  const onSearchHandler = async(event)=>{
    event.preventDefault();
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/maps/geocode?address=${values.address}`)
    console.log(response)
    if (map) {
      map.setCenter(new navermaps.LatLng(33.3590628, 126.534361))
    }
  }

  return (
    <div>
      <MapDiv style={{ width: '462px',height: '238px'}}>
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.5816, 126.88839)}
          defaultZoom={15}
          ref={setMap}
        />
      </MapDiv>
        <input 
          name='address'
          value={values.address}
          onChange={onChange}
          />
        <button onClick={onSearchHandler}>
          위치 알아보기
        </button>
    </div>
    
  )
}

export default Map;