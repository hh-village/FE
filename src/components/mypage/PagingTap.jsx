import React, { useState } from 'react'
import styled from 'styled-components'
import { Div } from '../global/globalStyle';

function PagingTap() {
    const [currentBtn, setCurrentBtn] = useState("1");

    const buttonClickHandler = (e) => {
        setCurrentBtn(e.target.name);
    }

    const btnInfo = [
        { name: "1", title: "내가 작성한 글" },
        { name: "2", title: "대여중인 항목"},
        { name: "3", title: "팔로잉"}
    ]

  return (
    <Div width="100%" marginTop="3rem" borderBottom="1px solid #e6e6e6">
        <Div width="100%" jc="space-around">
            {btnInfo.map((item) => 
                <LPBtn
                focused={currentBtn}
                name={item.name}
                onClick={buttonClickHandler}>{item.title}</LPBtn>
            )}
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