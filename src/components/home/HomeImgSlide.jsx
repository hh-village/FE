import React, { useState } from 'react'
import { Div } from '../global/globalStyle'
import SlideBtn from '../detail/SlideBtn'
import styled from 'styled-components';
import { nanoid } from 'nanoid';

function HomeImgSlide() {
    const [count, setCount] = useState(1);

    const test = [
        "/images/DSC02693.jpg",
        "/images/DSC01665.jpg",
        "/images/DSC01302.jpg",
        "/images/DSC02517.jpg",
        "/images/DSC01716.jpg"
    ]

    const styleOption = `
        margin: auto;
        display: flex;
        width: fit-content; 
        flex-wrap: nowrap;
        transition: all 0.5s;
        flex: none;
        transform: translateX(-${(count-1)*(false? 585: 600)}px);
    `

    return (
        <Div bgColor="black" width="100%" marginTop="2rem">
            <Div position="relative" margin="auto" width="600px" overflow="hidden">
                <SlideBtn count={count} setFunc={setCount} total={test.length}/>
                <Slide etc={styleOption}>
                    {test.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
                </Slide>
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
  object-fit: fill;
`