import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import styled from "styled-components";
import { Div } from "../global/globalStyle";
import SlideBtn from "./SlideBtn";

const ImageSlider = ({imageList}) => {
    const [count, setCount] = useState(1);
    const styleOption = `
        object-fit : contain;
        display: flex;
        width: fit-content; 
        height: 100%;
        flex-wrap: nowrap;
        transition: all 0.5s;
        flex: none;
        transform: translateX(-${(count-1)*(false? 585: 584)}px);
    `;

    return (
        <Div position="relative" width="567px" height="500px" overflow = 'hidden' bgColor="#e6e6e6">
            {imageList?.length > 1 && (
                <SlideBtn count={count} setFunc={setCount} total={imageList?.length}/>
            )}
            <Slide etc={styleOption}>
                {imageList?.map((imgs) => <Img src={imgs} alt={imgs} key={nanoid()}/>)}
            </Slide>
        </Div>
    )
}

export default ImageSlider;


const Slide = styled.div`
    ${({etc}) => etc};
`
const Img = styled.img`
    object-fit : contain;
    height: 500px;
    width: 567px;
`
