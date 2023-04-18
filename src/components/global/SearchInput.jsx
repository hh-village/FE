
import { nanoid } from 'nanoid'
import React from 'react'
import styled from 'styled-components'
import { Div } from './globalStyle'

function SearchInput({ searchData, setSearchData, rem }) {

  const locationName = [
    "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주"
  ]

  const catchSearchDataHandler = (e) => {
    const { name, value } = e.target;
    setSearchData((pre) => ({...pre, [name]: value}));
  }

  return (
    <Div fDirection="row" width="100%" boxShadow="none" padding={`${rem}rem 0rem 0rem 0rem`} gap="1rem">
        <Select name="location" onChange={catchSearchDataHandler}>
          <option value="">지역을 선택하세요</option>
          {locationName.map((item) => 
            <option value={item} key={nanoid()}>{item}</option>
          )}
        </Select>
        <Input
          type="text"
          name="productName"
          value={searchData.productName}
          placeholder="찾으시는 상품을 검색해보세요!"
          onChange={catchSearchDataHandler}/>
        <Button bgColor='#03DAC6'>찾아보기</Button>
    </Div>
  )
}

export default SearchInput

const Select = styled.select`
  border: 1px solid #767676;
  border-radius: 5px;
  height: 2.5rem;
`

const Input = styled.input`
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 100%;
  height: 2.3rem;
  padding-left: 1rem;
  &::placeholder {
    color: #767676;
  }

  &:focus {
    border: 1px solid #767676;
  }
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    color: ${({color}) => color ? color : 'black'};
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