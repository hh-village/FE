import React, { useState } from 'react'
import { Div } from '../global/globalStyle'
import HomeSlideBtn from '../home/HomeSlideBtn'
import styled from 'styled-components';
import { nanoid } from 'nanoid';

function HomeImgSlide() {
    const [count, setCount] = useState(1);

    const test = [
        "/images/main1.jpg",
        "/images/main2.jpg",
        "/images/main3.jpg",
    ]

    const styleOption = `
        margin: auto;
        display: flex;
        flex-wrap: nowrap;
        transition: all 0.5s;
        flex: none;
        transform: translateX(-${(count-1)*(false? 585: 100)}vw);
    `

    return (
        <Div width="100%" marginTop="2rem" position="relative">
            <HomeSlideBtn count={count} setFunc={setCount} total={test.length}/>
            <Div position="relative" margin="auto" width="100%" height="100%" overflow="hidden">
                <Slide etc={styleOption}>
                    {test.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
                </Slide>
                <CountDiv>
                {test.map((item, index) => 
                    <CountBtn 
                    focused={count}
                    name={index+1}
                    onClick={()=>{setCount(index+1)}}></CountBtn>
                )}
                </CountDiv>
            </Div>
        </Div>
    )
}

export default HomeImgSlide

const Slide = styled.div`
  ${({etc}) => etc};
`

const Img = styled.img`
    width: 100%;
    object-fit: contain;
`

const CountDiv = styled.div`
    display: flex;
    gap: 1rem;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%, 0%);
    padding: 10px;
    box-sizing: border-box;
    gap: 1rem;
`

const CountBtn = styled.div`
    background-color: ${({ focused, name }) => focused === name ? `rgb(255, 255, 255, 0.5)` : `rgb(0, 0, 0, 0.5)`};
    border-radius: 50px;
    width: 10px;
    height: 10px;
    cursor: pointer;
`

