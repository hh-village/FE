import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { getCookie } from '../../shared/Cookies';
import { Div } from '../global/globalStyle';
import MyProducts from './MyProducts';
import MyRents from './MyRents';
import MyZzims from './MyZzims';

function PagingTap({setMyNickname}) {
    const [currentBtn, setCurrentBtn] = useState("products");

    const buttonClickHandler = (e) => {
        setCurrentBtn(e.target.name);
    }

    const { data } = useQuery({
        queryKey: [`${currentBtn}`],
        queryFn: async () => {
          const token = getCookie("token");
          const res = await axios.get(`http://3.37.127.30/users?key=${currentBtn}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
          });
          setMyNickname(res?.data.data.nickname);
          return res.data.data;
        }
    })

    const btnInfo = [
        { name: "products", title: "내가 작성한 글" },
        { name: "rents", title: "대여중인 항목"},
        { name: "zzims", title: "찜한 상품"}
    ]

  return (
    <Div width="100%" marginTop="3rem" fDirection="row" gap="3rem">
        <Div width="100%" jc="space-around" borderBottom="1px solid #e6e6e6">
            {btnInfo.map((item) => 
                <LPBtn
                key={nanoid()}
                focused={currentBtn}
                name={item.name}
                onClick={buttonClickHandler}
                >{item.title}</LPBtn>
            )}
        </Div>
        <Div width="100%">
        {(()=>{
            switch(currentBtn) {
                case "products":
                    return <MyProducts data={data}/>
                case "rents":
                    return <MyRents data={data}/>
                case "zzims":
                    return <MyZzims data={data}/>
                default:
                    return null
            }
        })()}
        </Div>
    </Div>
  )
}

export default PagingTap

const LPBtn = styled.button`
    border: none;
    font-size: 1rem;
    padding-bottom: 8px;
    border-bottom: ${({ focused, name }) => focused === name ? `2px solid black` : `white`};
    background-color: white;
    color: ${({ focused, name }) => focused === name ? `black` : `#616161`};
    font-weight: ${({ focused, name }) => focused === name ? 800 : 400};
`