
import React from 'react'
import styled from 'styled-components'
import { MaxWidthDiv } from './globalStyle'


function SearchInput() {
  return (
    <MaxWidthDiv boxShadow="none" padding="8rem 0rem 0rem 0rem">
        <Input type="text" />
        <Button bgColor='#03DAC6'>찾아보기</Button>
    </MaxWidthDiv>
  )
}

export default SearchInput

const Input = styled.input`
  width: 5rem;
  height: 2.5rem;
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    color: ${({color}) => color ? color : 'white'};
    border-radius: 5px;
    font-weight: 700;
    width: 5rem;
    height: 2.5rem;
    cursor: pointer;
    margin-top: ${({marginTop}) => marginTop ? marginTop : 0};
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
      box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
      box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`