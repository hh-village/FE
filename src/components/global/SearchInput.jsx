
import React, { useState } from 'react'
import styled from 'styled-components'
import { MaxWidthDiv } from './globalStyle'

function SearchInput() {
  const [search, setSearch] = useState("");
  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  }
  console.log(search);

  return (
    <MaxWidthDiv boxShadow="none" padding="8rem 0rem 0rem 0rem">
        <Input
          type="text"
          value={search}
          placeholder="찾으시는 상품을 검색해보세요!"
          onChange={inputChangeHandler}/>
        <Button bgColor='#03DAC6'>찾아보기</Button>
    </MaxWidthDiv>
  )
}

export default SearchInput

const Input = styled.input`
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 100%;
  height: 2.5rem;
  padding-left: 1rem;
  &::placeholder {
    color: #e6e6e6;
  }

  &:focus {
    &::placeholder{
      display: none;
    }
    border: 1px solid #767676;
  }
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
    width: 10rem;
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