import styled, { css } from "styled-components";

export const RegistTitle = styled.span`
    margin: 76px 0px 29px 0;
    font-size: 32px;
`
export const TitleInput = styled.input`
    width: 590px;
    height: 55px;
    margin: 0 0 27px 0;
    text-indent: 22px;
    font-size: 20px;
    border-radius:5px;
    border: 1px solid #CFCFCF;
`
export const FirstPreview = styled.div`
    position: relative;
    margin: 0 0 10px 0;
    width: 585px;
    height: 499px; 
    border: 2px dotted gray;
    border-radius : 10px;
    background: #C4C4C4;
`
export const OtherPreview = styled.img`
    border: 2px dotted gray;
    border-radius : 10px;
    height: 127px;
    width: 127px;
    ${({theme})=>{
        switch(theme){
            case 'primary':
                return css`
                    background: #C4C4C4;
                `
        }
    }}
`
export const PreviewContainer = styled.div`
    display: flex;
    gap: 22px;
`
export const DescInput = styled.textarea`
    height: 200px;
    width: 462px;
    font-size: 20px;
    margin: 15px 0 10px 31px;
    padding: 20px;
    resize: none;
`
export const MapSearch = styled.input`
    width: 100%;
    height: 50px;
    font-size:25px;
    text-indent:0.5em;
    border: none;
`
export const SearchButton = styled.button`
    width: 60px;
    height: 50px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ededed;
    :hover{
        background-color: #e8e8e8;
    }
`
export const Searchdiv = styled.div`
    width: 502px;
    border: 2px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin: 10px 0 10px 31px;
`
export const PriceDiv = styled.div`
    width: 502px;
    height: 55px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 142px 0 10px 31px;
    border-radius: 5px;
`
export const PriceInput = styled.input`
    font-size : 20px;
    width: 100%;
    height: 100%;
    border: none;
    text-indent : 1em;
`
export const PriceSpan = styled.span`
    font-size : 20px;
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RegistBtn = styled.button`
    margin: 10px 0 0 31px;
    width : 505px;
    height : 50px;
    border: none;
    background : #644AFF;
    color: white;
    border-radius : 10px;
    font-size : 20px;
    cursor: pointer;
    :hover{
        box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: inset 1px 1px 10px rgb(0, 0, 0, 0.5);
    }
`