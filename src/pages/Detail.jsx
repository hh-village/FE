import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import SlideBtn from '../components/detail/SlideBtn'
import { FlexDiv, MaxWidthDiv, Div } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import { getCookie } from '../shared/Cookies'
import React, { useState } from 'react'
import { MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import ConsumerRegister from '../components/detail/ConsumerRegister'

function Detail() {
  const { id } = useParams();
  const [count, setCount] = useState(1);

  const { data } = useQuery({
    queryKey: ["GET_KAKAO_LOGIN"],
    queryFn: async () => {
      const token = getCookie("token");
      const res = await axios.get(`http://3.39.187.56/products/${parseInt(id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data.data;
    },
  })

  console.log(data);

  const styleOption = `
        display: flex;
        width: fit-content; 
        height: 100%;
        flex-wrap: nowrap;
        transition: all 0.5s;
        flex: none;
        transform: translateX(-${(count-1)*(false? 575:583)}px);
    `;

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv fDirection="column">
        <Div paddingTop="8rem" jc="space-between" width="100%">
            <Div width="100%" gap="2rem" height="30rem">
              <Div position="relative" width="100%" height="100%" overflow="hidden">
                <SlideBtn count={count} setFunc={setCount} total={data?.imageList.length}/>
                <Slide etc={styleOption}>
                  {data?.imageList.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
                </Slide>
              </Div>
              <Div width="100%" height="100%" fDirection="row" border="1px solid black">
                <div>
                  <h2>{data?.title}</h2>
                  <span>{data?.price}</span>
                  <span>{data?.location}</span>
                </div>
              </Div>
            </Div>
        </Div>
      </MaxWidthDiv>
    </FlexDiv>
    <>
      <HeaderNav/>
      <MaxWidthDiv>
        <ConsumerRegister/>
      </MaxWidthDiv>
    </>
  )
}

export default Detail

const Slide = styled.div`
  ${({etc}) => etc};
`

const Img = styled.img`
  width: 575px;
  height: 100%;
  object-fit: fill;
`