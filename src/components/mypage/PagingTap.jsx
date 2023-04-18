import React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { Div } from '../global/globalStyle';
import MyProducts from './MyProducts';
import MyRents from './MyRents';
import MyZzims from './MyZzims';

function PagingTap({data, btnInfo, currentBtn, buttonClickHandler}) {

  return (
    <Div width="100%" marginTop="3rem" gap="3rem">
        <Div fDirection="row" width="100%" jc="space-around" borderBottom="1px solid #e6e6e6">
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