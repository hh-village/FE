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
import ConsumerRegister from '../components/detail/ConsumerRegister'
import RegisterReserve from '../components/detail/RegisterReserve'

function Detail() {
  const { id } = useParams();
  const [count, setCount] = useState(1);

  const { data , isLoading} = useQuery({
    queryKey: ["GET_DETAIL"],
    queryFn: async () => {
      const token = getCookie("token");
      const res = await axios.get(`http://3.39.187.56/products/${parseInt(id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data.data;
    }
  })

  if(isLoading){
    return(
      <div>
        안녕하세요!
      </div>
    )
  }

  const styleOption = `
    display: flex;
    width: fit-content; 
    height: 100%;
    flex-wrap: nowrap;
    transition: all 0.5s;
    flex: none;
    transform: translateX(-${(count-1)*(false? 585: 584)}px);
  `;

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv fDirection="column">
        <Div padding="8rem 0 2rem 0" jc="space-between" width="100%" height="100%" gap="2rem">
            <Div width="100%" fDirection="row" gap="1rem">
              <Div position="relative" width="100%" height="50vh" overflow="hidden">
                <SlideBtn count={count} setFunc={setCount} total={data?.imageList.length}/>
                <Slide etc={styleOption}>
                  {data?.imageList.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
                </Slide>
              </Div>
              <Div>
                <h1>지도 넣을 자리</h1>
              </Div>
            </Div>
            <Div width="100%" fDirection="row" gap="1rem">
              <Div fDirection="row">
                <h2>{data?.title}</h2>
                <span>{data?.price}</span>
                <span>{data?.location}</span>
              </Div>
              <DescriptionDiv>
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error quaerat sed laudantium ipsa suscipit sunt placeat, rem facilis alias ullam nobis doloribus sequi earum consequatur. Harum voluptate neque facilis eos? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam voluptates numquam ipsa voluptas assumenda nam, quo distinctio dignissimos! Harum, quaerat. Fuga dolorem perferendis delectus sunt deleniti labore quibusdam, necessitatibus facere. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, voluptatum architecto consectetur laudantium blanditiis harum maiores inventore dicta illum autem earum at deserunt atque quod enim pariatur tempora recusandae. Doloribus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque quaerat odio temporibus totam libero non itaque et, accusamus asperiores culpa aliquid vel tempora enim mollitia fugiat in aut dolor dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi rerum tempore delectus, unde nesciunt asperiores, dolore et quibusdam blanditiis aliquam aspernatur temporibus sapiente illum quam consequuntur ea omnis nulla laudantium.</span>
              </DescriptionDiv>
              {data?.checkOwner
              ? <ConsumerRegister reservationList = {data?.reservationList} id = {data?.id}/>
              : <RegisterReserve reservationList = {data?.reservationList}/>
              }
            </Div>
        </Div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Detail

const Slide = styled.div`
  ${({etc}) => etc};
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`

const DescriptionDiv = styled.div`
  width: 100%;
  height : 30vh;
  overflow : auto;
  border: 1px solid #e6e6e6;
  &::-webkit-scrollbar{
    display: none;
  }
`