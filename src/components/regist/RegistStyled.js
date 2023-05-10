import styled, { css } from "styled-components";

export const RegistTitle = styled.span`
    font-size: 1.5rem;
`
export const TitleInput = styled.input`
    width: 567px;
    height: 3rem;
    text-indent: 1rem;
    font-size: 1rem;
    border-radius: 10px;
    border: 1px solid #CFCFCF;
`
export const FirstPreview = styled.div`
    position: relative;
    width: 567px;
    height: 500px; 
    border: 1px dotted gray;
    border-radius : 10px;
    background: #C4C4C4;
    overflow: hidden;
`
export const OtherPreview = styled.div`
    position: relative;
    border: 1px dotted gray;
    border-radius : 10px;
    height: 100px;
    width: 127.5px;
    overflow: hidden;
    :hover{
        position: static;
        height: 300px;
        width: 300px;
    }
    ${({theme})=>{
        switch(theme){
            case 'primary':
                return css`
                    background: #C4C4C4;
                `
            default : 
                return
        }
    }}
`
export const PreviewContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`
export const DescInput = styled.textarea`
    height: 190px;
    width: 567px;
    font-size: 1rem;
    padding: 1.5rem;
    border: 1px solid #D7D7D7;
    border-radius: 10px;
    box-sizing: border-box;
    resize: none;
    margin-top: 1rem;
    overflow: auto;
    &::-webkit-scrollbar{
        display: none;
    }
`
export const MapSearch = styled.input`
    width: 100%;
    height: 45px;
    font-size:15px;
    text-indent:0.5em;
    background: #ffffff;
    border: none;
`

export const MapBox = styled.div`
    width: 610px;
    height: 509px;
    margin-top:13px;
    ${({theme})=>{
        switch(theme){
            case 'regist':
                return css`
                    width: 567px;
                    height: 238px;
                    margin-top:13px;
                `
        }
    }}
`

export const SearchButton = styled.button`
    width: 60px;
    height: 45px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #644AFF;
    :hover{
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`
export const Searchdiv = styled.div`
    margin-top: 0.5rem;
    width: 567px;
    border: 3px solid #644AFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-sizing: border-box;
`
export const PriceDiv = styled.div`
    width: 567px;
    height: 3rem;
    border: 1px solid #D7D7D7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
`
export const PriceInput = styled.input`
    font-size : 1rem;
    width: 100%;
    height: 100%;
    border: none;
    text-indent : 1em;
`
export const PriceSpan = styled.span`
    font-size : 1rem;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RegistBtn = styled.button`
    margin-top: 0.5rem;
    width : 567px;
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